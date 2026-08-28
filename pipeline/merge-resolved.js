// Merge AI answer-resolution results back onto parked questions and emit
// insert-ready-resolved.json (goes to the review queue flagged aiResolved).
// Usage: node merge-resolved.js
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const RESOLVE = path.join(DIR, "resolve");

const parked = JSON.parse(fs.readFileSync(path.join(DIR, "parked-no-answer.json"), "utf8"));

// Rebuild the same ref ids prep-resolve.js assigned.
const candidates = parked.filter((q) => Array.isArray(q.options) && q.options.length >= 2);
const size = 35;
const byRef = new Map();
let n = 0;
for (let i = 0; i < candidates.length; i += size) {
  n++;
  candidates.slice(i, i + size).forEach((q, j) => byRef.set(`c${n}-${j}`, q));
}

let applied = 0, skippedLow = 0, unmatched = 0;
const accepted = [];
for (const f of fs.readdirSync(RESOLVE).filter((f) => f.startsWith("resolved-") && f.endsWith(".json"))) {
  const results = JSON.parse(fs.readFileSync(path.join(RESOLVE, f), "utf8"));
  for (const r of results) {
    const q = byRef.get(r.ref);
    if (!q) { unmatched++; continue; }
    if (!r.answer || !["high", "medium"].includes(r.confidence)) { skippedLow++; continue; }
    if (!q.options.some((o) => o.id === r.answer)) { unmatched++; continue; }
    applied++;
    accepted.push({
      ...q,
      answer: r.answer,
      answerSource: "ai-resolved",
      explanation: q.explanation || r.explanation || null,
      aiResolution: { confidence: r.confidence, basis: r.basis || null },
    });
  }
}

fs.writeFileSync(path.join(DIR, "insert-ready-resolved.json"), JSON.stringify(accepted, null, 1));
console.log(`applied: ${applied}, low-confidence skipped: ${skippedLow}, unmatched: ${unmatched}`);
console.log(`-> insert-ready-resolved.json (${accepted.length})`);
