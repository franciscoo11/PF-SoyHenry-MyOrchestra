import type { NextApiRequest, NextApiResponse } from 'next'
// import { resourceUsage } from 'process';
import { getUsers, postUser, updateUser, deleteUser, logicDeleteUser } from '../../../controllers/user';



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
      body,
      query,
    } = req;


    try {
        switch (method) {
            case GET:
              const response = await getUsers()
            return res.status(201).json(response)
            case POST:
              const response2 = await postUser(body)
            return res.status(200).json(response2)
            case PUT:
              const response3 = await updateUser(query.id,body)
              console.log(response3)
            return res.status(200).json(response3)
            case DELETE:
              const response4 = await deleteUser(query.id)
              console.log(response4)
              return res.status(200).json(response4)
            default:
            return res.status(400).json("method no found")
              
        }
    } catch (error) {
      return  res.status(400).json(error)
    }

}