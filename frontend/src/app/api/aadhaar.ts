import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { aadhaarNumber, mobileNumber } = req.body;

  // Basic validation
  if (!aadhaarNumber || aadhaarNumber.replace(/\s+/g, "").length !== 12) {
    return res.status(400).json({ message: "Invalid Aadhaar" });
  }

  if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
    return res.status(400).json({ message: "Invalid Mobile Number" });
  }

  // Mock OTP sending (you could integrate real API here)
  return res.status(200).json({ message: "OTP sent successfully" });
}
