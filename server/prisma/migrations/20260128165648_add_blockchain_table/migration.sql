-- CreateTable
CREATE TABLE "BlockchainBlock" (
    "index" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" TEXT NOT NULL,
    "previousHash" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "nonce" INTEGER NOT NULL DEFAULT 0,
    "batchId" TEXT,
    "eventId" TEXT,

    CONSTRAINT "BlockchainBlock_pkey" PRIMARY KEY ("index")
);
