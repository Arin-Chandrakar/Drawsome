/*
  Warnings:

  - You are about to drop the column `emaial` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emaial",
ADD COLUMN     "email" TEXT,
ALTER COLUMN "photo" DROP NOT NULL;
