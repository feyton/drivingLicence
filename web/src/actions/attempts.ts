"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { Attempt } from "@/lib/models/Attempt";
import { Question } from "@/lib/models/Question";
import { drawQuestions, buildAttemptQuestions, gradeAttempt } from "@/lib/exam";
import { EXAM, PRACTICE } from "@/lib/config";

const startSchema = z.object({
  mode: z.enum(["exam", "practice"]),
  count: z.number().int().min(5).max(50).optional(),
  categories: z.array(z.enum(["general", "signs"])).default([]),
  focus: z.enum(["all", "unseen", "missed"]).default("all"),
  reveal: z.enum(["immediate", "end"]).optional(),
});

export async function startAttempt(input: unknown): Promise<{ ok: false; error: string } | never> {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const parsed = startSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };
  const cfg = parsed.data;

  // Exam mode always uses the official format; practice is configurable.
  const count = cfg.mode === "exam" ? EXAM.count : cfg.count ?? PRACTICE.defaultCount;
  const categories = cfg.mode === "exam" ? [] : cfg.categories;
  const focus = cfg.mode === "exam" ? "all" : cfg.focus;
  // Reveal timing: default immediate for practice, end for exam — but user-configurable.
  const reveal = cfg.reveal ?? (cfg.mode === "exam" ? "end" : "immediate");

  const drawn = await drawQuestions(session.user.id, { count, categories, focus });
  if (drawn.length === 0) return { ok: false, error: focus === "missed" ? "no_missed" : "no_questions" };

  await dbConnect();
  const now = new Date();
  const attempt = await Attempt.create({
    user: session.user.id,
    mode: cfg.mode,
    config: { count: drawn.length, categories, focus, reveal },
    questions: buildAttemptQuestions(drawn),
    startedAt: now,
    expiresAt: cfg.mode === "exam" ? new Date(now.getTime() + EXAM.minutes * 60 * 1000) : null,
    total: drawn.length,
  });

  redirect(`/session/${attempt._id.toString()}`);
}

const answerSchema = z.object({
  attemptId: z.string().regex(/^[0-9a-f]{24}$/),
  index: z.number().int().min(0).max(60),
  optionId: z.string().min(1).max(2),
});

export type AnswerResult =
  | { ok: true; feedback: null }
  | {
      ok: true;
      feedback: { correct: boolean; correctAnswer: string; explanation: string; whyWrong: string | null };
    }
  | { ok: false; error: string };

export async function recordAnswer(input: unknown): Promise<AnswerResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "unauthenticated" };
  const parsed = answerSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };
  const { attemptId, index, optionId } = parsed.data;

  await dbConnect();
  const attempt = await Attempt.findOne({ _id: attemptId, user: session.user.id });
  if (!attempt) return { ok: false, error: "not_found" };
  if (attempt.submittedAt) return { ok: false, error: "already_submitted" };
  const aq = attempt.questions[index];
  if (!aq) return { ok: false, error: "invalid" };

  if (attempt.expiresAt && Date.now() > attempt.expiresAt.getTime() + EXAM.graceSeconds * 1000) {
    await gradeAttempt(attempt._id.toString()); // time is up — finalize with what's there
    return { ok: false, error: "expired" };
  }

  aq.answer = optionId;
  aq.answeredAt = new Date();
  attempt.markModified("questions");
  await attempt.save();

  // Reveal timing is per-attempt: "immediate" teaches after each answer,
  // "end" stays silent until submit.
  if (attempt.config?.reveal === "immediate") {
    const q = await Question.findById(aq.questionId);
    if (!q) return { ok: false, error: "not_found" };
    const notes = (q.optionNotes ?? {}) as Record<string, string>;
    // If the learner was wrong, surface the note specific to the option they chose.
    const whyWrong = q.answer !== optionId ? notes[optionId] ?? null : null;
    return {
      ok: true,
      feedback: {
        correct: q.answer === optionId,
        correctAnswer: q.answer,
        explanation: q.explanation ?? "",
        whyWrong,
      },
    };
  }
  return { ok: true, feedback: null };
}

export async function submitAttempt(attemptId: string): Promise<{ ok: false; error: string } | never> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "unauthenticated" };
  if (!/^[0-9a-f]{24}$/.test(attemptId)) return { ok: false, error: "invalid" };

  await dbConnect();
  const attempt = await Attempt.findOne({ _id: attemptId, user: session.user.id });
  if (!attempt) return { ok: false, error: "not_found" };
  if (!attempt.submittedAt) await gradeAttempt(attemptId);

  redirect(`/results/${attemptId}`);
}
