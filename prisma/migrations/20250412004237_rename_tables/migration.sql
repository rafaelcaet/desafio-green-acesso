/*
  Warnings:

  - You are about to drop the `billet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "billet" DROP CONSTRAINT "billet_lot_id_fkey";

-- DropTable
DROP TABLE "billet";

-- DropTable
DROP TABLE "lot";

-- CreateTable
CREATE TABLE "lots" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "enable" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billets" (
    "id" SERIAL NOT NULL,
    "withdraw_name" VARCHAR(255),
    "lot_id" INTEGER NOT NULL,
    "value" DECIMAL(10,2),
    "write_line" VARCHAR(255),
    "enable" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "billets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "billets" ADD CONSTRAINT "billets_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
