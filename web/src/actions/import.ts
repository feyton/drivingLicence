"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { Question } from "@/lib/models/Question";

const REVIEWER_ROLES = ["editor", "admin", "super"];

const importSchema = z.object({
  source: z.string().min(1).max(200),
  questions: z
    .array(
      z.object({
        text: z.string().min(5),
        options: z.array(z.object({ id: z.string().min(1).max(2), text: z.string().min(1) })).min(2).max(5),
        answer: z.string().min(1).max(2),
        explanation: z.string().nullable().default(null),
        category: z.enum(["general", "signs"]),
      })
    )
    .min(1)
    .max(500),
});

export async function importQuestions(input: unknown) {
  const session = await auth();
  if (!session?.user || !REVIEWER_ROLES.includes(session.user.role)) {
    return { ok: false as const, error: "forbidden" };
  }
  const parsed = importSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "invalid" };

  const valid = parsed.data.questions.filter((q) => q.options.some((o) => o.id === q.answer));
  if (!valid.length) return { ok: false as const, error: "no_valid_questions" };

  await dbConnect();
  const batch = `admin-upload-${new Date().toISOString().slice(0, 10)}`;
  const docs = valid.map((q) => ({
    text: q.text.trim(),
    options: q.options.map((o) => ({ id: o.id, text: o.text.trim() })),
    answer: q.answer,
    explanation: q.explanation?.trim() ?? "",
    category: q.category === "signs" ? "posts" : "general",
    approved: false, // everything lands in the review queue
    active: true,
    user: session.user.id,
    importBatch: batch,
    importSource: { file: parsed.data.source, via: "admin-extract" },
  }));
  const res = await Question.insertMany(docs);
  return { ok: true as const, inserted: res.length, batch };
}
