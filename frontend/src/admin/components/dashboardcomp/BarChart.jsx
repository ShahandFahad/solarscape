import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

// Recieve Data from Dashboard page
export default function SimpleBarChart({ userTimelineData }) {
  const yAxisData = userTimelineData?.map((timeline) => timeline.count);
  const xAxisData = userTimelineData?.map((timeline) => timeline.month);
  return (
    <BarChart
      height={500}
      series={[
        {
          data: yAxisData,
          label: "User Joined",
          id: 1,
          color: "orange",
        },
      ]}
      xAxis={[{ data: xAxisData, scaleType: "band" }]}
    />
  );
}
