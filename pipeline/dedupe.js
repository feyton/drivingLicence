// Dedupe extracted questions against each other and the existing DB bank.
// Usage: node dedupe.js
// Reads:  extracted/*.json, existing-questions.json
// Writes: insert-ready.json, parked-no-answer.json, parked-needs-image.json, duplicates-report.json
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const EXTRACTED = path.join(DIR, "extracted");
const SIM_THRESHOLD = 0.85;

function stripHtml(s) {
  return String(s || "").replace(/<[^>]*>/g, " ");
}
function normalize(s) {
  return stripHtml(s)
    .normalize("NFC")
    .toLowerCase()
    .replace(/[‘’ʼ`]/g, "'")
    .replace(/[^\p{L}\p{N}' ]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function tokens(s) {
  return new Set(normalize(s).split(" ").filter(Boolean));
}
function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
}

function fingerprint(q) {
  const optText = (q.options || []).map((o) => o.text).sort().join(" ");
  return {
    stem: tokens(q.text),
    full: tokens(normalize(q.text) + " " + normalize(optText)),
    norm: normalize(q.text) + "||" + normalize(optText),
  };
}

// ---- load existing DB questions ----
const dump = JSON.parse(fs.readFileSync(path.join(DIR, "existing-questions.json"), "utf8"));
const existing = dump.questions.map((q) => ({ ...q, fp: fingerprint(q), fromDb: true }));
console.log(`existing DB questions: ${existing.length}`);

// ---- load extracted ----
// Skip agent work files and the Gugu1/Gugu2 open-Q&A reference guides (those go
// to the coaching corpus, not the MCQ bank — their records are single-option).
const EXCLUDE = /intermediate|raw|^_|^gugu1\.json$|^gugu2\.json$/i;
let extracted = [];
const perFile = {};
for (const f of fs.readdirSync(EXTRACTED).filter((f) => f.endsWith(".json") && !EXCLUDE.test(f))) {
  const data = JSON.parse(fs.readFileSync(path.join(EXTRACTED, f), "utf8"));
  if (data.type !== "questions" || !Array.isArray(data.questions)) {
    perFile[data.source || f] = { type: data.type, count: 0 };
    continue;
  }
  perFile[data.source || f] = { type: "questions", count: data.questions.length };
  for (const q of data.questions) {
    extracted.push({ ...q, sourceFile: data.source || f });
  }
}
console.log(`extracted raw: ${extracted.length}`);

// ---- partition: needs image / unusable ----
const needsImage = extracted.filter((q) => q.needsImage);
let usable = extracted.filter((q) => !q.needsImage && Array.isArray(q.options) && q.options.length >= 2 && q.text && normalize(q.text).length > 0);
const malformed = extracted.length - needsImage.length - usable.length;

// quality score: prefer keyed answers, then inline, then explanation, then longer content
function score(q) {
  let s = 0;
  if (q.answer) s += q.answerSource === "key" ? 40 : q.answerSource === "inline" ? 35 : 20;
  if (q.explanation) s += 10;
  s += Math.min(10, (q.options || []).length * 2);
  s += Math.min(5, normalize(q.text).length / 40);
  return s;
}
usable.forEach((q) => { q.fp = fingerprint(q); q.q = score(q); });
usable.sort((a, b) => b.q - a.q); // greedy keeps best representative first

// ---- dedupe: against existing DB, then within new set (greedy) ----
const kept = [];
const dupGroups = [];
function findDup(q, pool) {
  for (const k of pool) {
    if (q.fp.norm === k.fp.norm) return { match: k, sim: 1, kind: "exact" };
    // cheap length prefilter
    const a = q.fp.full, b = k.fp.full;
    if (a.size * 1.6 < b.size || b.size * 1.6 < a.size) continue;
    const simStem = jaccard(q.fp.stem, k.fp.stem);
    if (simStem < 0.5) continue;
    const simFull = jaccard(a, b);
    if (simFull >= SIM_THRESHOLD || (simStem >= 0.92 && simFull >= 0.7)) {
      return { match: k, sim: simFull, kind: "near" };
    }
  }
  return null;
}

let dupExisting = 0, dupInternal = 0;
for (const q of usable) {
  const de = findDup(q, existing);
  if (de) {
    dupExisting++;
    dupGroups.push({ kind: "vs-db", sim: +de.sim.toFixed(3), new: q.text.slice(0, 120), source: q.sourceFile, db: stripHtml(de.match.text).slice(0, 120) });
    continue;
  }
  const di = findDup(q, kept);
  if (di) {
    dupInternal++;
    di.match.mergedFrom = di.match.mergedFrom || [];
    di.match.mergedFrom.push(q.sourceFile);
    // steal an answer/explanation if the kept one lacks it
    if (!di.match.answer && q.answer && optionsAlign(di.match, q)) {
      di.match.answer = q.answer;
      di.match.answerSource = q.answerSource;
      di.match.answerStolenFrom = q.sourceFile;
    }
    if (!di.match.explanation && q.explanation) di.match.explanation = q.explanation;
    dupGroups.push({ kind: "internal", sim: +di.sim.toFixed(3), kept: di.match.text.slice(0, 120), keptSource: di.match.sourceFile, dropped: q.text.slice(0, 120), droppedSource: q.sourceFile });
    continue;
  }
  kept.push(q);
}

// answers can only transfer between duplicates when option sets match closely
function optionsAlign(a, b) {
  const oa = (a.options || []).map((o) => normalize(o.text));
  const ob = (b.options || []).map((o) => normalize(o.text));
  if (oa.length !== ob.length) return false;
  let same = 0;
  for (let i = 0; i < oa.length; i++) if (oa[i] === ob[i]) same++;
  return same === oa.length;
}

const withAnswer = kept.filter((q) => q.answer);
const noAnswer = kept.filter((q) => !q.answer);

fs.writeFileSync(path.join(DIR, "insert-ready.json"), JSON.stringify(withAnswer, null, 1));
fs.writeFileSync(path.join(DIR, "parked-no-answer.json"), JSON.stringify(noAnswer, null, 1));
fs.writeFileSync(path.join(DIR, "parked-needs-image.json"), JSON.stringify(needsImage, null, 1));
fs.writeFileSync(path.join(DIR, "duplicates-report.json"), JSON.stringify({ dupExisting, dupInternal, groups: dupGroups }, null, 1));

console.log("--- per file ---");
for (const [f, info] of Object.entries(perFile)) console.log(`  ${f}: ${info.type} (${info.count})`);
console.log("--- results ---");
console.log(`needs image (parked): ${needsImage.length}`);
console.log(`malformed (dropped):  ${malformed}`);
console.log(`duplicates vs DB:     ${dupExisting}`);
console.log(`duplicates internal:  ${dupInternal}`);
console.log(`unique kept:          ${kept.length}`);
console.log(`  with answer  -> insert-ready.json:      ${withAnswer.length}`);
console.log(`  no answer    -> parked-no-answer.json:  ${noAnswer.length}`);
