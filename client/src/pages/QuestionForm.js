import { useApolloClient, useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { Button } from "flowbite-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import useTitle from "../utils/useTitle";

const ADD_QUESTION = gql`
  mutation AddQuestion($input: QuestionInput!) {
    AddQuestion(input: $input) {
      id
      text
      options {
        id
        text
      }
      answer
      explanation
    }
  }
`;

function QuestionForm() {
  useTitle("Add question");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { options: [{}] } });
  const [addQuestion] = useMutation(ADD_QUESTION);
  const client = useApolloClient();
  const onSubmit = (data) => {
    const input = {
      ...data,
    };
    addQuestion({ variables: { input } })
      .then((result) => {
        toast.success("Question added");
        reset();
        client.resetStore();
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  return (
    <div>
      <div className="px-5 mt-5 mx-auto w-full ">
        <form
          className="max-w-xl mx-auto bg-white rounded-md px-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="font-bold text-3xl text-center mb-2">Add question</h2>
          <hr />
          <div className="min-h-fit mb-10">
            <label htmlFor="question">Ikibazo:</label>
            <Controller
              control={control}
              name="text"
              rules={{
                validate: (value) =>
                  value.length >= 10 ||
                  "Enter at least 10 characters in the description",
              }}
              error={errors.explanation}
              render={({ field: { onChange, onBlur, value } }) => (
                <ReactQuill
                  theme="snow"
                  onChange={(explanation, delta, source, editor) =>
                    onChange(explanation)
                  }
                  value={value || ""}
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  style={{ height: "100px" }}
                />
              )}
            />
            {errors.question && <span>This field is required</span>}
          </div>
          <div className="  mb-4">
            <label htmlFor="options block">Options</label>
            <div className="flex flex-row gap-2 mb-1">
              <input
                type="text"
                name="options[0].id"
                id="options[0].id"
                defaultValue={"A"}
                className="mr-2 leading-tight w-[20%] appearance-none border rounded-md focus:outline-none focus:shadow-outline"
                placeholder="Option ID"
                {...register("options[0].id", { required: true })}
              />
              <input
                type="text"
                name="options[0].text"
                id="options[0].text"
                className="flex-1 px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Option Text"
                {...register("options[0].text", { required: true })}
              />
            </div>
            <div className="flex flex-row gap-2 mb-1">
              <input
                type="text"
                name="options[1].id"
                id="options[1].id"
                defaultValue={"B"}
                className="mr-2 leading-tight w-[20%] appearance-none border rounded-md focus:outline-none focus:shadow-outline"
                placeholder="Option ID"
                {...register("options[1].id", { required: true })}
              />
              <input
                type="text"
                name="options[1].text"
                id="options[1].text"
                className="flex-1 px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Option Text"
                {...register("options[1].text", { required: true })}
              />
            </div>
            <div className="flex flex-row gap-2 mb-1">
              <input
                type="text"
                name="options[2].id"
                id="options[2].id"
                defaultValue={"C"}
                className="mr-2 leading-tight w-[20%] appearance-none border rounded-md focus:outline-none focus:shadow-outline"
                placeholder="Option ID"
                {...register("options[2].id", { required: true })}
              />
              <input
                type="text"
                name="options[2].text"
                id="options[2].text"
                className="flex-1 px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Option Text"
                {...register("options[2].text", { required: true })}
              />
            </div>
            <div className="flex flex-row gap-2 mb-1">
              <input
                type="text"
                defaultValue={"D"}
                name="options[3].id"
                id="options[3].id"
                className="mr-2 leading-tight w-[20%] appearance-none border rounded-md focus:outline-none focus:shadow-outline"
                placeholder="Option ID"
                {...register("options[3].id", { required: true })}
              />
              <input
                type="text"
                name="options[3].text"
                id="options[3].text"
                className="flex-1 px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Option Text"
                {...register("options[3].text", { required: true })}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="answer">Answer:</label>
            <select
              className="rounded-md"
              {...register("answer", { required: true })}
              name="answer"
              id=""
            >
              <option value="" hidden>
                Select answer ID
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>

            {errors.answer && <span>This field is required</span>}
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="category">Category:</label>
            <select
              className="rounded-md"
              {...register("category", { required: true })}
              name="category"
              id=""
            >
              <option value="" hidden>
                Select category
              </option>
              <option value="general">General</option>
              <option value="posts">Ibyapa</option>
            </select>

            {errors.category && <span>This field is required</span>}
          </div>
          <div className="mb-14">
            <label htmlFor="explanation">Explanation:</label>
            <Controller
              control={control}
              name="explanation"
              rules={{
                validate: (value) =>
                  value.length >= 10 ||
                  "Enter at least 10 characters in the description",
              }}
              error={errors.explanation}
              render={({ field: { onChange, onBlur, value } }) => (
                <ReactQuill
                  theme="snow"
                  onChange={(explanation, delta, source, editor) =>
                    onChange(explanation)
                  }
                  value={value || ""}
                  style={{ height: "100px", borderRadius: "10px" }}
                />
              )}
            />
            {errors.explanation && <span>This field is required</span>}
          </div>
          <Button className="mt-6" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default QuestionForm;
