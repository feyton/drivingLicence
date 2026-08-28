// Chunk pending questions for AI verification agents.
// Usage: node prep-verify.js [chunkSize]
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const OUT = path.join(DIR, "verify");
const size = parseInt(process.argv[2] || "45", 10);

function stripHtml(s) {
  return String(s || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&#39;|&apos;/g, "'").replace(/\s+/g, " ").trim();
}

const pending = JSON.parse(fs.readFileSync(path.join(DIR, "pending-q.json"), "utf8"));

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

let n = 0;
for (let i = 0; i < pending.length; i += size) {
  n++;
  const chunk = pending.slice(i, i + size).map((q) => ({
    id: q._id,
    text: stripHtml(q.text),
    options: (q.options || []).map((o) => ({ id: o.id, text: stripHtml(o.text) })),
    markedAnswer: q.answer,
    category: q.category === "posts" ? "signs" : "general",
  }));
  fs.writeFileSync(path.join(OUT, `chunk-${String(n).padStart(2, "0")}.json`), JSON.stringify(chunk, null, 1));
}
console.log(`pending: ${pending.length}, chunks: ${n} (size ${size})`);
