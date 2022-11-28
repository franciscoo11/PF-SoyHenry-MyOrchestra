import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { removeFavorite,getFavoritesidOrchestra } from '../../../controllers/favorites';

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

  const PUT: string = "PUT";
  const GET: string = "GET";
 
  let { method, body, query } = req;

  try {
    switch (method) {

      case GET:
        const getexist = await getFavoritesidOrchestra(query.id, body.orchestra_id)
        return getexist? res.status(200).json(getexist):[]
      case PUT:
        const deleteFavorite = await removeFavorite(query.id, body.orchestra_id);
        return deleteFavorite
          ? res.status(200).json(deleteFavorite)
          : res.status(404).json({ error: 'id and orchestra_id are not correct, verify them and try again'});
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}
