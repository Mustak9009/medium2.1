import React from "react";
import type { NextPage } from "next";
import {Header,HomeStatic,Post} from '../Components';
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 ">
          {posts.map((post)=>(
            <Post key={post._id} post={post}/>
          ))}
        </div>
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
