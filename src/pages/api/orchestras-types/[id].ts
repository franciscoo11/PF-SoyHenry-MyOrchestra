import type { NextApiRequest, NextApiResponse } from "next";
import { updateOrchestraType, getOrchestrasTypes } from '../../../controllers/orchestrasTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const GET: string = "GET";
  const PUT: string = "PUT";

  let { method, body, query } = req;

  try {
    switch (method) {
      case GET:
        const OrchestrasType = await getOrchestrasTypes(query.id);
        return OrchestrasType
          ? res.status(200).json(OrchestrasType)
          : res.status(404).json({ error: "Something goes wrong, try again or check id" });
      case PUT:
        const modifyOrchestraType = await updateOrchestraType(query.id,body);
        return modifyOrchestraType
          ? res.status(201).json(modifyOrchestraType)
          : res.status(404).json({ error: "Something goes wrong, try again or check id" });
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}