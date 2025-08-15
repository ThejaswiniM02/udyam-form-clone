/*
  Warnings:

  - You are about to drop the `Verification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Verification";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AadhaarVerification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "aadhaarNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PanVerification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "panNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "holderName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
