/*
  Warnings:

  - You are about to drop the column `email` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nid]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nid` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Profile_email_key";

-- DropIndex
DROP INDEX "Profile_userId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "nid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_nid_key" ON "Profile"("nid");
