import type { NextApiRequest, NextApiResponse } from "next";
import { getCampaigns, addCampaign, updateCampaign } from '../../../controllers/campaign';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const GET: string = "GET";
  const POST: string = "POST";
  const PUT: string = "PUT"  
  let { method, body, query } = req;

  try {
    switch (method) {
      case GET:
        const allCampaigns = await getCampaigns();
        return allCampaigns
          ? res.status(200).json(allCampaigns)
          : res.status(404).json({ error: "Something goes wrong, try again" });
      case POST:
        const insertCampaign = await addCampaign(body);
        return insertCampaign
          ? res.status(201).json(insertCampaign)
          : res.status(404).json({ error: "Something goes wrong, try again" });
      case PUT:
        const modifyCampaign = await updateCampaign(query.id,body)
        return modifyCampaign ? res.status(200).json(modifyCampaign) : res.status(404).json({ error: "Check body information and try again"})
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}
