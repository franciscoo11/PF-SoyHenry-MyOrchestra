import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import {
  getAllUserOnOrchestras,
  sendMembership,
  unsubscribeMembership,
  updateRolMembership,
} from "../../../controllers/userOnOrchestra";

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
  const DELETE: string = "DELETE";
  const PUT: string = "PUT";

  let { method, body, query } = req;

  try {
    switch (method) {
      case GET:
        const allUsersOnOrchestras = await getAllUserOnOrchestras(query);
        return allUsersOnOrchestras
          ? res.status(200).json(allUsersOnOrchestras)
          : res.status(404).json([]);
      case POST:
        const addUser = await sendMembership(query, body);
        return addUser
          ? res.status(201).json(addUser)
          : res
              .status(404)
              .json({
                error:
                  "Fields sent are not correct, please enter orchestraId, userId, rolId",
              });
      case PUT:
        const updateRolMember = await updateRolMembership(query, body);
        console.log(updateRolMember);
        return updateRolMember
          ? res.status(201).json(updateRolMember)
          : res
              .status(404)
              .json({
                error:
                  "Fields sent are not correct, please enter orchestraId, userId, rolId, status",
              });
      case DELETE:
        const deleteMembership = await unsubscribeMembership(query, body);
        return deleteMembership
          ? res.status(200).json(deleteMembership)
          : res
              .status(404)
              .json({
                error:
                  "Fields sent are not correct, please enter orchestraId, userId, rolId",
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
