import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getTranslations, getFormatter } from "next-intl/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { Attempt } from "@/lib/models/Attempt";
import { htmlToText, extractImage } from "@/lib/sanitize";
import { passMark } from "@/lib/config";
import { startAttempt } from "@/actions/attempts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CoachReview } from "@/components/coach-review";
import { cn } from "@/lib/utils";

type SnapshotItem = {
  questionId: string;
  text: string;
  options: { id: string; text: string }[];
  optionOrder: string[];
  correctAnswer: string;
  userAnswer: string | null;
  explanation: string;
  category: string;
  correct: boolean;
};

export default async function ResultsPage({ params }: PageProps<"/results/[id]">) {
  const { id } = await params;
  if (!/^[0-9a-f]{24}$/.test(id)) notFound();

  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  await dbConnect();
  const attempt = await Attempt.findOne({ _id: id, user: session.user.id });
  if (!attempt) notFound();
  if (!attempt.submittedAt) redirect(`/session/${id}`);

  const [t, format] = await Promise.all([getTranslations("results"), getFormatter()]);

  const snapshot: SnapshotItem[] = attempt.snapshot ?? [];
  const missed = snapshot.filter((s) => !s.correct);
  const mark = passMark(attempt.total);
  const pct = attempt.total ? Math.round(((attempt.score ?? 0) / attempt.total) * 100) : 0;

  // Category breakdown
  const cats = new Map<string, { total: number; correct: number }>();
  for (const s of snapshot) {
    const key = s.category === "posts" ? "signs" : "general";
    const c = cats.get(key) ?? { total: 0, correct: 0 };
    c.total++;
    if (s.correct) c.correct++;
    cats.set(key, c);
  }

  // Readiness strip: last 5 submitted exams
  const lastExams = await Attempt.find({ user: session.user.id, mode: "exam", submittedAt: { $ne: null } })
    .sort({ submittedAt: -1 })
    .limit(5)
    .select("score total passed submittedAt");

  const passed = attempt.passed === true;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5 px-4 py-8">
      {/* Verdict hero */}
      <Card className={cn("border-2", passed ? "border-[var(--success)]/50" : "border-destructive/40")}>
        <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
          <div
            className={cn(
              "flex h-24 w-24 items-center justify-center rounded-full border-4 font-heading text-2xl font-bold tabular-nums",
              passed ? "border-[var(--success)] text-[var(--success)]" : "border-destructive text-destructive"
            )}
          >
            {attempt.score}/{attempt.total}
          </div>
          <h1 className="font-heading text-2xl font-bold">{passed ? t("passedTitle") : t("failedTitle")}</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            {passed
              ? t("passedBody", { score: attempt.score ?? 0, total: attempt.total })
              : t("failedBody", { score: attempt.score ?? 0, total: attempt.total, passMark: mark })}
          </p>
          <p className="text-xs text-muted-foreground tabular-nums">{pct}% · {format.dateTime(attempt.submittedAt, { dateStyle: "medium", timeStyle: "short" })}</p>

          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {missed.length > 0 && (
              <form
                action={async () => {
                  "use server";
                  await startAttempt({ mode: "practice", count: Math.min(40, Math.max(5, missed.length)), categories: [], focus: "missed" });
                }}
              >
                <Button type="submit" variant="default">
                  {t("practiceMissed", { count: missed.length })}
                </Button>
              </form>
            )}
            <Button variant="outline" render={<Link href={attempt.mode === "exam" ? "/exam" : "/practice"} />}>
              {t("newExam")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI coach */}
      <CoachReview attemptId={id} allCorrect={missed.length === 0} />

      {/* Category breakdown + recent exams */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="space-y-3 py-5">
            <h2 className="font-heading text-sm font-semibold">{t("byCategory")}</h2>
            {[...cats.entries()].map(([key, c]) => {
              const p = Math.round((c.correct / c.total) * 100);
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{key === "signs" ? t("catSigns") : t("catGeneral")}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {c.correct}/{c.total}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn("h-full rounded-full", p >= 60 ? "bg-[var(--success)]" : "bg-destructive")}
                      style={{ width: `${p}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 py-5">
            <h2 className="font-heading text-sm font-semibold">{t("readiness")}</h2>
            <div className="flex items-end gap-2">
              {lastExams.length === 0 && <p className="text-sm text-muted-foreground">—</p>}
              {[...lastExams].reverse().map((e) => {
                const p = e.total ? Math.round(((e.score ?? 0) / e.total) * 100) : 0;
                return (
                  <div key={e._id.toString()} className="flex flex-1 flex-col items-center gap-1">
                    <div className="flex h-20 w-full items-end overflow-hidden rounded bg-muted">
                      <div
                        className={cn("w-full rounded-t", e.passed ? "bg-[var(--success)]" : "bg-destructive")}
                        style={{ height: `${p}%` }}
                      />
                    </div>
                    <span className="text-[10px] tabular-nums text-muted-foreground">{e.score}/{e.total}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Per-question review */}
      <h2 className="mt-2 font-heading text-lg font-semibold">{t("review")}</h2>
      <div className="flex flex-col gap-3">
        {snapshot.map((s, i) => {
          const image = extractImage(s.text);
          const byId = new Map(s.options.map((o) => [o.id, o]));
          const order = s.optionOrder?.length ? s.optionOrder : s.options.map((o) => o.id);
          return (
            <Card
              key={i}
              className={cn("border-l-4", s.correct ? "border-l-[var(--success)]" : "border-l-destructive")}
            >
              <CardContent className="space-y-3 py-4">
                <p className="font-medium">
                  <span className="mr-2 text-muted-foreground tabular-nums">{i + 1}.</span>
                  {htmlToText(s.text)}
                </p>
                {image && (
                  <div className="flex justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt="" className="max-h-40 rounded-md border object-contain" />
                  </div>
                )}
                <div className="grid gap-1.5">
                  {order.map((oid) => {
                    const o = byId.get(oid);
                    if (!o) return null;
                    const isCorrect = oid === s.correctAnswer;
                    const isUser = oid === s.userAnswer;
                    return (
                      <div
                        key={oid}
                        className={cn(
                          "flex items-start gap-2 rounded-md border px-3 py-2 text-sm",
                          isCorrect && "border-[var(--success)] bg-[var(--success)]/10",
                          isUser && !isCorrect && "border-destructive bg-destructive/10",
                          !isCorrect && !isUser && "opacity-70"
                        )}
                      >
                        <span className="font-bold">{oid}</span>
                        <span className="flex-1">{htmlToText(o.text)}</span>
                        {isCorrect && <span className="text-xs font-medium text-[var(--success)]">{t("correctAnswer")}</span>}
                        {isUser && !isCorrect && <span className="text-xs font-medium text-destructive">{t("yourAnswer")}</span>}
                      </div>
                    );
                  })}
                </div>
                {!s.userAnswer && <p className="text-xs italic text-muted-foreground">{t("noAnswer")}</p>}
                {s.explanation && htmlToText(s.explanation) && (
                  <div className="rounded-md bg-muted/60 p-3 text-sm">
                    <p className="mb-1 font-heading text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {t("explanation")}
                    </p>
                    <p className="whitespace-pre-line">{htmlToText(s.explanation)}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
