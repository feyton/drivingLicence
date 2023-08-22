import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: ID!
    email: String!
    name: String
    picture: String
    active: Boolean!
    role: String
    phoneNumber: String
    scores: [Score]
    questions: [Question]
  }

  type Login {
    token: String!
    user: User!
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    getProfile: User!
  }
  input LoginInput {
    email: String
    password: String
    token: String
  }
  input ChangeInput {
    role: String
  }
  input SignupInput {
    email: String!
    password: String!
    name: String!
    phoneNumber: String!
  }
  type Mutation {
    loginUser(input: LoginInput!): Login!
    changeRole(input: ChangeInput!): User!
    deactivateUser(id: ID!): User!
    createUser(input: SignupInput!): Login!
  }
`;
