import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Button, Card, Modal } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CheckRole from "../utils/CheckRole";

const DELETE_QUIZ = gql`
  mutation DeleteQuiz($id: ID!) {
    DeleteQuiz(id: $id) {
      id
      title
    }
  }
`;

function QuizList({ quizzes }) {
  const [deleteQuiz] = useMutation(DELETE_QUIZ);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const client = useApolloClient();
  const handleDelete = () => {
    if (selectedQuiz) {
      deleteQuiz({
        variables: { id: selectedQuiz.id },
        onCompleted: (data) => {
          toast.success("Quiz deleted");
          client.resetStore();
        },
      });
      setShowDeleteModal(false);
    }
  };

  const handleShowDeleteModal = (quiz) => {
    setSelectedQuiz(quiz);
    setShowDeleteModal(true);
  };

  return (
    <div className="flex flex-row gap-3 flex-wrap py-2">
      {quizzes.map((quiz, index) => (
        <Card className="max-w-sm" key={index}>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {quiz.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {quiz.description}
          </p>
          <div className="flex justify-between items-center mt-4 gap-4">
            <Link
              className="bg-blue-200 px-6 py-1 flex flex-row gap-1 font-bold rounded-md items-center justify-center"
              to={`/quiz/${quiz.id}`}
            >
              Kora ikizamini
              <svg
                className="ml-2 -mr-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <CheckRole roles={["admin", "super", "editor"]}>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none"
                onClick={() => handleShowDeleteModal(quiz)}
              >
                Siba
              </button>
            </CheckRole>
          </div>
        </Card>
      ))}
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>Delete Quiz</Modal.Header>
        <Modal.Body>Are you sure you want to delete the quiz?</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QuizList;
