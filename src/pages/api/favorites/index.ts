import type { NextApiRequest, NextApiResponse } from "next";
import { addFavorite, getFavorites } from "../../../controllers/favorites";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const GET: string = "GET";
  const POST: string = "POST";

  let { method, body, query } = req;

  try {
    switch (method) {
      case GET:
        const allFavorites = await getFavorites(query.user_id);
        return allFavorites
          ? res.status(200).json(allFavorites)
          : res.status(404).json([]);
      case POST:
        const generateOrchestraType = await addFavorite(query.user_id,body.orchestra_id);
        return generateOrchestraType
          ? res.status(201).json(generateOrchestraType)
          : res.status(404).json({ error: "mandatory data missing: type" });
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}
