"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STATUSES = ["pending", "approved", "rejected"] as const;
const CATEGORIES = ["all", "general", "posts"] as const;

export function AdminQuestionFilters(props: {
  status: string;
  category: string;
  q: string;
  total: number;
  page: number;
  pageSize: number;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [search, setSearch] = useState(props.q);
  const pages = Math.max(1, Math.ceil(props.total / props.pageSize));

  function update(patch: Record<string, string>) {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    if (!("page" in patch)) next.delete("page");
    router.push(`/admin/questions?${next.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {STATUSES.map((s) => (
        <button
          key={s}
          onClick={() => update({ status: s })}
          className={cn(
            "rounded-full border px-3 py-1 text-sm capitalize hover:bg-accent",
            props.status === s && "border-primary bg-primary text-primary-foreground hover:bg-primary"
          )}
        >
          {s}
        </button>
      ))}
      <span className="mx-1 text-muted-foreground">·</span>
      {CATEGORIES.map((c) => (
        <button
          key={c}
          onClick={() => update({ category: c })}
          className={cn(
            "rounded-full border px-3 py-1 text-sm capitalize hover:bg-accent",
            props.category === c && "border-primary bg-primary text-primary-foreground hover:bg-primary"
          )}
        >
          {c === "posts" ? "signs" : c}
        </button>
      ))}
      <form
        className="ml-auto flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          update({ q: search });
        }}
      >
        <Input className="h-8 w-44" placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </form>
      <span className="text-sm tabular-nums text-muted-foreground">{props.total}</span>
      {pages > 1 && (
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" disabled={props.page <= 1} onClick={() => update({ page: String(props.page - 1) })}>
            ‹
          </Button>
          <span className="text-xs tabular-nums text-muted-foreground">
            {props.page}/{pages}
          </span>
          <Button variant="outline" size="sm" disabled={props.page >= pages} onClick={() => update({ page: String(props.page + 1) })}>
            ›
          </Button>
        </div>
      )}
    </div>
  );
}
