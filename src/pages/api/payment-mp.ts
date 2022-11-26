import { NextApiRequest, NextApiResponse } from "next"
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_TOKEN || ''
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
 switch (req.method) {
  case 'POST':
    const addPay = await postPay(req, res)
    return addPay;
  case 'GET':
    const findPay = await capturePay(req,res)
    return findPay
  default:
    return res.status(400).json("method not allowed");
 }
}

async function postPay(req: NextApiRequest, res: NextApiResponse<any>) {

  let preference = {
    items: [
      {
        id: req.body.idCampaign,
        title: 'donation',
        unit_price: parseInt(req.body.price),
        quantity: 1,
      }
    ],
    back_urls: {
      success: `http://localhost:3000/success`,
      failure: `http://localhost:3000/`,
    },
    auto_return: "approved",
  }

  await mercadopago.preferences
  .create(preference)
  .then(function (response:any) {
    res.json(response.body.init_point);
  })
  .catch(function (error:any) {
    return error
  });
}

async function capturePay(req: NextApiRequest, res: NextApiResponse<any>){
  const { paymentId } = req.query
  mercadopago.payment.capture(paymentId, mercadopago, (error:any, response:any) => {
    try {
      const payData = {
        status: response.body.status,
        status_detail: response.body.status_detail,
        date: response.body.date_approved,
        mount: response.body.transaction_amount,
        payerEmail: response.body.payer.email,
        idCampaign: response.body.additional_info.items[0].id
      }
      return res.json(payData)
    } catch (error) {
      return res.status(500).json({ errors: 'Something goes wrong'})
    }
  });
}