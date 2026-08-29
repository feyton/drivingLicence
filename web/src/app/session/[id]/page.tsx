import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { Attempt } from "@/lib/models/Attempt";
import { Question } from "@/lib/models/Question";
import { gradeAttempt } from "@/lib/exam";
import { htmlToText, extractImage } from "@/lib/sanitize";
import { SessionPlayer } from "@/components/session-player";
import { EXAM } from "@/lib/config";
import type { Types } from "mongoose";

export default async function SessionPage({ params }: PageProps<"/session/[id]">) {
  const { id } = await params;
  if (!/^[0-9a-f]{24}$/.test(id)) notFound();

  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  await dbConnect();
  const attempt = await Attempt.findOne({ _id: id, user: session.user.id });
  if (!attempt) notFound();
  if (attempt.submittedAt) redirect(`/results/${id}`);

  // Expired exams get finalized on the spot.
  if (attempt.expiresAt && Date.now() > attempt.expiresAt.getTime() + EXAM.graceSeconds * 1000) {
    await gradeAttempt(id);
    redirect(`/results/${id}`);
  }

  const ids = attempt.questions.map((q: { questionId: Types.ObjectId }) => q.questionId);
  const questions = await Question.find({ _id: { $in: ids } }).select("text options category");
  const byId = new Map(questions.map((q) => [q._id.toString(), q]));

  // Send only what the learner may see: no correct answers, options in this
  // attempt's shuffled order.
  const payload = attempt.questions.map(
    (aq: { questionId: Types.ObjectId; optionOrder: string[]; answer: string | null }, index: number) => {
      const q = byId.get(aq.questionId.toString());
      const optionsById = new Map<string, { id: string; text: string; image?: string | null }>(
        (q?.options ?? []).map((o: { id: string; text: string; image?: string | null }) => [o.id, o])
      );
      return {
        index,
        text: htmlToText(q?.text),
        image: q?.image ?? extractImage(q?.text),
        options: aq.optionOrder
          .map((oid: string) => optionsById.get(oid))
          .filter((o): o is { id: string; text: string; image?: string | null } => Boolean(o))
          .map((o) => ({ id: o.id, text: htmlToText(o.text), image: o.image ?? null })),
        answer: aq.answer ?? null,
      };
    }
  );

  return (
    <SessionPlayer
      attemptId={id}
      mode={attempt.mode}
      reveal={attempt.config?.reveal === "end" ? "end" : "immediate"}
      questions={payload}
      expiresAt={attempt.expiresAt ? attempt.expiresAt.toISOString() : null}
    />
  );
}
