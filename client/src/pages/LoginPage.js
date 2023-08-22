import { gql, useApolloClient, useMutation } from "@apollo/client";
import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../redux/reducers/authReducer.js";

const LOGIN_MUTATION = gql`
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      token
      user {
        name
        picture
        email
        role
      }
    }
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location?.state || "/";
  const [LoginUser, { loading }] = useMutation(LOGIN_MUTATION);
  const client = useApolloClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    LoginUser({
      variables: {
        input: { ...formData },
      },
      onCompleted: async (data) => {
        dispatch(loginUser(data.loginUser));
        toast.success("Login successful");
        await client.resetStore();
        navigate(from);
        return;
      },
      onError: (error) => {
        toast.error("Invalid credentials");
      },
    });
  };
  const onFailure = (error) => {
    console.log(error);
    toast.error("Login with google failed");
  };
  const handleLogin = async (googleData) => {
    const { data } = await LoginUser({
      variables: {
        input: { token: googleData.credential },
      },
    });
    dispatch(loginUser(data.loginUser));
    navigate(from);
    toast.success("Login successful");
    await client.resetStore();
    return;
    // store returned user somehow
  };
  const [show, setShow] = useState(false);
  const showPassword = () => {
    setShow(!show);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-center text-2xl font-bold mb-6">Log In</h2>
        <p className="text-red-500 font-bold my-3">
          {from !== "/" && "Login is required to continue"}
        </p>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <TextInput
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email?.message}
            placeholder="Enter your email"
            className="mb-2"
            helperText={
              errors?.email && (
                <span className="text-red-500 text-sm">
                  {errors.email?.message}
                </span>
              )
            }
            color={errors.email && "failure"}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <div className="relative">
            <TextInput
              type={show ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
              })}
              error={errors.password?.message}
              placeholder="Enter your password"
              className="mb-2 pr-8 w-full"
              helperText={
                errors?.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password?.message}
                  </span>
                )
              }
              color={errors.password && "failure"}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
              onClick={showPassword}
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8zm8-4a4 4 0 100 8 4 4 0 000-8z"
              />
            </svg>
          )}
          {loading ? "Loading..." : "Log In"}
        </Button>
        <hr className="my-1" />
        <div className="items-center justify-center w-full text-center">
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            text={loading ? "Loading...." : "Continue with Google"}
            onSuccess={handleLogin}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            className="mx-auto"
            useOneTap
          />
        </div>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-500 font-bold hover:underline"
          >
            Sign up
          </Link>{" "}
          or{" "}
          <Link
            to="/reset"
            className="text-indigo-500 font-bold hover:underline"
          >
            Reset password
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
