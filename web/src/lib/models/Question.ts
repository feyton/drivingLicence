import mongoose, { Schema, type InferSchemaType } from "mongoose";

const OptionSchema = new Schema(
  {
    id: { type: String, required: true }, // "A".."E" — stable; display order is shuffled per attempt
    text: { type: String, required: true },
  },
  { _id: false }
);

const QuestionSchema = new Schema(
  {
    // Plain text going forward; legacy rows contain Quill HTML (render path strips/sanitizes).
    text: { type: String, required: true },
    options: { type: [OptionSchema], required: true },
    answer: { type: String, required: true },
    explanation: { type: String, default: "" },
    // Optional per-option notes (option id -> why it's right/wrong), for
    // selected-answer-aware feedback. Populated by the AI enrichment pass.
    optionNotes: { type: Schema.Types.Mixed, default: null },
    // "general" = rules of the road, "posts" = road signs (legacy value kept for data continuity)
    category: { type: String, enum: ["general", "posts"], default: "general", index: true },
    image: { type: String, default: null }, // road-sign image URL when the question needs one
    approved: { type: Boolean, default: false, index: true },
    active: { type: Boolean, default: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    difficulty: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, enum: [1, 2, 3, 4, 5] },
      },
    ],
    importBatch: { type: String, default: null, index: true },
    importSource: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

QuestionSchema.index({ approved: 1, active: 1, category: 1 });

export type QuestionDoc = InferSchemaType<typeof QuestionSchema> & { _id: mongoose.Types.ObjectId };

export const Question = mongoose.models.Question || mongoose.model("Question", QuestionSchema);
