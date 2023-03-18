import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Timer from "../components/Timer";
import { startTimer } from "../redux/reducers/timerReducer";
import useTitle from "../utils/useTitle";
import QuizPage from "./QuizPage";

const GET_QUIZ = gql`
  query GetQuiz($id: ID!) {
    getQuiz(id: $id) {
      title
      id
      description
      questions {
        text
        id
        options {
          id
          text
        }
      }
    }
  }
`;

function ExamPage() {
  const { id } = useParams();
  useTitle("Take Quiz");
  const dispatch = useDispatch();
  const [start, setStart] = useState(false);
  const [quiz, setQuiz] = useState();
  const [getQuiz] = useLazyQuery(GET_QUIZ);

  useEffect(() => {
    getQuiz({
      variables: { id },
      onCompleted: (data) => setQuiz(data.getQuiz),
    });
  }, []);

  const handleStart = () => {
    dispatch(startTimer());
    setStart(true);
  };

  const handleFinish = () => {
    setStart(false);
  };

  return (
    <div className="flex flex-col items-center w-md justify-center h-full">
      {quiz ? (
        <>
          <div className="absolute top-10 right-5">
            {start && <Timer onFinish={handleFinish} duration={1200} />}
          </div>
          <div className="p-6 mt-10 bg-white rounded-md w-md shadow-md ">
            {!start && (
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-4">{quiz.title}</h1>
                <p className="text-lg font-medium">{quiz.description}</p>
                <button
                  className="mt-8 px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200"
                  onClick={handleStart}
                >
                  Tangira ikizamini <BsArrowRight className="inline-block ml-2" />
                </button>
              </div>
            )}

            {start && <QuizPage quiz={quiz} onFinish={handleFinish} />}
          </div>
        </>
      ) : (
        "No quiz selected"
      )}
    </div>
  );
}

export default ExamPage;
