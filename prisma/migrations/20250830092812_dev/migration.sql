/*
  Warnings:

  - The `status` column on the `TopUp` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TopupStatus" AS ENUM ('WAITING', 'PAID');

-- AlterTable
ALTER TABLE "TopUp" DROP COLUMN "status",
ADD COLUMN     "status" "TopupStatus" NOT NULL DEFAULT 'WAITING';

-- DropEnum
DROP TYPE "PaymentStatus";
