import * as DOMPurify from "dompurify";
import { Label, Radio } from "flowbite-react";
import React from "react";

function QuizQuestion(props) {
  const { question, options, onSelectOption, selectedOption, questionIndex } =
    props;
  console.log(selectedOption);

  return (
    <div className="font-primary mb-3">
      <div className="flex flex-row gap-3 align-top mb-3">
        <h2 className="font-bold mb-1">{questionIndex}.</h2>
        <div
          className="bg-white "
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question) }}
        ></div>
      </div>
      <hr />

      <div className="bg-gray-100 px-3 py-2 rounded-md shadow-md mt-2">
        {options.map((option, index) => (
          <div className="ml-3 mb-1" key={index}>
            <div className="flex items-center gap-2 py-1">
              <Radio
                id={option.id}
                name="option"
                value={option.id}
                defaultChecked={selectedOption?.id === option?.id}
                onChange={() => onSelectOption(option)}
              />
              <Label htmlFor={option.id}>{option.text}</Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizQuestion;
