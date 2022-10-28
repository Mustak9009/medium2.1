import React from "react";
import { Header } from "../Components";
import {FcGoogle} from 'react-icons/fc';
import {BsTwitter} from 'react-icons/bs';
import {AiFillLinkedin} from 'react-icons/ai';
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
interface FormInputType {
  email: string;
  password: string;
}
const formSchema = Yup.object().shape({
  email: Yup.string()
    .required("The email field is required."),
  password: Yup.string()
    .required("The password field is required.")
    .min(6, "Password length should be at least 6 characters")
    .max(12, "Password cannot exceed more than 12 characters"),
  });
export default function SignIn() {
  const { register, handleSubmit, formState: { errors }} = useForm<FormInputType>({ mode: "onTouched",resolver: yupResolver(formSchema)});
  const onSubmit: SubmitHandler<FormInputType> = (data) => {
    const {email, password } = data;
    console.log(email, password);
  };
  return (
    <div className="sign_in">
      <Header />
      <div className="max-w-xl mx-auto p-5">
        <h1 className="text-3xl font-bold mb-5">
          Sign <span className="text-yellow-500">in</span>
        </h1>
        <form className="flex flex-col justify-center gap-5" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="Email"  className="relative">
            <span className="text-gray-500">Email</span>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email", { required: true })}
              name="email"
              id="Email"
              className="border rounded px-3 py-2 shadow mt-1  w-full block  outline-none focus:ring ring-yellow-600"
            />
             {errors.email && (
              <span className="text-red-400 absolute">
                {errors.email?.message}
              </span>
            )}
          </label>
          <label htmlFor="Password" className="relative">
            <span className="text-gray-500">Password</span>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password", { required: true })}
              name="password"
              id="Password"
              className="border rounded px-3 py-2 shadow mt-1 w-full block  outline-none focus:ring ring-yellow-600"
            />
             {errors.password && (
              <span className="text-red-400 absolute">
                {errors.password?.message}
              </span>
            )}
          </label>
          <input
            type="submit"
            value="Sign in"
            className="shadow mt-5 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 cursor-pointer rounded focus:outline-none"
            onClick={() => handleSubmit}
          />
        </form>
        <div className="flex my-5 justify-center items-center">
          <hr className="border border-yellow-500 max-w-lg mx-auto my-5 w-full" />
          <span className="mx-4 font-bold ">Or</span>
          <hr className="border border-yellow-500 max-w-lg mx-auto my-5 w-full" />
        </div>
        <div className="flex justify-center items-center  space-x-10">
          <FcGoogle className="text-3xl cursor-pointer"/>
          <BsTwitter className="text-3xl text-[#1DA1F2] cursor-pointer"/>
          <AiFillLinkedin className="text-3xl text-[#0077b5] cursor-pointer"/>
        </div>
      </div>
    </div>
  );
}
