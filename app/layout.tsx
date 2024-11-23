import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import NavBar from "@/components/nav-bar/nav-bar";
import AuthProvider from "./auth-provider";
import { ShoppingListProvider } from "@/context/shopping-list-context";
import SideBarRenderer from "@/components/side-bar/side-bar-renerer/side-bar-renerer";
import {
  getActiveShoppingList,
  getActiveShoppingListItems,
} from "@/server-actions/server-actions";
import "./globals.css";
import { Suspense } from "react";

const quicksand = Quicksand({ weight: "variable", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shoppingify Master",
  description: "Your online shopping list",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeShoppingList = await getActiveShoppingListItems();
  const shoppingListInfo = await getActiveShoppingList();
  return (
    <AuthProvider>
      <ShoppingListProvider
        shoppingInfo={shoppingListInfo ?? null}
        shoppingItems={activeShoppingList ?? []}
      >
        <html lang="en" className={quicksand.className}>
          <body>
            <Suspense>
              <NavBar />
              <div className="global-container">{children}</div>
              <SideBarRenderer />
            </Suspense>
          </body>
        </html>
      </ShoppingListProvider>
    </AuthProvider>
  );
}
