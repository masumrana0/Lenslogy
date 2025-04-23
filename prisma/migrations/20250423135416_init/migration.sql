/*
  Warnings:

  - You are about to drop the column `tags` on the `Article` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Article_baseId_lang_key";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "tags";
