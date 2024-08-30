import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

const size = {
  width: 435,
  height: 250,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 16,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function SimplePieChart({
  totalActiveCount,
  totalInActiveCount,
}) {
  const percentActive = parseInt(
    (totalActiveCount / (totalActiveCount + totalInActiveCount)) * 100
  );
  const percentInActive = parseInt(
    (totalInActiveCount / (totalInActiveCount + totalActiveCount)) * 100
  );
  const data = [
    {
      value: percentActive,
      label: `${percentActive}% Active`,
      color: "#22c55e",
    },
    {
      value: percentInActive,
      label: `${percentInActive}% Inactive`,
      color: "#ef4444",
    },
  ];
  return (
    <PieChart series={[{ data, innerRadius: 85 }]} {...size}>
      <PieCenterLabel>Users Status</PieCenterLabel>
    </PieChart>
  );
}
