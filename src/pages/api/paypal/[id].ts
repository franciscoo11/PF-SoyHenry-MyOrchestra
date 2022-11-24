import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const POST:string="POST";
   


    let {
      method,
    } = req;


    try {
        switch (method) {
            case 'GET':
              const checkOrder = captureOrder(req,res)
              return checkOrder
            default:
              return res.status(400).json("method not allowed")
        }
    } catch (error) {
      return  res.status(400).json({error : "Internal error, something goes really really wrong"})
    }

}

const captureOrder = async ( req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query


  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const {
    data: { access_token },
  } = await axios.post(`${process.env.PAYPAL_OAUTH_URL}`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: process.env.NEXT_PUBLIC_PAYPAY_CLIENT || "",
      password: process.env.PAYPAL_SECRET || "",
    },
  });

  const ordersDetail = await axios.get(`https://api.sandbox.paypal.com/v2/checkout/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })

  res.json(ordersDetail.data)
}