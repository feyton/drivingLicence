import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
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
  const onClick = () => {
    dispatch(startTimer());
    setStart(true);
  };
  const [quiz, setQuiz] = useState();
  const [getQuiz] = useLazyQuery(GET_QUIZ);

  useEffect(() => {
    getQuiz({
      variables: { id },
      onCompleted: (data) => setQuiz(data.getQuiz),
    });
  }, []);
  return (
    <div className="flex flex-col relative px-5 mt-5 rounded-md py-2 ">
      {quiz && (
        <>
          <div className="absolute top-3 right-10">
            <Timer />
          </div>
          {!start && quiz && (
            <div className="mt-3 justify-start">
              <h1 className="font-bold text-xl font-primary">Instructions</h1>
              <p className="font-secondary my-1/2 ml-2 ">
                Iki kizamini kimara iminota 20
              </p>
              <p className="font-secondary my-1/2 ml-2 ">
                Nyuma yo guhitamo igisubizo kandi "Igikurikira"
              </p>
              <p className="font-secondary my-1/2 ml-2 ">
                Uhita ubona amanota ukirangiza ikizamini
              </p>
              <button
                className="justify-start text-white font-bold font-primary px-4 py-2 mt-4 bg-blue-500 rounded-md"
                onClick={onClick}
              >
                Tangira Ikizamini
              </button>
            </div>
          )}

          {start && <QuizPage quiz={quiz} />}
        </>
      )}
    </div>
  );
}

export default ExamPage;
