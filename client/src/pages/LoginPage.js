import { gql, useApolloClient, useMutation } from "@apollo/client";
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
          {loading ? "Loading..." : "Log In"}
        </Button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-500 font-bold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
