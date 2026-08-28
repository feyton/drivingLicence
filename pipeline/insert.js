// Insert deduped questions into the production DB as UNAPPROVED (review queue).
// Run on the server from /opt/apps/drivingLicence/server (needs its .env + node_modules):
//   node insert.js <path-to-insert-ready.json> <adminUserId> [--apply]
// Without --apply it is a dry run.
require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");

const BATCH_BASE = "corpus-2026-08-28";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function main() {
  const [file, adminId, applyFlag, suffix] = process.argv.slice(2);
  if (!file || !adminId) {
    console.error("usage: node insert.js <json> <adminUserId> [--apply] [batchSuffix]");
    process.exit(1);
  }
  const apply = applyFlag === "--apply";
  const BATCH = suffix ? `${BATCH_BASE}-${suffix}` : BATCH_BASE;
  const items = JSON.parse(fs.readFileSync(file, "utf8"));

  const docs = [];
  const skipped = [];
  for (const q of items) {
    const options = (q.options || []).map((o) => ({ id: o.id, text: String(o.text).trim() }));
    const validIds = new Set(options.map((o) => o.id));
    if (options.length < 2 || !q.answer || !validIds.has(q.answer)) {
      skipped.push({ reason: "bad-options-or-answer", text: String(q.text).slice(0, 80) });
      continue;
    }
    docs.push({
      text: `<p>${escapeHtml(String(q.text).trim())}</p>`,
      options,
      answer: q.answer,
      explanation: q.explanation ? `<p>${escapeHtml(String(q.explanation).trim())}</p>` : "",
      category: q.category === "signs" ? "posts" : "general",
      approved: false,
      active: true,
      user: new mongoose.Types.ObjectId(adminId),
      difficulty: [],
      importBatch: BATCH,
      importSource: {
        file: q.sourceFile,
        page: q.sourcePage ?? q.sourceLine ?? null,
        answerSource: q.answerSource || null,
        mergedFrom: q.mergedFrom || [],
        aiResolved: q.answerSource === "ai-resolved",
        aiResolution: q.aiResolution || null,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  console.log(`prepared: ${docs.length}, skipped: ${skipped.length}`);
  if (skipped.length) console.log(JSON.stringify(skipped.slice(0, 10), null, 1));
  const byCat = docs.reduce((a, d) => ((a[d.category] = (a[d.category] || 0) + 1), a), {});
  console.log("by category:", JSON.stringify(byCat));

  if (!apply) {
    console.log("DRY RUN — pass --apply to insert.");
    process.exit(0);
  }

  await mongoose.connect(process.env.DATABASE_URL);
  const col = mongoose.connection.db.collection("questions");
  const already = await col.countDocuments({ importBatch: BATCH });
  if (already > 0) {
    console.error(`ABORT: batch ${BATCH} already has ${already} docs in the DB. Rollback first: db.questions.deleteMany({importBatch: "${BATCH}"})`);
    process.exit(1);
  }
  const res = await col.insertMany(docs, { ordered: false });
  console.log(`inserted: ${res.insertedCount} (batch ${BATCH})`);
  console.log(`rollback anytime: db.questions.deleteMany({importBatch: "${BATCH}"})`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
