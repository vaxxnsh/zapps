-- CreateTable
CREATE TABLE "ZapRunOutbox" (
    "id" TEXT NOT NULL,
    "zapRun_id" TEXT NOT NULL,

    CONSTRAINT "ZapRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ZapRunOutbox_zapRun_id_key" ON "ZapRunOutbox"("zapRun_id");

-- AddForeignKey
ALTER TABLE "ZapRunOutbox" ADD CONSTRAINT "ZapRunOutbox_zapRun_id_fkey" FOREIGN KEY ("zapRun_id") REFERENCES "ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
