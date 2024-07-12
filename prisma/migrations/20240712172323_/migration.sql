-- DropIndex
DROP INDEX "Item_name_key";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
