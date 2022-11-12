// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteFavorites, getFavorites, postFavorites } from '../../controllers/favorites';
import { deleteOrchestra, postOrchestras, updateOrchestra } from '../../controllers/orchestras'
import { getPost, postPost,getOrchestrasPost } from '../../controllers/post';
import { postUser } from '../../controllers/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const GET:string="GET";
    const POST:string="POST";
    const DELETE:string="DELETE";
    const PUT:string="PUT";


    let {
      method,
      body:{orchestra_id},
      query: {favorites_id},
    } = req;


    try {
        switch (method) {
            case GET:
            //   const allOrchestras =await getFavorites(user_id);
            // return res.status(200).json(allOrchestras)
            case POST:
            //   const addOrchestra =await postOrchestras(body)
            // return res.status(201).json(addOrchestra)
            case DELETE:
            //   const deleteOrchestra2 = await deleteFavorites(favorites_id,name)
            // return res.status(200).json(deleteOrchestra2)
            case PUT:
              const addOrchestra =await postFavorites(favorites_id,orchestra_id)
            return res.status(201).json(addOrchestra)
            default:
            return res.status(400).json("method no found")
              
        }
    } catch (error) {
      return  res.status(400).json(error)
    }

}

