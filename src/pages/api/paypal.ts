import type { NextApiRequest, NextApiResponse } from 'next'

const paypal = require('@paypal/checkout-server-sdk');
  
// Creating an environment
let clientId = "AVus1GYct9ksHXnwOzBPJUhCYwK_5C9oHteJoWuxOr4ctX4dOPzB9D6d2cRZc2jOj6xzR8Tkt3G6z4kS";
let clientSecret = "EOegfql-TCu0mNdg_a_QRvLPlxpzuWk05J5phW5xaktPVYGEZdBMpFpUN_calUMw_dPVQQM3yDpjMXKN";

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const GET:string="GET";
    const POST:string="POST";


    let {
      method,
      body,
    } = req;


    try {
        switch (method) {
            case POST:
              const requestPaypal = new paypal.orders.OrdersCreateRequest()
              requestPaypal.requestBody({
                intent: "CAPTURE",
                purchase_units:[
                    {
                        amount: {
                            currency_code: "USD",
                            value: "100.00"
                        }
                    }
                ]
              })
              const response = await client.execute(requestPaypal)
              return res.json({id: response.result.id })
            default:
              return res.status(400).json("method not allowed")
              
        }
    } catch (error) {
      return  res.status(400).json({error : "Internal error, something goes really really wrong"})
    }

}
