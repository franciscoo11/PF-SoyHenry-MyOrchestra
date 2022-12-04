import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import NextCors from "nextjs-cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  
  const GET: string = "GET";

  let { method } = req;

  try {
    switch (method) {
      case GET:
        const checkOrder = await captureOrder(req, res);
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
        username: process.env.PAYPAL_CLIENT || '',
        password: process.env.PAYPAL_SECRET || "",
      },
    });

    if(!ordersDetail.data.id) return res.status(400).json({ errors: 'Pay not completed, check {id} order and try again'})

    const capturePayment = {
      id: ordersDetail.data.id,
      status: ordersDetail.data.status,
      payerEmail: ordersDetail.data.payment_source.paypal.email_address,
      name: ordersDetail.data.purchase_units[0].shipping.name.full_name,
      mount: ordersDetail.data.purchase_units[0].payments.captures[0].amount.value,
      date: ordersDetail.data.purchase_units[0].payments.captures[0].create_time,
      idCampaign: ordersDetail.data.purchase_units[0].reference_id
    }

    res.status(200).json(capturePayment);
  } catch (error) {
    res.status(500).json({ errors: "Something goes wrong with capture order, try later" });
  }
};
