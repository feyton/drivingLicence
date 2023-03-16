import { ApolloError } from "apollo-server-express";
import { Question, Quiz } from "../models/question";

const QuizResolver: any = {
  Query: {
    getQuestions: async (_: any, args: any, context: any) => {
      const questions = await Question.find({});
      return questions;
    },
    getQuiz: async (_: any, args: any, context: any) => {
      const quiz = await Quiz.findById(args.id);
      return quiz;
    },
    getQuizzes: async (_: any, args: any, context: any) => {
      const quizzes = await Quiz.find({}).populate("questions");
      console.log(quizzes);
      return quizzes;
    },
  },
  Mutation: {
    AddQuestion: async (_: any, args: any, context: any) => {
      const { userId, role } = context;
      console.log(args);
      const question = await Question.create({ ...args.input });
      console.log(question);
      if (!question) throw new ApolloError("400", "BAD_DATA");
      return question;
    },
    CreateQuiz: async (_: any, args: any, context: any) => {
      function shuffleArray<T>(array: T[]): T[] {
        const clonedArray = [...array];

        for (let i = clonedArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
        }

        return clonedArray;
      }
      const questions: any = await Question.find({ approved: true });
      // @ts-ignore
      if (!questions?.length > 5) throw new ApolloError("NO_QUESTIONS", "500");
      const shuffledQuestions = shuffleArray(questions);
      // Select the first 20 questions
      const quizQuestions = shuffledQuestions.slice(0, 20);
      const quiz = await Quiz.create({
        ...args.input,
        questions: quizQuestions,
      });
      return quiz;
    },
    ApproveQuestion: async (_: any, args: any, context: any) => {
      const question = await Question.findByIdAndUpdate(args.id, {
        approved: true,
      });
      return question;
    },
    DeleteQuestion: async (_: any, args: any) => {
      const question = await Question.findByIdAndDelete(args.id);
      return question;
    },
  },
};

export default QuizResolver;
