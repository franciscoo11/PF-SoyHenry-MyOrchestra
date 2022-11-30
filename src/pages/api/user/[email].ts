import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import {
  updateUser,
  logicDeleteUser,
  deleteUser,
  getUsers,
} from "../../../controllers/user";

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
  const DELETE: string = "DELETE";
  const PUT: string = "PUT";
  const PATCH: string = "PATCH";

  let {
    method,
    body,
    query
  } = req;

  try {
    switch (method) {
      case GET:
        const getUser = await getUsers(query);
        return getUser
          ? res.status(200).json(getUser)
          : res
              .status(404)
              .json({ error: "User not found, check if id is valid" });
      case PATCH:
        const fakeDeleteUser = await logicDeleteUser(query.email);
        return fakeDeleteUser
          ? res.status(200).json(fakeDeleteUser)
          : res
              .status(404)
              .json({
                error:
                  "Something goes wrong, check if id is correct and try again",
              });
      case PUT:
        const modifyUser = await updateUser(query, body);
        return modifyUser
          ? res.status(200).json(modifyUser)
          : res
              .status(404)
              .json({
                error:
                  "Something goes wrong, check if id is correct and try again",
              });
      case DELETE:
        const removeUser = await deleteUser(query.email);
        return removeUser
          ? res.status(200).json(removeUser)
          : res
              .status(404)
              .json({ error: "Something goes wrong, check id and try again" });
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}
