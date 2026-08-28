"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { startAttempt } from "@/actions/attempts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const REVEALS = ["end", "immediate"] as const;

export default function ExamIntroPage() {
  const t = useTranslations("exam");
  const tc = useTranslations("common");
  const [pending, startTransition] = useTransition();
  const [reveal, setReveal] = useState<(typeof REVEALS)[number]>("end");

  function start() {
    startTransition(async () => {
      const res = await startAttempt({ mode: "exam", categories: [], focus: "all", reveal });
      if (res && !res.ok) toast.error(tc("error"));
    });
  }

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

          <div className="space-y-2">
            <p className="text-sm font-medium">{t("reveal")}</p>
            <div className="flex flex-wrap gap-2">
              {REVEALS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setReveal(r)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm transition-colors hover:bg-accent",
                    reveal === r && "border-primary bg-primary text-primary-foreground hover:bg-primary"
                  )}
                >
                  {r === "end" ? t("revealEnd") : t("revealImmediate")}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {reveal === "end" ? t("revealEndHint") : t("revealImmediateHint")}
            </p>
          </div>

          <Button className="w-full" size="lg" disabled={pending} onClick={start}>
            {t("start")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
