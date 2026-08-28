import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Igazeti" };

export default async function IgazetiPage() {
  const t = await getTranslations("igazeti");

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] max-w-4xl flex-col px-4 py-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="font-heading text-xl font-bold">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button variant="outline" size="sm" render={<a href="/igazeti/gazette.pdf" download />}>
          {t("download")}
        </Button>
      </div>

      {/* Self-hosted PDF via the browser's native viewer (replaces the old
          third-party docdroid iframes). */}
      <object
        data="/igazeti/gazette.pdf#view=FitH"
        type="application/pdf"
        className="min-h-0 flex-1 rounded-lg border"
        aria-label={t("title")}
      >
        <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center text-sm text-muted-foreground">
          <p>{t("subtitle")}</p>
          <Button render={<a href="/igazeti/gazette.pdf" target="_blank" rel="noreferrer" />}>
            {t("download")}
          </Button>
        </div>
      </object>
    </div>
  );
}
