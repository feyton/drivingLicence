import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import ExamPage from "./pages/ExamPage";
import GetQuestions from "./pages/GetQuestions";
import GetQuizzes from "./pages/GetQuizzes";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import QuestionForm from "./pages/QuestionForm";
import RegisterPage from "./pages/RegisterPage";
import store from "./redux/store";
import PrivateRoute from "./utils/PrivateRoute";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ extensions }) => {
      if (extensions?.code === "UNAUTHENTICATED") {
        toast.error("You have not been using the website for a while");
        return;
      }
    });
  }

  if (networkError) {
    toast.error("Please check your connection");
  }
});
const host = `${window.location.protocol}//${window.location.host}`;
const base =
  process.env.BN_URL === "/graphql"
    ? `${host}${process.env.BN_URL}`
    : process.env.BN_URL;

const httpLink = createHttpLink({
  uri: base,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-bgImage bg-fixed bg-cover">
      <div className="min-h-screen bg-gray-100 min-w-screen max-w-[1080px] mx-auto my-0 flex flex-col">
        <ApolloProvider client={client}>
          <Provider store={store}>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={<LandingPage openModal={setIsOpen} />}
                />
                <Route path="/quiz" element={<GetQuizzes />} />
                <Route path="/quiz/:id" element={<ExamPage />} />
                <Route
                  path="/add"
                  element={
                    <PrivateRoute>
                      <QuestionForm />0
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/questions"
                  element={
                    <PrivateRoute>
                      <GetQuestions />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <ToastContainer theme="colored" />
          </Provider>
        </ApolloProvider>
      </div>
    </div>
  );
}

export default App;
