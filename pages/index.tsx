import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import Link from "next/link";
const HomeStatic: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <header className="flex justify-between max-w-7xl mx-auto my-8">
        <div className="flex items-center space-x-5">
          <Image
            src="https://links.papareact.com/yvf"
            alt="Medium 2.0"
            className="w-44 object-contain cursor-pointer"
            width={200}
            height={70}
            onClick={() => router.push("/")}
          />
          <div className="md:inline-flex space-x-5 items-center">
            <h3 className="cursor-pointer">Home</h3>
            <h3 className="cursor-pointer">Contact US</h3>
            <h3 className="bg-green-600 px-4 py-1 text-white rounded-full cursor-pointer hover:text-black">
              Follow{" "}
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <Link
            href="/signIn"
            className="text-green-600 cursor-pointer hover:text-black"
          >
            Sign in
          </Link>
          <div
            className="relative inline-flex items-center justify-start  px-5 py-1.5 overflow-hidden  rounded-full group cursor-pointer"
            onClick={() => router.push("/login")}
          >
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-green-500 opacity-100 group-hover:-translate-x-8"></span>
            <span className="relative w-full text-left text-green-600 transition-colors duration-200 ease-in-out group-hover:text-white">
              Get Started
            </span>
            <span className="absolute inset-0 border border-green-600 rounded-full hover:border-none"></span>
          </div>
        </div>
      </header>
      <div className="flex justify-between items-center bg-yellow-500 py-10 border-y lg:py-0  rounded-md m-5 max-w-7xl mx-auto">
        <section className="px-10 space-y-5">
          <h1 className="text-6xl font-serif">
            <span className="underline decoration-black  decoration-4 mr-4">
              Medium
            </span>
            is a place to write,read,and connect
          </h1>
          <p>
            {"It's"} easy and free to post your thinking on any topic and
            connect with millions of readers.
          </p>
        </section>
        <Image
          className="md:inline-flex h-32 lg:h-full hidden object-cover"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt="Big M"
          width={500}
          height={500}
        />
      </div>
    </>
  );
};
export default HomeStatic;
