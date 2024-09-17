"use client";
import useGetParentElementWidth from "@/hooks/useGetParentElementWidth";
import React, { useRef } from "react";
import {
  LineChart as RecharsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Text,
} from "recharts";
import styles from "./line-chart.module.css";

const data = [
  {
    date: "January",
    itemCount: 4000,
  },
  {
    date: "February",
    itemCount: 3000,
  },
  {
    date: "March",
    itemCount: 2000,
  },
  {
    date: "April",
    itemCount: 2780,
  },
  {
    date: "May",
    itemCount: 1890,
  },
  {
    date: "June",
    itemCount: 2390,
  },
  {
    date: "July",
    itemCount: 3490,
  },
];
type Props = {
  color: string;
  title?: string;
};

export default function LineChart({ color, title }: Props) {
  const ref = useRef(null);
  const width = useGetParentElementWidth(ref);
  return (
    <div ref={ref}>
      <div className={styles.chartTitleContainer}>
        <Text className={`${styles.chartText} ${styles.chartTitle}`}>
          {title}
        </Text>
      </div>
      <RecharsLineChart data={data} width={width} height={500}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="itemCount"
          stroke={color}
          name="Item Count"
          activeDot={{ r: 8 }}
        />
      </RecharsLineChart>
    </div>
  );
}
