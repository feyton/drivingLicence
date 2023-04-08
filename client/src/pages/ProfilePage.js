import {
  gql,
  useApolloClient,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      id
      name
      email
      phoneNumber
      picture
      scores {
        id
        quiz {
          id
          title
          description
          score
        }
        score
        createdAt
      }
    }
  }
`;
const DELETE_SCORE = gql`
  mutation DeleteScore($id: ID!) {
    DeleteScore(id: $id) {
      id
    }
  }
`;

function UserProfile() {
  const { authenticated } = useSelector((state) => state.auth);

  const [getProfile, { loading, data }] = useLazyQuery(GET_PROFILE);

  useEffect(() => {
    if (authenticated) {
      getProfile();
    }
  }, [authenticated, getProfile]);
  const [deleteScore] = useMutation(DELETE_SCORE);
  const client = useApolloClient();
  const [selectedScore, setselectedScore] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDelete = () => {
    if (selectedScore) {
      deleteScore({
        variables: { id: selectedScore },
        onCompleted: async (data) => {
          toast.success("Score deleted");
          await client.resetStore();
        },
      });
      setShowDeleteModal(false);
    }
  };
  const handleShowDeleteModal = (score) => {
    setselectedScore(score);
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin h-5 w-5 mr-3" />
        <span>Loading...</span>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { email, name, phoneNumber, picture, scores } = data.getProfile;
  const scorePercentage = (score, total) => {
    return ((score / total) * 100).toFixed();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <img src={picture} alt={name} className="h-12 w-12 rounded-full" />
            <div className="ml-4">
              <p className="text-lg font-semibold text-gray-800">{name}</p>
              <p className="text-sm text-gray-600">{email}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-800">
              Contact Information
            </h3>
            <p className="text-sm text-gray-600">{phoneNumber}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-bold text-center text-gray-800">
              Quiz Scores
            </h3>

            <Table hoverable={true}>
              <Table.Head>
                <Table.HeadCell>SN</Table.HeadCell>
                <Table.HeadCell>Quiz Title</Table.HeadCell>
                <Table.HeadCell>Score</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {scores.map(({ id, answers, quiz, score }, index) => (
                  <Table.Row
                    key={id}
                    className={
                      scorePercentage(score, quiz.score) >= 60
                        ? "bg-green-200 bg-opacity-40"
                        : "bg-red-200 bg-opacity-40"
                    }
                  >
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      <Link to={`/score/${id}`}>{quiz.title}</Link>
                    </Table.Cell>
                    <Table.Cell>{`${score} / ${quiz.score}`}</Table.Cell>
                    <Table.Cell className="flex flex-row gap-3 justify-center">
                      <Button
                        color={"failure"}
                        size="xs"
                        onClick={() => handleShowDeleteModal(id)}
                      >
                        Delete
                      </Button>
                      <Link to={`/score/${id}`}>
                        <Button size={"xs"} color={"success"}>
                          View
                        </Button>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <Modal
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
          >
            <Modal.Header>Siba ikizamini</Modal.Header>
            <Modal.Body>Koko se dukomeze dusibe iki kizamini?</Modal.Body>
            <Modal.Footer>
              <Button
                color={"success"}
                onClick={() => setShowDeleteModal(false)}
              >
                Oya
              </Button>
              <Button color={"failure"} variant="danger" onClick={handleDelete}>
                Siba
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
