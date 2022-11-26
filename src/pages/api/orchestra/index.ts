import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { postOrchestras, getOrchestras } from "../../../controllers/orchestras";

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
        const Getallorchestra = await getOrchestras(query);
        return Getallorchestra
          ? res.status(200).json(Getallorchestra)
          : res.status(404).json([]);
      case POST:
        const postorchestra = await postOrchestras(body);
        return postorchestra
          ? res.status(201).json(postorchestra)
          : res
              .status(400)
              .json({
                error:
                  "Some body information is wrong check: name,description,logo,cover,creation_date,sponsor,location,donation_account,phone,user_id,orchestra_TypeId ",
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
