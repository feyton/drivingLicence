import { ApolloError } from "apollo-server-express";
import mongoose from "mongoose";
import { Question, Quiz, Score } from "../models/question";
import { User } from "../models/user";
import { authenticated, validateRole } from "../utils/authenticate";

const submitQuizAnswers = async (
  parent: any,
  { quizId, answers }: any,
  { userId }: any
) => {
  try {
    // Check if user is authorized to submit quiz answers
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      throw new Error("Quiz not found");
    }

    // Calculate score
    let score = 0;
    const questions = await Promise.all(
      answers.map(async ({ questionId, answer }: any) => {
        const question: any = await Question.findById(questionId);
        if (!question) {
          throw new Error("Question not found");
        }
        const isCorrect = question.answer === answer;
        if (isCorrect) {
          score++;
        }
        return {
          id: question._id,
          text: question.text,
          correctAnswer: question.options.find(
            (q: any) => q.id === question.answer
          ),
          userAnswer: question.options.find((q: any) => q.id === answer),
          explanation: question.explanation,
        };
      })
    );

    // Save score
    await Score.create({
      quizId,
      userId,
      score,
      answers: JSON.stringify(answers),
      questionsData: JSON.stringify(questions),
    });

    return { score, questions };
  } catch (error) {
    throw error;
  }
};

const QuizResolver: any = {
  Query: {
    getQuestions: authenticated(
      validateRole(["admin", "super", "editor"])(
        async (_: any, args: any, context: any) => {
          const questions = await Question.find({
            active: { $in: [true, null] },
          }).sort({
            createdAt: -1,
          });
          return questions;
        }
      )
    ),
    getQuiz: authenticated(async (_: any, args: any, context: any) => {
      const quiz = await Quiz.findById(args.id).populate("questions");
      return quiz;
    }),
    getQuestion: authenticated(async (_: any, args: any, context: any) => {
      const question = await Question.findById(args.id).populate("user");
      return question;
    }),
    getQuizzes: authenticated(async (_: any, args: any, context: any) => {
      const quizzes = await Quiz.find({
        "questions.0": { $exists: true },
        active: { $in: [true, null] },
      })
        .sort({ createdAt: -1 })
        .populate("questions")
        .populate("user");
      return quizzes;
    }),
    getScore: authenticated(async (_: any, args: any, context: any) => {
      const score: any = await Score.findById(args.id).populate("quizId");
      const result = {
        score: score?.score,
        id: score._id.toString(),
        questions: JSON.parse(score?.questionsData),
      };
      return result;
    }),
    getCounts: async () => {
      return {
        users: await User.countDocuments(),
        quizzes: await Quiz.countDocuments(),
        questions: await Question.countDocuments(),
      };
    },
  },
  Mutation: {
    AddQuestion: authenticated(async (_: any, args: any, context: any) => {
      const { userId, role } = context;

      const question = await Question.create({ ...args.input, user: userId });
      if (!question) throw new ApolloError("400", "BAD_DATA");
      return question;
    }),
    EditQuestion: authenticated(async (_: any, args: any, context: any) => {
      const question = await Question.findByIdAndUpdate(args.id, {
        ...args.input,
      });
      if (!question) throw new ApolloError("400", "BAD_DATA");
      return question;
    }),
    CreateQuiz: authenticated(
      validateRole(["admin", "super"])(
        async (_: any, args: any, context: any) => {
          const { userId } = context;
          const quiz = await Quiz.create({
            ...args.input,
            user: userId,
          });
          return quiz;
        }
      )
    ),
    ApproveQuestion: authenticated(
      validateRole(["admin", "super", "editor"])(
        async (_: any, args: any, context: any) => {
          const question = await Question.findByIdAndUpdate(args.id, {
            approved: true,
            approvedBy: context.userId,
          });
          return question;
        }
      )
    ),
    DeleteQuestion: authenticated(
      validateRole(["admin", "super", "editor"])(async (_: any, args: any) => {
        const question = await Question.findByIdAndUpdate(args.id, {
          active: false,
        });
        return question;
      })
    ),
    DeleteScore: authenticated(
      validateRole(["admin", "super", "editor", "user"])(
        async (_: any, args: any) => {
          const question = await Score.findByIdAndDelete(args.id);
          return question;
        }
      )
    ),
    DeleteQuiz: authenticated(
      validateRole(["admin", "super", "editor"])(async (_: any, args: any) => {
        const quiz = await Quiz.findByIdAndUpdate(args.id, { active: false });
        return quiz;
      })
    ),
    submitQuizAnswers: authenticated(submitQuizAnswers),
    rateQuestionDifficulty: authenticated(
      async (_: any, { questionId, rating }: any, { userId }: any) => {
        try {
          // Check if user has already rated this question
          const question: any = await Question.findById(questionId);
          const existingRating = question.difficulty.find(
            (d: any) => d.userId.toString() === userId
          );
          if (existingRating) {
            // Update existing rating
            existingRating.rating = rating;
          } else {
            // Add new rating
            question.difficulty.push({ userId: userId, rating });
          }
          await question.save();
          return {
            success: true,
            message: "Question difficulty rating updated successfully.",
          };
        } catch (error) {
          console.error(error);
          return {
            success: false,
            message: "Failed to rate question difficulty.",
          };
        }
      }
    ),
  },
  Quiz: {
    attempts: async (parent: any, args: any) => {
      const count = await Score.aggregate([
        {
          $match: { quizId: new mongoose.Types.ObjectId(parent._id) },
        },
        {
          $group: {
            _id: "$quizId",
            count: { $sum: 1 },
          },
        },
      ]);
      return count[0]?.count || 0;
    },
    userAttempts: async (parent: any, args: any, context: any) => {
      const count = await Score.countDocuments({
        userId: context.userId,
        quizId: parent._id,
      });
      return count;
    },
  },
  User: {
    scores: authenticated(async (parent, args: any, context: any) => {
      const { userId } = context;
      const scores = await Score.find({ userId }).populate("quizId").sort({
        createdAt: -1,
      });

      const scs = scores.map((score) => ({
        ...score,
        id: score._id.toString(),
        quiz: score.quizId,
        score: score.score,
      }));

      return scs;
    }),
  },
  Question: {
    correctAnswer: (parent: any, args: any) => {
      const ans = parent.answer;
      const correct = parent.options.find((opt: any) => opt.id === ans);
      return correct;
    },
  },
};

export default QuizResolver;
