import React from "react";
import SimpleLineChart from "../charts/SimpleLineChart";

export const MonthlyPlotLineChart = ({
  name,
  plottingData,
  barColor,
  plotLabel,
  plotID,
}) => {
  return (
    <div className="border">
      <h1 className="text-xl bg-gray-200 p-2">{name}</h1>
      <SimpleLineChart
        plottingData={plottingData}
        barColor={barColor}
        plotID={plotID}
        plotLabel={plotLabel}
      />
    </div>
  );
};
