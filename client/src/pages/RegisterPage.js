import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-6 font-bold">Sign Up</h2>

        <label className="block mb-2 font-bold">Name</label>
        <TextInput
          type="text"
          {...register("name", { required: true })}
          error={errors.name?.message}
          placeholder="Enter your name"
          className="mb-4"
        />

        <label className="block mb-2 font-bold">Email</label>
        <TextInput
          type="email"
          {...register("email", { required: true })}
          error={errors.email?.message}
          placeholder="Enter your email"
          className="mb-4"
        />

        <label className="block mb-2 font-bold">Password</label>
        <TextInput
          type="password"
          {...register("password", { required: true })}
          error={errors.password?.message}
          placeholder="Enter your password"
          className="mb-4"
        />

        <label className="block mb-2 font-bold">Phone Number</label>
        <TextInput
          type="tel"
          {...register("phoneNumber", { required: true })}
          error={errors.phoneNumber?.message}
          placeholder="Enter your phone number"
          className="mb-4"
        />

        <Button type="submit" className="mt-6 mb-4">
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
