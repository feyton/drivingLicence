import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import React, { Suspense } from "react";
import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import store from "./redux/store";
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const Navbar = React.lazy(() => import("./components/Navbar"));
const ExamPage = React.lazy(() => import("./pages/ExamPage"));
const GetQuestions = React.lazy(() => import("./pages/GetQuestions"));
const GetQuizzes = React.lazy(() => import("./pages/GetQuizzes"));
const Loading = React.lazy(() => import("./pages/LoadingPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const UserProfile = React.lazy(() => import("./pages/ProfilePage"));
const QuestionForm = React.lazy(() => import("./pages/QuestionForm"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const ViewScore = React.lazy(() => import("./pages/ViewScore"));
const PrivateRoute = React.lazy(() => import("./utils/PrivateRoute"));

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ extensions }) => {
      if (extensions?.code === "UNAUTHENTICATED") {
        toast.error("Umaze igihe udakoresha urubuga");
        return;
      }
    });
  }

  if (networkError) {
    toast.error("Reba interneti yawe");
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
  return (
    <div className="bg-bgImage bg-fixed bg-cover">
      <div className="min-h-screen bg-gray-100 min-w-screen max-w-[1080px] mx-auto my-0 flex flex-col">
        <ApolloProvider client={client}>
          <Provider store={store}>
            <BrowserRouter>
              <Suspense fallback={<Loading />}>
                <Navbar />
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route
                    path="/quiz"
                    element={
                      <PrivateRoute>
                        <GetQuizzes />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/quiz/:id"
                    element={
                      <PrivateRoute>
                        <ExamPage />
                      </PrivateRoute>
                    }
                  />
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
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <UserProfile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/score/:id"
                    element={
                      <PrivateRoute>
                        <ViewScore />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>{" "}
              </Suspense>
            </BrowserRouter>
            <ToastContainer theme="colored" />
          </Provider>
        </ApolloProvider>
      </div>
    </div>
  );
}

export default App;
