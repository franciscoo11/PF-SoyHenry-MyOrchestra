import type { NextApiRequest, NextApiResponse } from "next";
import { getDonationsById } from '../../../controllers/donation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const GET: string = "GET";
  let { method, body, query } = req;

  try {
    switch (method) {
      case GET:
        const donationById = await getDonationsById(query.id);
        return donationById
          ? res.status(200).json(donationById)
          : res.status(404).json({ error: "Something goes wrong check if id is valid and try again" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}