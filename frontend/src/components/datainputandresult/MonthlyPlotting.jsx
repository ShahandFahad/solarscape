import React from "react";
import SimpleBarChart from "../charts/SimpleBarChart";

export const MonthlyPlotting = ({
  name,
  plottingData,
  barColor,
  plotLabel,
  plotID,
}) => {
  return (
    <div className="border">
      <h1 className="text-xl bg-gray-200 p-2">{name}</h1>
      <SimpleBarChart
        plottingData={plottingData}
        barColor={barColor}
        plotID={plotID}
        plotLabel={plotLabel}
      />
    </div>
  );
};
