import * as React from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
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

export default function SimpleLineChart({
  plottingData,
  barColor,
  plotID,
  plotLabel,
}) {
  return (
    <LineChart
      width={500}
      height={300}
      series={[
        {
          data: plottingData,
          label: plotLabel,
          area: true,
          showMark: false,
          id: plotID,
          color: barColor,
        },
      ]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
      sx={{
        [`& .${lineElementClasses.root}`]: {
          display: "none",
        },
      }}
    />
  );
}
