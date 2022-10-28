import React from 'react';
import Link from 'next/link';
import {PostType} from '../typeing';
import {urlFor} from '../sanity';
export default function Post({post}:{post:PostType}) {
  return (
    <Link href={`/post/${post.slug.current}`} >
        <div className='group overflow-hidden cursor-pointer border rounded-lg'>
          {/*eslint-disable-next-line @next/next/no-img-element */}
          <img src={urlFor(post.mainImage).url()!} alt='Blog post' className='h-72 object-cover w-full group-hover:scale-105 transition-transform duration-200 ease-in-out'/>     {/*! -> If image is available */} {/*url() => is a function*/}
          <div className='flex justify-between p-5 bg-white'>
            <section>
              <h2 className='font-bold text-lg'>{post.title}</h2>
              <p className='text-xs'>{post.description} by {post.author.name}</p>
            </section>
            {/*eslint-disable-next-line @next/next/no-img-element */}
            <img src={urlFor(post.author.image).url()!} alt='Author' className='w-12 h-12 rounded-full'/>
          </div>
        </div>
    </Link>
  )
}
