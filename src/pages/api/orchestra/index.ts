import type { NextApiRequest, NextApiResponse } from 'next'
// import { resourceUsage } from 'process';



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const GET:string="GET";
    const POST:string="POST";
    const DELETE:string="DELETE";


    let {
      method,
      body: { papas,patatas },
      query
    } = req;


    try {
        switch (method) {
            case GET:
            return res.status(200).json({ name: 'SOY GET' })
            case POST:
            return res.status(200).json({ name: 'SOY POST' })
            case DELETE:
            return res.status(200).json({ name: 'SOY DELETE' })
            default:
            return res.status(400).json("method no found")
              
        }
    } catch (error) {
      return  res.status(400).send(error)
    }

}