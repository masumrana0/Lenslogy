/*
  Warnings:

  - You are about to drop the column `image` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the `ArticleAttachment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArticleAttachment" DROP CONSTRAINT "ArticleAttachment_articleId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "image",
ADD COLUMN     "attachmentId" TEXT;

-- DropTable
DROP TABLE "ArticleAttachment";

-- CreateTable
CREATE TABLE "Gadget" (
    "id" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "typeBaseId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "brandBaseId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3),
    "baseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "otherImages" TEXT[],
    "image" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "lang" "Language" NOT NULL,
    "attachmentId" TEXT,
    "isGadget" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPinFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPinLatest" BOOLEAN NOT NULL DEFAULT false,
    "isLatest" BOOLEAN NOT NULL DEFAULT false,
    "isPinHero" BOOLEAN NOT NULL DEFAULT false,
    "isPinNav" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isUpComing" BOOLEAN NOT NULL DEFAULT false,
    "isEmergingTech" BOOLEAN NOT NULL DEFAULT false,
    "isHotTech" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gadget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "ipAddress" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GadgetType" (
    "id" TEXT NOT NULL,
    "baseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lang" "Language" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GadgetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GadgetBrand" (
    "id" TEXT NOT NULL,
    "baseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lang" "Language" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GadgetBrand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_articleId_key" ON "Attachment"("articleId");

-- CreateIndex
CREATE UNIQUE INDEX "GadgetType_name_key" ON "GadgetType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GadgetType_baseId_lang_key" ON "GadgetType"("baseId", "lang");

-- CreateIndex
CREATE UNIQUE INDEX "GadgetBrand_name_key" ON "GadgetBrand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GadgetBrand_baseId_lang_key" ON "GadgetBrand"("baseId", "lang");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gadget" ADD CONSTRAINT "Gadget_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "GadgetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gadget" ADD CONSTRAINT "Gadget_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "GadgetBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gadget" ADD CONSTRAINT "Gadget_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gadget" ADD CONSTRAINT "Gadget_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
