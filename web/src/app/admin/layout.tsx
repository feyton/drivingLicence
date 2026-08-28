import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";

const REVIEWER_ROLES = ["editor", "admin", "super"];

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const session = await auth();
  if (!session?.user || !REVIEWER_ROLES.includes(session.user.role)) redirect("/");
  const t = await getTranslations("admin");

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 flex flex-wrap items-center gap-4 border-b pb-3">
        <h1 className="font-heading text-xl font-bold">{t("title")}</h1>
        <nav className="flex gap-3 text-sm">
          <Link className="text-muted-foreground hover:text-foreground" href="/admin/questions">
            {t("allQuestions")}
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" href="/admin/users">
            {t("users")}
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" href="/admin/extract">
            {t("extract")}
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
}
