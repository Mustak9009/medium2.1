import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PostType } from "../typeing";
interface FormInputType {
  _id: string;
  name: string;
  email: string;
  comment: string;
}
export default function BlogComment({ blogPage }: { blogPage: PostType }) {
  const { register, handleSubmit, formState: { errors }} = useForm<FormInputType>();
  const [submit, setSubmit] = useState<boolean>(false);
  const onSubmit: SubmitHandler<FormInputType> = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    }).then(()=>{
      setSubmit(true);
    }).catch((err)=>{
      console.log(err);
      setSubmit(false);
    })
  };
  return submit ? (
    <FormSubmited/>
  ) : (
    <form className="max-w-3xl mx-auto p-5 flex flex-col mb-10" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-sm text-yellow-500">Enjoy the article?</h3>
      <h4 className="text-3xl font-bold">Leave a comment below!</h4>
      <hr className="py-3 mt-2" />
      <input {...register("_id")} name="_id" type="hidden" value={blogPage._id}/>
      <label htmlFor="name" className="block mb-5">
        <span>Name</span>
        <input type="text" id="name" placeholder="Enter name" {...register("name", { required: true })} name="name" className="border rounded px-3 py-2 shadow mt-1 form-input w-full block outline-none focus:ring ring-yellow-600"/>
      </label>
      <label htmlFor="email" className="block mb-5">
        <span>Email</span>
        <input type="email" id="email" placeholder="Enter email" {...register("email", { required: true })} name="email" className="border rounded px-3 py-2 shadow mt-1 form-input w-full block  outline-none focus:ring ring-yellow-600"/>
      </label>
      <label htmlFor="comment" className="block mb-5">
        <span>Comment</span>
        <textarea id="comment" placeholder="Enter comment..." rows={8} {...register("comment", { required: true })} name="comment" className="border rounded px-3 py-2 shadow mt-1 form-input w-full block  outline-none focus:ring ring-yellow-600"/>
      </label>
      <div className="flex flex-col p-5">
        {errors.name && (
          <p className="text-red-500">-They name field is required.</p>
        )}
        {errors.email && (
          <p className="text-red-500">-They email field is required.</p>
        )}
        {errors.comment && (
          <p className="text-red-500">-They comment field is required.</p>
        )}
      </div>
      <input type="submit" value="submit" className="shadow bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 cursor-pointer rounded focus:outline-none" onClick={() => handleSubmit}/>
    </form>
  );
}

function FormSubmited(){
  return(
    <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto ">
      <h3 className="text-3xl font-bold">Thank you for submitting the comment!</h3>
      <p>Once it has been approved, it will appear below!</p>
    </div>
  )
}