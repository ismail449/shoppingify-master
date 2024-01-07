import SearchInput from "@/components/search-input/search-input";
import ShoppingItem from "@/components/shopping-item/shopping-item";
import { client } from "@/lib/mongo";
import styles from "./page.module.css";

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export default async function Home() {
  run().catch(console.dir);
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
