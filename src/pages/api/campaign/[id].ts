import type { NextApiRequest, NextApiResponse } from "next";
import { getCampaigns, addCampaign, updateCampaign, deleteCampaign } from '../../../controllers/campaign';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const GET: string = "GET";
  const DELETE: string = "DELETE"  
  let { method, body, query } = req;

  try {
    switch (method) {
      case GET:
        const campaignById = await getCampaigns(query.id);
        return campaignById
          ? res.status(200).json(campaignById)
          : res.status(404).json({ error: "Something goes wrong, try again" });
      case DELETE:
        const removeDefinitive = await deleteCampaign(query.id)
        return removeDefinitive ? res.status(200).json(removeDefinitive) : res.status(404).json({ error: "Verify id and try again"})
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}