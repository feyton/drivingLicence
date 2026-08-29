// Split approved questions into readable chunks for in-session enrichment.
const fs = require("fs");
const path = require("path");
const DIR = __dirname;
const OUT = path.join(DIR, "enrich-chunks");
const SIZE = parseInt(process.argv[2] || "30", 10);

function stripHtml(s) {
  return String(s || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&#39;|&apos;/g, "'").replace(/\s+/g, " ").trim();
}

const qs = JSON.parse(fs.readFileSync(path.join(DIR, "enrich-in.json"), "utf8"));
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

let n = 0;
for (let i = 0; i < qs.length; i += SIZE) {
  n++;
  const chunk = qs.slice(i, i + SIZE).map((q) => ({
    id: String(q._id),
    q: stripHtml(q.text),
    options: q.options.map((o) => ({ id: o.id, text: stripHtml(o.text) })),
    answer: q.answer,
    category: q.category === "posts" ? "signs" : "general",
  }));
  fs.writeFileSync(path.join(OUT, `chunk-${String(n).padStart(2, "0")}.json`), JSON.stringify(chunk, null, 1));
}
console.log(`${qs.length} questions -> ${n} chunks of ${SIZE}`);
