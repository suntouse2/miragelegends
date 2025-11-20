/*
  Warnings:

  - You are about to drop the column `orderProductId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `OrderProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productSnapshot` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_orderProductId_fkey";

-- DropIndex
DROP INDEX "orders_orderProductId_key";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "orderProductId",
ADD COLUMN     "productSnapshot" JSONB NOT NULL;

-- DropTable
DROP TABLE "OrderProduct";
