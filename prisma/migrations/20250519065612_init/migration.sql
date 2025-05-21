/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Article` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[baseId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryBaseId` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_categoryId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "categoryId",
ADD COLUMN     "categoryBaseId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_baseId_key" ON "Category"("baseId");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_categoryBaseId_fkey" FOREIGN KEY ("categoryBaseId") REFERENCES "Category"("baseId") ON DELETE RESTRICT ON UPDATE CASCADE;
