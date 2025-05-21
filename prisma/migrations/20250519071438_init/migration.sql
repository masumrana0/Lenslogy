-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_categoryBaseId_fkey";

-- DropIndex
DROP INDEX "Category_baseId_key";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "categoryId" TEXT;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
