import type { NextApiRequest, NextApiResponse } from 'next'
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
              const getUser = await getUsers(id)
            return getUser ? res.status(200).json(getUser) : res.status(404).json({error: 'User not found, check if id is valid'})
            case PATCH:
              const fakeDeleteUser = await logicDeleteUser(id)
            return fakeDeleteUser ? res.status(204).json(fakeDeleteUser) : res.status(404).json({error: 'Something goes wrong, check if id is correct and try again'})
            case PUT:
              const modifyUser = await updateUser(id,body)
            return modifyUser ? res.status(204).json(modifyUser) : res.status(404).json({error: 'Something goes wrong, check if id is correct and try again'})
            case DELETE:
              const removeUser = await deleteUser(id)
              return removeUser ? res.status(200).json(removeUser) : res.status(404).json({error: 'Something goes wrong, check id and try again'})
            default:
            return res.status(400).json("method no found")
              
        }
    } catch (error) {
      return  res.status(400).json({error : "Internal error, something goes really really wrong"})
    }

}
