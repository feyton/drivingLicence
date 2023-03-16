import React from "react";

function QuizQuestion(props) {
  const { question, options, onSelectOption, selectedOption, questionIndex } = props;

  return (
    <div className="font-primary mb-3">
      <h2 className="font-bold mb-1">{questionIndex}. {question}</h2>
      {options.map((option, index) => (
        <div className="ml-3 mb-1" key={index}>
          <label>
            <input
              required
              type="radio"
              name="option"
              className="mr-2"
              value={option.id}
              checked={selectedOption === option?.id}
              onChange={() => onSelectOption(option)}
            />
            {option.text}
          </label>
        </div>
      ))}
    </div>
  );
}

export default QuizQuestion;
