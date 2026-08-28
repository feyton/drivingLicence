import { Types } from "mongoose";
import { dbConnect } from "@/lib/db";
import { Question } from "@/lib/models/Question";
import { Attempt } from "@/lib/models/Attempt";
import { UserQuestionStat } from "@/lib/models/UserQuestionStat";
import { CATEGORY_VALUES, passMark } from "@/lib/config";

export type DrawConfig = {
  count: number;
  categories: string[]; // UI keys: "general" | "signs"; empty = all
  focus: "all" | "unseen" | "missed";
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function drawQuestions(userId: string, config: DrawConfig) {
  await dbConnect();
  const match: Record<string, unknown> = { approved: true, active: true };
  if (config.categories.length) {
    match.category = { $in: config.categories.map((c) => CATEGORY_VALUES[c] ?? c) };
  }

  if (config.focus === "missed") {
    const stats = await UserQuestionStat.find({ user: userId, lastResult: false }).select("question");
    const ids = stats.map((s) => s.question);
    if (ids.length === 0) return []; // caller falls back / informs the user
    match._id = { $in: ids };
  } else if (config.focus === "unseen") {
    const stats = await UserQuestionStat.find({ user: userId }).select("question");
    const seen = stats.map((s) => s.question);
    if (seen.length) match._id = { $nin: seen };
  }

  let drawn = await Question.aggregate([{ $match: match }, { $sample: { size: config.count } }]);

  // "unseen" falls back to the whole bank when the learner has seen everything.
  if (drawn.length < config.count && config.focus === "unseen") {
    const excludeIds = drawn.map((d) => d._id);
    const extra = await Question.aggregate([
      { $match: { approved: true, active: true, _id: { $nin: excludeIds }, ...(match.category ? { category: match.category } : {}) } },
      { $sample: { size: config.count - drawn.length } },
    ]);
    drawn = drawn.concat(extra);
  }
  return drawn;
}

export function buildAttemptQuestions(drawn: { _id: Types.ObjectId; options: { id: string }[] }[]) {
  return drawn.map((q) => ({
    questionId: q._id,
    optionOrder: shuffle(q.options.map((o) => o.id)), // randomized render order per attempt
    answer: null,
    answeredAt: null,
  }));
}

export async function gradeAttempt(attemptId: string) {
  await dbConnect();
  const attempt = await Attempt.findById(attemptId);
  if (!attempt || attempt.submittedAt) return attempt;

  const cutoff = attempt.expiresAt ? new Date(attempt.expiresAt.getTime()) : null;
  const ids = attempt.questions.map((q: { questionId: Types.ObjectId }) => q.questionId);
  const questions = await Question.find({ _id: { $in: ids } });
  const byId = new Map(questions.map((q) => [q._id.toString(), q]));

  let score = 0;
  const snapshot = attempt.questions.map(
    (aq: { questionId: Types.ObjectId; optionOrder: string[]; answer: string | null; answeredAt: Date | null }) => {
      const q = byId.get(aq.questionId.toString());
      // Answers recorded after the exam expired don't count.
      const counted = aq.answer && (!cutoff || !aq.answeredAt || aq.answeredAt <= cutoff) ? aq.answer : null;
      const isCorrect = q ? counted === q.answer : false;
      if (isCorrect) score++;
      return {
        questionId: aq.questionId,
        text: q?.text ?? "",
        options: q?.options ?? [],
        optionOrder: aq.optionOrder,
        correctAnswer: q?.answer ?? "",
        userAnswer: counted,
        explanation: q?.explanation ?? "",
        category: q?.category ?? "general",
        image: q?.image ?? null,
        correct: isCorrect,
      };
    }
  );

  attempt.score = score;
  attempt.passed = score >= passMark(attempt.total);
  attempt.submittedAt = new Date();
  attempt.snapshot = snapshot;
  await attempt.save();

  // Update per-question stats (powers "missed"/"unseen" and weak areas).
  const ops = snapshot.map((s: { questionId: Types.ObjectId; correct: boolean; category: string }) => ({
    updateOne: {
      filter: { user: attempt.user, question: s.questionId },
      update: {
        $inc: { attempts: 1, correct: s.correct ? 1 : 0, wrong: s.correct ? 0 : 1 },
        $set: { lastResult: s.correct, lastSeenAt: new Date(), category: s.category },
      },
      upsert: true,
    },
  }));
  if (ops.length) await UserQuestionStat.bulkWrite(ops);

  return attempt;
}
