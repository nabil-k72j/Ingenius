-- CreateTable
CREATE TABLE "userSubscription" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_current_period_end" TIMESTAMP(3),

    CONSTRAINT "userSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userSubscription_userid_key" ON "userSubscription"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "userSubscription_stripe_customer_id_key" ON "userSubscription"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "userSubscription_stripe_subscription_id_key" ON "userSubscription"("stripe_subscription_id");
