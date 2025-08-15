import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { aadhaar, mobile } = req.body;

  if (!aadhaar || typeof aadhaar !== "string" || aadhaar.length !== 12) {
    return res.status(400).json({ success: false, message: "Invalid Aadhaar number." });
  }
  if (!mobile || typeof mobile !== "string" || mobile.length !== 10) {
    return res.status(400).json({ success: false, message: "Invalid mobile number." });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { aadhaar, mobile },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    return res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user by Aadhaar and mobile:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
});

export default router;


