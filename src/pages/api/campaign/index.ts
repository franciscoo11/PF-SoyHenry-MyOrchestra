import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { getCampaigns, addCampaign, updateCampaign } from '../../../controllers/campaign';

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
  const POST: string = "POST";
  const PUT: string = "PUT"  
  let { method, body, query } = req;

  try {
    switch (method) {
      case GET:
        const allCampaigns = await getCampaigns(query);
        return allCampaigns
          ? res.status(200).json(allCampaigns)
          : res.status(404).json([]);
      case POST:
        const insertCampaign = await addCampaign(body);
        return insertCampaign
          ? res.status(201).json(insertCampaign)
          : res.status(404).json({ error: "Please enter a valid title, goal_amount, start_date, end_date, description, amount_raised, orchestraId" });
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}
