"use client";

import { useState } from "react";
import { toast } from "sonner";
import { importQuestions } from "@/actions/import";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Extracted = {
  text: string;
  options: { id: string; text: string }[];
  answer: string | null;
  answerSource: "key" | "inline" | null;
  explanation: string | null;
  category: "general" | "signs";
  needsImage: boolean;
  duplicate: boolean;
  similarity: number;
};

type Stats = { extracted: number; duplicates: number; withAnswer: number; needImage: number };

export default function AdminExtractPage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<Extracted[] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [sourceName, setSourceName] = useState("");

  async function runExtraction() {
    setBusy(true);
    setResults(null);
    try {
      const form = new FormData();
      if (file) {
        form.set("file", file);
        setSourceName(file.name);
      } else if (text.trim()) {
        form.set("text", text);
        setSourceName("pasted-text");
      } else {
        toast.error("Add a PDF or paste text first.");
        setBusy(false);
        return;
      }
      const res = await fetch("/api/admin/extract", { method: "POST", body: form });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        toast.error(body.error === "no_api_key" ? "ANTHROPIC_API_KEY is not configured on the server." : `Extraction failed (${res.status})`);
        setBusy(false);
        return;
      }
      const data = await res.json();
      setResults(data.questions);
      setStats(data.stats);
    } catch {
      toast.error("Extraction failed.");
    }
    setBusy(false);
  }

  async function saveAll() {
    if (!results) return;
    const importable = results.filter((q) => !q.duplicate && !q.needsImage && q.answer);
    if (!importable.length) {
      toast.error("Nothing importable (all duplicates, missing answers, or need images).");
      return;
    }
    setBusy(true);
    const res = await importQuestions({
      source: sourceName || "admin-extract",
      questions: importable.map((q) => ({
        text: q.text,
        options: q.options,
        answer: q.answer as string,
        explanation: q.explanation,
        category: q.category,
      })),
    });
    setBusy(false);
    if (res.ok) {
      toast.success(`Imported ${res.inserted} questions into the review queue (${res.batch}).`);
      setResults(null);
      setStats(null);
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">AI question extraction</CardTitle>
          <p className="text-sm text-muted-foreground">
            Upload a PDF (or paste text) of exam questions. Claude extracts structured questions, flags
            near-duplicates already in the bank, and everything you import lands in the review queue —
            nothing goes live without approval.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <input
            type="file"
            accept=".pdf,.txt"
            className="block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <Textarea
            placeholder="…or paste question text here"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={runExtraction} disabled={busy}>
            {busy ? "Extracting…" : "Extract questions"}
          </Button>
        </CardContent>
      </Card>

      {stats && (
        <div className="flex flex-wrap gap-2 text-sm">
          <Badge variant="secondary">extracted: {stats.extracted}</Badge>
          <Badge variant="secondary">with answer: {stats.withAnswer}</Badge>
          <Badge variant={stats.duplicates ? "destructive" : "secondary"}>duplicates: {stats.duplicates}</Badge>
          <Badge variant="outline">need image: {stats.needImage}</Badge>
        </div>
      )}

      {results && (
        <>
          <Button onClick={saveAll} disabled={busy}>
            Import non-duplicates with answers → review queue
          </Button>
          <div className="space-y-3">
            {results.map((q, i) => (
              <Card key={i} className={cn(q.duplicate && "border-destructive/50 opacity-70")}>
                <CardContent className="space-y-2 py-3 text-sm">
                  <div className="flex flex-wrap gap-2">
                    {q.duplicate && <Badge variant="destructive">duplicate {(q.similarity * 100).toFixed(0)}%</Badge>}
                    {!q.answer && <Badge variant="outline">no answer</Badge>}
                    {q.needsImage && <Badge variant="outline">needs image</Badge>}
                    <Badge variant="secondary">{q.category}</Badge>
                  </div>
                  <p className="font-medium">{q.text}</p>
                  <div className="grid gap-1">
                    {q.options.map((o) => (
                      <div
                        key={o.id}
                        className={cn(
                          "rounded border px-2 py-1",
                          o.id === q.answer && "border-[var(--success)] bg-[var(--success)]/10 font-medium"
                        )}
                      >
                        <span className="mr-1.5 font-bold">{o.id}</span>
                        {o.text}
                      </div>
                    ))}
                  </div>
                  {q.explanation && <p className="text-muted-foreground">{q.explanation}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
