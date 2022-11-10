import type { NextApiRequest, NextApiResponse } from 'next'
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
              const allUsers = await getUsers()
              return allUsers ? res.status(200).json(allUsers) : res.status(404).json({error: 'Something goes wrong, try again'})
            case POST:
              const addUser = await postUser(body)
              return addUser ? res.status(201).json(addUser) : res.status(404).json({error: 'Something goes wrong, try again'})
            default:
              return res.status(400).json("method no found")
              
        }
    } catch (error) {
      return  res.status(400).json({error : "Internal error, something goes really really wrong"})
    }

}
