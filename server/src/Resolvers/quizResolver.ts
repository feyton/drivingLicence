import { ApolloError } from "apollo-server-express";
import mongoose from "mongoose";
import { Question, Quiz, Score } from "../models/question";
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
    if (quiz.user.toString() !== userId) {
      throw new Error("Unauthorized to submit quiz answers");
    }

    // Calculate score
    let score = 0;
    const questions = await Promise.all(
      answers.map(async ({ questionId, answer }: any) => {
        const question = await Question.findById(questionId);
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
          correctAnswer: question.options.find((q) => q.id === question.answer),
          userAnswer: question.options.find((q) => q.id === answer),
          explanation: question.explanation,
        };
      })
    );

    // Save score
    const newScore = await Score.create({
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
          const questions = await Question.find({});
          return questions;
        }
      )
    ),
    getQuiz: async (_: any, args: any, context: any) => {
      const quiz = await Quiz.findById(args.id).populate("questions");
      return quiz;
    },
    getQuizzes: async (_: any, args: any, context: any) => {
      const quizzes = await Quiz.find({
        questions: { $size: 1 },
      }).populate("questions");
      return quizzes;
    },
    getScore: authenticated(async (_: any, args: any, context: any) => {
      const score: any = await Score.findById(args.id).populate("quizId");
      const result = {
        score: score?.score,
        id: score._id.toString(),
        questions: JSON.parse(score?.questionsData),
      };
      return result;
    }),
  },
  Mutation: {
    AddQuestion: authenticated(async (_: any, args: any, context: any) => {
      const { userId, role } = context;

      const question = await Question.create({ ...args.input, user: userId });
      if (!question) throw new ApolloError("400", "BAD_DATA");
      return question;
    }),
    CreateQuiz: authenticated(
      validateRole(["admin", "super"])(
        async (_: any, args: any, context: any) => {
          const { userId } = context;
          function shuffleArray<T>(array: T[]): T[] {
            const clonedArray = [...array];

            for (let i = clonedArray.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [clonedArray[i], clonedArray[j]] = [
                clonedArray[j],
                clonedArray[i],
              ];
            }

            return clonedArray;
          }
          const questions: any = await Question.find({ approved: true });
          // @ts-ignore
          if (!questions?.length > 5)
            throw new ApolloError("NO_QUESTIONS", "500");
          const shuffledQuestions = shuffleArray(questions);
          // Select the first 20 questions
          const quizQuestions = shuffledQuestions.slice(0, 20);
          const quiz = await Quiz.create({
            ...args.input,
            questions: quizQuestions,
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
        const question = await Question.findByIdAndDelete(args.id);
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
        const quiz = await Quiz.findByIdAndDelete(args.id);
        return quiz;
      })
    ),
    submitQuizAnswers: authenticated(submitQuizAnswers),
  },
  Quiz: {
    attempts: async (parent: any, args: any) => {
      const count = await Score.aggregate([
        {
          $match: { quizId: new mongoose.Types.ObjectId(parent.quizId) },
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
  },
  User: {
    scores: authenticated(async (parent, args: any, context: any) => {
      const { userId } = context;
      const scores = await Score.find({ userId }).populate("quizId");

      const scs = scores.map((score) => ({
        ...score,
        id: score._id.toString(),
        quiz: score.quizId,
        score: score.score,
      }));

      return scs;
    }),
  },
};

export default QuizResolver;
