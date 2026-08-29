// Insert sign questions (with images) into the DB as pending review.
// Run on the server from /opt/apps/drivingLicence/server:
//   node insert-signs.js insert-ready-signs.json <adminUserId> [--apply]
require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");

const BATCH = "signs-2026-08-29";

async function main() {
  const [file, adminId, applyFlag] = process.argv.slice(2);
  if (!file || !adminId) {
    console.error("usage: node insert-signs.js <json> <adminUserId> [--apply]");
    process.exit(1);
  }
  const apply = applyFlag === "--apply";
  const items = JSON.parse(fs.readFileSync(file, "utf8"));

  const docs = [];
  const skipped = [];
  for (const q of items) {
    const options = (q.options || []).map((o) => ({
      id: o.id,
      text: String(o.text || "").trim(),
      image: o.image || null,
    }));
    const hasAnswer = options.some((o) => o.id === q.answer);
    const hasPicture = Boolean(q.image) || options.some((o) => o.image);
    if (options.length < 2 || !hasAnswer || !hasPicture) {
      skipped.push({ reason: !hasPicture ? "no-image" : "bad-options", text: String(q.text).slice(0, 70) });
      continue;
    }
    docs.push({
      text: String(q.text).trim(),
      options,
      answer: q.answer,
      explanation: q.explanation ? String(q.explanation).trim() : "",
      category: "posts", // legacy value for road signs
      image: q.image || null,
      approved: false,
      active: true,
      user: new mongoose.Types.ObjectId(adminId),
      difficulty: [],
      importBatch: BATCH,
      importSource: { file: q.sourceFile, page: q.sourcePage, answerSource: q.answerSource || null },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  console.log(`prepared: ${docs.length}, skipped: ${skipped.length}`);
  if (skipped.length) console.log(JSON.stringify(skipped.slice(0, 6), null, 1));
  console.log("question-level images:", docs.filter((d) => d.image).length);
  console.log("per-option images:", docs.filter((d) => d.options.some((o) => o.image)).length);

  if (!apply) {
    console.log("DRY RUN — pass --apply to insert.");
    process.exit(0);
  }

  await mongoose.connect(process.env.DATABASE_URL);
  const col = mongoose.connection.db.collection("questions");
  const already = await col.countDocuments({ importBatch: BATCH });
  if (already > 0) {
    console.error(`ABORT: batch ${BATCH} already has ${already} docs. Rollback first: db.questions.deleteMany({importBatch:"${BATCH}"})`);
    process.exit(1);
  }
  const res = await col.insertMany(docs, { ordered: false });
  console.log(`inserted: ${res.insertedCount} (batch ${BATCH})`);
  console.log(`rollback: db.questions.deleteMany({importBatch: "${BATCH}"})`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
