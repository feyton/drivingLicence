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
  const [getQuiz, { loading }] = useLazyQuery(GET_QUIZ);

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
                  Tangira ikizamini{" "}
                  <BsArrowRight className="inline-block ml-2" />
                </button>
              </div>
            )}

            {start && <QuizPage quiz={quiz} onFinish={handleFinish} />}
          </div>
        </>
      ) : (
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
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
    </div>
  );
}

export default ExamPage;
