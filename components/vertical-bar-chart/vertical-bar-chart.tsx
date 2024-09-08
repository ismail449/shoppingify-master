"use client";
import React, { FC, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Text,
  Tooltip,
  Legend,
} from "recharts";
import styles from "./vertical-bar-chart.module.css";

export type YAxisTickProps = {
  textAnchor: string;
  verticalAnchor: string;
  orientation: string;
  width: number;
  height: number;
  x: number;
  y: number;
  className: string;
  stroke: string;
  fill: string;
  index: number;
  payload: Payload;
  visibleTicksCount: number;
  symbol?: string;
};
export type Payload = {
  coordinate: number;
  value: number | string;
  index: number;
  offset: number;
  tickCoord: number;
  isShow: boolean;
};

const YAxisTick = (yAxisTickProps: YAxisTickProps) => {
  const {
    x,
    y,
    orientation,
    payload: { value },
    symbol,
  } = yAxisTickProps;
  return (
    <Text
      x={orientation === "right" ? x - 35 : x + 7}
      y={y - 30}
      textAnchor="start"
      verticalAnchor="middle"
      className={`${styles.verticalBarChartTick} ${
        orientation === "right" ? styles.tickRight : ""
      }`}
    >
      {typeof value === "number"
        ? value.toFixed(0) + symbol
        : value.charAt(0).toUpperCase() + value.slice(1)}
    </Text>
  );
};

type Props = {
  barColor: string;
  data: { name: string; count: number; percentage: number }[];
  totalCount: number;
  symbol?: string;
};

const VerticalBarChart: FC<Props> = ({
  barColor,
  data,
  totalCount,
  symbol,
}) => {
  return (
    <ResponsiveContainer width={"100%"} height={70 * data.length}>
      <BarChart data={data} barSize={6} layout="vertical">
        <XAxis hide type="number" domain={[0, totalCount]} />
        <Tooltip />
        <YAxis
          yAxisId={0}
          dataKey={"name"}
          type="category"
          axisLine={false}
          tickLine={false}
          tick={YAxisTick}
        />
        <YAxis
          orientation="right"
          yAxisId={1}
          dataKey={"percentage"}
          type="category"
          axisLine={false}
          tickLine={false}
          tick={(props) => <YAxisTick {...props} symbol={symbol} />}
        />
        <Bar
          isAnimationActive={true}
          animationDuration={1000}
          dataKey={"count"}
          radius={[4, 4, 4, 4]}
          fill={barColor}
          background={{ fill: "#E0E0E0", radius: 4 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VerticalBarChart;
