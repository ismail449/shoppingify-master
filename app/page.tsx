import SearchInput from "@/components/search-input/search-input";
import ShoppingItem from "@/components/shopping-item/shopping-item";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ShoppingList from "@/components/side-bar/shopping-list/shopping-list";
import AddItemForm from "@/components/side-bar/add-item-form/add-item-form";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect("/api/auth/signin");
  }
  const userEmail = session.user?.email;
  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  const categoryOnUser = await prisma.categoriesOnUsers.findMany({
    where: { userId: user?.id },
  });
  const items = await prisma.item.findMany({
    where: {
      categoryId: {
        in: categoryOnUser.map((categoryOnUser) => categoryOnUser.categoryId),
      },
    },
  });
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
      <div className={styles.shppingItemsContainer}>
        {items.length
          ? items.map((item) => (
              <ShoppingItem key={item.id} shoppingItem={item.name} />
            ))
          : null}
      </div>

      {!searchParams.shoppingSidebar ? <ShoppingList /> : null}
      {searchParams.shoppingSidebar === "add-item" ? <AddItemForm /> : null}
    </main>
  );
}
