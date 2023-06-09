import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Button, Card, Modal } from "flowbite-react";
import React, { useState } from "react";
import { FaArrowAltCircleRight, FaCheckCircle, FaTrash } from "react-icons/fa";
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
    <div className="flex flex-row gap-3 flex-wrap py-2 w-full justify-start">
      {quizzes.map((quiz, index) => (
        <Card className={`w-[350px]`} key={index}>
          {quiz.userAttempts > 0 ? (
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <FaCheckCircle className="mr-2 text-green-500" />
                <span className="text-xs font-sans font-medium">
                  Iki kizamini wagikoze inshuro <b>{quiz.userAttempts}</b>{" "}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <FaArrowAltCircleRight className="mr-2 text-blue-500" />
                <span className="text-xs font-sans font-medium">
                  Kora iki kizamini bwa mbere
                </span>
              </div>
            </div>
          )}
          <h5 className="text-xl font-sans font-bold tracking-tight text-gray-900 dark:text-white">
            {quiz.title}
          </h5>
          <hr />

          <p className="font-normal font-sans text-xs text-gray-700 dark:text-gray-400">
            {quiz.description}
          </p>
          <div className="flex items-center">
            <img
              src={quiz.user.picture}
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-2"
            />
            <div className="flex flex-col">
              <h5 className="text-xs font-sans font-medium text-gray-900 dark:text-white">
                {quiz.user.name}
              </h5>
              <p className="text-xs text-gray-500">{quiz.createdAt}</p>
            </div>
          </div>
          <p className="text-muted text-xs font-sans">
            Ibibazo: <b>{quiz.score}</b>. Abantu <b>{quiz.attempts}</b>{" "}
            barayikoze.
          </p>
          <div className="flex justify-between flex-wrap items-center mt-4 gap-4">
            <Link className="font-sans" to={`/quiz/${quiz.id}`}>
              <Button className="font-sans">
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
            <CheckRole roles={["super", "admin", "editor"]}>
              <Button
                className="font-sans"
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
      <Modal
        popup={true}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      >
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
