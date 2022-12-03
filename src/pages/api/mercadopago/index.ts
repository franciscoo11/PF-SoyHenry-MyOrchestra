import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  switch (req.method) {
    case "POST":
      const createPreference = await generatePreference(req, res);
      return createPreference;
    case "GET":
      const findPaymentById = await capturePayment(req, res);
      return findPaymentById;
    default:
      return res.status(400).json("method not allowed");
  }
};

async function generatePreference(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const url = `${process.env.MERCADOPAGO_BASE_URL}/checkout/preferences`;

    const body = {
      items: [
        {
          id: req.body.idCampaign,
          title: "donation",
          unit_price: parseInt(req.body.price),
          quantity: 1,
        },
      ],
      external_reference: req.body.idOrchestra,
      back_urls: {
        success: `${process.env.HOSTNAME}/orchestras/${req.body.idOrchestra}/campaigns/${req.body.idCampaign}/mpsuccess`,
        failure: `${process.env.HOSTNAME}`,
      },
      auto_return: "approved",
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application-json",
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
    });

    return res.status(201).json({ paymentLink: payment.data.init_point });
  } catch (error) {
    return res.status(500).json({
      errors: "Something goes wrong preference has not been created, try again",
    });
  }
}

async function capturePayment(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { id } = req.query;
    const url = `${process.env.MERCADOPAGO_BASE_URL}/v1/payments/${id}`;

    const getPayment = await axios.get(url, {
      headers: {
        'Accept-Encoding': 'null',
        "Content-Type": "application-json",
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
    });

    const paymentInformation = {
      status: getPayment.data.status,
      status_detail: getPayment.data.status_detail,
      date: getPayment.data.date_approved,
      mount: getPayment.data.transaction_amount,
      payerEmail: getPayment.data.payer.email,
      idCampaign: getPayment.data.additional_info.items[0].id,
    };

    return res.status(200).json(paymentInformation);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: "Something goes wrong paymentId provided is not valid" });
  }
}
