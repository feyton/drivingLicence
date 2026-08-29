// mongosh script: reset/repair indexes on the driving DB.
// The legacy Mongoose models used `indexedDB:true` (a typo for `index:true`),
// so real indexes were never created. This creates the correct ones and drops
// the 30-day TTL on scores. Idempotent — safe to re-run.

function safeDrop(coll, name) {
  try {
    db.getCollection(coll).dropIndex(name);
    print("  dropped " + coll + "." + name);
  } catch (e) {
    print("  (skip drop " + coll + "." + name + ": " + (e.codeName || e.message) + ")");
  }
}

function ensure(coll, spec, opts) {
  const name = db.getCollection(coll).createIndex(spec, opts || {});
  print("  ensured " + coll + " -> " + name);
}

print("=== BEFORE ===");
["questions", "scores", "users", "quizzes", "attempts", "userquestionstats"].forEach(function (c) {
  try {
    const ix = db.getCollection(c).getIndexes().map(function (i) {
      return i.name + (i.expireAfterSeconds !== undefined ? " (TTL " + i.expireAfterSeconds + "s)" : "");
    });
    print(c + ": " + ix.join(", "));
  } catch (e) {
    print(c + ": (none)");
  }
});

print("=== DROP stale TTL on scores ===");
safeDrop("scores", "createdAt_1");

print("=== CREATE indexes ===");
// questions — the hot path is drawQuestions / landing counts / review queue
ensure("questions", { approved: 1, active: 1, category: 1 });
ensure("questions", { importBatch: 1 });
ensure("questions", { "verification.status": 1 });

// scores (legacy history)
ensure("scores", { userId: 1, createdAt: -1 });
ensure("scores", { quizId: 1 });

// quizzes
ensure("quizzes", { active: 1 });

// users
ensure("users", { email: 1 }, { unique: true });
ensure("users", { role: 1 });

// new-app collections (Mongoose also creates these; make sure they exist)
ensure("attempts", { user: 1, submittedAt: -1 });
ensure("attempts", { user: 1, mode: 1, submittedAt: -1 });
ensure("userquestionstats", { user: 1, question: 1 }, { unique: true });
ensure("userquestionstats", { user: 1, lastResult: 1 });

print("=== AFTER ===");
["questions", "scores", "users", "quizzes", "attempts", "userquestionstats"].forEach(function (c) {
  try {
    const ix = db.getCollection(c).getIndexes().map(function (i) {
      return i.name + (i.expireAfterSeconds !== undefined ? " (TTL " + i.expireAfterSeconds + "s)" : "");
    });
    print(c + ": " + ix.join(", "));
  } catch (e) {
    print(c + ": (none)");
  }
});
print("=== DONE ===");
