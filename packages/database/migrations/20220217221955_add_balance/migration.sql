-- CreateTable
CREATE TABLE "Balance" (
    "address" TEXT NOT NULL,
    "weight" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Balance_address_key" ON "Balance"("address");
