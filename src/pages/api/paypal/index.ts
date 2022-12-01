import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import NextCors from "nextjs-cors";
import { HOSTNAME } from "../../_app";
require('dotenv').config()

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

  const POST: string = "POST";

  let { method } = req;

  try {
    switch (method) {
      case POST:
        const buildOrder = await createOrder(req, res);
        return buildOrder
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: req.body.idCampaign,
          amount: {
            currency_code: "USD",
            value: parseInt(req.body.value),
          },
          description: req.body.idOrchestra,
        },
      ],
      
      application_context: {
        brand_name: "myorchestras.net",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: `${HOSTNAME}/orchestras/${req.body.idOrchestra}/campaigns/${req.body.idCampaign}/paypalSuccess` ,
      },
    };

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const {
      data: { access_token },
    } = await axios.post(`${process.env.PAYPAL_OAUTH_URL}`, params, {
      headers: {
        'Accept-Encoding': '*',
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.PAYPAL_CLIENT || '',
        password: process.env.PAYPAL_SECRET || '',
      },
    });

    const makeOrder = await axios.post(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    res.status(201).json({ id: makeOrder.data.id, paymentLink: makeOrder.data.links[1].href });

  } catch (error) {
    return res
      .status(500)
      .send("Something goes wrong the order has not been generated");
  }
};
