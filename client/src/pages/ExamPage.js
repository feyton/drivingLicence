import { gql, useLazyQuery } from "@apollo/client";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Timer from "../components/Timer";
import { startTimer, stopTimer } from "../redux/reducers/timerReducer";
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
      score
      createdAt
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
    toast.error("You have runned out of time");
    dispatch(stopTimer());
    return;
  };

  return (
    <div className="flex flex-col items-center w-md justify-center h-full relative">
      {quiz ? (
        <>
          <div className="absolute top-5 right-5 rounded-md shadow-lg bg-white">
            {start && <Timer onFinish={handleFinish} duration={1200} />}
          </div>
          <div className="p-6 mt-14 bg-white rounded-md w-md shadow-md ">
            {!start && (
              <div className="text-left">
                <h1 className="font-bold text-2xl mb-4">{quiz.title}</h1>
                <hr />
                <p className="text-lg font-medium">{quiz.description}</p>
                <p className="text-sm font-thin text-left mt-3">
                  Amanota: <b>{quiz.score}</b>
                </p>
                <p className="text-sm font-thin">
                  Yasohotse: <b>{quiz.createdAt}</b>
                </p>
                <Button
                  pill={true}
                  gradientMonochrome="success"
                  color={"success"}
                  className="mt-4 duration-200 transition-all"
                  onClick={handleStart}
                >
                  Tangira ikizamini{" "}
                  <BsArrowRight className="inline-block ml-2" />
                </Button>
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
