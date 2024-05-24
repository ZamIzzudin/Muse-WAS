/** @format */

import type { Metadata } from "next";
import { AuthProvider } from "@hook/useAuth";
import useUser from "@hook/useUser";

import SideBar from "@comp/sidebar";

import { Plus_Jakarta_Sans } from "next/font/google";

import "bootstrap/dist/css/bootstrap.min.css";
import "@style/globals.css";

const raleway = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--primary-font",
});

export const metadata: Metadata = {
  title: "Muse CMS",
  description: "Content Management System Muse Indonesia",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await useUser();

  return (
    <html lang="en">
      {" "}
      <body className={` ${raleway.variable}`}>
        <SideBar user={user} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
