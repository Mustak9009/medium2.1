import React from "react";
import type { NextPage } from "next";
import Header from "../Components/Header";
import HomeStatic from '../Components/HomeStatic';
const Index: NextPage = () => {
 
  return (
    <div className="border-2 border-red-500">
     <Header/>
     <HomeStatic/>
    </div>
  );
};
export default Index;
