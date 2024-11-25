import React from "react";
import VerticalBarChart from "@/components/vertical-bar-chart/vertical-bar-chart";
import { getAllPurchasePercentage } from "@/server-actions/server-actions";
import styles from "./page.module.css";

const Statistics = async () => {
  const items = await getAllPurchasePercentage();
  const categories = await getAllPurchasePercentage(true);

  return (
    <div className={styles.statisticsContainer}>
      <div className={styles.berChartsContainer}>
        <div className={styles.barChart}>
          <VerticalBarChart
            barColor="var(--primary)"
            data={items.percentageArray.toSpliced(
              3,
              items.percentageArray.length
            )}
            totalCount={items.totalCount}
            symbol="%"
            title="Top items"
          />
        </div>
        <div className={styles.barChart}>
          <VerticalBarChart
            barColor="var(--complete-background)"
            data={categories.percentageArray.toSpliced(
              3,
              categories.percentageArray.length
            )}
            totalCount={categories.totalCount}
            symbol="%"
            title="Top Categories"
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
