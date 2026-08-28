import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { Question } from "@/lib/models/Question";
import { htmlToText } from "@/lib/sanitize";
import { questionKey, isNearDuplicate } from "@/lib/similarity";

export const maxDuration = 300;

const REVIEWER_ROLES = ["editor", "admin", "super"];
const MAX_FILE_BYTES = 15 * 1024 * 1024;

const extractionSchema = z.object({
  questions: z.array(
    z.object({
      text: z.string(),
      options: z.array(z.object({ id: z.string(), text: z.string() })),
      answer: z.string().nullable(),
      answerSource: z.enum(["key", "inline"]).nullable(),
      explanation: z.string().nullable(),
      category: z.enum(["general", "signs"]),
      needsImage: z.boolean(),
    })
  ),
});

const EXTRACTION_PROMPT = `You are extracting multiple-choice driving-exam questions for the Rwandan provisional driving licence exam from the attached document. Content is usually Kinyarwanda, sometimes French.

Extract EVERY multiple-choice question:
- text: the question stem, plain text
- options: [{id: "A".."E", text}] in document order (normalize markers like "1°", "a)" to A/B/C/D)
- answer: the correct option id ONLY if the document indicates it (inline marking, bold, or an answer-key section — check the end of the document); otherwise null. NEVER invent answers.
- answerSource: "key" | "inline" | null
- explanation: 1-2 sentences in Kinyarwanda explaining the rule, only when the answer is known; else null
- category: "signs" for road-sign questions (ibyapa/ibimenyetso), else "general"
- needsImage: true when the question cannot be answered without a picture printed in the document

Skip reference/law text that contains no questions. Deduplicate within the document.`;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || !REVIEWER_ROLES.includes(session.user.role)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "no_api_key" }, { status: 501 });
  }

  const form = await req.formData();
  const file = form.get("file");
  const pastedText = form.get("text");

  const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const model = anthropic(process.env.EXTRACTION_MODEL || "claude-sonnet-5");

  let userContent;
  if (file instanceof File) {
    if (file.size > MAX_FILE_BYTES) return NextResponse.json({ error: "file_too_large" }, { status: 413 });
    const bytes = new Uint8Array(await file.arrayBuffer());
    userContent = [
      { type: "text" as const, text: EXTRACTION_PROMPT },
      { type: "file" as const, data: bytes, mediaType: file.type || "application/pdf" },
    ];
  } else if (typeof pastedText === "string" && pastedText.trim()) {
    userContent = [{ type: "text" as const, text: `${EXTRACTION_PROMPT}\n\n--- DOCUMENT ---\n${pastedText.slice(0, 200_000)}` }];
  } else {
    return NextResponse.json({ error: "no_input" }, { status: 400 });
  }

  const { object } = await generateObject({
    model,
    schema: extractionSchema,
    messages: [{ role: "user", content: userContent }],
  });

  // Annotate near-duplicates against the whole existing bank before anything is saved.
  await dbConnect();
  const existing = await Question.find({ active: true }).select("text options");
  const existingKeys = existing.map((q) => questionKey(htmlToText(q.text), q.options));

  const annotated = object.questions.map((q) => {
    const key = questionKey(q.text, q.options);
    let bestSim = 0;
    let dup = false;
    for (const ek of existingKeys) {
      const res = isNearDuplicate(key, ek);
      if (res.sim > bestSim) bestSim = res.sim;
      if (res.dup) { dup = true; break; }
    }
    return { ...q, duplicate: dup, similarity: +bestSim.toFixed(2) };
  });

  return NextResponse.json({
    questions: annotated,
    stats: {
      extracted: annotated.length,
      duplicates: annotated.filter((q) => q.duplicate).length,
      withAnswer: annotated.filter((q) => q.answer).length,
      needImage: annotated.filter((q) => q.needsImage).length,
    },
  });
}
