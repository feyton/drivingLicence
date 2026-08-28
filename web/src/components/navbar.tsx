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
        <Link href="/" className="mr-auto flex items-center gap-2 font-heading font-semibold text-primary">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.2" />
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          {t("appName")}
        </Link>

        {user ? (
          <nav className="flex items-center gap-1 text-sm">
            <Button variant="ghost" size="sm" render={<Link href="/practice" />}>
              {t("practice")}
            </Button>
            <Button variant="ghost" size="sm" render={<Link href="/exam" />}>
              {t("exam")}
            </Button>
            <Button variant="ghost" size="sm" render={<Link href="/profile" />}>
              {t("profile")}
            </Button>
            {ADMIN_ROLES.includes(user.role) && (
              <Button variant="ghost" size="sm" render={<Link href="/admin/questions" />}>
                {t("admin")}
              </Button>
            )}
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
