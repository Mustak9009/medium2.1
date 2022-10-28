import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
const HomeStatic: NextPage = () => {
  return (
    <div className="flex justify-between items-center bg-yellow-500 py-10 border-y lg:py-0  rounded-md">
      <section className="px-10 space-y-5">
        <h1 className="text-6xl font-serif">
          <span className="underline decoration-black  decoration-4 mr-4">
            Medium 
          </span>
              is a place to write,read,and connect
        </h1>
        <p>
          {"It's"} easy and free to post your thinking on any topic and connect
          with millions of readers.
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
  );
};
export default HomeStatic;
