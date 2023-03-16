import { Progress } from "flowbite-react";
import React from "react";

function QuizProgress(props) {
  const { currentQuestionIndex, totalQuestions } = props;
  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="py-3">
      <Progress
        progress={parseInt(progressPercentage)}
        textLabel={`${currentQuestionIndex + 1} / ${totalQuestions}`}
        labelProgress={true}
        size="lg"
        color="green"
      />
    </div>
  );
}

export default QuizProgress;
