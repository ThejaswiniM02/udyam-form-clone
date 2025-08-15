import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { panNumber, fullName } = req.body;

  // Basic PAN format check (ABCDE1234F)
  if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)) {
    return res.status(400).json({ message: "Invalid PAN" });
  }

  if (!fullName || fullName.trim().length < 3) {
    return res.status(400).json({ message: "Invalid Name" });
  }

  // Mock verification
  return res.status(200).json({ message: "PAN verified successfully" });
}
