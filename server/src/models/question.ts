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
    cover: {
      type: String,
      default:
        "https://res.cloudinary.com/feyton/image/upload/v1680981703/10-driving-test-tips-eclipse-driving-school_dzjmmn.jpg",
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
    active: {
      type: Boolean,
      default: true,
    },
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
ScoreSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

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
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

QuestionSchema.virtual("timesAddedToQuizzes").get(async function () {
  const questionId: any = this._id;
  const res = await mongoose.models.Question.aggregate([
    {
      $match: {
        _id: questionId,
      },
    },
    {
      $lookup: {
        from: "quizzes",
        localField: "_id",
        foreignField: "questions",
        as: "quizzes",
      },
    },
    {
      $project: {
        _id: 0,
        count: { $size: "$quizzes" },
      },
    },
  ]);

  return res[0].count;
});

QuestionSchema.virtual("averageDifficulty").get(function () {
  if (this.difficulty.length === 0) {
    return null;
  }
  const totalRating = this.difficulty.reduce(
    (acc, curr) => acc + curr.rating,
    0
  );

  return totalRating / this.difficulty.length;
});
QuestionSchema.methods.getUserRating = function (userId: any) {
  const userRating = this.difficulty.find(
    (item: any) => item.userId.toString() === userId.toString()
  );
  return userRating ? userRating.rating : null;
};

export const Question = model("Question", QuestionSchema);
