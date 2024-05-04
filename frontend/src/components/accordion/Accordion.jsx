import React, { useState } from "react";
import AccordionItem from "./AccordionItem";
import { MonthlyPlotting } from "../datainputandresult/MonthlyPlotting";
import { MonthlyPlotLineChart } from "../datainputandresult/MonthlyPlotLineChart";
import { PieChartPlotting } from "../datainputandresult/PieChartPlotting";
import AccordionItemHeader from "./AccordionItemHeader";

const icon = {
  up: (
    <svg
      aria-hidden="true"
      className=""
      data-reactid="266"
      fill="none"
      height="24"
      stroke="#606F7B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ),
  down: (
    <svg
      aria-hidden="true"
      data-reactid="281"
      fill="none"
      height="24"
      stroke="#606F7B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  ),
};

export default function Accordion({ plottingData }) {
  const [showBarChart, setShowBarChart] = useState(false);
  const [showLineChart, setShowLineChart] = useState(false);
  const [showPieChart, setShowPieChart] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <main className="w-5/5 mx-auto">
        <section className="shadow">
          {/* BAR CHARTS */}
          <>
            <AccordionItemHeader name=" SR and POA Chart Visualization">
              {/* Button as Child */}
              <div
                role="button"
                onClick={() =>
                  showBarChart ? setShowBarChart(false) : setShowBarChart(true)
                }
                className="rounded-full border border-grey w-7 h-7 flex items-center justify-center"
              >
                {showBarChart ? icon.down : icon.up}
              </div>
            </AccordionItemHeader>

            {/* Pass Both Solar Radiaiton & Solar Plane Array Charts as Children */}
            {showBarChart && (
              <AccordionItem>
                <MonthlyPlotting
                  name="Solar Radiation Monthly (kWh/m2/day)"
                  plottingData={plottingData.outputs.solrad_monthly}
                  barColor="#FFB414"
                  plotLabel="SR"
                  plotID="pvId"
                />
                <MonthlyPlotting
                  name="Plane of Array Monthly  (kWh/m2)"
                  plottingData={plottingData.outputs.poa_monthly}
                  barColor="#045097"
                  plotLabel="POA"
                  plotID="prId"
                />
              </AccordionItem>
            )}
          </>

          <>
            {/* LINE AREA CHART */}
            <AccordionItemHeader name="AC and DC Chart Visualization">
              {/* Button as Child */}
              <div
                role="button"
                onClick={() =>
                  showLineChart
                    ? setShowLineChart(false)
                    : setShowLineChart(true)
                }
                className="rounded-full border border-grey w-7 h-7 flex items-center justify-center"
              >
                {showLineChart ? icon.down : icon.up}
              </div>
            </AccordionItemHeader>
            {/* Chart Visulization for AC and DC */}
            {showLineChart && (
              <AccordionItem>
                {/* Line Chart */}
                <MonthlyPlotLineChart
                  name="AC Monthly (kWhac)"
                  plottingData={plottingData.outputs.ac_monthly}
                  barColor="#FFE205"
                  plotLabel="AC"
                  plotID="acId"
                />

                <MonthlyPlotLineChart
                  name="DC Monthly (kWhdc)"
                  plottingData={plottingData.outputs.dc_monthly}
                  barColor="#0096C7"
                  plotLabel="DC"
                  plotID="dcId"
                />
              </AccordionItem>
            )}
          </>

          <>
            {/* PIE CHARTS */}
            <AccordionItemHeader name="SR vs POA & AC vs DC">
              {/* Button as Child */}
              <div
                role="button"
                onClick={() =>
                  showPieChart ? setShowPieChart(false) : setShowPieChart(true)
                }
                className="rounded-full border border-grey w-7 h-7 flex items-center justify-center"
              >
                {showPieChart ? icon.down : icon.up}
              </div>
            </AccordionItemHeader>

            {/* Pie Charts */}
            {showPieChart && (
              <AccordionItem>
                {/* Pie Chart Plotting */}
                <PieChartPlotting
                  name="SR vs POA"
                  lable_1={"SR Mean"}
                  lable_2={"PoA Mean"}
                  value_1={plottingData.data_stats.solrad_mean}
                  value_2={plottingData.data_stats.poa_mean / 30}
                  color_1="#FFB414"
                  color_2="#045097"
                />
                <PieChartPlotting
                  name="AC vs DC"
                  lable_1={"AC Mean"}
                  lable_2={"DC Mean"}
                  value_1={plottingData.data_stats.ac_mean}
                  value_2={plottingData.data_stats.dc_mean}
                  color_1="#FFE205"
                  color_2="#0096C7"
                />
              </AccordionItem>
            )}
          </>

          {/* Unit ETC Explanation */}
          <>
            <AccordionItemHeader name="Insights">
              {/* Button as Child */}
              <div
                role="button"
                onClick={() =>
                  showDetails ? setShowDetails(false) : setShowDetails(true)
                }
                className="rounded-full border border-grey w-7 h-7 flex items-center justify-center"
              >
                {showDetails ? icon.down : icon.up}
              </div>
            </AccordionItemHeader>
            {showDetails && (
              <article className="border-b">
                <div className="border-l-2 bg-grey-lightest border-indigo">
                  {/* Charts */}
                  <p className="text-lg text-grey-darkest pt-5 pl-8 pr-8 pb-5 text-grey-darkest">
                    These solar insights from the SolarScape provide the
                    following annual energy outputs: <br />
                    {plottingData.outputs.ac_annual.toFixed(4)} kWh AC,{" "}
                    {plottingData.data_stats.dc_annual}
                    kWh DC, and {plottingData.data_stats.poa_annual} kWh/m²
                    Plane of Array Irradiance. With a Solar Radiation Annual of{" "}
                    {plottingData.outputs.solrad_annual.toFixed(4)}
                    kWh/m²/day and a Capacity Factor of{" "}
                    {plottingData.outputs.capacity_factor.toFixed(4)}, for your
                    area.
                    {/* demonstrates favorable conditions for solar energy
                    generation, hinting at substantial sustainability benefits
                    and renewable energy opportunities. */}
                  </p>
                  <p className="text-grey-darkest pt-2 pb-2 pl-8 pr-8 text-grey-darkest">
                    <span>
                      <i>*kWh (Kilowatt-hour):</i>
                      It's a unit of energy representing the amount of energy
                      consumed or produced over time. In this context, it
                      represents the energy output of the solar system over the
                      course of a year.
                    </span>
                    <br />
                    <span>
                      <i>*kWh/m² (Kilowatt-hour per square meter):</i>
                      This unit measures the solar energy received per unit
                      area. It indicates the amount of solar energy falling on a
                      square meter of a surface in a day or a year, depending on
                      the context.
                    </span>
                    <br />
                    {/* <span>
                    <i> Capacity Factor:</i>
                    It's a measure of the actual output of a power plant
                    compared to its maximum possible output if it were to
                    operate at full capacity all the time. It's expressed as a
                    percentage and provides insight into the efficiency and
                    reliability of the power plant.
                  </span> */}
                  </p>
                </div>
              </article>
            )}
          </>
        </section>
      </main>
    </div>
  );
}
