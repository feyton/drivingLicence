// Apply the AI-verified approval plan on the server.
// Run on the server from /opt/apps/drivingLicence/server:
//   node apply-approvals.js approve-plan.json <adminUserId> [--apply]
// Without --apply it is a dry run.
//
// - Approves questions the verifier confirmed (sets approved:true, active:true, approvedBy).
// - Flagged questions stay pending; each gets a review note (verification.*) so an
//   admin can see WHY it was held and the AI's suggested answer. Nothing is auto-corrected.
require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");

async function main() {
  const [file, adminId, applyFlag] = process.argv.slice(2);
  if (!file || !adminId) {
    console.error("usage: node apply-approvals.js <approve-plan.json> <adminUserId> [--apply]");
    process.exit(1);
  }
  const apply = applyFlag === "--apply";
  const plan = JSON.parse(fs.readFileSync(file, "utf8"));
  const oid = (id) => new mongoose.Types.ObjectId(id);

  console.log(`approve: ${plan.approve.length}, flag: ${plan.flag.length}`);
  if (!apply) { console.log("DRY RUN — pass --apply to write."); process.exit(0); }

  await mongoose.connect(process.env.DATABASE_URL);
  const col = mongoose.connection.db.collection("questions");

  const approveRes = await col.updateMany(
    { _id: { $in: plan.approve.map(oid) }, importBatch: /^corpus-2026-08-28/ },
    { $set: { approved: true, active: true, approvedBy: oid(adminId), "verification.status": "ai-confirmed", "verification.at": new Date() } }
  );
  console.log(`approved: ${approveRes.modifiedCount}`);

  // Annotate flagged questions (kept pending) with the reason + suggestion.
  let flagged = 0;
  const ops = plan.flag.map((f) => ({
    updateOne: {
      filter: { _id: oid(f.id) },
      update: { $set: { "verification.status": "needs-review", "verification.verdict": f.verdict, "verification.confidence": f.confidence, "verification.reason": f.reason, "verification.suggestedAnswer": f.suggestedAnswer, "verification.at": new Date() } },
    },
  }));
  if (ops.length) {
    const r = await col.bulkWrite(ops);
    flagged = r.modifiedCount;
  }
  console.log(`flagged for review: ${flagged}`);
  console.log(`rollback approvals: db.questions.updateMany({importBatch:/^corpus-2026-08-28/, "verification.status":"ai-confirmed"}, {$set:{approved:false}})`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
