import corpus from "@/data/coaching-corpus.json";

type Entry = { q: string; a: string; cat: string; src: string };
const ENTRIES: Entry[] = (corpus as { entries: Entry[] }).entries;

const STOP = new Set([
  "na", "no", "mu", "ku", "ni", "cyangwa", "iyo", "ku", "bya", "by", "y", "yo", "za", "wa", "wo",
  "the", "a", "of", "is", "in", "to", "and", "or", "cy", "ry", "n", "ba", "bi", "ibi", "aya", "uyu",
]);

function terms(s: string): string[] {
  return String(s || "")
    .toLowerCase()
    .replace(/[‘’ʼ`]/g, "'")
    .replace(/[^\p{L}\p{N}' ]+/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP.has(w));
}

// Lightweight retrieval: term-overlap score over the corpus (760 entries).
export function retrieve(query: string, k = 12, category?: string): Entry[] {
  const qt = new Set(terms(query));
  if (qt.size === 0) return [];
  const scored = ENTRIES.map((e) => {
    if (category && category !== "all" && e.cat !== category) return { e, s: 0 };
    const et = terms(e.q + " " + e.a);
    let s = 0;
    const seen = new Set<string>();
    for (const t of et) {
      if (qt.has(t) && !seen.has(t)) {
        s += 1;
        seen.add(t);
      }
    }
    return { e, s };
  });
  return scored
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, k)
    .map((x) => x.e);
}

export function retrieveForQuestions(questions: string[], k = 12): Entry[] {
  return retrieve(questions.join(" "), k);
}

export function formatGrounding(entries: Entry[]): string {
  if (!entries.length) return "(nta nyandiko z'inyongera zibonetse)";
  return entries.map((e, i) => `[${i + 1}] Q: ${e.q}\n    A: ${e.a}`).join("\n");
}

export const CORPUS_SIZE = ENTRIES.length;
