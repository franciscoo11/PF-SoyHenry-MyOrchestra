import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { getCommentPost, postCommentPost } from "../../../controllers/comment";

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
        const get_CommentPost = await getCommentPost(query);
        return get_CommentPost
          ? res.status(200).json(get_CommentPost)
          : res.status(400).json([]);
      case POST:
        const post_CommentPost = await postCommentPost(body);
        return post_CommentPost
          ? res.status(201).json(post_CommentPost)
          : res
              .status(400)
              .json({
                error: "mandatory data missing: [content,userId,postId] ",
              });
      default:
        return res.status(400).json("method no found");
    }
  } catch (error) {
    return res
      .status(400)
      .send({ error: "Internal error, something goes really really wrong" });
  }
}
