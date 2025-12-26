-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "profile_picture_url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
