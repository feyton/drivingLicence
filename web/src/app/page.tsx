import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { dbConnect } from "@/lib/db";
import { Question } from "@/lib/models/Question";
import { User } from "@/lib/models/User";
import { Attempt } from "@/lib/models/Attempt";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

  const features = [
    { title: t("featureExamTitle"), body: t("featureExamBody") },
    { title: t("featurePracticeTitle"), body: t("featurePracticeBody") },
    { title: t("featureTrackTitle"), body: t("featureTrackBody") },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4">
      <section className="flex flex-col items-center gap-6 py-16 text-center md:py-24">
        <h1 className="max-w-2xl text-balance font-heading text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="max-w-xl text-pretty text-lg text-muted-foreground">{t("subtitle")}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" render={<Link href="/exam" />}>
            {t("ctaExam")}
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/practice" />}>
            {t("ctaPractice")}
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3 pb-12">
        {[
          [counts.questions, t("statsQuestions")],
          [counts.learners, t("statsLearners")],
          [counts.exams, t("statsExams")],
        ].map(([n, label]) => (
          <Card key={String(label)}>
            <CardContent className="flex flex-col items-center gap-1 py-5">
              <span className="font-heading text-3xl font-bold tabular-nums text-primary">{String(n)}</span>
              <span className="text-center text-sm text-muted-foreground">{String(label)}</span>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 pb-20 md:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title}>
            <CardContent className="space-y-2 py-5">
              <h2 className="font-heading font-semibold">{f.title}</h2>
              <p className="text-sm text-muted-foreground">{f.body}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
