import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { getAllTypesPost, addTypePost } from '../../../controllers/typesPosts';

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
        const allTypesPost = await getAllTypesPost();
        return allTypesPost
          ? res.status(200).json(allTypesPost)
          : res.status(404).json([]);
      case POST:
        const buildTypePost = await addTypePost(body.name);
        return buildTypePost
          ? res.status(201).json(buildTypePost)
          : res.status(404).json({
              error: "mandatory data missing: name"
            });
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}
