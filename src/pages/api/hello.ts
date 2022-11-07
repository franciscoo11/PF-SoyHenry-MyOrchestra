// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getOrchestras, postOrchestras } from '../../controllers/orquestas'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const GET:string="GET";
    const POST:string="POST";
    const DELETE:string="DELETE";


    let {
      method,
      body,
      query: {  },
    } = req;


    try {
        switch (method) {
            case GET:
            return res.status(200).json( {name: 'SOY POST'})
            case POST:
              const addOrchestra = postOrchestras(body)
              
            return res.status(201).json(addOrchestra)
            case DELETE:
             
            return res.status(200).json({ name: 'SOY DELETE' })
            default:
            return res.status(400).json("method no found")
              
        }
    } catch (error) {
      return  res.status(400).json(error)
    }

}
