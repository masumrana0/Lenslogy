/*
  Warnings:

  - You are about to drop the column `isLatest` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "isLatest",
ADD COLUMN     "isEmergingTech" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPinHero" BOOLEAN NOT NULL DEFAULT false;
