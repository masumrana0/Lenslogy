/*
  Warnings:

  - You are about to drop the column `otherImages` on the `Gadget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gadget" DROP COLUMN "otherImages",
ADD COLUMN     "images" TEXT[];
