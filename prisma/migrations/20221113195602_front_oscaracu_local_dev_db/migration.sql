/*
  Warnings:

  - You are about to drop the column `orchestra_id` on the `Campaign` table. All the data in the column will be lost.
  - The `creation_date` column on the `Comment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `orchestra_type` on the `Orchestra` table. All the data in the column will be lost.
  - You are about to drop the column `orchestra_id` on the `Orchestra_Type` table. All the data in the column will be lost.
  - You are about to drop the column `post_type` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `post_type_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `reaction_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[favId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orchestraId` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Made the column `orchestra_TypeId` on table `Orchestra` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `year_of_birth` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orchestra" DROP CONSTRAINT "Orchestra_orchestra_TypeId_fkey";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "orchestra_id",
ADD COLUMN     "orchestraId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "creation_date",
ADD COLUMN     "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Orchestra" DROP COLUMN "orchestra_type",
ALTER COLUMN "orchestra_TypeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Orchestra_Type" DROP COLUMN "orchestra_id";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "post_type",
DROP COLUMN "post_type_id",
DROP COLUMN "reaction_id",
ADD COLUMN     "type_PostId" TEXT,
ALTER COLUMN "visibility" DROP NOT NULL,
ALTER COLUMN "views" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "dateOfBirth",
ADD COLUMN     "favId" TEXT,
ADD COLUMN     "post_ReactionId" TEXT,
ADD COLUMN     "rolId" TEXT,
ADD COLUMN     "year_of_birth" TEXT NOT NULL,
ALTER COLUMN "avatar" DROP NOT NULL,
ALTER COLUMN "cover" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Rol" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type_Post" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post_Reaction" (
    "id" TEXT NOT NULL,
    "reactionId" TEXT,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Post_Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "reaction" TEXT NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoritesToOrchestra" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Type_Post_name_key" ON "Type_Post"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_email_key" ON "Favorites"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesToOrchestra_AB_unique" ON "_FavoritesToOrchestra"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesToOrchestra_B_index" ON "_FavoritesToOrchestra"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_favId_key" ON "User"("favId");

-- AddForeignKey
ALTER TABLE "Orchestra" ADD CONSTRAINT "Orchestra_orchestra_TypeId_fkey" FOREIGN KEY ("orchestra_TypeId") REFERENCES "Orchestra_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_post_ReactionId_fkey" FOREIGN KEY ("post_ReactionId") REFERENCES "Post_Reaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_favId_fkey" FOREIGN KEY ("favId") REFERENCES "Favorites"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_type_PostId_fkey" FOREIGN KEY ("type_PostId") REFERENCES "Type_Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_orchestraId_fkey" FOREIGN KEY ("orchestraId") REFERENCES "Orchestra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Reaction" ADD CONSTRAINT "Post_Reaction_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "Reaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Reaction" ADD CONSTRAINT "Post_Reaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToOrchestra" ADD CONSTRAINT "_FavoritesToOrchestra_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToOrchestra" ADD CONSTRAINT "_FavoritesToOrchestra_B_fkey" FOREIGN KEY ("B") REFERENCES "Orchestra"("id") ON DELETE CASCADE ON UPDATE CASCADE;
