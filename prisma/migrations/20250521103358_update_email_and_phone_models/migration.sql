/*
  Warnings:

  - You are about to drop the column `verified` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `PhoneNumber` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[verificationToken]` on the table `Email` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[verificationToken]` on the table `PhoneNumber` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Email" DROP COLUMN "verified",
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verificationToken" TEXT,
ADD COLUMN     "verificationTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN     "verifiedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "PhoneNumber" DROP COLUMN "verified",
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verificationToken" TEXT,
ADD COLUMN     "verificationTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN     "verifiedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Email_verificationToken_key" ON "Email"("verificationToken");

-- CreateIndex
CREATE UNIQUE INDEX "PhoneNumber_verificationToken_key" ON "PhoneNumber"("verificationToken");
