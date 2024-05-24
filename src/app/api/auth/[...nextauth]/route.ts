/** @format */

import { AUTH_OPTIONS } from "@util/auth-options";
import NextAuth from "next-auth/next";

const handler = NextAuth(AUTH_OPTIONS);

export { handler as GET, handler as POST };
