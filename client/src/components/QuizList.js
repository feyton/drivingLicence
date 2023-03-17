import { Card } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

function QuizList({ quizzes }) {
  return (
    <div className="flex flex-row gap-3 flex-wrap py-2">
      {quizzes.map((quiz, index) => (
        <Card className="max-w-sm" key={index}>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {quiz.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {quiz.description}
          </p>
          <Link className="bg-blue-200 px-6 py-1 flex flex-row gap-1 font-bold rounded-md items-center justify-center" to={`/quiz/${quiz.id}`}>
            Attempt
            <svg
              className="ml-2 -mr-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </Card>
      ))}
    </div>
  );
}

export default QuizList;
