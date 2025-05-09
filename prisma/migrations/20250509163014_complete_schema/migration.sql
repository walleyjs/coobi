-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "substancesHistory" TEXT[],
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "preferredLanguage" TEXT NOT NULL DEFAULT 'en-US',
    "notificationPreferences" JSONB NOT NULL DEFAULT '{"push": true, "email": false, "sms": false}',
    "wearableConnections" JSONB NOT NULL DEFAULT '{"fitbit": null, "apple_health": null, "google_fit": null, "oura": null}',
    "therapistId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseStep" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "stepOrder" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "logic" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExerciseStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseStepResponse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "response" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExerciseStepResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StressMetric" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,
    "trigger" TEXT,
    "source" TEXT NOT NULL,
    "rawData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StressMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleepMetric" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "totalMinutes" INTEGER NOT NULL,
    "deepSleepMinutes" INTEGER,
    "remSleepMinutes" INTEGER,
    "lightSleepMinutes" INTEGER,
    "awakeMinutes" INTEGER,
    "hrv" DOUBLE PRECISION,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SleepMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityMetric" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "steps" INTEGER NOT NULL DEFAULT 0,
    "caloriesBurned" INTEGER,
    "activeMinutesLow" INTEGER,
    "activeMinutesModerate" INTEGER,
    "activeMinutesHigh" INTEGER,
    "heartRateMin" INTEGER,
    "heartRateMax" INTEGER,
    "heartRateAvg" INTEGER,
    "source" TEXT NOT NULL,
    "rawData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityMetric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "idx_users_therapist_id" ON "User"("therapistId");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_slug_key" ON "Exercise"("slug");

-- CreateIndex
CREATE INDEX "idx_stress_user_timestamp" ON "StressMetric"("userId", "timestamp");

-- CreateIndex
CREATE INDEX "idx_sleep_user_date" ON "SleepMetric"("userId", "date");

-- CreateIndex
CREATE INDEX "idx_activity_user_date" ON "ActivityMetric"("userId", "date");

-- AddForeignKey
ALTER TABLE "ExerciseStep" ADD CONSTRAINT "ExerciseStep_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseStepResponse" ADD CONSTRAINT "ExerciseStepResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseStepResponse" ADD CONSTRAINT "ExerciseStepResponse_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "ExerciseStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StressMetric" ADD CONSTRAINT "StressMetric_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepMetric" ADD CONSTRAINT "SleepMetric_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityMetric" ADD CONSTRAINT "ActivityMetric_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
