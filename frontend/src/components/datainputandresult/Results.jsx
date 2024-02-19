import React from "react";
import styled from "styled-components";
import SystemInfo from "./SystemInfo";

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
export default function Results({ result, setResult }) {
  // console.log("Result CARD: ", result, typeof result);
  // System INFO:
  return (
    // if no result the figure out the loading screen for it
    result && (
      <ResultPloting>
        {/* Display a Table on data parametes posted to server and recieve setResult state via prop drilling*/}
        <SystemInfo SystemInfo={result.SystemInfo} setResult={setResult} />
        {/* Results */}
        <div className="border-t mt-4 pt-4">
          <h1 className="text-xl text-gray-600 font-bold mb-2">
            Result: Solar Photovoltic Power
          </h1>
          <p>{result.SolarResult}</p>
        </div>
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
