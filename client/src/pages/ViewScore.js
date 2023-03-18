import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizResult from "./QuizResults";

const GET_SCORE = gql`
  query GetScore($id: ID!) {
    getScore(id: $id) {
      score
      questions {
        id
        text
        correctAnswer {
          id
          text
        }
        userAnswer {
          id
          text
        }
        explanation
      }
    }
  }
`;

function ViewScore() {
  const { id } = useParams();
  const [score, setscore] = useState();
  const [getscore, { loading }] = useLazyQuery(GET_SCORE);

  useEffect(() => {
    getscore({
      variables: { id },
      onCompleted: (data) => setscore(data.getScore),
    });
  }, []);
  return (
    <div>
      {loading && "Loading"}
      {score && <QuizResult {...score} />}
    </div>
  );
}

export default ViewScore;
