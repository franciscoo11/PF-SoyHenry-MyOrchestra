import type { NextApiRequest, NextApiResponse } from 'next'
// import { resourceUsage } from 'process';
import { updateUser,logicDeleteUser,deleteUser, getUsers } from '../../../controllers/user';



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
              const response = await getUsers(id)
            return response ? res.status(200).json(response) : res.status(404).json({error: 'User not found'})
            case PATCH:
              const response2 = await logicDeleteUser(id)
            return response ? res.status(204).json(response2) : res.status(404).json({error: 'Something goes wrong, check id and try again'})
            case PUT:
              const response3 = await updateUser(id,body)
            return response ? res.status(204).json(response3) : res.status(404).json({error: 'Something goes wrong, check information sended and try again'})
            case DELETE:
              const response4 = await deleteUser(id)
              return response4 ? res.status(200).json(response4) : res.status(404).json({error: 'Something goes wrong, check id and try again'})
            default:
            return res.status(400).json("method no found")
              
        }
    } catch (error) {
      return  res.status(400).json({error : "Internal error, something goes really really wrong"})
    }

}