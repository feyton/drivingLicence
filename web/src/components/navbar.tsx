import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/locale-switcher";

const ADMIN_ROLES = ["editor", "admin", "super"];

export async function Navbar() {
  const [t, session] = await Promise.all([getTranslations("nav"), auth()]);
  const user = session?.user;

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4">
        <Link href="/" className="mr-auto flex items-center" aria-label={t("appName")}>
          {/* Original DRIVETEST logo (white wordmark); inverted in light mode so it reads on both themes. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt={t("appName")} className="h-7 w-auto invert dark:invert-0" />
        </Link>

        {user ? (
          <nav className="flex items-center gap-1 text-sm">
            {/* On phones these live in the bottom tab bar. */}
            <div className="hidden items-center gap-1 md:flex">
              <Button variant="ghost" size="sm" render={<Link href="/practice" />}>
                {t("practice")}
              </Button>
              <Button variant="ghost" size="sm" render={<Link href="/exam" />}>
                {t("exam")}
              </Button>
              <Button variant="ghost" size="sm" render={<Link href="/coach" />}>
                {t("coach")}
              </Button>
              <Button variant="ghost" size="sm" render={<Link href="/igazeti" />}>
                {t("igazeti")}
              </Button>
              <Button variant="ghost" size="sm" render={<Link href="/profile" />}>
                {t("profile")}
              </Button>
              {ADMIN_ROLES.includes(user.role) && (
                <Button variant="ghost" size="sm" render={<Link href="/admin/questions" />}>
                  {t("admin")}
                </Button>
              )}
            </div>
            <LocaleSwitcher />
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button variant="outline" size="sm" type="submit">
                {t("signOut")}
              </Button>
            </form>
          </nav>
        ) : (
          <nav className="flex items-center gap-2">
            <LocaleSwitcher />
            <Button variant="ghost" size="sm" render={<Link href="/login" />}>
              {t("signIn")}
            </Button>
            <Button size="sm" render={<Link href="/register" />}>
              {t("register")}
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
