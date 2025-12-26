/*
  Warnings:

  - You are about to drop the column `image` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `profile_picture_url` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "image",
ADD COLUMN     "profile_picture_url" TEXT NOT NULL;
