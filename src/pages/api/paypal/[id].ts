import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const GET: string = "GET";

  let { method } = req;

  try {
    switch (method) {
      case GET:
        const checkOrder = captureOrder(req, res);
        return checkOrder;
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}

const captureOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const ordersDetail = await axios.post(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${id}/capture`,{}, {
        auth: {
        username: process.env.NEXT_PUBLIC_PAYPAY_CLIENT || "",
        password: process.env.PAYPAL_SECRET || "",
      },
    });
    
    res.json(ordersDetail.data);
  } catch (error) {
    res.status(500).json({ errors: "Something goes wrong with capture order" });
  }
};
