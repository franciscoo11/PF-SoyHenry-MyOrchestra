import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { getDonationsById } from '../../../controllers/donation';

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
  let { method, query } = req;

  try {
    switch (method) {
      case GET:
        const donationById = await getDonationsById(query.id);
        return donationById
          ? res.status(200).json(donationById)
          : res.status(404).json({ error: "Something goes wrong check if id is valid and try again" });
      default:
        return res.status(400).json("method no found");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}