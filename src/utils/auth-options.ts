/** @format */

import { NextAuthOptions, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import USER from "@handler/user";

import CredentialsProvider from "next-auth/providers/credentials";

export const AUTH_OPTIONS: NextAuthOptions = {
  secret: "MAKKAUHIJAU",
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "username",
          type: "username",
          placeholder: "username",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }

        const payload = {
          username: credentials.username,
          password: credentials.password,
        };

        const { status, data } = await USER.LOGIN(payload);
        if (status === "success") {
          const userData = {
            name: data.display_name,
            email: data.email,
            image: data.display_picture,
            id: data.id,
            role: data.role,
            username: data.username,
          };
          return userData;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        const { iat, exp, jti, ...data } = token;
        return { ...session, user: data };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export async function LOGIN_SERVER() {
  const session = await getServerSession(AUTH_OPTIONS);
  if (!session) redirect("/signin");
}

export function LOGIN_CLIENT() {
  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter();
    if (!session) {
      router.push("/signin");
    } else {
      router.push("/");
    }
  }
}

export async function DENIAL_LOGIN() {
  const session = await getServerSession(AUTH_OPTIONS);
  if (session) redirect("/");
}
