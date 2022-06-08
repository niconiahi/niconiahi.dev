/*
  Warnings:

  - You are about to drop the `Balance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Balance";

-- CreateTable
CREATE TABLE "Increment" (
    "id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "blockId" TEXT NOT NULL,

    CONSTRAINT "Increment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Increment" ADD CONSTRAINT "Increment_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
