import type { NextApiRequest, NextApiResponse } from 'next'
// import { resourceUsage } from 'process';
import { getUsers, postUser} from '../../../controllers/user';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const GET:string="GET";
    const POST:string="POST";


    let {
      method,
      body,
      query,
    } = req;


    try {
        switch (method) {
            case GET:
              const response = await getUsers()
              return response ? res.status(200).json(response) : res.status(404).json({error: 'Something goes wrong, try again'})
            case POST:
              const response2 = await postUser(body)
              return response2 ? res.status(201).json(response2) : res.status(404).json({error: 'Something goes wrong, try again'})
            default:
              return res.status(400).json("method no found")
              
        }
    } catch (error) {
      return  res.status(400).json({error : "Internal error, something goes really really wrong"})
    }

}