// Enrich approved questions with detailed explanations + per-option notes.
// Runs on the SERVER (reads the finxai Anthropic key from the web env, uses that
// budget — not the org that hit its cap). Idempotent: skips already-enriched
// questions unless --force. Preserves the original explanation for rollback.
//
//   node enrich-explanations.js [--apply] [--limit N] [--force]
//
require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");

const WEB_ENV = "/opt/apps/drivingLicence/web/.env.production.local";
// Sonnet, not Haiku: Kinyarwanda explanation quality matters and this is a
// one-time batch. Override with ENRICH_MODEL if needed.
const MODEL = process.env.ENRICH_MODEL || "claude-sonnet-5";
const CONCURRENCY = 4;

function getKey() {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY;
  const env = require("dotenv").parse(fs.readFileSync(WEB_ENV));
  return env.ANTHROPIC_API_KEY;
}

function stripHtml(s) {
  return String(s || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&#39;|&apos;/g, "'").replace(/\s+/g, " ").trim();
}

async function enrichOne(key, q) {
  const opts = q.options.map((o) => `${o.id}. ${stripHtml(o.text)}`).join("\n");
  const correctText = stripHtml((q.options.find((o) => o.id === q.answer) || {}).text || "");
  const prompt = `Iki ni ikibazo cy'ikizamini cy'amategeko y'umuhanda mu Rwanda.

Ikibazo: ${stripHtml(q.text)}

Amahitamo:
${opts}

Igisubizo cy'ukuri ni: ${q.answer}. ${correctText}

Andika mu Kinyarwanda:
1. "explanation": ubusobanuro burambuye (interuro 2-4) busobanura impamvu igisubizo ${q.answer} ari cyo cy'ukuri, ushingiye ku mategeko y'umuhanda. Koresha markdown (urutonde cyangwa **inyubako** aho bikwiye).
2. "optionNotes": ku buri hitamo ATARI cyo cy'ukuri, andika interuro imwe ngufi isobanura impamvu ridakwiye. Koresha id y'ihitamo nk'urufunguzo.

Subiza JSON GUSA muri ubu buryo (nta yandi magambo):
{"explanation": "...", "optionNotes": {"X": "...", "Y": "..."}}`;

  const system = "Uri umwarimu w'amategeko y'umuhanda mu Rwanda ufite ubumenyi buhanitse. Wandika Ikinyarwanda gisobanutse, gito kandi cy'ukuri. Ntukoreshe amagambo adafite ireme cyangwa interuro zidasobanutse. Ushingira ku mategeko y'umuhanda y'u Rwanda gusa; niba utazi neza, wivuge mu buryo bworoshye budahimbye.";
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: MODEL, max_tokens: 800, system, messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`API ${res.status}: ${t.slice(0, 160)}`);
  }
  const data = await res.json();
  const text = (data.content && data.content[0] && data.content[0].text) || "";
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("no JSON in response");
  const parsed = JSON.parse(m[0]);
  // Keep only notes for valid, non-correct options.
  const validIds = new Set(q.options.map((o) => o.id));
  const notes = {};
  for (const [k, v] of Object.entries(parsed.optionNotes || {})) {
    if (validIds.has(k) && k !== q.answer && typeof v === "string" && v.trim()) notes[k] = v.trim();
  }
  return { explanation: String(parsed.explanation || "").trim(), optionNotes: notes };
}

async function main() {
  const apply = process.argv.includes("--apply");
  const force = process.argv.includes("--force");
  const limIdx = process.argv.indexOf("--limit");
  const limit = limIdx > -1 ? parseInt(process.argv[limIdx + 1], 10) : 0;

  const key = getKey();
  if (!key) { console.error("no ANTHROPIC_API_KEY"); process.exit(1); }

  await mongoose.connect(process.env.DATABASE_URL);
  const col = mongoose.connection.db.collection("questions");
  const filter = { approved: true, active: true };
  if (!force) filter.optionNotes = { $in: [null, undefined] };
  let questions = await col.find(filter).toArray();
  if (limit) questions = questions.slice(0, limit);

  console.log(`to enrich: ${questions.length}${apply ? "" : " (DRY RUN — pass --apply)"}`);
  if (!apply) { process.exit(0); }

  let done = 0, failed = 0;
  for (let i = 0; i < questions.length; i += CONCURRENCY) {
    const batch = questions.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(async (q) => {
      try {
        const { explanation, optionNotes } = await enrichOne(key, q);
        if (!explanation) throw new Error("empty explanation");
        await col.updateOne(
          { _id: q._id },
          {
            $set: {
              explanationOriginal: q.explanationOriginal ?? q.explanation ?? "",
              explanation,
              optionNotes,
              enrichedAt: new Date(),
            },
          }
        );
        done++;
      } catch (e) {
        failed++;
        console.error(`  fail ${q._id}: ${e.message}`);
      }
    }));
    if ((i / CONCURRENCY) % 5 === 0) console.log(`  progress: ${done + failed}/${questions.length} (ok ${done}, fail ${failed})`);
  }
  console.log(`DONE: enriched ${done}, failed ${failed}`);
  console.log(`rollback: db.questions.updateMany({enrichedAt:{$exists:true}}, [{$set:{explanation:"$explanationOriginal"}},{$unset:["optionNotes","enrichedAt","explanationOriginal"]}])`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
