import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import ShoppingItemsList from "@/components/shopping-items-list/shopping-items-list";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

export default async function Home() {
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
      <ShoppingItemsList shoppingItems={items} />
    </main>
  );
}
