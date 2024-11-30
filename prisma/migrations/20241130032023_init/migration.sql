-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_highlighting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    CONSTRAINT "highlighting_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_highlighting" ("gameId", "id") SELECT "gameId", "id" FROM "highlighting";
DROP TABLE "highlighting";
ALTER TABLE "new_highlighting" RENAME TO "highlighting";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
