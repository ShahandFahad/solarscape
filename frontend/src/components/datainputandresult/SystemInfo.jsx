import React from "react";

export default function SystemInfo({ SystemInfo, setResult, setAddressFound }) {
  /* This is a static table on displays the exact info all the time
        convert to a component and pass only the specific data */

  /**
   * Through props drilling, This component recieves "setResult" State function form
   * Results.jsx & Home.jsx component: And when Presset the result is set to null
   * When result is set to null it closes the result card as the
   * card renders when the result is not null, so when it result is set to null it closes
   */
  const closeResultCard = () => {
    setResult(null);
    setAddressFound(false); // Set address to false when closing the result card
  };
  return (
    <div className="relative overflow-x-auto">
      <span className="mb-2 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-600">System Info</h1>
        <button className="hover:bg-gray-100" onClick={closeResultCard}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </span>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="rounded text-xs text-gray-700 uppercase bg-gray-100 dark:text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Lat
            </th>
            <th scope="col" className="px-6 py-3">
              Lon
            </th>
            <th scope="col" className="px-6 py-3">
              Azimuth
            </th>
            <th scope="col" className="px-6 py-3">
              Tilt
            </th>
            <th scope="col" className="px-6 py-3">
              DC System Size
            </th>
            <th scope="col" className="px-6 py-3">
              System Loss
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white dark:border-gray-700">
            {/* Round lat and lon to 4 decimal places */}
            <td className="px-6 py-4">{SystemInfo.coordinates.lat}</td>
            <td className="px-6 py-4">{SystemInfo.coordinates.lon}</td>
            <td className="px-6 py-4">{SystemInfo.azimuthAngel}</td>
            <td className="px-6 py-4">{SystemInfo.tiltAngel}</td>
            <td className="px-6 py-4">{SystemInfo.dcSystemSize}</td>
            <td className="px-6 py-4">{SystemInfo.systemLoss}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
