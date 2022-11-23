import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { updateRol } from "../../../controllers/rols";

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
  let { method, body, query } = req;

  try {
    switch (method) {
      case PUT:
        const changeRol = await updateRol(query.id,body);
        return changeRol
          ? res.status(200).json(changeRol)
          : res.status(404).json({ error: "Something goes wrong, try again or check id from user and rol" });
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}
