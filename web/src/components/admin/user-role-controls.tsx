"use client";

import { useTransition } from "react";
import { changeUserRole, setUserActive } from "@/actions/admin";
import { Button } from "@/components/ui/button";

export function UserRoleControls({ userId, role, active }: { userId: string; role: string; active: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <select
        className="h-8 rounded-md border bg-background px-1.5 text-xs"
        value={role}
        disabled={pending}
        onChange={(e) =>
          startTransition(() => changeUserRole(userId, e.target.value as "user" | "editor" | "admin"))
        }
      >
        <option value="user">user</option>
        <option value="editor">editor</option>
        <option value="admin">admin</option>
      </select>
      <Button
        variant={active ? "outline" : "secondary"}
        size="sm"
        disabled={pending}
        onClick={() => startTransition(() => setUserActive(userId, !active))}
      >
        {active ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
}
