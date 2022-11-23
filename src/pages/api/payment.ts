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
