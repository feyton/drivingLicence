// Near-duplicate detection — same normalization + token Jaccard used by the
// import pipeline, so the admin panel and bulk imports agree on what "duplicate" means.
export function normalizeText(s: string | null | undefined): string {
  return String(s ?? "")
    .replace(/<[^>]*>/g, " ")
    .normalize("NFC")
    .toLowerCase()
    .replace(/[‘’ʼ`]/g, "'")
    .replace(/[^\p{L}\p{N}' ]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenSet(s: string): Set<string> {
  return new Set(normalizeText(s).split(" ").filter(Boolean));
}

export function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
}

export function questionKey(text: string, options: { text: string }[]): {
  stem: Set<string>;
  full: Set<string>;
  norm: string;
} {
  const optText = options.map((o) => o.text).sort().join(" ");
  return {
    stem: tokenSet(text),
    full: tokenSet(normalizeText(text) + " " + normalizeText(optText)),
    norm: normalizeText(text) + "||" + normalizeText(optText),
  };
}

export function isNearDuplicate(
  a: ReturnType<typeof questionKey>,
  b: ReturnType<typeof questionKey>,
  threshold = 0.85
): { dup: boolean; sim: number } {
  if (a.norm === b.norm) return { dup: true, sim: 1 };
  const simStem = jaccard(a.stem, b.stem);
  if (simStem < 0.5) return { dup: false, sim: simStem };
  const simFull = jaccard(a.full, b.full);
  return { dup: simFull >= threshold || (simStem >= 0.92 && simFull >= 0.7), sim: simFull };
}
