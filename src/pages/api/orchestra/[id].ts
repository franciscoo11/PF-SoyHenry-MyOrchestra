import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import {
  logicDeleteOrchestra,
  deleteOrchestra,
  getOrchestrasById,
  updateOrchestra,
} from "../../../controllers/orchestras";

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
  const PUT: string = "PUT";
  const DELETE: string = "DELETE";
  const PATCH: string = "PATCH";

  let {
    method,
    body,
    query: { id },
  } = req;

  try {
    switch (method) {
      case GET:
        const getoneorchestra = await getOrchestrasById(id);
        return getoneorchestra
          ? res.status(200).json(getoneorchestra)
          : res
              .status(404)
              .json({ error: "Something goes wrong, check id and try again" });
      case PUT:
        const changesdataorchestra = await updateOrchestra(id, body);
        return changesdataorchestra
          ? res.status(200).json(changesdataorchestra)
          : res
              .status(404)
              .json({ error: "Something goes wrong, check id and try again" });
      case PATCH:
        const deletlogic = await logicDeleteOrchestra(id);
        return deletlogic
          ? res.status(200).json(deletlogic)
          : res
              .status(404)
              .json({ error: "Something goes wrong, check id and try again" });
      case DELETE:
        const deletereal = await deleteOrchestra(id);
        return deletereal
          ? res.status(200).json(deletereal)
          : res
              .status(404)
              .json({ error: "Something goes wrong, check id and try again" });
      default:
        return res.status(400).json("method no found");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}
