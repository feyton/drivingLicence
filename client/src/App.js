import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import React, { Suspense, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loading from "./pages/LoadingPage";
import store from "./redux/store";
import Igazeti from "./pages/Igazeti";
const Footer = React.lazy(() => import("./components/Footer"));
const QuizCreationPage = React.lazy(() => import("./pages/CreateQuiz"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = React.lazy(() =>
  import("./pages/TermsAndConditions")
);
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const Navbar = React.lazy(() => import("./components/Navbar"));
const ExamPage = React.lazy(() => import("./pages/ExamPage"));
const GetQuestions = React.lazy(() => import("./pages/GetQuestions"));
const GetQuizzes = React.lazy(() => import("./pages/GetQuizzes"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const UserProfile = React.lazy(() => import("./pages/ProfilePage"));
const QuestionForm = React.lazy(() => import("./pages/QuestionForm"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const ViewScore = React.lazy(() => import("./pages/ViewScore"));
const PrivateRoute = React.lazy(() => import("./utils/PrivateRoute"));
const QuestionEditPage = React.lazy(() => import("./pages/QuestionEditPage"));

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ extensions }) => {
      if (extensions?.code === "UNAUTHENTICATED") {
        toast.error("Umaze igihe udakoresha urubuga. Urajya kuyindi page");
        window.localStorage.clear();
        window.setTimeout(() => {
          window.location.pathname = "/login";
        }, 3000);

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
  const location = useLocation();

  // scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="bg-bgImage bg-fixed bg-cover">
      <div className="min-h-screen bg-gray-100 min-w-screen max-w-[1200px] mx-auto my-0 flex flex-col grow">
        <ApolloProvider client={client}>
          <Provider store={store}>
            <Suspense fallback={<Loading />}>
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/igazeti" element={<Igazeti />} />
                <Route
                  path="/quiz"
                  element={
                    <PrivateRoute>
                      <GetQuizzes />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/quiz/new"
                  element={
                    <PrivateRoute>
                      <QuizCreationPage />
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
                  path="/questions/edit/:id"
                  element={
                    <PrivateRoute>
                      <QuestionEditPage />
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
              <Footer />
            </Suspense>
            <ToastContainer theme="colored" />
          </Provider>
        </ApolloProvider>
      </div>
    </div>
  );
}

export default App;
