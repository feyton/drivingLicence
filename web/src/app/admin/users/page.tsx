import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { User } from "@/lib/models/User";
import { UserRoleControls } from "@/components/admin/user-role-controls";
import { Badge } from "@/components/ui/badge";

export default async function AdminUsersPage({ searchParams }: PageProps<"/admin/users">) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const session = await auth();
  const canManage = ["admin", "super"].includes(session?.user?.role ?? "");

  const t = await getTranslations("admin");
  await dbConnect();

  const filter = q
    ? { $or: [{ name: { $regex: q, $options: "i" } }, { email: { $regex: q, $options: "i" } }] }
    : {};
  const users = await User.find(filter).sort({ createdAt: -1 }).limit(100).select("name email role active createdAt");

  return (
    <div className="space-y-3">
      <form className="flex gap-2" action="/admin/users">
        <input
          name="q"
          defaultValue={q}
          placeholder={t("search")}
          className="h-9 w-64 rounded-md border bg-background px-3 text-sm"
        />
      </form>
      <div className="divide-y rounded-lg border">
        {users.map((u) => (
          <div key={u._id.toString()} className="flex flex-wrap items-center gap-3 px-4 py-2.5 text-sm">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{u.name}</p>
              <p className="truncate text-xs text-muted-foreground">{u.email}</p>
            </div>
            <Badge variant={u.role === "user" ? "secondary" : "default"}>{u.role}</Badge>
            {!u.active && <Badge variant="destructive">inactive</Badge>}
            {canManage && u.role !== "super" && (
              <UserRoleControls userId={u._id.toString()} role={u.role} active={u.active} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
