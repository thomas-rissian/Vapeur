/*
  Warnings:

  - You are about to drop the column `title` on the `Game` table. All the data in the column will be lost.
  - Added the required column `name` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "kindId" INTEGER NOT NULL,
    "editorId" INTEGER NOT NULL,
    CONSTRAINT "Game_kindId_fkey" FOREIGN KEY ("kindId") REFERENCES "KindOfGame" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "Editor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("desc", "editorId", "id", "kindId", "releaseDate") SELECT "desc", "editorId", "id", "kindId", "releaseDate" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
