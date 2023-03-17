import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import QuizList from "../components/QuizList";

const GET_QUIZZES = gql`
  query GetQuizzes {
    getQuizzes {
      title
      description
      id
    }
  }
`;

function GetQuizzes() {
  const [getQuizzes] = useLazyQuery(GET_QUIZZES);
  const [quizzes, setQuizzes] = useState();

  useEffect(() => {
    getQuizzes({
      onCompleted: (data) => setQuizzes(data.getQuizzes),
    });
  }, []);
  return (
    <div className=" px-5 mt-10">
      <div>
        <h1 className="align-center text-center justify-center font-bold mb-3 text-xl font-primary ">
          Hitamo kimwe muri ibi bizamini
        </h1>
        <hr />
        {quizzes && <QuizList quizzes={quizzes} />}
      </div>
    </div>
  );
}

export default GetQuizzes;
