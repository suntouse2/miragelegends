/*
  Warnings:

  - You are about to drop the `TopUp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TopUp" DROP CONSTRAINT "TopUp_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "TopUp" DROP CONSTRAINT "TopUp_userId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_userId_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "userId" DROP NOT NULL;

-- DropTable
DROP TABLE "TopUp";

-- DropTable
DROP TABLE "transactions";

-- DropEnum
DROP TYPE "TopupStatus";

-- DropEnum
DROP TYPE "TransactionType";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
