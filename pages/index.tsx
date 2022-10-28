import React from "react";
import type { NextPage } from "next";
import Header from "../Components/Header";
import HomeStatic from "../Components/HomeStatic";
const Index: NextPage = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <Header />
      <HomeStatic />
    </main>
  );
};
export default Index;
