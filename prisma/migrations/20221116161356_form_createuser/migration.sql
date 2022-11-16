/*
  Warnings:

  - The primary key for the `Favorites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `favId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `post_ReactionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post_Reaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoritesToOrchestra` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[reaction]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orchestraId` to the `Favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCreator` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `orchestraId` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "StatusOrchestraMember" AS ENUM ('PENDING', 'MEMBER', 'REJECTED');

-- CreateEnum
CREATE TYPE "MemberType" AS ENUM ('BASIC', 'TEACHER');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Orchestra" DROP CONSTRAINT "Orchestra_orchestra_TypeId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_orchestraId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post_Reaction" DROP CONSTRAINT "Post_Reaction_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post_Reaction" DROP CONSTRAINT "Post_Reaction_reactionId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_favId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_post_ReactionId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_rolId_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToOrchestra" DROP CONSTRAINT "_FavoritesToOrchestra_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToOrchestra" DROP CONSTRAINT "_FavoritesToOrchestra_B_fkey";

-- DropIndex
DROP INDEX "Favorites_email_key";

-- DropIndex
DROP INDEX "User_favId_key";

-- AlterTable
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
ADD COLUMN     "orchestraId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Favorites_pkey" PRIMARY KEY ("userId", "orchestraId");

-- AlterTable
ALTER TABLE "Orchestra" ALTER COLUMN "logo" DROP NOT NULL,
ALTER COLUMN "cover" DROP NOT NULL,
ALTER COLUMN "is_active" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "orchestra_TypeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "userId",
ADD COLUMN     "userCreator" TEXT NOT NULL,
ALTER COLUMN "is_active" DROP NOT NULL,
ALTER COLUMN "event_date" DROP NOT NULL,
ALTER COLUMN "event_hour" DROP NOT NULL,
ALTER COLUMN "orchestraId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "favId",
DROP COLUMN "post_ReactionId",
ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Post_Reaction";

-- DropTable
DROP TABLE "Rol";

-- DropTable
DROP TABLE "_FavoritesToOrchestra";

-- CreateTable
CREATE TABLE "PostUserOnReaction" (
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reactionId" TEXT NOT NULL,

    CONSTRAINT "PostUserOnReaction_pkey" PRIMARY KEY ("postId","userId","reactionId")
);

-- CreateTable
CREATE TABLE "UserOnOrchestra" (
    "status" "StatusOrchestraMember" NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,
    "orchestraId" TEXT NOT NULL,
    "type" "MemberType" NOT NULL DEFAULT 'BASIC',

    CONSTRAINT "UserOnOrchestra_pkey" PRIMARY KEY ("userId","orchestraId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_reaction_key" ON "Reaction"("reaction");

-- AddForeignKey
ALTER TABLE "Orchestra" ADD CONSTRAINT "Orchestra_orchestra_TypeId_fkey" FOREIGN KEY ("orchestra_TypeId") REFERENCES "Orchestra_Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_orchestraId_fkey" FOREIGN KEY ("orchestraId") REFERENCES "Orchestra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userCreator_fkey" FOREIGN KEY ("userCreator") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostUserOnReaction" ADD CONSTRAINT "PostUserOnReaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostUserOnReaction" ADD CONSTRAINT "PostUserOnReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostUserOnReaction" ADD CONSTRAINT "PostUserOnReaction_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "Reaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnOrchestra" ADD CONSTRAINT "UserOnOrchestra_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnOrchestra" ADD CONSTRAINT "UserOnOrchestra_orchestraId_fkey" FOREIGN KEY ("orchestraId") REFERENCES "Orchestra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_orchestraId_fkey" FOREIGN KEY ("orchestraId") REFERENCES "Orchestra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
