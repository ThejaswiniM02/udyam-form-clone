import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

function isValidPAN(pan) {
  // Standard PAN format: 5 letters, 4 digits, 1 letter (case-insensitive)
  return /^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(pan);
}

router.post("/", async (req, res) => {
  const { pan } = req.body;

  // PAN format validation
  if (!pan || !isValidPAN(pan)) {
    return res.status(400).json({ success: false, message: "Invalid PAN format." });
  }

  try {
    // Find user by PAN in database
    const user = await prisma.user.findUnique({ where: { pan } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    return res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user by PAN:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
});

export default router;







