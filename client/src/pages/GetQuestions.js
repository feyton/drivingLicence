import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import * as DOMPurify from "dompurify";
import { Badge, Button, Modal, Spinner, Tooltip } from "flowbite-react";
import { HiCheck, HiEye, HiTrash, HiX } from "react-icons/hi";

const GET_QUESTIONS = gql`
  query getQuestions {
    getQuestions {
      text
      answer
      approved
      id
      correctAnswer {
        text
      }
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

const GET_QUESTION = gql`
  query getQuestion($id: ID!) {
    getQuestion(id: $id) {
      text
      id
      answer
      approved
      options {
        id
        text
      }
      explanation
      user {
        name
      }
      createdAt
      correctAnswer {
        id
        text
      }
    }
  }
`;

import React, { useEffect, useState } from "react";
import DataTable from "./Questions";

function GetQuestions() {
  const [getQuestions, { loading }] = useLazyQuery(GET_QUESTIONS);
  const [getQuestion, { loading: loadingQuestion, data }] =
    useLazyQuery(GET_QUESTION);
  const [selectedQuestionView, setSelectedQuestionView] = useState(null);
  const [questions, setQuestions] = useState();
  const client = useApolloClient();

  const [deleteQuestion] = useMutation(DELETE_QUESTION);
  const [approveQuestion] = useMutation(APPROVE_QUESTION);
  const [selectedQuestion, setselectedQuestion] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
  const handleDelete = () => {
    if (selectedQuestion) {
      deleteQuestion({
        variables: { id: selectedQuestion },
        onCompleted: async (data) => {
          await client.resetStore();
        },
      });
      setShowDeleteModal(false);
    }
  };
  const handleShowDeleteModal = (question) => {
    setselectedQuestion(question.id);
    setShowDeleteModal(true);
  };

  const handleView = (id) => {
    setSelectedQuestionView(id);
    getQuestion({ variables: { id } });
  };

  const columns = [
    {
      Header: "Text",
      accessor: "text",
      Cell: ({ row }) => (
        <div
          onClick={() => handleView(row.original.id)}
          role="button"
          className=" text-xs hover:text-primary"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(row.original.text),
          }}
        ></div>
      ),
    },
    {
      Header: "Answer",
      accessor: "correctAnswer.text",
    },
    {
      Header: "Approved",
      accessor: "approved",
      Cell: ({ row }) => (
        <>
          {row.original.approved === true ? (
            <Badge
              icon={HiCheck}
              className="w-fit px-3"
              size={"xs"}
              color={"success"}
            >
              Yego
            </Badge>
          ) : (
            <Badge
              icon={HiX}
              className="w-fit px-3"
              size={"xs"}
              color="failure"
            >
              Oya
            </Badge>
          )}
        </>
      ),
    },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }) => {
        return (
          <div className="flex flex-row gap-2 items-center justify-center">
            {row.original.approved === false && (
              <Tooltip content="Emeza">
                <Button
                  color={"info"}
                  onClick={() => handleApprove(row.original.id)}
                  size={"xs"}
                >
                  <HiCheck />
                </Button>
              </Tooltip>
            )}
            <Tooltip content="Reba">
              <Button
                color={"success"}
                onClick={() => handleView(row.original.id)}
                size={"xs"}
              >
                <HiEye />
              </Button>
            </Tooltip>
            <Tooltip content="Siba">
              <Button
                color={"failure"}
                onClick={() => handleShowDeleteModal(row.original)}
                size={"xs"}
              >
                <HiTrash />
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      {questions && <DataTable data={questions} columns={columns} />}
      <Modal
        show={!!selectedQuestionView}
        onClose={() => setSelectedQuestionView(null)}
      >
        {loadingQuestion && (
          <Modal.Body>
            <Spinner />
          </Modal.Body>
        )}
        {data && (
          <>
            <Modal.Header>
              <div
                className="bg-white "
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data.getQuestion.text),
                }}
              ></div>
            </Modal.Header>
            <Modal.Body>
              <div className="bg-gray-100 px-3 py-2 rounded-md shadow-md">
                <p className="font-semibold pb-1">Amahitamo: </p>
                <hr />
                {data.getQuestion.options.map((option, index) => (
                  <div className="ml-3 mb-1" key={index}>
                    <div className="flex items-center gap-2 py-1">
                      <span>{option.id}.</span>
                      <span>{option.text}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center mb-2 mt-2">
                <div className="font-bold mr-2">Igisubizo:</div>
                <div>{data.getQuestion.correctAnswer.text}</div>
              </div>
              <div className="flex flex-col  justify-start">
                <div className="font-bold mr-2">Ubusobanuro:</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data.getQuestion.explanation),
                  }}
                ></div>
              </div>
              <div className="text-muted text-xs my-1">
                <span>
                  Submitted by: <b>{data.getQuestion.user.name}</b>
                </span>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                color="success"
                onClick={() => handleApprove(data.getQuestion.id)}
              >
                Emeza
              </Button>
              <Button
                color={"failure"}
                onClick={() => handleShowDeleteModal(data.getQuestion)}
              >
                Siba
              </Button>
              <Button
                color={"warning"}
                onClick={() => setSelectedQuestionView(null)}
              >
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>Siba ikibazo</Modal.Header>
        <Modal.Body>Koko se dukomeze dusibe iki kibazo?</Modal.Body>
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

export default GetQuestions;
