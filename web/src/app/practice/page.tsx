"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { startAttempt } from "@/actions/attempts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const COUNTS = [10, 20, 40];
const CATEGORIES = ["all", "general", "signs"] as const;
const FOCUSES = ["all", "unseen", "missed"] as const;
const REVEALS = ["immediate", "end"] as const;

function OptionRow<T extends string | number>(props: {
  label: string;
  values: readonly T[];
  labels?: Record<string, string>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{props.label}</p>
      <div className="flex flex-wrap gap-2">
        {props.values.map((v) => (
          <button
            key={String(v)}
            type="button"
            onClick={() => props.onChange(v)}
            className={cn(
              "press rounded-full border-2 px-4 py-1.5 text-sm font-medium hover:bg-accent",
              props.value === v
                ? "border-primary bg-primary text-primary-foreground hover:bg-primary"
                : "border-border"
            )}
          >
            {props.labels?.[String(v)] ?? String(v)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PracticePage() {
  const t = useTranslations("practice");
  const tc = useTranslations("common");
  const [pending, startTransition] = useTransition();
  const [count, setCount] = useState<number>(10);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("all");
  const [focus, setFocus] = useState<(typeof FOCUSES)[number]>("all");
  const [reveal, setReveal] = useState<(typeof REVEALS)[number]>("immediate");

  function start() {
    startTransition(async () => {
      const res = await startAttempt({
        mode: "practice",
        count,
        categories: category === "all" ? [] : [category],
        focus,
        reveal,
      });
      if (res && !res.ok) {
        toast.error(res.error === "no_missed" ? t("noMissed") : res.error === "no_questions" ? t("noQuestions") : tc("error"));
      }
    });
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl">{t("title")}</CardTitle>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <OptionRow label={t("count")} values={COUNTS} value={count} onChange={setCount} />
          <OptionRow
            label={t("category")}
            values={CATEGORIES}
            labels={{ all: t("catAll"), general: t("catGeneral"), signs: t("catSigns") }}
            value={category}
            onChange={setCategory}
          />
          <OptionRow
            label={t("focus")}
            values={FOCUSES}
            labels={{ all: t("focusAll"), unseen: t("focusUnseen"), missed: t("focusMissed") }}
            value={focus}
            onChange={setFocus}
          />
          <OptionRow
            label={t("reveal")}
            values={REVEALS}
            labels={{ immediate: t("revealImmediate"), end: t("revealEnd") }}
            value={reveal}
            onChange={setReveal}
          />
          <Button className="w-full" size="lg" disabled={pending} onClick={start}>
            {t("start")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
