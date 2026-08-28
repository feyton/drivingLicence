import { NextResponse } from "next/server";
import { generateText } from "ai";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { Attempt } from "@/lib/models/Attempt";
import { htmlToText } from "@/lib/sanitize";
import { retrieveForQuestions, formatGrounding } from "@/lib/coach";
import { anthropic, COACH_MODEL } from "@/lib/anthropic";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 60;

type SnapshotItem = { text: string; options: { id: string; text: string }[]; correctAnswer: string; userAnswer: string | null; explanation: string; category: string; correct: boolean };

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const client = anthropic();
  if (!client) return NextResponse.json({ error: "no_api_key" }, { status: 501 });

  const rl = rateLimit(`coach-review:${session.user.id}`, 10, 60 * 60 * 1000);
  if (!rl.ok) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const { attemptId } = await req.json().catch(() => ({}));
  if (!/^[0-9a-f]{24}$/.test(attemptId ?? "")) return NextResponse.json({ error: "invalid" }, { status: 400 });

  await dbConnect();
  const attempt = await Attempt.findOne({ _id: attemptId, user: session.user.id });
  if (!attempt || !attempt.submittedAt) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const snapshot: SnapshotItem[] = attempt.snapshot ?? [];
  const missed = snapshot.filter((s) => !s.correct);
  if (missed.length === 0) {
    return NextResponse.json({ coaching: "Wakoze neza cyane! Nta kibazo wibeshyeho muri iki kizamini. Komeza gutyo. 🎉" });
  }

  const missedText = missed.map((m, i) => {
    const correct = m.options.find((o) => o.id === m.correctAnswer);
    const chose = m.userAnswer ? m.options.find((o) => o.id === m.userAnswer) : null;
    return `${i + 1}. ${htmlToText(m.text)}\n   Igisubizo cy'ukuri: ${htmlToText(correct?.text || m.correctAnswer)}\n   Wowe wahisemo: ${chose ? htmlToText(chose.text) : "(nta gisubizo)"}${m.explanation ? `\n   Ubusobanuro: ${htmlToText(m.explanation)}` : ""}`;
  }).join("\n\n");

  const grounding = formatGrounding(retrieveForQuestions(missed.map((m) => htmlToText(m.text)), 12));

  const system = `Uri "Umutoza", umwarimu w'amategeko y'umuhanda mu Rwanda wongorera abanyeshuri biga gutwara ibinyabiziga. Uvuga mu Kinyarwanda cyoroshye, ushishikaza kandi wubaha. Ntukoreshe amagambo akomeye. Ushingira ku mategeko y'umuhanda y'u Rwanda gusa.`;

  const prompt = `Umunyeshuri arangije ikizamini afata amanota ${attempt.score}/${attempt.total}. Dore ibibazo yibeshyeho:

${missedText}

Inyandiko z'inyongera zishingiweho (koresha izi mu gusobanura amategeko, ntukavuge ibitari muri izo cyangwa ibyo uzi neza):
${grounding}

Andikira umunyeshuri inama ngufi (mu Kinyarwanda):
1. Tangira ukamushishikaza mu magambo make.
2. Shyira hamwe amakosa mu byiciro 2-4 (urugero: ibyapa, umuvuduko, uburenganzira bwo kubanza), buri cyiciro usobanure itegeko ry'ingenzi mu magambo make yumvikana.
3. Soza umuha inama y'icyo yakwitozaho ubutaha.

Andika mu magambo agera kuri 200, ukoreshe imitwe migufi. Ntukongeremo ibisubizo by'ibibazo bishya.`;

  const { text } = await generateText({
    model: client(COACH_MODEL),
    system,
    prompt,
    maxOutputTokens: 900,
  });

  return NextResponse.json({ coaching: text, missedCount: missed.length });
}
