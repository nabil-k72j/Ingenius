"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("83e761eb-d19c-49ec-9584-2b3588e76f0b");
  }, []);

  return null;
};

export default CrispChat;
