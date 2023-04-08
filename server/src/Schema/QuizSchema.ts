import { gql } from "apollo-server";

export default gql`
  scalar Date
  scalar DateTime
  type Question {
    id: ID!
    text: String!
    options: [Option!]
    answer: ID!
    explanation: String!
    approved: Boolean!
    user: User
    approvedBy: User
    updatedAt: Date
    createdAt: Date
    correctAnswer: Option!
    category: String
    timesAddedToQuizzes: Int
    averageDifficulty: Float
    currentUserRating: Int
  }
  type Quiz {
    title: String
    id: ID!
    description: String
    questions: [Question!]
    user: User
    createdAt: Date
    score: Int
    attempts: Int
    userAttempts: Int
    cover: String
  }

  type Option {
    id: ID!
    text: String!
  }

  input QuestionInput {
    text: String!
    options: [OptionInput!]!
    answer: ID!
    explanation: String!
    category: String!
  }

  input OptionInput {
    text: String!
    id: ID!
  }

  type Query {
    getQuestions: [Question]
    getQuizzes: [Quiz]
    getQuiz(id: ID!): Quiz
    getScore(id: ID!): QuizResult!
    getQuestion(id: ID!): Question!
  }
  input QuizInput {
    title: String!
    description: String!
    questions: [ID!]
  }
  type QuizAnswer {
    questionId: ID!
    answer: String!
  }

  input QuizAnswerInput {
    questionId: ID!
    answer: String!
  }

  type Score {
    id: ID!
    quiz: Quiz!
    user: User!
    score: Int!
    answers: String
    questions: QuizQuestionResult
    createdAt: Date
  }

  type QuizResult {
    score: Int!
    questions: [QuizQuestionResult!]!
  }

  type QuizQuestionResult {
    id: ID!
    text: String!
    correctAnswer: Option!
    userAnswer: Option
    explanation: String!
  }

  type Response {
    success: Boolean
    message: String
  }

  type Mutation {
    AddQuestion(input: QuestionInput!): Question!
    CreateQuiz(input: QuizInput!): Quiz!
    ApproveQuestion(id: ID!): Question
    DeleteQuestion(id: ID!): Question
    DeleteQuiz(id: ID!): Quiz
    submitQuizAnswers(quizId: ID!, answers: [QuizAnswerInput]!): QuizResult!
    DeleteScore(id: ID): Score
    EditQuestion(id: ID!, input: QuestionInput!): Question!
    rateQuestionDifficulty(questionId: ID!, rating: Int!): Response
  }
`;
