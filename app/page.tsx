import SearchInput from "@/components/search-input/search-input";
import ShoppingItem from "@/components/shopping-item/shopping-item";
import styles from "./page.module.css";

export default async function Home() {
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
    </main>
  );
}
