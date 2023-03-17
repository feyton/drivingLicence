import { gql, useApolloClient, useMutation } from "@apollo/client";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { loginUser } from "../redux/reducers/authReducer.js";
import { Button } from "flowbite-react";
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
    const { data } = await LoginUser({
      variables: {
        input: { ...formData },
      },
    });
    dispatch(loginUser(data.loginUser));
    navigate(from);
    toast.success("Login successful");
    await client.resetStore();
    return;
    // store returned user somehow
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-center text-2xl font-bold mb-6">Log In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              Please enter a valid email address
            </span>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              Please enter a password
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Log In
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
