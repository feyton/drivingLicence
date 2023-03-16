import mongoose, { model, Schema } from "mongoose";

const QuizSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  questions: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Question",
      required: true,
      indexedDB: true,
    },
  ],
});

export const Quiz = model("Quiz", QuizSchema);

const ScoreSchema = new Schema(
  {
    quizId: {
      type: mongoose.Types.ObjectId,
      ref: "Quiz",
      required: true,
      indexedDB: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      indexedDB: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Score = model("Score", ScoreSchema);

const QuestionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    options: [
      {
        id: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
    answer: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
      default: "general",
    },
  },
  {
    timestamps: true,
  }
);

export const Question = model("Question", QuestionSchema);
