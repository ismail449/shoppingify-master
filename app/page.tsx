import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <h1 className={styles.homeTitle}>
        <span>Shoppingify</span> allows you take your shopping list wherever you
        go
      </h1>
    </main>
  );
}
