import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import NavBar from "@/components/nav-bar/nav-bar";
import SideBar from "@/components/side-bar/side-bar";
import AuthProvider from "./auth-provider";
import "./globals.css";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shoppingify Master",
  description: "An online shopping list",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={quicksand.className}>
          <NavBar />
          <div className="global-container">{children}</div>
          <SideBar />
        </body>
      </html>
    </AuthProvider>
  );
}
