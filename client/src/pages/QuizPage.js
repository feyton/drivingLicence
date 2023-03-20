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
  const [submitQuizAnswers, { loading, error, data }] =
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResults] = useState();
  const client = useApolloClient();
  const dispatch = useDispatch();
  async function handleSubmit() {
    setIsSubmitting(true);
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
    setIsSubmitting(false);
    setResults(res.data.submitQuizAnswers);
    client.resetStore();
  }

  return (
    <>
      {!result && (
        <div className="mt-10 min-w-[600px]">
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
              <Button onClick={handlePreviousQuestion}>Ikibanza</Button>
            )}
            {hasNextQuestion && (
              <Button
                disabled={!answers[currentQuestion.id]}
                onClick={handleNextQuestion}
              >
                Igikurikira
              </Button>
            )}
            {!hasNextQuestion && (
              <Button
                disabled={!answers[currentQuestion.id]}
                onClick={handleSubmit}
              >
                Ohereza
              </Button>
            )}
          </div>
          <QuizProgress
            currentQuestionIndex={
              answers[currentQuestion.id] ? currentQuestionIndex : -1
            }
            totalQuestions={quiz.questions.length}
          />
        </div>
      )}

      <Modal isOpen={isSubmitting}>
        <Modal.Body>
          <div className="text-center">
            <p className="text-lg font-bold">Sending your answers...</p>
          </div>
        </Modal.Body>
      </Modal>

      {result && <QuizResult {...result} />}
    </>
  );
}

export default QuizPage;
