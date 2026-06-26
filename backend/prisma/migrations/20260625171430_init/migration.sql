-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "aadharNumber" TEXT NOT NULL,
    "voterid" BIGINT NOT NULL,
    "isvoted" BOOLEAN NOT NULL DEFAULT false,
    "otp" INTEGER NOT NULL DEFAULT 123456,
    "name" TEXT,
    "email" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "party" TEXT NOT NULL,
    "voteCount" INTEGER NOT NULL DEFAULT 0,
    "adminId" INTEGER,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_aadharNumber_key" ON "User"("aadharNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Notes_name_key" ON "Notes"("name");

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
