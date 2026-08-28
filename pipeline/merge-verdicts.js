// Merge AI verification verdicts into an approval plan.
// Usage: node merge-verdicts.js
// Reads verify/verdict-*.json + pending-q.json
// Writes approve-plan.json = { approve:[ids], flag:[{id,verdict,confidence,reason,suggestedAnswer,markedAnswer}] }
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const VERIFY = path.join(DIR, "verify");

const pending = JSON.parse(fs.readFileSync(path.join(DIR, "pending-q.json"), "utf8"));
const marked = new Map(pending.map((q) => [String(q._id), q.answer]));

const verdicts = new Map();
for (const f of fs.readdirSync(VERIFY).filter((f) => /^verdict-\d+\.json$/.test(f))) {
  const arr = JSON.parse(fs.readFileSync(path.join(VERIFY, f), "utf8"));
  for (const v of arr) verdicts.set(String(v.id), v);
}

const approve = [];
const flag = [];
let missing = 0;

for (const q of pending) {
  const id = String(q._id);
  const v = verdicts.get(id);
  if (!v) { missing++; flag.push({ id, verdict: "no-verdict", confidence: "low", reason: "verifier produced no verdict", suggestedAnswer: null, markedAnswer: q.answer }); continue; }
  // Approve: verifier confirms correct at medium+ confidence.
  if (v.verdict === "correct" && (v.confidence === "high" || v.confidence === "medium")) {
    approve.push(id);
  } else {
    flag.push({
      id,
      verdict: v.verdict,
      confidence: v.confidence,
      reason: v.reason || "",
      suggestedAnswer: v.suggestedAnswer || null,
      markedAnswer: marked.get(id) || q.answer,
    });
  }
}

const byReason = flag.reduce((a, f) => ((a[f.verdict] = (a[f.verdict] || 0) + 1), a), {});
const wrongHigh = flag.filter((f) => f.verdict === "wrong" && f.confidence === "high").length;

fs.writeFileSync(path.join(DIR, "approve-plan.json"), JSON.stringify({ approve, flag }, null, 1));

console.log(`total pending: ${pending.length}`);
console.log(`verdicts collected: ${verdicts.size}${missing ? `, missing: ${missing}` : ""}`);
console.log(`-> APPROVE (correct, med+ conf): ${approve.length}`);
console.log(`-> FLAG for human review: ${flag.length}`, JSON.stringify(byReason));
console.log(`   of which wrong@high confidence: ${wrongHigh}`);
