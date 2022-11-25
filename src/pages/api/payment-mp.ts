
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
    const findPay = await searchPay(req,res)
    return findPay
  default:
    break;
 }
}

async function postPay(req: NextApiRequest, res: NextApiResponse<any>) {

  let preference = {
    items: [
      {
        id: req.body.id,
        title: req.body.title,
        unit_price: parseInt(req.body.price),
        quantity: 1,
      }
    ],
    // notification_url:`http://localhost.com/api/${req.body.id}`,
    back_urls: {
      success: `http://localhost:3000/success`,
      failure: `http://localhost:3000/`,
      pending: `http://localhost:3000/`
    },
    // payer: {
    //   email: req.body.email,
    // },
    // external_reference: "Reference_1234",
    auto_return: "approved",
      payer: {
        email: req.body.email,
    },
    
  }

  await mercadopago.preferences
  .create(preference)
  .then(function (response:any) {
    const response2 = {
      link: response.body.init_point,
      id: '123456789'
    }
    res.json(response2);
  })
  .catch(function (error:any) {
    console.log(error);
  });
}

async function searchPay(req: NextApiRequest, res: NextApiResponse<any>) {
  var filters = {
    range: 'date_created',
    begin_date: 'NOW-1MONTH',
    end_date: 'NOW',
    status: 'approved',
    operation_type: 'regular_payment'
  };

  // DATE AND EMAIL FILTER
  // var filters = {
  //   payer_email: 'test_user_3931694@testuser.com',
  //   begin_date: mercadopago.utils.date.now().subtract(60).toString(),
  //   end_date: mercadopago.utils.date.now().toString()
  // };

  await mercadopago.payment.search({
    qs: filters
  }).then(function (data:any) {
    res.json(data);
  }).catch(function (error:any) {
    res.json(error);
  });
}

// async function capturePay(req: NextApiRequest, res: NextApiResponse<any>){
//   const { paymentId } = req.query
//   mercadopago.payment.capture(paymentId, mercadopago, (error:any, response:any) => {
//     try {
//       console.log(response)
//       return res.json(response)
//     } catch (error) {
//       return res.status(500).json({ errors: 'Something goes wrong'})
//     }
// });
// }