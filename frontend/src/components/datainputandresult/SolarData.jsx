import React, { useState } from "react";
import Spinner from "../spinner/Spinner";

/**
 *
 * @returns Get parameters form users and pass it to parent component for making request to server
 */
export default function SolarData({ onSubmit }) {
  const [isLoading, setIsLoading] = useState(false); // Flag for loading state

  //   Solar Data with default values
  const [dcSystemSize, setDCSystemSize] = useState("4");
  const [systemLoss, setSystemLoss] = useState("14.8");
  const [tiltAngel, setTiltAngel] = useState("35");
  const [azimuthAngel, setAzimuthAngel] = useState("180");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass data to parent: Home.jsx
    setIsLoading(true);
    try {
      // Submit data
      onSubmit({
        dcSystemSize,
        systemLoss,
        tiltAngel,
        azimuthAngel,
      });
      // Display loading for 1.5 seconds
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 1500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="m-4 flex flex-col gap-4">
        {/* DC System Size */}
        <div>
          <h1 className="text-gray-900 text-l">DC System Size(KW)</h1>
          <input
            name="dcsystemsize"
            type="number"
            placeholder=""
            min={4}
            value={dcSystemSize}
            onChange={(e) => setDCSystemSize(e.target.value)}
            className="w-full flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-none"
          />
        </div>
        {/* System Loss */}
        <div>
          <h1 className="text-gray-900 text-l">System Loss(%)</h1>
          <input
            name="systemloss"
            type="number"
            placeholder=""
            step="any"
            min={10}
            value={systemLoss}
            onChange={(e) => setSystemLoss(e.target.value)}
            className="w-full flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-none"
          />
        </div>
        {/* Tilt in Degree */}
        <div>
          <h1 className="text-gray-900 text-l">Tilt(Deg)</h1>
          <input
            name="tiltangel"
            type="number"
            placeholder=""
            min={0}
            value={tiltAngel}
            onChange={(e) => setTiltAngel(e.target.value)}
            className="w-full flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-none"
          />
        </div>
        {/*  Azimuth Angel*/}
        <div>
          <h1 className="text-gray-900 text-l">Azimuth(Deg)</h1>
          <input
            name="azimuthangel"
            type="number"
            placeholder=""
            min={0}
            value={azimuthAngel}
            onChange={(e) => setAzimuthAngel(e.target.value)}
            className="w-full flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-none"
          />
        </div>

        {/* Check box for raw data */}
        <div>
          <div className="flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              //   value=""
              onChange={() => console.log("")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  "
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Include Raw Data
            </label>
          </div>
          <span className="dark:text-gray-400">
            Tick the box to add additional raw data for improved perfomrance.
            <br />
            {/* TODO: */}
            {/* Navigate to Public landing page where each field is explained */}
            <a href="service">Learn more.</a>
          </span>
        </div>
        <hr />
        {/* Run Button */}
        <div className="flex justify-end">
          {/* TODO: UPDATE THIS BUTTON. WHEN CORDINATES ARE AVAILABLE MAKE IT ENABLE */}
          <button
            type="submit"
            style={{ height: 36.4, width: 56.04 }}
            // onClick={handleClick}
            className="bg-orange-500 p-2 rounded text-white font-bold text-"
          >
            {/* If no laading display "Search". If loading Display spinner  */}
            {!isLoading ? "Result" : <Spinner />}
          </button>
        </div>
      </div>
    </form>
  );
}
