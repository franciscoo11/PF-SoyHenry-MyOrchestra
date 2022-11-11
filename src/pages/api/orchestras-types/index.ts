import type { NextApiRequest, NextApiResponse } from "next";
import {
  getOrchestrasTypes,
  addOrchestraType,
} from "../../../controllers/orchestrasTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const GET: string = "GET";
  const POST: string = "POST";

  let { method, body } = req;

  try {
    switch (method) {
      case GET:
        const allOrchestrasTypes = await getOrchestrasTypes();
        return allOrchestrasTypes
          ? res.status(200).json(allOrchestrasTypes)
          : res.status(404).json({ error: "Something goes wrong, try again" });
      case POST:
        const generateOrchestraType = await addOrchestraType(body);
        return generateOrchestraType
          ? res.status(201).json(generateOrchestraType)
          : res.status(404).json({ error: "Something goes wrong, try again" });
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}
