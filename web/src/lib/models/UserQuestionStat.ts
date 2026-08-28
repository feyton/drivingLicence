import mongoose, { Schema, type InferSchemaType } from "mongoose";

// Per-user, per-question performance — powers "focus on my mistakes",
// "unseen first", weak-area detection and (later) spaced repetition.
const UserQuestionStatSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    category: { type: String, default: "general" },
    attempts: { type: Number, default: 0 },
    correct: { type: Number, default: 0 },
    wrong: { type: Number, default: 0 },
    lastResult: { type: Boolean, default: null },
    lastSeenAt: { type: Date, default: null },
  },
  { timestamps: true }
);

UserQuestionStatSchema.index({ user: 1, question: 1 }, { unique: true });
UserQuestionStatSchema.index({ user: 1, lastResult: 1 });

export type UserQuestionStatDoc = InferSchemaType<typeof UserQuestionStatSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const UserQuestionStat =
  mongoose.models.UserQuestionStat || mongoose.model("UserQuestionStat", UserQuestionStatSchema);
