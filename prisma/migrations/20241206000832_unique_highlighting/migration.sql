/*
  Warnings:

  - A unique constraint covering the columns `[gameId]` on the table `highlighting` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "highlighting_gameId_key" ON "highlighting"("gameId");
