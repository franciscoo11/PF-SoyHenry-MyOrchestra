import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { getUsers, postUser } from "../../../controllers/user";

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
        const allUsers = await getUsers(query);
        return allUsers
          ? res.status(200).json(allUsers)
          : res.status(404).json([]);
      case POST:
        const addUser = await postUser(body, query);
        return addUser
          ? res.status(201).json(addUser)
          : res
              .status(404)
              .json({
                error:
                  "Fields sent are not correct, please enter password, email, name, year_of_birth",
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
