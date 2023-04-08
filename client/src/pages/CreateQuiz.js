import {
  gql,
  useApolloClient,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import * as DOMPurify from "dompurify";
import { Button, Modal, TextInput, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useTitle from "../utils/useTitle";

const CREATE_QUIZ = gql`
  mutation CreateQuiz($input: QuizInput!) {
    CreateQuiz(input: $input) {
      title
      description
      id
      score
    }
  }
`;

const QuestionCard = ({ question, onRemove, onChecked, field = "add" }) => {
  return (
    <div className="bg-gray-100 shadow-md rounded-md p-4 my-2 cursor-pointer">
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(question.text, {
            FORBID_ATTR: ["img"],
          }),
        }}
        className="font-semibold text-gray-800 mb-2"
      ></div>
      <div className="text-gray-600">
        <div className="flex flex-col mb-1">
          <div>
            <b>Answer: </b>
            {question.correctAnswer.text}
          </div>
          <div>
            <b>Appears in: </b>
            {question.timesAddedToQuizzes} quizzes
          </div>
        </div>

        {field === "add" ? (
          <Button
            size={"xs"}
            color="success"
            onClick={() => onChecked(question)}
          >
            Add to quiz
          </Button>
        ) : (
          <Button
            size={"xs"}
            color="warning"
            onClick={() => onRemove(question)}
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

const GET_QUESTIONS = gql`
  query getQuestions {
    getQuestions {
      id
      text
      timesAddedToQuizzes
      correctAnswer {
        text
      }
      averageDifficulty
    }
  }
`;
const QuizCreationPage = () => {
  useTitle("Ongeraho Ikizamini");
  const [getQuestions, { loading }] = useLazyQuery(GET_QUESTIONS);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [data, setData] = useState(null);
  const [createQuiz, { loading: quizLoading }] = useMutation(CREATE_QUIZ);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    getQuestions({ onCompleted: (data) => setData(data.getQuestions) });
  }, []);

  const onChecked = (question) => {
    if (quizQuestions.length >= 20) return;
    setQuizQuestions((prevQuestions) => [...prevQuestions, question]);
    setData((prevData) => prevData.filter((q) => q !== question));
  };
  const onRemove = (question) => {
    const newQuestions = quizQuestions.filter((q) => q.id !== question.id);
    setQuizQuestions(newQuestions);
    const newSourceQuestions = [...data, question];
    setData(newSourceQuestions);
  };
  const navigate = useNavigate();
  const client = useApolloClient();
  const handleCreateQuiz = async (data) => {
    createQuiz({
      variables: {
        input: { ...data, questions: quizQuestions.map((q) => q.id) },
      },
      onCompleted: () => {
        reset();
        setShowModal(false);
        toast.success("Quiz created succesfully");
        client.resetStore();
        navigate("/quiz");
      },
      onError: (error) => toast.error(error.message),
    });
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 h-full">
        {data && (
          <>
            <div className="bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[600px]">
              <h2 className="text-xl font-bold mb-4">
                Questions ({data.length})
              </h2>

              {data.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  onRemove={onRemove}
                  field="add"
                  onChecked={onChecked}
                  question={question}
                />
              ))}
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[600px]">
              <h2 className="text-xl font-bold mb-4">
                Quiz Questions ({quizQuestions.length})
              </h2>
              {quizQuestions.length === 0 && (
                <p>Click add to place question in a quiz</p>
              )}
              <ul>
                {quizQuestions.map((question, index) => (
                  <li key={question.id}>
                    <QuestionCard
                      onRemove={onRemove}
                      field="remove"
                      onChecked={onChecked}
                      question={question}
                    />
                  </li>
                ))}
              </ul>
              <hr />
              <Button
                disabled={quizQuestions.length === 0}
                className="mt-4"
                onClick={() => setShowModal(true)}
              >
                Create Quiz
              </Button>
            </div>
          </>
        )}
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Create Quiz</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleCreateQuiz)}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title
              </label>
              <TextInput
                type="text"
                name="title"
                id="title"
                className="form-input rounded-md shadow-sm mt-1 block w-full"
                {...register("title", {
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
                helperText={errors.title && <>Oops: {errors.title.message}</>}
                placeholder="Quiz title"
                color={errors?.title && "failure"}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <Textarea
                name="description"
                id="description"
                className="form-textarea rounded-md shadow-sm mt-1 block w-full"
                rows="3"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
                helperText={
                  errors?.description && <>Oops! {errors.description.message}</>
                }
                color={errors?.description && "failure"}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading && (
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
                Create Quiz
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default QuizCreationPage;
