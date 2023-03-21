import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import QuizQuestion from "../components/Question";
import QuizProgress from "../components/QuizProgress";

import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { stopTimer } from "../redux/reducers/timerReducer";
import QuizResult from "./QuizResults";

export const SUBMIT_QUIZ_ANSWERS = gql`
  mutation SubmitQuizAnswers($quizId: ID!, $answers: [QuizAnswerInput]!) {
    submitQuizAnswers(quizId: $quizId, answers: $answers) {
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

function QuizPage(props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const { quiz } = props;
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const hasNextQuestion = !isLastQuestion;
  const [submitQuizAnswers, { loading: isSubmitting, error, data }] =
    useMutation(SUBMIT_QUIZ_ANSWERS);

  function handleSelectOption(questionId, option) {
    setAnswers({ ...answers, [questionId]: option });
    console.log(answers);
  }

  function handleNextQuestion() {
    if (hasNextQuestion && answers[currentQuestion.id]) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }
  function handlePreviousQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  const [result, setResults] = useState();
  const client = useApolloClient();
  const dispatch = useDispatch();
  async function handleSubmit() {
    const quizId = quiz.id;
    dispatch(stopTimer());
    const answersArray = Object.entries(answers).map(
      ([questionId, answer]) => ({
        questionId,
        answer: answer.id,
      })
    );
    const res = await submitQuizAnswers({
      variables: { quizId, answers: answersArray },
    });
    setResults(res.data.submitQuizAnswers);
    client.resetStore();
  }

  return (
    <>
      {!result && (
        <div className="mt-8 sm:w-full md:w-[600px]">
          {currentQuestion && (
            <QuizQuestion
              key={currentQuestion.id}
              question={currentQuestion.text}
              options={currentQuestion.options}
              selectedOption={answers[currentQuestion?.id]}
              onSelectOption={(option) =>
                handleSelectOption(currentQuestion.id, option)
              }
              questionIndex={currentQuestionIndex + 1}
            />
          )}

          <div className="flex flex-row gap-5">
            {currentQuestionIndex > 0 && (
              <Button onClick={handlePreviousQuestion}>
                {isSubmitting && (
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
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
                Ikibanza
              </Button>
            )}
            {hasNextQuestion && (
              <Button
                disabled={!answers[currentQuestion.id]}
                onClick={handleNextQuestion}
              >
                {isSubmitting && (
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
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
                Igikurikira
              </Button>
            )}
            {!hasNextQuestion && (
              <Button
                disabled={!answers[currentQuestion.id]}
                onClick={handleSubmit}
              >
                {isSubmitting && (
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
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
                {isSubmitting ? "Komereza..." : "Ohereza"}
              </Button>
            )}
          </div>
          <QuizProgress
            currentQuestionIndex={
              answers[currentQuestion.id]
                ? currentQuestionIndex
                : currentQuestionIndex - 1
            }
            totalQuestions={quiz.questions.length}
          />
        </div>
      )}

      {result && <QuizResult {...result} />}
      <Modal isOpen={isSubmitting}>
        <Modal.Body>
          <div className="text-center">
            <p className="text-lg font-bold">Sending your answers...</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default QuizPage;
