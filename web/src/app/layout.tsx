import type { Metadata } from "next";
import { Lexend, Lato } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import { BottomNav } from "@/components/bottom-nav";
import "./globals.css";

const ADMIN_ROLES = ["editor", "admin", "super"];

const lexend = Lexend({ variable: "--font-lexend", subsets: ["latin"] });
const lato = Lato({ variable: "--font-lato", weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Tsinda Provisoire", template: "%s · Tsinda Provisoire" },
  description:
    "Itoze ikizamini cya provisoire: ibibazo by'amategeko y'umuhanda n'ibyapa, ibizamini bimeze nk'ibya nyabyo, n'isuzuma ry'aho ugeze.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [locale, messages, session] = await Promise.all([getLocale(), getMessages(), auth()]);
  const user = session?.user;
  const isAdmin = !!user && ADMIN_ROLES.includes(user.role);

  return (
    <html lang={locale} className={`${lexend.variable} ${lato.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className={`flex-1 ${user ? "has-bottom-nav" : ""}`}>{children}</main>
          {user && <BottomNav isAdmin={isAdmin} />}
          <Toaster position="top-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
