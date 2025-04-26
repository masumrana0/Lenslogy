/*
  Warnings:

  - The `views` column on the `ArticleAttachment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `likes` column on the `ArticleAttachment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ArticleAttachment" DROP COLUMN "views",
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "likes",
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;
