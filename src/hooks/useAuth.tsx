/** @format */

"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { authConfig } from "@util/auth";
import { getServerSession } from "next-auth";

// TYPE SETUP
type childrenProps = {
  children: React.ReactNode;
};

// CONTEXT SETUP
export const AuthProvider = ({ children }: childrenProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

// HOOKS
export async function useAuth() {
  const session = await getServerSession(authConfig);
  if (!session) {
    return null;
  }
  return session;
}
