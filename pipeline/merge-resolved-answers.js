// Merge in-session answer resolutions back onto the parked questions and emit
// insert-ready-resolved.json. NO LLM calls — pure merge.
const fs = require("fs");
const path = require("path");
const DIR = __dirname;

const qs = JSON.parse(fs.readFileSync(path.join(DIR, "resolve-in.json"), "utf8"));

// Rebuild the same refs prep produced (SIZE must match).
const SIZE = 27;
const byRef = new Map();
let n = 0;
for (let i = 0; i < qs.length; i += SIZE) {
  n++;
  qs.slice(i, i + SIZE).forEach((q, j) => byRef.set(`r${n}-${j}`, q));
}

const out = [];
let applied = 0, unmatched = 0, badAnswer = 0;
const conf = {};
for (const f of fs.readdirSync(path.join(DIR, "resolve-out")).filter((f) => /^chunk-\d+\.json$/.test(f))) {
  const res = JSON.parse(fs.readFileSync(path.join(DIR, "resolve-out", f), "utf8"));
  for (const r of res) {
    const q = byRef.get(r.ref);
    if (!q) { unmatched++; continue; }
    if (!q.options.some((o) => o.id === r.answer)) { badAnswer++; continue; }
    conf[r.confidence] = (conf[r.confidence] || 0) + 1;
    applied++;
    out.push({
      ...q,
      answer: r.answer,
      answerSource: "ai-resolved",
      explanation: r.explanation,
      optionNotes: r.optionNotes || {},
      aiResolution: { confidence: r.confidence },
    });
  }
}

fs.writeFileSync(path.join(DIR, "insert-ready-resolved.json"), JSON.stringify(out, null, 1));
console.log(`parked candidates: ${qs.length}`);
console.log(`resolved & merged: ${applied}  ${JSON.stringify(conf)}`);
console.log(`left unresolved (skipped as uncertain): ${qs.length - applied}`);
if (unmatched) console.log(`unmatched refs: ${unmatched}`);
if (badAnswer) console.log(`answer not in options: ${badAnswer}`);
console.log(`-> insert-ready-resolved.json`);
