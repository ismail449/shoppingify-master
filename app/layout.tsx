import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import NavBar from "@/components/nav-bar/nav-bar";
import AuthProvider from "./auth-provider";
import { OpenSidebarProvider } from "@/context/open-sidebar-context";
import { ShoppingListProvider } from "@/context/shopping-list-context";
import "./globals.css";

const quicksand = Quicksand({ weight: "variable", subsets: ["latin"] });

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
        <ShoppingListProvider>
          <html lang="en" className={quicksand.className}>
            <body>
              <NavBar />
              <div className="global-container">{children}</div>
            </body>
          </html>
        </ShoppingListProvider>
      </OpenSidebarProvider>
    </AuthProvider>
  );
}
