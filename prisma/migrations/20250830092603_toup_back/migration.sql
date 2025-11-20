-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('WAITING', 'PAID');

-- CreateTable
CREATE TABLE "TopUp" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'WAITING',
    "method" "OrderMethod" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "transactionId" INTEGER,

    CONSTRAINT "TopUp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TopUp" ADD CONSTRAINT "TopUp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopUp" ADD CONSTRAINT "TopUp_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
