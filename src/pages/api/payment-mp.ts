import { NextApiRequest, NextApiResponse } from "next"
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_TOKEN || ''
});

export default (req: NextApiRequest, res: NextApiResponse) => {
 switch (req.method) {
  case 'POST':
    const addPay = postPay(req, res)
    return addPay;
  case 'GET':
    const findPay = searchPay(req,res)
    return findPay
  default:
    break;
 }
}

function postPay(req: NextApiRequest, res: NextApiResponse<any>) {

  let preference = {
    items: [
      {
        id: req.body.id,
        title: req.body.title,
        unit_price: parseInt(req.body.price),
        quantity: 1,
      }
    ],
    back_urls: {
      success: `http://localhost:3000/`,
      failure: `http://localhost:3000/`,
      pending: `http://localhost:3000/`
    },
    payer: {
      email: req.body.email,
    }
  }

  mercadopago.preferences
  .create(preference)
  .then(function (response) {
    res.json(response.body.init_point);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function searchPay(req: NextApiRequest, res: NextApiResponse<any>) {
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

  mercadopago.payment.search({
    qs: filters
  }).then(function (data) {
    res.json(data);
  }).catch(function (error) {
    res.json(error);
  });
}
