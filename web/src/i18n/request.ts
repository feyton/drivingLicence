import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export const LOCALES = ["rw", "en", "fr"] as const;
export const DEFAULT_LOCALE = "rw";

export default getRequestConfig(async () => {
  const store = await cookies();
  const cookieLocale = store.get("locale")?.value;
  const locale = LOCALES.includes(cookieLocale as (typeof LOCALES)[number])
    ? (cookieLocale as string)
    : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
