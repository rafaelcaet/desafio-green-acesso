-- CreateTable
CREATE TABLE "lot" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "enable" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billet" (
    "id" SERIAL NOT NULL,
    "withdraw_name" VARCHAR(255),
    "lot_id" INTEGER NOT NULL,
    "value" DECIMAL(10,2),
    "write_line" VARCHAR(255),
    "enable" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "billet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "billet" ADD CONSTRAINT "billet_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "lot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
