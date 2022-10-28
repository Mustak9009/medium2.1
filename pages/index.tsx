import React from "react";
import type { NextPage } from "next";
import Header from "../Components/Header";
const HomeStatic: NextPage = () => {
 
  return (
    <>
     <Header/>
     <HomeStatic/>
    </>
  );
};
export default HomeStatic;
