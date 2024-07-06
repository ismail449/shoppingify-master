-- DropIndex
DROP INDEX "Item_name_key";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "categoryName" DROP DEFAULT;
