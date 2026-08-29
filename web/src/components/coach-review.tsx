"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Markdown } from "@/components/markdown";
import { Spinner } from "@/components/spinner";
import { SkeletonText } from "@/components/ui/skeleton";

function CoachIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2a5 5 0 0 1 5 5c0 2-1 3-1 5H8c0-2-1-3-1-5a5 5 0 0 1 5-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 17h6M10 20h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function CoachReview({ attemptId, allCorrect }: { attemptId: string; allCorrect: boolean }) {
  const t = useTranslations("coach");
  const [loading, setLoading] = useState(false);
  const [coaching, setCoaching] = useState<string | null>(null);

  async function getCoaching() {
    setLoading(true);
    try {
      const res = await fetch("/api/coach/review", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ attemptId }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        toast.error(
          body.error === "no_api_key"
            ? t("unavailable")
            : body.error === "rate_limited"
            ? t("rateLimited")
            : t("error")
        );
        setLoading(false);
        return;
      }
      const data = await res.json();
      setCoaching(data.coaching);
    } catch {
      toast.error(t("error"));
    }
    setLoading(false);
  }

  return (
    <Card className="border-[var(--study)]/35 bg-[var(--study)]/[0.05]">
      <CardContent className="space-y-3 py-5">
        <div className="flex items-center gap-2 text-[var(--study)]">
          <CoachIcon />
          <h2 className="font-heading text-base font-semibold">{t("title")}</h2>
        </div>

        {coaching ? (
          <Markdown className="text-sm leading-relaxed text-foreground">{coaching}</Markdown>
        ) : loading ? (
          // The coach writes a few paragraphs, so stand in with the shape of them.
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-sm text-[var(--study)]">
              <Spinner className="size-3.5" />
              {t("thinking")}
            </p>
            <SkeletonText lines={3} />
            <SkeletonText lines={2} />
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">{allCorrect ? t("introPerfect") : t("intro")}</p>
            <Button onClick={getCoaching} disabled={loading} size="sm" className="press">
              {t("ask")}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
