import Link from "next/link";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import { getTranslations, getFormatter } from "next-intl/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { Attempt } from "@/lib/models/Attempt";
import { UserQuestionStat } from "@/lib/models/UserQuestionStat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [t, format] = await Promise.all([getTranslations("profile"), getFormatter()]);

  await dbConnect();
  const [attempts, weak] = await Promise.all([
    Attempt.find({ user: session.user.id, submittedAt: { $ne: null } })
      .sort({ submittedAt: -1 })
      .limit(50)
      .select("mode score total passed submittedAt"),
    UserQuestionStat.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(session.user.id) } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$attempts" },
          correct: { $sum: "$correct" },
        },
      },
    ]),
  ]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5 px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">{session.user.name}</h1>
          <p className="text-sm text-muted-foreground">{session.user.email}</p>
        </div>
      </div>

      {weak.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm">{t("weakAreas")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {weak.map((w: { _id: string; total: number; correct: number }) => {
              const pct = w.total ? Math.round((w.correct / w.total) * 100) : 0;
              const label = w._id === "posts" ? "Ibyapa" : "Amategeko rusange";
              return (
                <div key={w._id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="tabular-nums text-muted-foreground">{pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn("h-full rounded-full", pct >= 60 ? "bg-[var(--success)]" : "bg-destructive")}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-sm">{t("history")}</CardTitle>
        </CardHeader>
        <CardContent>
          {attempts.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">{t("empty")}</p>
          ) : (
            <div className="divide-y">
              {attempts.map((a) => (
                <div key={a._id.toString()} className="flex items-center gap-3 py-2.5 text-sm">
                  <Badge variant={a.mode === "exam" ? "default" : "secondary"}>
                    {a.mode === "exam" ? t("exam") : t("practice")}
                  </Badge>
                  <span className="text-muted-foreground">
                    {format.dateTime(a.submittedAt, { dateStyle: "medium", timeStyle: "short" })}
                  </span>
                  <span className="ml-auto font-medium tabular-nums">
                    {a.score}/{a.total}
                  </span>
                  <span
                    className={cn(
                      "w-16 text-center text-xs font-semibold",
                      a.passed ? "text-[var(--success)]" : "text-destructive"
                    )}
                  >
                    {a.passed ? t("passed") : t("failed")}
                  </span>
                  <Button variant="ghost" size="sm" render={<Link href={`/results/${a._id.toString()}`} />}>
                    {t("view")}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
