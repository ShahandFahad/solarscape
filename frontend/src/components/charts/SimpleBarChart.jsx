import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
// Simple bar char recieve data via prop drilling from the server and plot it
const xLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function SimpleBarChart({
  plottingData,
  barColor,
  plotID,
  plotLabel,
}) {
  return (
    <BarChart
      width={500}
      height={300}
      series={[
        { data: plottingData, label: plotLabel, id: plotID, color: barColor },
      ]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
    />
  );
}
