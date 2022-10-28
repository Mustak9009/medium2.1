import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Header from "../Components/Header";
const HomeStatic: NextPage = () => {
  const router = useRouter();
  return (
    <>
     <Header/>
     <HomeStatic/>
    </>
  );
};
export default HomeStatic;
