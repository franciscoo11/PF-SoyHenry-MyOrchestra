import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { addFavorite, getFavorites } from "../../../controllers/favorites";

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

  let { method, body, query } = req;

  try {
    switch (method) {
      case GET:
        const allFavorites = await getFavorites(query.user_id);
        return allFavorites
          ? res.status(200).json(allFavorites)
          : res.status(404).json([]);
      case POST:
        const insertFavorite = await addFavorite(body.user_id,body.orchestra_id);
        return insertFavorite
          ? res.status(201).json(insertFavorite)
          : res.status(404).json({ error: "Wrong orchestra_id or user_id check information and try again" });
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}
