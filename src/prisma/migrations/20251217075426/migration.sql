/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
