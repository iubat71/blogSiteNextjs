/*
  Warnings:

  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authorId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "Profile_userId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userId",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "imageUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_authorId_key" ON "Profile"("authorId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
