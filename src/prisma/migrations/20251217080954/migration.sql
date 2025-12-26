/*
  Warnings:

  - You are about to drop the column `profile_picture_url` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `image` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "profile_picture_url",
ADD COLUMN     "image" TEXT NOT NULL;
