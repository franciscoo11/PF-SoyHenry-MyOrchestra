import type { NextApiRequest, NextApiResponse } from 'next'
import {postOrchestras,getOrchestras} from "../../../controllers/orchestras"
// import { resourceUsage } from 'process';



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
              const Getallorchestra = await getOrchestras(query)
              return Getallorchestra? res.status(200).json(Getallorchestra):res.status(404).json({ error:[]});
            case POST:
              const postorchestra = await postOrchestras(body)
              return res.status(201).json(postorchestra)
            default:
              return res.status(400).json("method no found: [name,description,logo,cover,creation_date,sponsor,location,donation_account,phone,user_id,orchestra_TypeId]")
        }
    } catch (error) {
      return  res.status(400).send({ error: "Internal error, something goes really really wrong" }) 
    }

}