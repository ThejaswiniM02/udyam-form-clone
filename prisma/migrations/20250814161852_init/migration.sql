-- CreateTable
CREATE TABLE "Verification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "aadhaar" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
