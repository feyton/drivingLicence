import {
  gql,
  useApolloClient,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import { Table } from "flowbite-react";
import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

  const handleDeleteScore = (id) => {
    if (window.confirm("Are you sure you want to delete this score?")) {
      deleteScore({ variables: { id } })
        .then(async () => {
          // reload the profile to update the scores
          await client.resetStore();
        })
        .catch((error) => {
          console.error(error);
        });
    }
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

  const { email, id, name, phoneNumber, picture, scores } = data.getProfile;

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
                  <Table.Row key={id}>
                    <Table.Cell>{index}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {quiz.title}
                    </Table.Cell>
                    <Table.Cell>{`${score} / ${quiz.score}`}</Table.Cell>
                    <Table.Cell>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded"
                        onClick={() => handleDeleteScore(id)}
                      >
                        Delete
                      </button>
                      <Link
                        to={`/score/${id}`}
                        className="bg-green-500 ml-2 hover:bg-green-600 text-white font-semibold px-2 py-1 rounded"
                       
                      >
                        View
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
