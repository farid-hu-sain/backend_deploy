/*
  Warnings:

  - You are about to drop the column `priceAtTime` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "priceAtTime" DECIMAL(10,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "priceAtTime";
