import { useApolloClient, useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { Select } from "flowbite-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonCustom from "../components/ButtonCustom";
import useTitle from "../utils/useTitle";

const EDIT_QUESTION = gql`
  mutation EditQuestion($id: ID!, $input: QuestionInput!) {
    EditQuestion(id: $id, input: $input) {
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

function QuestionFormEdit({ question }) {
  const { id, text, options, category, explanation, answer } = question;
  useTitle("Edit question");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { text, options, explanation, answer, category },
  });
  const navigate = useNavigate();
  const [editQuestion, { loading }] = useMutation(EDIT_QUESTION);
  const client = useApolloClient();
  const onSubmit = (data) => {
    const input = {
      ...data,
    };
    editQuestion({ variables: { input, id } })
      .then((result) => {
        toast.success("Question edited");
        reset();
        client.resetStore();
        navigate(-1);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const quilRef = React.useRef();

  const handleImageUpload = () => {
    const editor = quilRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async (e) => {
      e.preventDefault();
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "driving");
      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/feyton/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        editor.insertEmbed(editor.getSelection(), "image", data.secure_url);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    };
  };

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
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
        handlers: {
          image: handleImageUpload,
        },
      },
    }),
    []
  );

  return (
    <div>
      <div className="px-5 mt-5 mx-auto w-full ">
        <form
          className="max-w-xl mx-auto bg-white rounded-md px-6 pb-4 pt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="font-bold text-3xl text-center mb-2">Add question</h2>
          <hr />
          <div className="min-h-fit ">
            <label htmlFor="question">Ikibazo:</label>
            <Controller
              control={control}
              name="text"
              rules={{
                required: "This field is required",
                minLength: {
                  value: 15,
                  message: "Enter at least 10 characters in the question",
                },
              }}
              error={errors.text}
              render={({ field: { onChange, onBlur, value } }) => (
                <ReactQuill
                  ref={quilRef}
                  theme="snow"
                  onChange={(text) => onChange(text)}
                  value={value || ""}
                  modules={modules}
                  className={
                    errors?.text
                      ? "border border-red-500 rounded-md"
                      : "border border-green-300 rounded-md"
                  }
                />
              )}
            />
            {errors.text && (
              <span className="text-red-500 ">{errors.text.message}</span>
            )}
          </div>
          <div className="  mb-4">
            <label htmlFor="options block">Amahitamo</label>
            <div className="flex flex-row gap-2 mb-1">
              <input
                type="text"
                name="options[0].id"
                id="options[0].id"
                defaultValue={"A"}
                className="mr-2 leading-tight w-[40px] font-bold outline-none border-0 appearance-none  rounded-md focus:outline-none focus:shadow-outline"
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
            <Select
              className="rounded-md"
              {...register("answer", { required: "This field is required" })}
              name="answer"
              id="answer"
              helperText={errors.answer && <>Oops! {errors.answer.message}</>}
              color={errors.answer && "failure"}
            >
              <option value="" hidden>
                Select answer ID
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </Select>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="category">Category:</label>
            <Select
              className="rounded-md"
              {...register("category", { required: "Ikiciro kirakenewe" })}
              name="category"
              id=""
              helperText={
                errors?.category && <>Oops! {errors.category.message}</>
              }
              color={errors?.category && "failure"}
            >
              <option value="" hidden>
                Hitamo ikiciro
              </option>
              <option value="general">General</option>
              <option value="posts">Ibyapa</option>
            </Select>
          </div>
          <div className="mb-6 mt-2">
            <label className="font-primary" htmlFor="explanation">
              Ibisobanuro:
            </label>
            <Controller
              control={control}
              name="explanation"
              rules={{
                required: "This field is required",
                minLength: {
                  value: 15,
                  message: "Enter at least 10 characters in the description",
                },
              }}
              error={errors.explanation}
              render={({ field: { onChange, onBlur, value } }) => (
                <ReactQuill
                  theme="snow"
                  onChange={(value) => onChange(value)}
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
                      ["link"],
                      ["clean"],
                    ],
                  }}
                  className={
                    errors?.explanation
                      ? "border border-red-500 rounded-md"
                      : "border border-green-300 rounded-md"
                  }
                />
              )}
            />
            {errors.explanation && <span>{errors.explanation.message}</span>}
          </div>
          <ButtonCustom loading={loading} className="mt-3" type="submit">
            Ohereza
          </ButtonCustom>
        </form>
      </div>
    </div>
  );
}

export default QuestionFormEdit;
