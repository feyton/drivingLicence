import { gql } from "@apollo/client";

export const CREATE_QUESTION_MUTATION = gql`
  mutation AddQuestion($input: QuestionInput!) {
    AddQuestion(input: $input) {
      id
      text
      options {
        id
        text
      }
      answer
      explanation
    }
  }
`;
