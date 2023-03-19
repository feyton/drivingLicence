import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../redux/reducers/authReducer";

const SIGN_UP_MUTATION = gql`
  mutation CreateUser($input: SignupInput!) {
    createUser(input: $input) {
      token
      user {
        role
        email
        name
      }
    }
  }
`;

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const client = useApolloClient();
  const location = useLocation();
  const from = location?.state || "/";

  const [createUser] = useMutation(SIGN_UP_MUTATION);
  const onSubmit = async (data) => {
    createUser({
      onCompleted: async (data) => {
        dispatch(loginUser(data.createUser));
        navigate(from);
        toast.success("Login successful");
        await client.resetStore();
      },
      variables: {
        input: { ...data },
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  const [show, setShow] = useState(false);
  const showPassword = () => {
    setShow(!show);
  };

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-5 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-6 font-bold">Sign Up</h2>

        <label className="block mb-2 font-bold">Name</label>
        <TextInput
          type="text"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Name must contain only letters",
            },
          })}
          error={errors.name?.message}
          placeholder="Enter your name"
          className="mb-2"
          helperText={
            errors?.name && (
              <React.Fragment>Oops! {errors.name?.message}</React.Fragment>
            )
          }
          color={errors?.name && "failure"}
        />

        <label className="block mb-2 font-bold">Email</label>
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

        <label className="block mb-2 font-bold">Password</label>
        <div className="relative ">
          <TextInput
            ype={show ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                message:
                  "Password must contain at least 6 characters with both letters and numbers",
              },
            })}
            error={errors.password?.message}
            placeholder="Enter your password"
            className="mb-2 pr-8 w-full"
            helperText={
              errors?.password && (
                <React.Fragment>
                  Oops! {errors.password?.message}
                </React.Fragment>
              )
            }
            color={errors?.password && "failure"}
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
            onClick={showPassword}
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <label className="block mb-2 font-bold">Phone Number</label>
        <TextInput
          type="tel"
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^(\+250|0)?\d{9}$/,
              message:
                "Please enter a valid Rwandan phone number, starting with +250 or 0 and including 9 digits",
            },
          })}
          error={errors.phoneNumber?.message}
          placeholder="Enter your phone number"
          className="mb-2"
          helperText={
            errors?.phoneNumber && (
              <React.Fragment>
                Oops! {errors.phoneNumber?.message}
              </React.Fragment>
            )
          }
          color={errors?.phoneNumber && "failure"}
        />

        <Button type="submit" className="mt-6 mb-2">
          Sign Up
        </Button>
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
