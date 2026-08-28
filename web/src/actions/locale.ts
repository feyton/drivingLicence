"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const LOCALES = ["rw", "en", "fr"];

export async function setLocale(locale: string) {
  if (!LOCALES.includes(locale)) return;
  const store = await cookies();
  store.set("locale", locale, { maxAge: 60 * 60 * 24 * 365, path: "/" });
  revalidatePath("/", "layout");
}
