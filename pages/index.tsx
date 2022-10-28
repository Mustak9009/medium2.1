import React from "react";
import type { NextPage } from "next";
import {Header,HomeStatic} from '../Components';
import {sanityClient} from '../sanity';
import {PostType} from '../typeing';
interface Porps{
  posts:[PostType];
}
const Index: NextPage<Porps> = ({posts}) => {
  return (
    <main className="max-w-7xl mx-auto">
      <Header />
      <HomeStatic />
    </main>
  );
};
export const getServerSideProps = async () =>{
  const query = `
    *[_type == "post"]{
      _id,
      title,
      author -> {
        name,
        image
      },
      description,
      mainImage,
      slug
    }`;
    const posts = await sanityClient.fetch(query);
    return{
      props:{
        posts
      }
    }

}
export default Index;
