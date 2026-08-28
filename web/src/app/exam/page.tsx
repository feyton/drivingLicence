import { getTranslations } from "next-intl/server";
import { startAttempt } from "@/actions/attempts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ExamIntroPage() {
  const t = await getTranslations("exam");

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl">{t("title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="mb-3 font-heading font-semibold">{t("rulesTitle")}</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[t("rule1"), t("rule2"), t("rule3"), t("rule4")].map((rule, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          <form
            action={async () => {
              "use server";
              await startAttempt({ mode: "exam", categories: [], focus: "all" });
            }}
          >
            <Button className="w-full" size="lg" type="submit">
              {t("start")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
