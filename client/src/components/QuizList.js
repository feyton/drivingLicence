import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Button, Card, Modal } from "flowbite-react";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
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
    <div className="flex flex-row gap-3 flex-wrap py-2 w-full justify-evenly">
      {quizzes.map((quiz, index) => (
        <Card className="w-[400px]" key={index}>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {quiz.title}
          </h5>

          <p className="font-normal text-gray-700 dark:text-gray-400">
            {quiz.description}
          </p>
          <div className="flex items-center">
            <img
              src={quiz.user.picture}
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-2"
            />
            <div className="flex flex-col">
              <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                {quiz.user.name}
              </h5>
              <p className="text-xs text-gray-500">{quiz.createdAt}</p>
            </div>
          </div>
          <p className="text-muted text-xs ">
            Ibibazo: <b>{quiz.score}</b>. Abantu <b>{quiz.attempts}</b>{" "}
            barayikoze.
          </p>
          <div className="flex justify-between flex-wrap items-center mt-4 gap-4">
            <Link to={`/quiz/${quiz.id}`}>
              <Button>
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
              </Button>
            </Link>
            <CheckRole roles={["admin", "super", "editor"]}>
              <Button
                color={"failure"}
                onClick={() => handleShowDeleteModal(quiz)}
              >
                <FaTrash className="mr-3" />
                Siba
              </Button>
            </CheckRole>
          </div>
        </Card>
      ))}
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>Siba ikizamini</Modal.Header>
        <Modal.Body>Koko se dukomeze dusibe iki kizamini?</Modal.Body>
        <Modal.Footer>
          <Button color={"success"} onClick={() => setShowDeleteModal(false)}>
            Oya
          </Button>
          <Button color={"failure"} variant="danger" onClick={handleDelete}>
            Siba
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QuizList;
