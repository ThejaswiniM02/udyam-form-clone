/*
  Warnings:

  - You are about to drop the column `aadhaar` on the `Verification` table. All the data in the column will be lost.
  - You are about to drop the column `businessName` on the `Verification` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `Verification` table. All the data in the column will be lost.
  - You are about to drop the column `otp` on the `Verification` table. All the data in the column will be lost.
  - You are about to drop the column `pan` on the `Verification` table. All the data in the column will be lost.
  - Added the required column `status` to the `Verification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Verification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Verification` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Verification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Verification" ("createdAt", "id") SELECT "createdAt", "id" FROM "Verification";
DROP TABLE "Verification";
ALTER TABLE "new_Verification" RENAME TO "Verification";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
