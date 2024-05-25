/*
  Warnings:

  - You are about to drop the column `activeShoppingListId` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ListStatus" AS ENUM ('canceled', 'active', 'completed');

-- AlterTable
ALTER TABLE "ShoppingList" ADD COLUMN     "listStatus" "ListStatus" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "activeShoppingListId";

-- CreateTable
CREATE TABLE "ShoppingItem" (
    "id" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "shoppingListId" TEXT NOT NULL,
    "itemCount" INTEGER NOT NULL,

    CONSTRAINT "ShoppingItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShoppingItem" ADD CONSTRAINT "ShoppingItem_shoppingListId_fkey" FOREIGN KEY ("shoppingListId") REFERENCES "ShoppingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
