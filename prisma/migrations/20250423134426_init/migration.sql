/*
  Warnings:

  - Made the column `baseId` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_baseId_fkey";

-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "baseId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
