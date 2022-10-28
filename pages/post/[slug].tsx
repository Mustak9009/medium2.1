
import React from "react";
import type { NextPage, GetStaticProps } from "next";
import { sanityClient, urlFor } from "../../sanity";
import { PostType } from "../../typeing";
import { Header,BlogComment } from "../../Components";
import PortableText from "react-portable-text";
import Image from 'next/image';
interface PropsType {
  blogPage: PostType;
}
const PostFullBlog: NextPage<PropsType> = ({ blogPage }) => {
  return (
    <main>
      <Header />
      <Image
        src={urlFor(blogPage.mainImage).url()!}
        alt={blogPage.title}
        className="w-full h-40 object-cover hidden sm:block"
        width={281}
        height={179}
      />
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10">{blogPage.title}</h1>
        <h2 className="mb-3 text-gray-500">
          {blogPage.description}
        </h2>
        <div className="flex items-center space-x-2">
          <Image
            src={urlFor(blogPage.author.image).url()!}
            alt={blogPage.author.name}
            className="w-12 h-12 rounded-full"
            width={100}
            height={100}
          />
          <p className="font-extralight text-sm">
            Post by,{" "}
            <span className="text-green-700">{blogPage.author.name}</span> -
            publiched at {new Date(blogPage._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            className=""
            content={blogPage.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold  my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-2xl  font-bold my-5" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              Links: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
              image:(props:any)=>(
                <div className="flex justify-center mb-7">
                  <Image src={urlFor(props.asset._ref).url()!} alt={blogPage.title} width={600} height={400} className='mx-auto object-cover'/> {/*props.asset._ref -> Keep in mind this -> path*/}
                </div>
              )
            }}  
          />
        </div>
      </article>
      <hr className="border border-yellow-500 max-w-lg mx-auto my-5"/>
      <BlogComment blogPage={blogPage}/>
      {blogPage.comments.length !== 0 &&
       <Comment blogPage={blogPage}/>
      }
    </main>
  );
};
function Comment({blogPage}:{blogPage:PostType}){
  
  return(
      <section className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow shadow-yellow-500 space-y-2">
        <h3 className="text-4xl font-bold">Comment</h3>
        <hr/>
        {blogPage.comments.map((commnet)=>(
          <div key={commnet._id}>
            <p><span className="text-yellow-500">{commnet.name}: </span>{commnet.comment}</p>
          </div>
        ))}
      </section>
  );
}
export const getStaticPaths = async () => {
  const query = `
    *[_type=='post']{
        _id,
        slug{
        current
       }
     }`;
  const postsSlug = await sanityClient.fetch(query);
  const postPath = postsSlug.map((post: PostType) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths: postPath,
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
    *[_type=='post' && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author->{
           name,
           image
        },
        'comments':*[
          _type=='comment' && post._ref == ^._id && approved == true
        ],
        description,
        mainImage,
        slug,
        body
      } 
    `;
  const blogPage = await sanityClient.fetch(query, {
    //Pass parameters for -> $slug variable
    slug: params?.slug,
  });
  return {
    props: {
      blogPage,
    },
    revalidate: 60, //After -> 60,Data will be re-fetched(Page will be re-build)
  };
};
export default PostFullBlog;
