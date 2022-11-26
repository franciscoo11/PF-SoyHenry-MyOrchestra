import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors';
import { putPost,logicDeletePost,deletePost } from '../../../controllers/post';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

    const DELETE:string="DELETE";
    const PUT:string="PUT";
    const PATCH:string="PATCH"

    let {
      method,
      body,
      query:{id},
    } = req;

    try {
        switch (method) {
            case PATCH:
              const fakeDeleteUser = await logicDeletePost(id)
            return fakeDeleteUser ? res.status(200).json(fakeDeleteUser) : res.status(404).json({error: 'Something goes wrong, check id and try again'})
            case PUT:
              const modifyUser = await putPost(id,body)
            return modifyUser ? res.status(200).json(modifyUser) : res.status(404).json({error:"Something goes wrong, try again or check id"})
            case DELETE:
              const removeUser = await deletePost(id)
              return removeUser ? res.status(200).json(removeUser) : res.status(404).json({error: 'Something goes wrong, check id and try again'})
            default:
            return res.status(400).json("method no found")
              
        }
    } catch (error) {
      return  res.status(400).json({error : "Internal error, something goes really really wrong"})
    }

}
