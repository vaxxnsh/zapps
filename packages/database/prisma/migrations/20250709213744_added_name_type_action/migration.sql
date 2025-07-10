/*
  Warnings:

  - Added the required column `name` to the `TypeAction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TypeAction" ADD COLUMN     "name" TEXT NOT NULL;
