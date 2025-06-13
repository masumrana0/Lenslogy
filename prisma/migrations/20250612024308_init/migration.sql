/*
  Warnings:

  - A unique constraint covering the columns `[baseId,lang]` on the table `Gadget` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Gadget_baseId_lang_key" ON "Gadget"("baseId", "lang");
