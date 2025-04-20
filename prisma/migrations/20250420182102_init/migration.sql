-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPinFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPinLatest" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;
