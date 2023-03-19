import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import QuizList from "../components/QuizList";

const GET_QUIZZES = gql`
  query GetQuizzes {
    getQuizzes {
      title
      description
      id
      score
    }
  }
`;

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

function GetQuizzes() {
  const [getQuizzes, { loading: getQuizLoading }] = useLazyQuery(GET_QUIZZES);
  const [quizzes, setQuizzes] = useState();
  const [createQuiz, { loading }] = useMutation(CREATE_QUIZ);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const handleCreateQuiz = async (data) => {
    try {
      await createQuiz({
        variables: { input: data },
        onCompleted: () => {
          reset();
          setShowModal(false);
          getQuizzes();
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuizzes({
      onCompleted: (data) => setQuizzes(data.getQuizzes),
    });
  }, []);

  return (
    <div className="px-5 mt-10">
      <div className="flex justify-end mb-3">
        <Button onClick={() => setShowModal(true)}>Create Quiz</Button>
      </div>
      <hr />
      {quizzes && <QuizList quizzes={quizzes} />}
      {getQuizLoading && (
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          (
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
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
          ) Loading
        </button>
      )}
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
              <input
                type="text"
                name="title"
                id="title"
                className="form-input rounded-md shadow-sm mt-1 block w-full"
                {...register("title", { required: true })}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="form-textarea rounded-md shadow-sm mt-1 block w-full"
                rows="3"
                {...register("description", { required: true })}
              ></textarea>
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
}

export default GetQuizzes;
