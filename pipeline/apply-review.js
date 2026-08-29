// Work the review queue: apply answer corrections, then approve the tiers that
// were actually reviewed. Run on the server from /opt/apps/drivingLicence/server:
//   node apply-review.js review-decisions.json <adminUserId> [--apply]
//
// Approved here:
//   * the 6 corrected answers (explanation + option notes rewritten to match)
//   * 2 whose marked answer was right and the verifier wrong
//   * source-marked questions the verifier confirmed or could not disprove
//     ("correct"/"unsure") — these come from real exam papers and each carries
//     an explanation written against its marked answer
//   * sign questions (answer marked in the source, image verified)
//   * high-confidence AI-resolved answers
// Left pending: genuinely ambiguous items and medium-confidence resolutions.
require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");

async function main() {
  const [file, adminId, applyFlag] = process.argv.slice(2);
  if (!file || !adminId) {
    console.error("usage: node apply-review.js <decisions.json> <adminUserId> [--apply]");
    process.exit(1);
  }
  const apply = applyFlag === "--apply";
  const d = JSON.parse(fs.readFileSync(file, "utf8"));
  const oid = (s) => new mongoose.Types.ObjectId(s);

  await mongoose.connect(process.env.DATABASE_URL);
  const col = mongoose.connection.db.collection("questions");

  const leaveIds = new Set(d.leavePending.map((x) => x.id));

  // Everything currently pending, so we can classify it.
  const pending = await col
    .find({ approved: false, active: true })
    .project({ _id: 1, importBatch: 1, verification: 1, importSource: 1 })
    .toArray();

  const plan = { corrections: [], approve: [], leave: [] };

  for (const q of pending) {
    const id = String(q._id);
    if (leaveIds.has(id)) { plan.leave.push(id); continue; }
    const batch = q.importBatch || "";
    const verdict = q.verification && q.verification.verdict;

    if (batch === "signs-2026-08-29") { plan.approve.push(id); continue; }
    if (batch === "corpus-2026-08-28-resolved") {
      // only the high-confidence resolutions
      const conf = q.importSource && q.importSource.aiResolution && q.importSource.aiResolution.confidence;
      if (conf === "high") plan.approve.push(id);
      else plan.leave.push(id);
      continue;
    }
    if (verdict === "correct" || verdict === "unsure") { plan.approve.push(id); continue; }
    if (verdict === "wrong") {
      const corrected = d.corrections.find((c) => c.id === id);
      const keep = d.keepAnswerApprove.find((c) => c.id === id);
      if (corrected) { plan.corrections.push(corrected); plan.approve.push(id); }
      else if (keep) plan.approve.push(id);
      else plan.leave.push(id);
      continue;
    }
    plan.leave.push(id);
  }

  console.log(`pending now:      ${pending.length}`);
  console.log(`answer fixes:     ${plan.corrections.length}`);
  console.log(`to approve:       ${plan.approve.length}`);
  console.log(`left pending:     ${plan.leave.length}`);

  if (!apply) { console.log("DRY RUN — pass --apply to write."); process.exit(0); }

  // 1. Corrections first, so no question is ever approved with a stale key.
  let fixed = 0;
  for (const c of plan.corrections) {
    const r = await col.updateOne(
      { _id: oid(c.id) },
      {
        $set: {
          answerBefore: c.from,
          answer: c.to,
          explanation: c.explanation,
          optionNotes: c.optionNotes,
          "verification.correctedAt": new Date(),
          "verification.correctedBy": oid(adminId),
          "verification.correctionNote": c.why,
        },
      }
    );
    fixed += r.modifiedCount;
  }
  console.log(`answers corrected: ${fixed}`);

  // 2. Approve.
  const res = await col.updateMany(
    { _id: { $in: plan.approve.map(oid) } },
    { $set: { approved: true, active: true, approvedBy: oid(adminId), reviewedAt: new Date() } }
  );
  console.log(`approved: ${res.modifiedCount}`);

  const live = await col.countDocuments({ approved: true, active: true });
  const stillPending = await col.countDocuments({ approved: false, active: true });
  console.log(`\nlive now: ${live}  |  still pending: ${stillPending}`);
  console.log(`rollback approvals: db.questions.updateMany({reviewedAt:{$exists:true}}, {$set:{approved:false}})`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
