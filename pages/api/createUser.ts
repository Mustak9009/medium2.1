import type { NextApiRequest, NextApiResponse } from 'next';
import sanityClient from '@sanity/client';
import bcryptjs from 'bcryptjs';
const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV == 'production',
    apiVersion:"2021-03-25",
    token: process.env.SANITY_API_TOKEN
}
const client = sanityClient(config);

export default async function createUser(req:NextApiRequest,res:NextApiResponse){
    
    const {name,email,password} = JSON.parse(req.body);
    try {
        await client.create({
            _type: 'user',
            name,
            email,
            password:bcryptjs.hashSync(password),
            isAdmin:false
        })
    } catch (err) {
        return res.status(500).json({ message: "Couldn't create user", err });
    }
    return res.status(200).json({ message: 'Welcome to your website😃' })

}