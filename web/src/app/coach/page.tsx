"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

export default function CoachChatPage() {
  const t = useTranslations("coach");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [t("s1"), t("s2"), t("s3")];

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/coach/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) {
        setMessages([...next, { role: "assistant", content: t("error") }]);
        setBusy(false);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      setMessages([...next, { role: "assistant", content: "" }]);
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
      }
    } catch {
      setMessages([...next, { role: "assistant", content: t("error") }]);
    }
    setBusy(false);
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] max-w-2xl flex-col px-4 py-4">
      <div className="mb-2">
        <h1 className="font-heading text-xl font-bold text-primary">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("chatIntro")}</p>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto py-2">
        {messages.length === 0 && (
          <div className="flex flex-col gap-2 pt-4">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-lg border px-4 py-2.5 text-left text-sm hover:bg-accent"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                m.role === "user" ? "bg-primary text-primary-foreground" : "border bg-card"
              )}
            >
              {m.content || "…"}
            </div>
          </div>
        ))}
      </div>

      <form
        className="mt-2 flex gap-2 border-t pt-3"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("placeholder")}
          disabled={busy}
        />
        <Button type="submit" disabled={busy || !input.trim()}>
          {t("send")}
        </Button>
      </form>
    </div>
  );
}
