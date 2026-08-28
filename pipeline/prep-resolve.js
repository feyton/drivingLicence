// Split parked-no-answer.json into chunks for AI answer-resolution agents.
// Usage: node prep-resolve.js [chunkSize]
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const OUT = path.join(DIR, "resolve");
const size = parseInt(process.argv[2] || "35", 10);

const parked = JSON.parse(fs.readFileSync(path.join(DIR, "parked-no-answer.json"), "utf8"));
// Only genuine MCQs are worth resolving (3+ options; 2-option Yego/Oya also fine).
const candidates = parked.filter((q) => Array.isArray(q.options) && q.options.length >= 2);

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

let n = 0;
for (let i = 0; i < candidates.length; i += size) {
  n++;
  const chunk = candidates.slice(i, i + size).map((q, j) => ({
    ref: `c${n}-${j}`,
    text: q.text,
    options: q.options,
    category: q.category,
    sourceFile: q.sourceFile,
  }));
  fs.writeFileSync(path.join(OUT, `chunk-${String(n).padStart(2, "0")}.json`), JSON.stringify(chunk, null, 1));
}
console.log(`candidates: ${candidates.length} of ${parked.length} parked; chunks: ${n} (size ${size})`);
