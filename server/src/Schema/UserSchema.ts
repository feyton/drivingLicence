import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: ID!
    email: String!
    name: String
    picture: String
    active: Boolean
    role: String
    phoneNumber: String
  }

  type Login {
    token: String!
    user: User!
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }
  input LoginInput {
    email: String!
    password: String!
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
