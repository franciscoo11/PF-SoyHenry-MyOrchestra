import type { NextApiRequest, NextApiResponse } from 'next'
import {logicDeleteOrchestra,deleteOrchestra,getOrchestrasById,updateOrchestra}from "../../../controllers/orquestas"
// import { resourceUsage } from 'process';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const GET:string="GET";
    const PUT:string="PUT";
    const DELETE:string="DELETE";
    const PATCH:string="PATCH";



    let {
      method,
      body,
      query:{id}
    } = req;


    try {
        switch (method) {
            case GET:
              const response = await getOrchestrasById(id)
              return res.status(201).json( response)
            case PUT:
              const response2= await updateOrchestra(id,body)
              return res.status(200).json(response2)
            case PATCH:
              const response3= await logicDeleteOrchestra(id)
              return res.status(200).json(response3)
            case DELETE:
              const response4= await deleteOrchestra(id)
              return res.status(200).json(response4)
            default:
              return res.status(400).json("method no found")
              
        }
    } catch (error) {
      return  res.status(400).json(error)
    }

}