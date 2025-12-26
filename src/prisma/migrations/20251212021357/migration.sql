-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "age" INTEGER NOT NULL DEFAULT 0;
