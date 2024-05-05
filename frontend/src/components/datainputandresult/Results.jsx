import React from "react";
import styled from "styled-components";
import SystemInfo from "./SystemInfo";
// import { MonthlyPlotting } from "./MonthlyPlotting";
// import { MonthlyPlotLineChart } from "./MonthlyPlotLineChart";
import DataTable from "./DataTable";
// import { PieChartPlotting } from "./PieChartPlotting";
import Accordion from "../accordion/Accordion";
import { CSVLink } from "react-csv";

// default width: 600px
const ResultPloting = styled.div`
  position: absolute;
  z-index: 500;
  top: 25px;
  left: 450px;
  background: #fff;
  box-shadow: 0 6px 20px 3px rgba(0, 0, 0, 0.3);
  padding: 18px;
  width: 1000px;
  max-height: calc(100% - 50px);
  overflow-y: auto;
  border-radius: 10px;
  cursor: default;
`;

export default function Results({ result, setResult, setAddressFound }) {
  const months = [
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

  // System INFO:
  return (
    // if no result the figure out the loading screen for it
    result && (
      <ResultPloting>
        {/* Display a Table on data parametes posted to server and recieve setResult state via prop drilling*/}
        <SystemInfo
          SystemInfo={result.SystemInfo}
          setResult={setResult}
          setAddressFound={setAddressFound}
        />
        {/* Results */}
        <div className="border-t mt-4 pt-4">
          <h1 className="text-lg text-gray-600 font-bold mb-2">
            Result: Solar Photovoltic Power
          </h1>
        </div>

        {/* Diaplay Table of Data recieved forom server */}
        <DataTable result={result} />

        {/* CHARTS */}

        {/* <div className="grid grid-cols-2">
          <MonthlyPlotting
            name="Solar Radiation Monthly (kWh/m2/day)"
            plottingData={result.SolarResult.outputs.solrad_monthly}
            barColor="#FFB414"
            plotLabel="SR"
            plotID="pvId"
          />
          <MonthlyPlotting
            name="Plane of Array Monthly  (kWh/m2)"
            plottingData={result.SolarResult.outputs.poa_monthly}
            barColor="#045097"
            plotLabel="POA"
            plotID="prId"
          /> 

           <MonthlyPlotting
            name="AC Monthly  (kWhac)"
            plottingData={result.SolarResult.outputs.ac_monthly}
            barColor="#e15759"
            plotLabel="ac"
            plotID="acId"
          />
          <MonthlyPlotting
            name="DC Monthly (kWhdc)"
            plottingData={result.SolarResult.outputs.dc_monthly}
            barColor="#59a14f"
            plotLabel="dc"
            plotID="dcId"
          /> 
           Line Chart 
           <MonthlyPlotLineChart
            name="AC Monthly  (kWhac)"
            plottingData={result.SolarResult.outputs.ac_monthly}
            barColor="#FFE205"
            plotLabel="AC"
            plotID="acId"
          />

          <MonthlyPlotLineChart
            name="DC Monthly (kWhdc)"
            plottingData={result.SolarResult.outputs.dc_monthly}
            barColor="#0096C7"
            plotLabel="DC"
            plotID="dcId"
          /> 

          { Pie Chart Plotting 
           <PieChartPlotting
            name="SR vs POA"
            lable_1={"SR Mean"}
            lable_2={"PoA Mean"}
            value_1={result.SolarResult.data_stats.solrad_mean}
            value_2={result.SolarResult.data_stats.poa_mean / 30}
            color_1="#FFB414"
            color_2="#045097"
          />
          <PieChartPlotting
            name="AC vs DC"
            lable_1={"AC Mean"}
            lable_2={"DC Mean"}
            value_1={result.SolarResult.data_stats.ac_mean}
            value_2={result.SolarResult.data_stats.dc_mean}
            color_1="#FFE205"
            color_2="#0096C7"
          /> 
           <div className="border">
            <h1 className="text-xl bg-gray-200 p-2">Solar Radiation Monthly</h1>
            <SimpleBarChart />
          </div>

          <div className="border">
            <h1 className="text-xl bg-gray-200 p-2">Plane of Array Monthly</h1>
            <SimpleBarChart />
          </div>

          <div className="border">
            <h1 className="text-xl bg-gray-200 p-2">AC Monthly</h1>
            <SimpleBarChart />
          </div>

          <div className="border">
            <h1 className="text-xl bg-gray-200 p-2">DC Monthly</h1>
            <SimpleBarChart />
          </div> 
        </div> */}

        <Accordion plottingData={result.SolarResult} />

        {/* Buttons */}
        <div className="flex justify-end gap-4 border-t mt-4 pt-4">
          {/* Format and Download the Data */}
          <CSVLink
            data={[
              ["Solar Radiation Monthly"],
              months,
              result.SolarResult.outputs.solrad_monthly,
              [""],
              [""],

              ["Plane of Array Irridaiance Montlhly"],
              months,
              result.SolarResult.outputs.poa_monthly,
              [""],
              [""],
              ["AC Monthly"],

              months,
              result.SolarResult.outputs.ac_monthly,
              [""],
              [""],
              ["DC Monthly"],

              months,
              result.SolarResult.outputs.dc_monthly,
              [""],
              [""],
              ["Mean Data"],
              [
                "SR Mean",
                result.SolarResult.data_stats.solrad_mean,
                "POA Mean",
                result.SolarResult.data_stats.poa_mean,
                "AC Mean",
                result.SolarResult.data_stats.ac_mean,
                "DC Mean",
                result.SolarResult.data_stats.dc_mean,
              ],
            ]}
            style={{ height: 36.4, width: "auto" }}
            className="bg-green-500 p-2 rounded text-white font-bold text-"
            target="_blank"
            filename={`SolarData-${Date.now()}`}
          >
            <span className="text-white">Download as CSV</span>
          </CSVLink>

          {/* Go to Google Earth Engine APP */}
          <button
            type="submit"
            style={{ height: 36.4, width: "auto" }}
            // onClick={handleClick}
            className="bg-blue-500 p-2 rounded text-white font-bold text-"
          >
            {/* If no laading display "Search". If loading Display spinner  */}
            {/* {!isLoading ? "Result" : <Spinner />} */}
            Advance GEE
          </button>
        </div>
      </ResultPloting>
    )
  );
}
