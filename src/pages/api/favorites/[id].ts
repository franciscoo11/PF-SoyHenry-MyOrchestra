import type { NextApiRequest, NextApiResponse } from "next";
import { removeFavorite } from '../../../controllers/favorites';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const PUT: string = "PUT";
 
  let { method, body, query } = req;

  try {
    switch (method) {
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
