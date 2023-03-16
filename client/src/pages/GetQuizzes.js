import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
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
    <div className="">
      <Navbar />
      <div>
        <h1>Hitamo kimwe muri ibi bizamini</h1>
        {quizzes && <QuizList quizzes={quizzes} />}
      </div>
    </div>
  );
}

export default GetQuizzes;
