"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { approveQuestion, rejectQuestion, updateQuestion, findSimilar } from "@/actions/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  text: string;
  image: string | null;
  options: { id: string; text: string }[];
  answer: string;
  explanation: string;
  category: string;
  approved: boolean;
  active: boolean;
  source: string | null;
  aiResolved: boolean;
};

type Labels = Record<
  "approve" | "reject" | "edit" | "save" | "cancel" | "similar" | "noSimilar" | "answer" | "category" | "explanation" | "source",
  string
>;

export function QuestionReviewCard({ item, labels }: { item: Item; labels: Labels }) {
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item);
  const [similar, setSimilar] = useState<{ id: string; text: string; sim: number; approved: boolean }[] | null>(null);

  function act(fn: () => Promise<unknown>) {
    startTransition(async () => {
      try {
        await fn();
      } catch {
        toast.error("Error");
      }
    });
  }

  return (
    <Card className={cn(!item.active && "opacity-60")}>
      <CardContent className="space-y-3 py-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge variant={item.approved ? "default" : "secondary"}>{item.approved ? "approved" : "pending"}</Badge>
          <Badge variant="outline">{item.category === "posts" ? "signs" : "general"}</Badge>
          {item.aiResolved && <Badge variant="outline" className="border-amber-500 text-amber-600">AI answer</Badge>}
          {item.source && (
            <span className="text-muted-foreground">
              {labels.source}: {item.source}
            </span>
          )}
        </div>

        {editing ? (
          <div className="space-y-2">
            <Textarea value={draft.text} onChange={(e) => setDraft({ ...draft, text: e.target.value })} />
            {draft.options.map((o, i) => (
              <div key={o.id} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDraft({ ...draft, answer: o.id })}
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                    draft.answer === o.id && "border-[var(--success)] bg-[var(--success)] text-white"
                  )}
                  title={labels.answer}
                >
                  {o.id}
                </button>
                <Input
                  value={o.text}
                  onChange={(e) => {
                    const options = [...draft.options];
                    options[i] = { ...o, text: e.target.value };
                    setDraft({ ...draft, options });
                  }}
                />
              </div>
            ))}
            <Textarea
              placeholder={labels.explanation}
              value={draft.explanation}
              onChange={(e) => setDraft({ ...draft, explanation: e.target.value })}
            />
            <div className="flex gap-2">
              <select
                className="h-9 rounded-md border bg-background px-2 text-sm"
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              >
                <option value="general">general</option>
                <option value="posts">signs</option>
              </select>
              <Button
                size="sm"
                disabled={pending}
                onClick={() =>
                  act(async () => {
                    const res = await updateQuestion({
                      id: draft.id,
                      text: draft.text,
                      options: draft.options,
                      answer: draft.answer,
                      explanation: draft.explanation,
                      category: draft.category as "general" | "posts",
                    });
                    if (res && !res.ok) toast.error(res.error);
                    else setEditing(false);
                  })
                }
              >
                {labels.save}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => { setDraft(item); setEditing(false); }}>
                {labels.cancel}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p className="font-medium">{item.text}</p>
            {item.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt="" className="max-h-36 rounded border object-contain" />
            )}
            <div className="grid gap-1">
              {item.options.map((o) => (
                <div
                  key={o.id}
                  className={cn(
                    "flex items-start gap-2 rounded border px-3 py-1.5 text-sm",
                    o.id === item.answer && "border-[var(--success)] bg-[var(--success)]/10 font-medium"
                  )}
                >
                  <span className="font-bold">{o.id}</span>
                  <span>{o.text}</span>
                </div>
              ))}
            </div>
            {item.explanation && <p className="text-sm text-muted-foreground">{item.explanation}</p>}
          </>
        )}

        {similar !== null && (
          <div className="rounded-md border bg-muted/40 p-3 text-sm">
            {similar.length === 0 ? (
              <p className="text-muted-foreground">{labels.noSimilar}</p>
            ) : (
              <ul className="space-y-1">
                {similar.map((s) => (
                  <li key={s.id} className="flex items-start gap-2">
                    <Badge variant={s.approved ? "default" : "secondary"} className="tabular-nums">
                      {(s.sim * 100).toFixed(0)}%
                    </Badge>
                    <span>{s.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {!editing && (
          <div className="flex flex-wrap gap-2 pt-1">
            {!item.approved && item.active && (
              <Button size="sm" disabled={pending} onClick={() => act(() => approveQuestion(item.id))}>
                {labels.approve}
              </Button>
            )}
            {item.active && (
              <Button size="sm" variant="destructive" disabled={pending} onClick={() => act(() => rejectQuestion(item.id))}>
                {labels.reject}
              </Button>
            )}
            <Button size="sm" variant="outline" disabled={pending} onClick={() => setEditing(true)}>
              {labels.edit}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              disabled={pending}
              onClick={() =>
                act(async () => {
                  const res = await findSimilar(item.id);
                  if (res.ok) setSimilar(res.hits);
                })
              }
            >
              {labels.similar}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
