import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { addReactionToPost, deleteReactionToPost, allReactionFromPosts } from '../../../controllers/postReaction';

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
  const DELETE: string = "DELETE";
  const POST: string = "POST";

  let { method, body, query } = req;

  try {
    switch (method) {
      case GET:
        const getAllReactionsFromPosts = await allReactionFromPosts(query)
        return getAllReactionsFromPosts ? res.status(200).json(getAllReactionsFromPosts) : res.status(404).json([])
      case POST:
        const generateReactionToPost = await addReactionToPost(query,body);
        return generateReactionToPost
          ? res.status(200).json(generateReactionToPost)
          : res.status(404).json({ error: "Data is not correct check postId, userId, reactionId" });
      case DELETE:
        const deleteReactionFromPost = await deleteReactionToPost(query,body);
        return deleteReactionFromPost
          ? res.status(200).json(deleteReactionFromPost)
          : res.status(404).json({ error: "Data is not correct check postId, userId, reactionId" });
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}
