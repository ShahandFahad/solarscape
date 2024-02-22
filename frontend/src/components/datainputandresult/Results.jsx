import React from "react";
import styled from "styled-components";
import SystemInfo from "./SystemInfo";
import SimpleBarChart from "../charts/SimpleBarChart";
import { MonthlyPlotting } from "./MonthlyPlotting";

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
  // console.log("Result CARD: ", result, typeof result);
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
          {/* <p>{result.SolarResult}</p> */}
          {console.log("RESULT: ", result.SolarResult.outputs.ac_annual)}
        </div>
        {/*  */}

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
              <tr>
                <th scope="col" className="text-lg px-6 py-3">
                  Field
                </th>
                <th scope="col" className="text-lg px-6 py-3">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-lg text-gray-900 bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  AC Annual
                </th>
                <td className="px-6 py-4">
                  {result.SolarResult.outputs.ac_annual.toFixed(4)}
                </td>
              </tr>
              <tr className="text-lg text-gray-900 bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  Solar Radiation Annual
                </th>
                <td className="px-6 py-4">
                  {result.SolarResult.outputs.solrad_annual.toFixed(4)}
                </td>
              </tr>
              <tr className="text-lg bg-white text-gray-900 border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Capacity Factor
                </th>
                <td className="px-6 py-4">
                  {result.SolarResult.outputs.capacity_factor.toFixed(4)}
                </td>
              </tr>
              {/* Extra Calculation */}
              <tr className="text-lg bg-white text-gray-900 border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Mean
                </th>
                <td className="px-6 py-4">Pending...</td>
              </tr>
              <tr className="text-lg bg-white text-gray-900 border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Median
                </th>
                <td className="px-6 py-4">Pending...</td>
              </tr>
              <tr className="text-lg bg-white text-gray-900 border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Standard Deviation
                </th>
                <td className="px-6 py-4">Pending...</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CHARTS */}

        <div className="grid grid-cols-2">
          <MonthlyPlotting
            name="Solar Radiation Monthly (kWh/m2/day)"
            plottingData={result.SolarResult.outputs.solrad_monthly}
            barColor="#fdb462"
            plotLabel="pv"
            plotID="pvId"
          />
          <MonthlyPlotting
            name="Plane of Array Monthly  (kWh/m2)"
            plottingData={result.SolarResult.outputs.poa_monthly}
            barColor="#4e79a7"
            plotLabel="pr"
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
          {/* <div className="border">
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
          </div> */}
        </div>

        {/*  */}
        {/* Buttons */}
        <div className="flex justify-end gap-4 border-t mt-4 pt-4">
          {/* TODO: UPDATE THIS BUTTON. WHEN CORDINATES ARE AVAILABLE MAKE IT ENABLE */}
          <button
            type="submit"
            style={{ height: 36.4, width: "auto" }}
            // onClick={handleClick}
            className="bg-green-500 p-2 rounded text-white font-bold text-"
          >
            {/* If no laading display "Search". If loading Display spinner  */}
            {/* {!isLoading ? "Result" : <Spinner />} */}
            Download as CSV
          </button>
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
