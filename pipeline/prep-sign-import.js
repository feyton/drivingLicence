// Keep only the trustworthy sign extractions and build the import payload.
// 'crop' extractions are dropped: on the scanned sources they swept in
// surrounding text, which in those documents carries the answer highlighting.
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const OUT = path.join(DIR, "sign-images");
const map = JSON.parse(fs.readFileSync(path.join(DIR, "sign-images-map.json"), "utf8"));

const keep = map.filter((e) => e.kind === "single" || e.kind === "per-option");
const drop = map.filter((e) => !(e.kind === "single" || e.kind === "per-option"));

// Remove the files we are not shipping.
let removed = 0;
for (const e of drop) {
  for (const f of [e.image, ...Object.values(e.optionImages || {})].filter(Boolean)) {
    const p = path.join(OUT, f);
    if (fs.existsSync(p)) { fs.unlinkSync(p); removed++; }
  }
}

// Only import questions that have a usable answer.
const withAnswer = keep.filter((e) => e.answer && (e.options || []).some((o) => o.id === e.answer));
const noAnswer = keep.filter((e) => !withAnswer.includes(e));

const payload = withAnswer.map((e) => ({
  text: e.text,
  options: (e.options || []).map((o) => ({
    id: o.id,
    text: o.text,
    image: e.optionImages && e.optionImages[o.id] ? `/signs/${e.optionImages[o.id]}` : null,
  })),
  answer: e.answer,
  explanation: e.explanation || null,
  category: "signs",
  image: e.image ? `/signs/${e.image}` : null,
  sourceFile: e.sourceFile,
  sourcePage: e.sourcePage,
  answerSource: "source-image",
}));

fs.writeFileSync(path.join(DIR, "insert-ready-signs.json"), JSON.stringify(payload, null, 1));

const files = fs.readdirSync(OUT);
console.log(`map entries:      ${map.length}`);
console.log(`kept (single/per-option): ${keep.length}   dropped crops: ${drop.length} (${removed} files removed)`);
console.log(`importable (has answer):  ${payload.length}`);
console.log(`kept but no answer:       ${noAnswer.length}`);
console.log(`image files remaining:    ${files.length}`);
console.log(`-> insert-ready-signs.json`);
