import mongoose, { Schema, type InferSchemaType } from "mongoose";

// One exam or practice session. Replaces the legacy Quiz+Score pair:
// questions are drawn from the bank per-attempt, option order is shuffled
// per question at draw time, and grading snapshots the questions so history
// survives later edits (pattern carried over from the old app).

const AttemptQuestionSchema = new Schema(
  {
    questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    optionOrder: { type: [String], required: true }, // e.g. ["C","A","D","B"] — render order
    answer: { type: String, default: null }, // learner's chosen option id
    answeredAt: { type: Date, default: null },
  },
  { _id: false }
);

const AttemptSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    mode: { type: String, enum: ["exam", "practice"], required: true },
    config: {
      count: { type: Number, required: true },
      categories: { type: [String], default: [] }, // empty = all
      focus: { type: String, enum: ["all", "unseen", "missed"], default: "all" },
    },
    questions: { type: [AttemptQuestionSchema], required: true },
    startedAt: { type: Date, required: true },
    expiresAt: { type: Date, default: null }, // exams only
    submittedAt: { type: Date, default: null },
    score: { type: Number, default: null },
    total: { type: Number, required: true },
    passed: { type: Boolean, default: null },
    // Snapshot of graded questions at submit time (text/options/answer/explanation)
    snapshot: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

AttemptSchema.index({ user: 1, submittedAt: -1 });
AttemptSchema.index({ user: 1, mode: 1, submittedAt: -1 });

export type AttemptDoc = InferSchemaType<typeof AttemptSchema> & { _id: mongoose.Types.ObjectId };

export const Attempt = mongoose.models.Attempt || mongoose.model("Attempt", AttemptSchema);
