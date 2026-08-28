"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { setLocale } from "@/actions/locale";

const LOCALES = [
  { value: "rw", label: "RW" },
  { value: "en", label: "EN" },
  { value: "fr", label: "FR" },
];

export function LocaleSwitcher() {
  const locale = useLocale();
  const [pending, startTransition] = useTransition();

  return (
    <select
      aria-label="Language"
      className="h-8 rounded-md border bg-background px-1.5 text-sm"
      value={locale}
      disabled={pending}
      onChange={(e) => startTransition(() => setLocale(e.target.value))}
    >
      {LOCALES.map((l) => (
        <option key={l.value} value={l.value}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
