import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

// const uData = [
//   4.365582064092319, 5.327730603457155, 3.866337765467436, 5.469923025135036,
//   6.203147033299093, 0.5067755852343508, 2.244096329084217, 5.424937227887421,
//   3.173440879411932, 5.744710277216644, 5.460721152093789, 4.810856772338061,
// ];
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
  // console.log(plottingData);
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
