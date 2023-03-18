import * as DOMPurify from "dompurify";
import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function QuizResult({ score, questions }) {
  return (
    <div className="w-full p-6">
      <div className="font-bold text-2xl mb-4">
        Your Score: {score} / {questions.length}
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
            className=" mb-2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(question.text),
            }}
          ></div>
          <hr className="text-red-500 border border-red-500"/>
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
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(question.explanation),
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
        </div>
      ))}
      <Link
        className="px-4 py-1 bg-primary items-center justify-center rounded-md"
        to={"/"}
      >
        Jya Ahatangira
      </Link>
    </div>
  );
}

export default QuizResult;
