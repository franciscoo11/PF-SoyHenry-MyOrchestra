import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { buildRol, getRols, updateRol } from "../../../controllers/rols";

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
        const allRols = await getRols();
        return allRols
          ? res.status(200).json(allRols)
          : res.status(404).json([]);
      case POST:
        const addRol = await buildRol(body);
        return addRol
          ? res.status(201).json(addRol)
          : res.status(404).json({
              error: "mandatory data missing: rolId"
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
