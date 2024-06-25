"use client";

import { SessionProvider } from "next-auth/react";

export const Sessionprovidernextauth = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
