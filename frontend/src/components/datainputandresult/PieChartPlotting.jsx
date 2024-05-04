import React from "react";
import SimplePieChart from "../charts/SimplePieChart";

export const PieChartPlotting = ({
  name,
  lable_1,
  lable_2,
  value_1,
  value_2,
  color_1,
  color_2,
}) => {
  return (
    <div className="border">
      <h1 className="text-xl bg-gray-200 p-2">{name}</h1>
      <SimplePieChart
        lable_1={lable_1}
        lable_2={lable_2}
        value_1={value_1}
        value_2={value_2}
        color_1={color_1}
        color_2={color_2}
      />
    </div>
  );
};
