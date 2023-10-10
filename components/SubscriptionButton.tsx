"use client";

import axios from "axios";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface subscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro = false }: subscriptionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log("BILLING ERROR", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      variant={isPro ? "default" : "premium"}
      onClick={onClick}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}{" "}
      {!isPro && <Zap className="w-4 h-4 fill-white ml-2" />}
    </Button>
  );
};

export default SubscriptionButton;
