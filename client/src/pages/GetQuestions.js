import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { Badge, Button, Tooltip } from "flowbite-react";
import { HiCheck, HiTrash } from "react-icons/hi";

const GET_QUESTIONS = gql`
  query getQuestions {
    getQuestions {
      text
      answer
      approved
      id
    }
  }
`;

const APPROVE_QUESTION = gql`
  mutation ApproveQuestion($id: ID!) {
    ApproveQuestion(id: $id) {
      id
      approved
      text
    }
  }
`;

const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: ID!) {
    DeleteQuestion(id: $id) {
      text
    }
  }
`;

import React, { useEffect, useState } from "react";
import DataTable from "./Questions";

function GetQuestions() {
  const [getQuestions, { loading }] = useLazyQuery(GET_QUESTIONS);
  const [questions, setQuestions] = useState();
  const client = useApolloClient();

  const [deleteQuestion] = useMutation(DELETE_QUESTION);
  const [approveQuestion] = useMutation(APPROVE_QUESTION);
  useEffect(() => {
    getQuestions({
      onCompleted: (data) => {
        setQuestions(data.getQuestions);
      },
    });
  }, []);

  const handleApprove = async (id) => {
    await approveQuestion({ variables: { id } });
    await client.resetStore();
    return;
  };
  const handleDelete = async (id) => {
    await deleteQuestion({ variables: { id } });
    await client.resetStore();
    return;
  };

  const columns = [
    {
      Header: "Text",
      accessor: "text",
    },
    {
      Header: "Answer",
      accessor: "answer",
    },
    {
      Header: "Approved",
      accessor: "approved",
      Cell: ({ row }) => (
        <>
          {row.original.approved === true ? (
            <Badge>True</Badge>
          ) : (
            <Badge>False</Badge>
          )}
        </>
      ),
    },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }) => {
        return (
          <div className="flex flex-row gap-2">
            {row.original.approved === false && (
              <Tooltip content="Approve">
                <Button
                  onClick={() => handleApprove(row.original.id)}
                  size={"xs"}
                >
                  <HiCheck />
                </Button>
              </Tooltip>
            )}
            <Tooltip content="Delete">
              <Button onClick={() => handleDelete(row.original.id)} size={"xs"}>
                <HiTrash />
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <div>{questions && <DataTable data={questions} columns={columns} />}</div>
  );
}

export default GetQuestions;
