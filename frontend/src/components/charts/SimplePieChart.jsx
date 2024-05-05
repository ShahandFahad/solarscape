import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function SimplePieChart({
  lable_1,
  lable_2,
  value_1,
  value_2,
  color_1,
  color_2,
}) {
  return (
    <PieChart
      series={[
        {
          outerRadius: 80,
          data: [
            { label: lable_1, value: value_1, color: color_1 },
            { label: lable_2, value: value_2, color: color_2 },
          ],
          innerRadius: 40,
          //   cy: 200,
        },
      ]}
      height={300}
      slotProps={
        {
          // legend: { hidden: true },
        }
      }
    />
  );
}
