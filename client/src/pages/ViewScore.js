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
      {loading && (
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 my-auto mt-20 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8zm8-4a4 4 0 100 8 4 4 0 000-8z"
              />
            </svg>
          )}
          Loading...
        </button>
      )}
      {score && <QuizResult {...score} />}
    </div>
  );
}

export default ViewScore;
