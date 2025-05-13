/*
  Warnings:

  - A unique constraint covering the columns `[baseId,lang]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[baseId,lang]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Category_lang_baseId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Article_baseId_lang_key" ON "Article"("baseId", "lang");

-- CreateIndex
CREATE UNIQUE INDEX "Category_baseId_lang_key" ON "Category"("baseId", "lang");
