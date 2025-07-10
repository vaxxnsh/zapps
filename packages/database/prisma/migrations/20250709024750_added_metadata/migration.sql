/*
  Warnings:

  - Added the required column `metdata` to the `ZapRun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ZapRun" ADD COLUMN     "metdata" JSONB NOT NULL;
