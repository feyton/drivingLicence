"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { recordAnswer, submitAttempt, type AnswerResult } from "@/actions/attempts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Markdown } from "@/components/markdown";
import { cn } from "@/lib/utils";

type PlayerQuestion = {
  index: number;
  text: string;
  image: string | null;
  options: { id: string; text: string }[];
  answer: string | null;
};

type Feedback = { correct: boolean; correctAnswer: string; explanation: string; whyWrong: string | null };

export function SessionPlayer(props: {
  attemptId: string;
  mode: "exam" | "practice";
  reveal: "immediate" | "end";
  questions: PlayerQuestion[];
  expiresAt: string | null;
}) {
  const t = useTranslations();
  const { attemptId, mode, reveal, questions, expiresAt } = props;
  const revealImmediate = reveal === "immediate";

  const [current, setCurrent] = useState(() => {
    const firstUnanswered = questions.findIndex((q) => !q.answer);
    return firstUnanswered === -1 ? 0 : firstUnanswered;
  });
  const [answers, setAnswers] = useState<Record<number, string>>(() =>
    Object.fromEntries(questions.filter((q) => q.answer).map((q) => [q.index, q.answer as string]))
  );
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [pending, startTransition] = useTransition();
  const submittingRef = useRef(false);

  const q = questions[current];
  const answeredCount = Object.keys(answers).length;

  const doSubmit = useCallback(() => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    startTransition(async () => {
      const res = await submitAttempt(attemptId);
      // submitAttempt redirects on success; reaching here means an error
      if (res && !res.ok) {
        submittingRef.current = false;
        toast.error(t("common.error"));
      }
    });
  }, [attemptId, t]);

  // ---- exam countdown ----
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    if (!expiresAt) return;
    const end = new Date(expiresAt).getTime();
    const tick = () => {
      const left = Math.max(0, Math.floor((end - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) {
        toast.info(t("exam.expired"));
        doSubmit();
      }
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, [expiresAt, doSubmit, t]);

  function choose(optionId: string) {
    if (pending || (revealImmediate && feedback)) return;
    setAnswers((a) => ({ ...a, [q.index]: optionId }));
    startTransition(async () => {
      const res: AnswerResult = await recordAnswer({ attemptId, index: q.index, optionId });
      if (!res.ok) {
        if (res.error === "expired") doSubmit();
        else toast.error(t("common.error"));
        return;
      }
      if (res.feedback) setFeedback(res.feedback);
    });
  }

  function next() {
    setFeedback(null);
    if (current < questions.length - 1) setCurrent(current + 1);
  }

  const isLast = current === questions.length - 1;
  const chosen = answers[q.index];
  const timeStr = useMemo(() => {
    if (remaining === null) return null;
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, [remaining]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-6">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <span
            className={cn(
              "chip",
              mode === "exam"
                ? "bg-primary/12 text-primary"
                : "bg-[var(--study)]/12 text-[var(--study)]"
            )}
          >
            {mode === "exam" ? t("session.examLabel") : t("session.practiceLabel")}
          </span>
          <span className="numeral text-foreground">
            {current + 1}
            <span className="text-muted-foreground">/{questions.length}</span>
          </span>
        </span>
        {timeStr && (
          <span
            className={cn(
              "numeral rounded-lg border px-3 py-1.5 text-base font-semibold",
              remaining !== null && remaining <= 120
                ? "border-destructive bg-destructive/10 text-destructive"
                : "border-border bg-card text-foreground"
            )}
            aria-label={t("exam.timeLeft")}
          >
            {timeStr}
          </span>
        )}
      </div>

      <Progress value={((current + 1) / questions.length) * 100} className="h-1.5" />

      <Card>
        <CardContent className="space-y-4 py-5">
          <h1 className="text-pretty font-heading text-lg font-semibold leading-snug">{q.text}</h1>
          {q.image && (
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={q.image} alt="" className="max-h-48 rounded-md border object-contain" />
            </div>
          )}
          <div className="grid gap-2" role="radiogroup">
            {q.options.map((o) => {
              const isChosen = chosen === o.id;
              const showCorrect = feedback && o.id === feedback.correctAnswer;
              const showWrong = feedback && isChosen && !feedback.correct;
              return (
                <button
                  key={o.id}
                  role="radio"
                  aria-checked={isChosen}
                  disabled={pending && !isChosen}
                  onClick={() => choose(o.id)}
                  className={cn(
                    "press flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-[0.95rem] leading-snug",
                    "hover:border-primary/50 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    isChosen && !feedback && "border-primary bg-primary/10",
                    showCorrect && "border-[var(--success)] bg-[var(--success)]/12",
                    showWrong && "border-destructive bg-destructive/12",
                    !isChosen && !showCorrect && !showWrong && "border-border"
                  )}
                >
                  <span
                    className={cn(
                      "numeral flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[0.82rem] font-semibold transition-colors",
                      !isChosen && !feedback && "border-border bg-muted text-muted-foreground",
                      isChosen && !feedback && "border-primary bg-primary text-primary-foreground",
                      showCorrect && "border-[var(--success)] bg-[var(--success)] text-white",
                      showWrong && "border-destructive bg-destructive text-white"
                    )}
                  >
                    {o.id}
                  </span>
                  <span className="flex-1">{o.text}</span>
                  {showCorrect && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {feedback && (
            <div
              className={cn(
                "rounded-lg border p-4 text-sm",
                feedback.correct
                  ? "border-[var(--success)]/40 bg-[var(--success)]/5"
                  : "border-destructive/40 bg-destructive/5"
              )}
            >
              <p className="font-heading font-semibold">
                {feedback.correct ? t("session.correct") : t("session.wrong")}
              </p>
              {feedback.whyWrong && (
                <Markdown className="mt-1 text-destructive">{feedback.whyWrong}</Markdown>
              )}
              {feedback.explanation && (
                <Markdown className="mt-1 text-muted-foreground">{feedback.explanation}</Markdown>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-3">
        {!revealImmediate ? (
          <>
            <Button variant="ghost" disabled={current === 0} onClick={() => setCurrent(current - 1)}>
              {t("exam.back")}
            </Button>
            <span className="text-xs text-muted-foreground tabular-nums">
              {questions.length - answeredCount > 0 && `${questions.length - answeredCount} ${t("exam.unanswered")}`}
            </span>
            {isLast ? (
              <Button
                disabled={pending}
                onClick={() => {
                  if (answeredCount < questions.length && !window.confirm(t("exam.confirmSubmit"))) return;
                  doSubmit();
                }}
              >
                {t("exam.submit")}
              </Button>
            ) : (
              <Button variant="secondary" disabled={!chosen} onClick={next}>
                {t("exam.next")}
              </Button>
            )}
          </>
        ) : (
          <>
            <span />
            {feedback &&
              (isLast ? (
                <Button disabled={pending} onClick={doSubmit}>
                  {t("session.finish")}
                </Button>
              ) : (
                <Button onClick={next}>{t("session.continue")}</Button>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
