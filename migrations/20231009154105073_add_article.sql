CREATE TABLE "article" (
  "slug" TEXT NOT NULL PRIMARY KEY,
  "hash" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "html" TEXT NOT NULL,
  "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP, 
  "updatedAt" DATETIME
);