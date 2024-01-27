import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import NavBar from "@/components/nav-bar/nav-bar";
import AuthProvider from "./auth-provider";
import "./globals.css";
import { OpenSidebarProvider } from "@/context/open-sidebar-context";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shoppingify Master",
  description: "Your online shopping list",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <OpenSidebarProvider>
        <html lang="en" className={quicksand.className}>
          <body>
            <NavBar />
            <div className="global-container">{children}</div>
          </body>
        </html>
      </OpenSidebarProvider>
    </AuthProvider>
  );
}
