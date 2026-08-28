// Compile the open Q&A reference docs into a compact knowledge base for the
// AI coaching tutor. These are the single-answer Q&A sets (Gugu, Ibibazo, Ikizami)
// that didn't fit the MCQ bank but are excellent grounding material.
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const EXTRACTED = path.join(DIR, "extracted");
const OUT = path.join(DIR, "coaching-corpus.json");

// Files that are Q&A reference (single answer), not MCQ.
const QA_FILES = ["gugu1.json", "gugu2.json", "gugu4.json", "gugu7.json", "ibibazo1.json", "ibibazo-ibisubizo.json", "ikizami-cy-amategeko.json"];

function stripHtml(s) {
  return String(s || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&#39;|&apos;/g, "'").replace(/\s+/g, " ").trim();
}

const entries = [];
const seen = new Set();
for (const f of QA_FILES) {
  const p = path.join(EXTRACTED, f);
  if (!fs.existsSync(p)) continue;
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  for (const q of data.questions || []) {
    const question = stripHtml(q.text);
    // Answer text: single-option container, or answerText, or the option matching answer id.
    let answer = "";
    if (q.answerText) answer = stripHtml(q.answerText);
    else if (q.options && q.options.length === 1) answer = stripHtml(q.options[0].text);
    else if (q.answer && q.options) {
      const opt = q.options.find((o) => o.id === q.answer);
      if (opt) answer = stripHtml(opt.text);
    }
    if (!question || !answer || answer.length < 2) continue;
    const key = question.toLowerCase().slice(0, 60);
    if (seen.has(key)) continue;
    seen.add(key);
    entries.push({ q: question, a: answer, cat: q.category === "signs" ? "signs" : "general", src: data.source });
  }
}

fs.writeFileSync(OUT, JSON.stringify({ generatedFrom: QA_FILES, count: entries.length, entries }, null, 1));
const chars = JSON.stringify(entries).length;
console.log(`compiled ${entries.length} Q&A reference entries (${Math.round(chars / 1024)} KB) -> coaching-corpus.json`);
console.log(`by category:`, JSON.stringify(entries.reduce((a, e) => ((a[e.cat] = (a[e.cat] || 0) + 1), a), {})));
