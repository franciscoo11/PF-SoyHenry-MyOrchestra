import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { logicDeleteComment } from "../../../controllers/comment";

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

  const PATCH: string = "PATCH";

  let {
    method,
    body,
    query: { id },
  } = req;

  try {
    switch (method) {
      case PATCH:
        const fakeDeleteComment = await logicDeleteComment(id);
        return fakeDeleteComment
          ? res.status(200).json(fakeDeleteComment)
          : res
              .status(404)
              .json({ error: "Something goes wrong, check id and try again" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}
