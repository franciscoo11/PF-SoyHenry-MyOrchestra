import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { getPost, postPost } from "../../../controllers/post";

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
        const getpostbyorchestra = await getPost(query);
        return getpostbyorchestra
          ? res.status(200).json(getpostbyorchestra)
          : res.status(400).json([]);
      case POST:
        const post_post = await postPost(body);
        return post_post
          ? res.status(201).json(post_post)
          : res
              .status(400)
              .json({
                error:
                  "mandatory data missing: title,content,url_video or url_file,visibility,event_date,event_hour,orchestraId,userId,type_PostId ",
              });

      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .send({ error: "Internal error, something goes really really wrong" });
  }
}
