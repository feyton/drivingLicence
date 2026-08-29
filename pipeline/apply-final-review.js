// Clear the last of the review queue. Answers here were checked against the
// actual law text, so each approval carries a citation where one was found.
//   node apply-final-review.js final-review.json <adminUserId> [--apply]
require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");

async function main() {
  const [file, adminId, applyFlag] = process.argv.slice(2);
  if (!file || !adminId) {
    console.error("usage: node apply-final-review.js <json> <adminUserId> [--apply]");
    process.exit(1);
  }
  const apply = applyFlag === "--apply";
  const d = JSON.parse(fs.readFileSync(file, "utf8"));
  const oid = (s) => new mongoose.Types.ObjectId(s);

  await mongoose.connect(process.env.DATABASE_URL);
  const col = mongoose.connection.db.collection("questions");

  const pending = await col.find({ approved: false, active: true }).project({ _id: 1 }).toArray();
  console.log(`pending: ${pending.length}`);
  console.log(`law-verified (answer stands): ${d.lawVerified.length}`);
  console.log(`corrections: ${d.corrections.length}`);

  if (!apply) { console.log("DRY RUN — pass --apply to write."); process.exit(0); }

  // 1. Record the law citations on the questions whose answer was upheld.
  let cited = 0;
  for (const v of d.lawVerified) {
    const r = await col.updateOne(
      { _id: oid(v.id) },
      {
        $set: {
          "verification.status": "law-verified",
          "verification.verdict": "correct",
          "verification.lawArticle": v.article,
          "verification.lawQuote": v.quote,
          "verification.reason": v.why,
          "verification.reviewedAt": new Date(),
        },
      }
    );
    cited += r.modifiedCount;
  }
  console.log(`law citations recorded: ${cited}`);

  // 2. Apply corrections (answer + explanation + notes together).
  let fixed = 0;
  for (const c of d.corrections) {
    const r = await col.updateOne(
      { _id: oid(c.id) },
      {
        $set: {
          answerBefore: c.from,
          answer: c.to,
          explanation: c.explanation,
          optionNotes: c.optionNotes,
          "verification.status": "law-verified",
          "verification.correctionNote": c.why,
          "verification.correctedAt": new Date(),
          "verification.correctedBy": oid(adminId),
        },
      }
    );
    fixed += r.modifiedCount;
  }
  console.log(`answers corrected: ${fixed}`);

  // 3. Approve everything still pending.
  const res = await col.updateMany(
    { approved: false, active: true },
    { $set: { approved: true, active: true, approvedBy: oid(adminId), reviewedAt: new Date() } }
  );
  console.log(`approved: ${res.modifiedCount}`);

  console.log(`\nlive: ${await col.countDocuments({ approved: true, active: true })}`);
  console.log(`pending: ${await col.countDocuments({ approved: false, active: true })}`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
