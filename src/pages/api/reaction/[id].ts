import type { NextApiRequest, NextApiResponse } from "next";
import { updateReaction } from '../../../controllers/reaction';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const PUT: string = "PUT";

  let { method, body, query } = req;

  try {
    switch (method) {
      case PUT:
        const modifyReaction = await updateReaction(query,body);
        return modifyReaction
          ? res.status(201).json(modifyReaction)
          : res.status(404).json({ error: "Field reaction and valid id is required check and try again" });
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}