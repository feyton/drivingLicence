import mongoose, { model, Schema } from "mongoose";

const QuizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Question",
        required: true,
        indexedDB: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

QuizSchema.virtual("score").get(function () {
  return this.questions.length;
});
QuizSchema.pre("remove", async function (next) {
  const quiz: any = this;
  await Score.deleteMany({ quizId: quiz._id });
  next();
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
    answers: String,
    questionsData: String,
  },
  {
    timestamps: true,
  }
);

ScoreSchema.virtual("questions").get(function () {
  const score: any = this;
  return JSON.parse(score?.questionsData);
});

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
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      indexedDB: true,
      required: true,
    },
    approvedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      indexedDB: true,
    },
    difficulty: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          enum: [1, 2, 3, 4, 5],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

QuestionSchema.virtual("timesAddedToQuizzes", {
  ref: "Quiz",
  localField: "_id",
  foreignField: "questions",
  count: true,
});

export const Question = model("Question", QuestionSchema);
