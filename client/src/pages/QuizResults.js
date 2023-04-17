import { gql, useMutation } from "@apollo/client";
import * as DOMPurify from "dompurify";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonCustom from "../components/ButtonCustom";

const RATE_QUESTION_DIFFICULTY = gql`
  mutation RateDifficulty($questionId: ID!, $rating: Int!) {
    rateQuestionDifficulty(questionId: $questionId, rating: $rating) {
      success
      message
    }
  }
`;

function QuizResult({ score, questions }) {
  const [ratings, setRatings] = useState({});
  const [rateQuestionDifficulty, { loading }] = useMutation(
    RATE_QUESTION_DIFFICULTY
  );
  const submitRatings = async () => {
    try {
      await Promise.all(
        Object.keys(ratings).forEach((item) => {
          rateQuestionDifficulty({
            variables: {
              questionId: item,
              rating: ratings[item],
            },
          });
        })
      );
      toast.success("Your ratings has been submitted. Thank you");
    } catch (error) {}
  };
  const percentScore = ((score / questions.length) * 100).toFixed();
  return (
    <div className="w-full p-6">
      <div className="font-bold text-2xl mb-4 flex items-center flex-row gap-3">
        <h1>
          Amanota: {score} / {questions.length} ➡️{" "}
          {percentScore >= 60 ? "Watsinze" : "Ntabwo watsinze"}
        </h1>
        <div
          className={`h-12 w-12 flex items-center justify-center rounded-full mb-4 ${
            percentScore >= 60 ? "bg-green-400" : "bg-red-400"
          }`}
        >
          {percentScore >= 60 ? (
            <FaCheck className="text-white text-2xl" />
          ) : (
            <FaTimes className="text-white text-2xl" />
          )}
        </div>
      </div>
      {questions.map((question) => (
        <div
          key={question.id}
          className={`p-4 border-2 rounded-lg mb-4 ${
            question.correctAnswer.id === question.userAnswer.id
              ? "border-green-400 bg-green-100"
              : "border-red-400 bg-red-100"
          }`}
        >
          <div
            className=" mb-2 font-sans"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(question.text),
            }}
          ></div>
          <hr className="text-red-500 border border-red-500" />
          <div className="flex items-center mb-2 mt-2">
            <div className="font-bold mr-2">Igisubizo cya nyacyo:</div>
            <div>{question.correctAnswer.text}</div>
          </div>
          <div className="flex items-center mb-2">
            <div className="font-bold mr-2">Igisubizo cyawe:</div>
            <div>{question.userAnswer.text}</div>
          </div>
          <div className="flex flex-col  justify-start">
            <div className="font-bold mr-2">Ubusobanuro:</div>
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: question.explanation,
              }}
            ></div>
          </div>
          {question.correctAnswer.id === question.userAnswer.id ? (
            <div className="flex items-center mt-2 text-green-400">
              <FaCheck className="mr-1" />
              Wagikoze neza
            </div>
          ) : (
            <div className="flex items-center mt-2 text-red-400">
              <FaTimes className="mr-1" />
              Ntabwo wagikoze
            </div>
          )}
          <div className="hidden md:flex items-center mt-2">
            <div className="font-bold mr-2">Rate the difficulty:</div>
            <div className=" hidden md:flex">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  color={
                    ratings[question.id] === rating
                      ? rating === 5
                        ? "failure"
                        : "info"
                      : "secondary"
                  }
                  onClick={() =>
                    setRatings({ ...ratings, [question.id]: rating })
                  }
                >
                  {rating}{" "}
                  {rating === 1
                    ? "Very Easy"
                    : rating === 2
                    ? "Easy"
                    : rating === 3
                    ? "Moderate"
                    : rating === 4
                    ? "Difficult"
                    : "Very Difficult"}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="flex flex-row gap-4 ">
        <Link to={"/quiz"}>
          <Button color={"info"}>Subira kubizamini</Button>
        </Link>
        <ButtonCustom
          disabled={Object.keys(ratings).length === 0}
          className="hidden md:block"
          color="warning"
          loading={loading}
          onClick={submitRatings}
        >
          Send Ratings
        </ButtonCustom>
      </div>
    </div>
  );
}

export default QuizResult;
