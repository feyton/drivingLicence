import { gql, useLazyQuery } from "@apollo/client";
import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const GET_COUNTS = gql`
  query getCounts {
    getCounts {
      users
      quizzes
      questions
    }
  }
`;

function LandingPage(props) {
  const [getCounts, { loading, data }] = useLazyQuery(GET_COUNTS);
  useEffect(() => {
    getCounts();
  }, []);
  return (
    <>
      <div className="hero">
        <div className="hero w-full min-h-screen flex flex-col justify-center grow items-center ">
          <div className="">
            <div className="flex h-full flex-col items-center justify-start  w-full px-4 py-2">
              <h1 className="mt-28 sm:mt-20 text-2xl sm:text-4xl md:pl-10 md:text-6xl font-bold text-white dark:text-dark-text-fill font-lexend text-center md:text-left">
                Bona provisoire vuba cyane.
              </h1>
              <p className="text-2xl md:text-4xl lg:text-3xl mt-8 md:mt-8 lg:mt-8 w-full sm:w-3/4 md:w-4/5 lg:w-full md:px-0 lg:px-8 text-white dark:text-dark-text-fill font-sans text-center">
                Aho wakwimenyereza:
                <em>
                  <b> Ukihugura ➡️ </b>
                </em>
                <em>
                  <b> Ugatsinda</b>
                </em>
              </p>

              <div className="w-full text-center flex flex-row gap-6 justify-center items-center mt-20 mb-20">
                <Link to="quiz" className=" ">
                  <Button
                    variant="primary"
                    className="px-4 py-0 mx-auto font-lexend"
                    size="lg"
                  >
                    Tangira
                  </Button>
                </Link>
                <Link to="igazeti" className=" ">
                  <Button
                    variant="primary"
                    color={"success"}
                    className="px-4 py-0 mx-auto font-lexend"
                    size="lg"
                  >
                    Soma igazeti
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="bg-gray-100 py-12">
        <div class="container mx-auto">
          <h1 className="text-center pb-12 text-3xl font-bold">About Us</h1>
          <div class="flex flex-wrap justify-evenly">
            <div class="flex items-center px-4 py-2 rounded-md shadow-md bg-white">
              <div class="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm3.93 8.93l-3.5 5a1 1 0 01-1.4.2l-2.5-2a1 1 0 011.2-1.6l1.8 1.44 3.3-4.7a1 1 0 011.7 1.1z" />
                </svg>
              </div>
              <div>
                <div class="text-4xl font-bold text-gray-800">
                  {data?.getCounts.questions}
                </div>
                <div class="text-lg font-medium text-gray-600">Questions</div>
              </div>
            </div>
            <div class="flex items-center px-4 py-2 rounded-md shadow-md bg-white mt-8 md:mt-0">
              <div class="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-green-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5 11h-4v4h-2v-4H5v-2h4V5h2v4h4z" />
                </svg>
              </div>
              <div>
                <div class="text-4xl font-bold text-gray-800">
                  {data?.getCounts.users}
                </div>
                <div class="text-lg font-medium text-gray-600">Users</div>
              </div>
            </div>
            <div class="flex items-center px-4 py-2 rounded-md shadow-md bg-white mt-8 md:mt-0">
              <div class="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M16 0v1H4v-.998c0-.551.443-.999 1-.999h10c.552 0 1 .447 1 1.001v.996zM5 5h9v1H5V5zm0 4h9v1H5V9zm0 4h5v1H5v-1z" />
                </svg>
              </div>
              <div>
                <div class="text-4xl font-bold text-gray-800">
                  {data?.getCounts.quizzes}
                </div>
                <div class="text-lg font-medium text-gray-600">Quizzes</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
