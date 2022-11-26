import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { getCampaigns, addCampaign, updateCampaign, deleteCampaign } from '../../../controllers/campaign';

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
  const DELETE: string = "DELETE" 
  const PUT: string = "PUT" 
  let { method, body, query } = req;

  try {
    switch (method) {
      case GET:
        const campaignById = await getCampaigns(query);
        return campaignById
          ? res.status(200).json(campaignById)
          : res.status(404).json({ error: "Something goes wrong check if id is valid and try again" });
      case DELETE:
        const removeDefinitive = await deleteCampaign(query.id)
        return removeDefinitive ? res.status(200).json(removeDefinitive) : res.status(404).json({ error: "Verify id and try again"})
      case PUT:
        const modifyCampaign = await updateCampaign(query.id,body)
        return modifyCampaign ? res.status(200).json(modifyCampaign) : res.status(404).json({ error: "Please enter a valid title, goal_amount, start_date, end_date, description, amount_raised, orchestraId"})
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}