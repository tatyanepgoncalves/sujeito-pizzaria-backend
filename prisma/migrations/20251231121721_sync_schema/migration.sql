/*
  Warnings:

  - You are about to drop the column `drafs` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "drafs",
ADD COLUMN     "draft" BOOLEAN NOT NULL DEFAULT true;
