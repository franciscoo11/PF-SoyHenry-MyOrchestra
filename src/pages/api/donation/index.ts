import type { NextApiRequest, NextApiResponse } from "next";
import { getDonations, postDonation } from '../../../controllers/donation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const GET: string = "GET";
  const POST: string = "POST"; 
  let { method, body, query } = req;

  try {
    switch (method) {
      case GET:
        const allDonations = await getDonations(query);
        return allDonations
          ? res.status(200).json(allDonations)
          : res.status(404).json([]);
      case POST:
        const postDonations = await postDonation(body);
        return postDonations
          ? res.status(201).json(postDonations)
          : res.status(404).json({ error: "Please enter a valid amount" });
      default:
        return res.status(400).json("method not allowed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Internal error, something goes really really wrong" });
  }
}