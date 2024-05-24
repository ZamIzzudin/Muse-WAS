/** @format */

"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { AUTH_OPTIONS } from "@util/auth-options";
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
  const session = await getServerSession(AUTH_OPTIONS);
  if (!session) {
    return null;
  }
  return session;
}
