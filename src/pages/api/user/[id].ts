import type { NextApiRequest, NextApiResponse } from 'next'
// import { resourceUsage } from 'process';
import { getUserById,updateUser,logicDeleteUser,deleteUser } from '../../../controllers/user';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const GET:string="GET";
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
            case GET:
              const response = await getUserById(id)
            return res.status(201).json(response)
            case PATCH:
              const response2 = await logicDeleteUser(id)
            return res.status(200).json(response2)
            case PUT:
              const response3 = await updateUser(id,body)
              console.log(response3)
            return res.status(200).json(response3)
            case DELETE:
              const response4 = await deleteUser(id)
              console.log(response4)
              return res.status(200).json(response4)
            default:
            return res.status(400).json("method no found")
              
        }
    } catch (error) {
      return  res.status(400).json(error)
    }

}