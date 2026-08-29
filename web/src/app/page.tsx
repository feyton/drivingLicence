import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { dbConnect } from "@/lib/db";
import { Question } from "@/lib/models/Question";
import { User } from "@/lib/models/User";
import { Attempt } from "@/lib/models/Attempt";
import { Button } from "@/components/ui/button";

export const revalidate = 300;

async function getCounts() {
  try {
    await dbConnect();
    const [questions, learners, exams] = await Promise.all([
      Question.countDocuments({ approved: true, active: true }),
      User.countDocuments({ active: true }),
      Attempt.countDocuments({ submittedAt: { $ne: null } }),
    ]);
    return { questions, learners, exams };
  } catch {
    return { questions: 0, learners: 0, exams: 0 };
  }
}

export default async function LandingPage() {
  const [t, counts] = await Promise.all([getTranslations("landing"), getCounts()]);

  const stats = [
    { n: counts.questions, label: t("statsQuestions"), tone: "primary" },
    { n: counts.learners, label: t("statsLearners"), tone: "signal" },
    { n: counts.exams, label: t("statsExams"), tone: "success" },
  ] as const;

  const features = [
    { title: t("featureExamTitle"), body: t("featureExamBody"), tone: "primary" },
    { title: t("featurePracticeTitle"), body: t("featurePracticeBody"), tone: "study" },
    { title: t("featureTrackTitle"), body: t("featureTrackBody"), tone: "success" },
  ] as const;

  const toneBg: Record<string, string> = {
    primary: "bg-primary",
    signal: "bg-[var(--signal)]",
    success: "bg-[var(--success)]",
    study: "bg-[var(--study)]",
  };
  const toneText: Record<string, string> = {
    primary: "text-primary",
    signal: "text-[var(--warning)]",
    success: "text-[var(--success)]",
    study: "text-[var(--study)]",
  };

  return (
    <div className="mx-auto max-w-5xl px-4">
      {/* Hero: the type is the design. */}
      <section className="py-14 md:py-20">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--signal)]/15 px-3 py-1 text-xs font-semibold text-[var(--warning)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal)]" />
          Provisoire · Amategeko y'Umuhanda
        </p>
        <h1 className="max-w-3xl font-heading text-[clamp(2.4rem,7vw,4.25rem)] font-extrabold leading-[0.98]">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-lg text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" className="press h-11 px-6 text-base" render={<Link href="/exam" />}>
            {t("ctaExam")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="press h-11 px-6 text-base"
            render={<Link href="/practice" />}
          >
            {t("ctaPractice")}
          </Button>
        </div>
      </section>

      {/* Stats — big numerals, each with its own hue. */}
      <section className="grid grid-cols-3 gap-3 pb-14">
        {stats.map((s) => (
          <div
            key={s.label}
            className="relative overflow-hidden rounded-2xl border bg-card p-4 md:p-5"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <span className={`absolute inset-x-0 top-0 h-1 ${toneBg[s.tone]}`} />
            <div className={`numeral text-3xl font-semibold md:text-4xl ${toneText[s.tone]}`}>{s.n}</div>
            <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="grid gap-4 pb-24 md:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border bg-card p-5"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <span className={`mb-3 block h-1.5 w-10 rounded-full ${toneBg[f.tone]}`} />
            <h2 className="font-heading text-lg font-bold">{f.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
