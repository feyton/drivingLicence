import { Button } from "flowbite-react";
import React, { useState } from "react";
import QuizQuestion from "../components/Question";
import QuizProgress from "../components/QuizProgress";

function QuizPage(props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const { quiz } = props;
  console.log(quiz)
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const hasNextQuestion = !isLastQuestion;

  function handleSelectOption(questionId, option) {
    setAnswers({ ...answers, [questionId]: option });
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

  function handleSubmit() {
    // Handle submitting answers to server or displaying results
    console.log(answers);
  }

  return (
    <div className="mt-10">
      <h1 className="font-bold font-primary text-xl mb-1">{quiz.title}</h1>
      <p className="italic font-secondary ">{quiz.description}</p>
      <hr className="mb-3 " />
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
          <Button onClick={handlePreviousQuestion}>Previous</Button>
        )}
        {hasNextQuestion && (
          <Button
            disabled={!answers[currentQuestion.id]}
            onClick={handleNextQuestion}
          >
            Next
          </Button>
        )}
        {!hasNextQuestion && (
          <Button
            disabled={!answers[currentQuestion.id]}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
      </div>
      <QuizProgress
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={quiz.questions.length}
      />
    </div>
  );
}

export default QuizPage;
