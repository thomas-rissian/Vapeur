/*
  Warnings:

  - The primary key for the `highlighting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `highlighting` table. All the data in the column will be lost.
  - Added the required column `idHighlighting` to the `highlighting` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_highlighting" (
    "idHighlighting" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    CONSTRAINT "highlighting_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_highlighting" ("gameId") SELECT "gameId" FROM "highlighting";
DROP TABLE "highlighting";
ALTER TABLE "new_highlighting" RENAME TO "highlighting";
CREATE UNIQUE INDEX "highlighting_gameId_key" ON "highlighting"("gameId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
