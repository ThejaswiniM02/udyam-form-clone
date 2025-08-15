-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "aadhaar" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "pan" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_aadhaar_key" ON "User"("aadhaar");

-- CreateIndex
CREATE UNIQUE INDEX "User_pan_key" ON "User"("pan");
