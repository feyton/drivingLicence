import { gql } from "apollo-server";

export default gql`
  scalar Date
  type Question {
    id: ID!
    text: String!
    options: [Option!]
    answer: ID!
    explanation: String!
    approved: Boolean!
    user: User
    createdAt: Date
    updatedAt: Date
  }
  type Quiz {
    title: String
    id: ID!
    description: String
    questions: [Question!]
    user: User
    createdAt: Date
  }
  type Score {
    quiz: Quiz!
    user: User
    score: Int
  }
  type User {
    email: String!
    id: ID!
    name: String!
    phoneNumber: String
    password: String!
    role: String!
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
  }
  input QuizInput {
    title: String!
    description: String!
  }

  type Mutation {
    AddQuestion(input: QuestionInput!): Question!
    CreateQuiz(input: QuizInput!): Quiz!
    ApproveQuestion(id: ID!): Question
    DeleteQuestion(id: ID!): Question
    DeleteQuiz(id: ID!): Quiz
  }
`;
