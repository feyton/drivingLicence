import { gql, useLazyQuery } from "@apollo/client";
import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTitle from "../utils/useTitle";
import QuestionFormEdit from "./QuestionFormEdit";

const GET_QUESTION = gql`
  query getQuestion($id: ID!) {
    getQuestion(id: $id) {
      text
      id
      answer
      category
      options {
        id
        text
      }
      explanation
      correctAnswer {
        id
        text
      }
    }
  }
`;

function QuestionEditPage() {
  const { id } = useParams();
  useTitle("Edit question");
  const [question, setQuestion] = useState();
  const [getQuestion, { loading }] = useLazyQuery(GET_QUESTION);
  useEffect(() => {
    getQuestion({
      variables: { id },
      onCompleted: (data) => setQuestion(data.getQuestion),
    });
  });
  return (
    <div>
      {loading && <Spinner />}
      {question && <QuestionFormEdit question={question} />}
    </div>
  );
}

export default QuestionEditPage;
