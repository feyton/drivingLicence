// Push in-session-generated explanations to the DB. NO LLM calls — pure DB write.
// Run on the server from /opt/apps/drivingLicence/server:
//   node push-enrichment.js <chunk-or-dir> [--apply]
// Accepts a single enrich-out/chunk-NN.json file or a directory of them.
// Each entry: {id, explanation, optionNotes:{optId:note}}. Preserves originals.
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

function loadEntries(target) {
  const stat = fs.statSync(target);
  const files = stat.isDirectory()
    ? fs.readdirSync(target).filter((f) => /\.json$/.test(f)).map((f) => path.join(target, f))
    : [target];
  const all = [];
  for (const f of files) all.push(...JSON.parse(fs.readFileSync(f, "utf8")));
  return all;
}

async function main() {
  const [target, applyFlag] = process.argv.slice(2);
  if (!target) { console.error("usage: node push-enrichment.js <file-or-dir> [--apply]"); process.exit(1); }
  const apply = applyFlag === "--apply";
  const entries = loadEntries(target).filter((e) => e && e.id && e.explanation);
  console.log(`entries: ${entries.length}${apply ? "" : " (DRY RUN)"}`);
  if (!apply) { process.exit(0); }

  await mongoose.connect(process.env.DATABASE_URL);
  const col = mongoose.connection.db.collection("questions");
  const oid = (id) => new mongoose.Types.ObjectId(id);

  let ok = 0, miss = 0;
  const ops = [];
  for (const e of entries) {
    const notes = {};
    for (const [k, v] of Object.entries(e.optionNotes || {})) {
      if (typeof v === "string" && v.trim()) notes[k] = v.trim();
    }
    ops.push({
      updateOne: {
        filter: { _id: oid(e.id) },
        update: [
          { $set: { explanationOriginal: { $ifNull: ["$explanationOriginal", "$explanation"] } } },
          {
            $set: {
              // Stored as markdown; the app renders it through the Markdown component.
              explanation: e.explanation.trim(),
              optionNotes: notes,
              enrichedAt: "$$NOW",
            },
          },
        ],
      },
    });
  }
  // Chunked bulkWrite
  for (let i = 0; i < ops.length; i += 200) {
    const r = await col.bulkWrite(ops.slice(i, i + 200));
    ok += r.modifiedCount;
    miss += r.matchedCount - r.modifiedCount;
  }
  console.log(`updated: ${ok}, matched-no-change: ${miss}`);
  console.log(`rollback: db.questions.updateMany({enrichedAt:{$exists:true}}, [{$set:{explanation:"$explanationOriginal"}},{$unset:["optionNotes","enrichedAt","explanationOriginal","explanationMd"]}])`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
