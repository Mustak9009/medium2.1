import React,{useState} from "react";
import { Header } from "../Components";
import { FcGoogle } from "react-icons/fc";
import { BsTwitter } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {useRouter} from 'next/router';
interface FormInputType {
  name: string;
  email: string;
  password: string;
  confirm_password:string
}
const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("The name field is required."),
    email: Yup.string()
      .required("The email field is required."),
    password: Yup.string()
      .required("The password field is required.")
      .min(6, "Password length should be at least 6 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirm_password: Yup.string()
      .required("The confirm password is required")
      .min(6, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match")
    });
export default function Login() {
  const { register, handleSubmit, formState: { errors }} = useForm<FormInputType>({ mode: "onTouched",resolver: yupResolver(formSchema)});
  const [submit, setSubmit] = useState<boolean>(false);
  const router = useRouter();
  const onSubmit: SubmitHandler<FormInputType> = async (data) => {
    const {name,email,password} = data;
    await fetch('/api/createUser',{
      method:'POST',
      body:JSON.stringify({name,email,password})
    });
    setSubmit(true);
  };
  if(submit){
    alert("Welcome to medium!😃");
    router.push('/');
  }
  return (
    <div className="sign_in">
      <Header />
      <div className="max-w-xl mx-auto p-5">
        <h1 className="text-3xl font-bold mb-5">
          Create <span className="text-yellow-500">account</span>
        </h1>
        <form className="flex flex-col justify-center gap-5" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="Name" className="relative">
            <span className="text-gray-500">Name</span>
            <input
              type="text"
              placeholder="Enter name"
              {...register("name", { required: true })}
              name="name"
              id="Name"
              className="border rounded px-3 py-2 shadow mt-1  w-full block  outline-none focus:ring ring-yellow-600"
            />
            {errors.name && (
              <span className="text-red-400 absolute">
                {errors.name?.message}
              </span>
            )}
          </label>
          <label htmlFor="Email" className="relative">
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
              {...register("password", { required: true,min:6,max:12 })}
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
          <label htmlFor="confirm_password" className="relative">
            <span className="text-gray-500">Confirm password</span>
            <input
              type="password"
              placeholder="Re-enter password"
              {...register("confirm_password",{required:true})}
              name="confirm_password"
              id="confirm_password"
              className="border rounded px-3 py-2 shadow mt-1 w-full block  outline-none focus:ring ring-yellow-600"
            />
             {errors.confirm_password && (
              <span className="text-red-400 absolute">
                {errors.confirm_password?.message}
              </span>
            )}
          </label>
          <input
            type="submit"
            value="Create account"
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
          <FcGoogle className="text-3xl cursor-pointer" />
          <BsTwitter className="text-3xl text-[#1DA1F2] cursor-pointer" />
          <AiFillLinkedin className="text-3xl text-[#0077b5] cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
