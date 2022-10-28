import React from "react";
import type { NextPage } from "next";
import {Header,HomeStatic} from '../Components';
const Index: NextPage = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <Header />
      <HomeStatic />
    </main>
  );
};
export default Index;
