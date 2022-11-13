import type { NextApiRequest, NextApiResponse } from 'next'
import {getOrchestrasPost,postPost} from "../../../controllers/post"




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const GET:string="GET";
    const POST:string="POST";


    let {
      method,
      body,
      query
    } = req;


    try {
        switch (method) {
            case GET:
              const getpostbyorchestra = await getOrchestrasPost(query)   
              return getpostbyorchestra ? res.status(200).json(getpostbyorchestra):res.status(400).json([])
            case POST:   
              const post_post = await postPost(body)
              console.log(post_post)
              return post_post? res.status(201).json(post_post):res.status(400).json({error:"mandatory data missing:[title,content,url_video or url_file,visibility,event_date,event_hour,orchestraId,userId,type_PostId] "})
            default:
              return res.status(400).json("method no found")
              
        }
    } catch (error) {
      return  res.status(400).send({ error: "Internal error, something goes really really wrong" }) 
    }

}