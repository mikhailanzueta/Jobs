-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserResume" (
    "id" TEXT NOT NULL,
    "resumeURL" TEXT NOT NULL,

    CONSTRAINT "UserResume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPassword" (
    "id" TEXT NOT NULL,
    "userPassword" TEXT NOT NULL,

    CONSTRAINT "UserPassword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActiveUserResume" (
    "userId" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ActiveUserPassword" (
    "userId" TEXT NOT NULL,
    "passwordId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserPassword_userPassword_key" ON "UserPassword"("userPassword");

-- CreateIndex
CREATE UNIQUE INDEX "ActiveUserResume_userId_key" ON "ActiveUserResume"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ActiveUserResume_resumeId_key" ON "ActiveUserResume"("resumeId");

-- CreateIndex
CREATE UNIQUE INDEX "ActiveUserPassword_userId_key" ON "ActiveUserPassword"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ActiveUserPassword_passwordId_key" ON "ActiveUserPassword"("passwordId");

-- AddForeignKey
ALTER TABLE "UserResume" ADD CONSTRAINT "UserResume_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPassword" ADD CONSTRAINT "UserPassword_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveUserResume" ADD CONSTRAINT "ActiveUserResume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveUserResume" ADD CONSTRAINT "ActiveUserResume_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveUserPassword" ADD CONSTRAINT "ActiveUserPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveUserPassword" ADD CONSTRAINT "ActiveUserPassword_passwordId_fkey" FOREIGN KEY ("passwordId") REFERENCES "UserPassword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
