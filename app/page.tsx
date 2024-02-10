import SearchInput from "@/components/search-input/search-input";
import ShoppingItem from "@/components/shopping-item/shopping-item";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import styles from "./page.module.css";
import ShoppingList from "@/components/side-bar/shopping-list/shopping-list";
import AddItemForm from "@/components/side-bar/add-item-form/add-item-form";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <main className={styles.home}>
      <div className={styles.topSectionContiner}>
        <h1 className={styles.homeTitle}>
          <span>Shoppingify</span> allows you take your shopping list wherever
          you go
        </h1>
        <div className={styles.searchInputContiner}>
          <SearchInput placeholder="search item" />
        </div>
      </div>
      <ShoppingItem shoppingItem="Chicken leg box" />
      {!searchParams.shoppingSidebar ? <ShoppingList /> : null}
      {searchParams.shoppingSidebar === "add-item" ? <AddItemForm /> : null}
    </main>
  );
}
