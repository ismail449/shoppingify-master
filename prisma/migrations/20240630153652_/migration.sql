/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_categoryId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "categoryName" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_name_key" ON "Category"("id", "name");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_categoryName_fkey" FOREIGN KEY ("categoryId", "categoryName") REFERENCES "Category"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;
