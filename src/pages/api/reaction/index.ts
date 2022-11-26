import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { getAllReactions, addReaction } from '../../../controllers/reaction';

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

  let { method, body } = req;

  try {
    switch (method) {
      case GET:
        const allReactions = await getAllReactions();
        return allReactions
          ? res.status(200).json(allReactions)
          : res.status(404).json([]);
      case POST:
        const generateReaction = await addReaction(body.reaction);
        return generateReaction
          ? res.status(201).json(generateReaction)
          : res.status(404).json({ error: "mandatory data missing: reaction" });
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}
