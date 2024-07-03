-- CreateTable
CREATE TABLE "Metrics" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Metrics_pkey" PRIMARY KEY ("id")
);
