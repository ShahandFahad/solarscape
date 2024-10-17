import React, { useState } from "react";
import Spinner from "../spinner/Spinner";

/**
 *
 * @returns Get parameters form users and pass it to parent component for making request to server
 */
export default function SolarData({
  onSubmit,
  addressFound,
  setAddress,
  resultLoading,
}) {
  // const [isLoading, setIsLoading] = useState(false); // Flag for loading state

  //   Solar Data with default values
  const [dcSystemSize, setDCSystemSize] = useState("4");
  const [systemLoss, setSystemLoss] = useState("14.8");
  const [tiltAngel, setTiltAngel] = useState("35");
  const [azimuthAngel, setAzimuthAngel] = useState("180");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass data to parent: Home.jsx
    setAddress("");
    try {
      // Submit data
      onSubmit({
        dcSystemSize,
        systemLoss,
        tiltAngel,
        azimuthAngel,
      });
      // Display loading for 1.5 seconds
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="m-4 flex flex-col gap-4">
        {/* DC System Size */}
        <div>
          <h1 className="text-gray-900 text-l hidden">DC System Size(KW)</h1>
          <input
            name="dcsystemsize"
            type="hidden"
            placeholder=""
            min={4}
            value={dcSystemSize}
            onChange={(e) => setDCSystemSize(e.target.value)}
            className="w-full flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-none"
          />
        </div>
        {/* System Loss */}
        <div>
          <h1 className="text-gray-900 text-l hidden">System Loss(%)</h1>
          <input
            name="systemloss"
            type="hidden"
            placeholder=""
            step="any"
            min={10}
            value={systemLoss}
            onChange={(e) => setSystemLoss(e.target.value)}
            className="w-full flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-none"
          />
        </div>
        <hr />
        {/* Tilt in Degree */}
        <div>
          <h1 className="text-gray-900 text-l">Tilt(Deg)</h1>
          <input
            name="tiltangel"
            type="number"
            placeholder="0 to 90 degree"
            min={0}
            max={90}
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
            placeholder="0 to 360 degree"
            min={0}
            max={360}
            value={azimuthAngel}
            onChange={(e) => setAzimuthAngel(e.target.value)}
            className="w-full flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-none"
          />
        </div>

        {/* Check box for raw data */}
        {/* <div> */}
        {/* <div className="flex items-center">
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
          </div> */}
        {/* <span className="dark:text-gray-400"> */}
        {/* Tick the box to add additional raw data for improved perfomrance. */}
        {/* <br /> */}
        <span className="dark:text-gray-400">
          {/* Tick the box to add additional raw data for improved perfomrance. */}
          {/* Navigate to Public landing page where each field is explained */}
          <a href="service" title="Learn more">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-orange-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </a>
        </span>
        <hr />

        {/* Run Button */}
        <div className="flex justify-end">
          <button
            disabled={!addressFound}
            type="submit"
            style={{ height: 36.4, width: 56.04 }}
            className={`${
              !addressFound
                ? "bg-gray-300 text-gray-300"
                : "bg-orange-500 text-white"
            } p-2 rounded font-bold text-`}
          >
            {/* If no laading display "Search". If loading Display spinner  */}
            {!resultLoading ? "Result" : <Spinner />}
          </button>
        </div>
      </div>
    </form>
  );
}
