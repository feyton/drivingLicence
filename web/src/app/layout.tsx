import type { Metadata } from "next";
import { Lexend, Lato } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const lexend = Lexend({ variable: "--font-lexend", subsets: ["latin"] });
const lato = Lato({ variable: "--font-lato", weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Tsinda Provisoire", template: "%s · Tsinda Provisoire" },
  description:
    "Itoze ikizamini cya provisoire: ibibazo by'amategeko y'umuhanda n'ibyapa, ibizamini bimeze nk'ibya nyabyo, n'isuzuma ry'aho ugeze.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${lexend.variable} ${lato.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Toaster position="top-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
