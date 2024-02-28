import React from "react";

export default function DataTable({ result }) {
  return (
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
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
              AC Annual
            </th>
            <td className="px-6 py-4">
              {result.SolarResult.outputs.ac_annual.toFixed(4)} kWhac
            </td>
          </tr>
          <tr className="text-lg text-gray-900 bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
              DC Annual
            </th>
            <td className="px-6 py-4">
              {result.SolarResult.data_stats.dc_annual} kWhdc
            </td>
          </tr>
          <tr className="text-lg text-gray-900 bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
              POA Annual
            </th>
            <td className="px-6 py-4">
              {result.SolarResult.data_stats.poa_annual} kWh/m2
            </td>
          </tr>
          <tr className="text-lg text-gray-900 bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
              Solar Radiation Annual
            </th>
            <td className="px-6 py-4">
              {result.SolarResult.outputs.solrad_annual.toFixed(4)} kWh/m2/day
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
              {result.SolarResult.outputs.capacity_factor.toFixed(4)} AC-to-DC
            </td>
          </tr>
          {/* Extra Calculation */}
          <tr className="text-lg bg-white text-gray-900 border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              Yearly Solar Radiation Mean
            </th>
            <td className="px-6 py-4">
              {result.SolarResult.data_stats.solrad_mean} kWh/m2/day
            </td>
          </tr>
          <tr className="text-lg bg-white text-gray-900 border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              Yearly Plane of Array Irriadiance Mean
            </th>
            <td className="px-6 py-4">
              {result.SolarResult.data_stats.poa_mean} kWh/m2
            </td>
          </tr>
          <tr className="text-lg bg-white text-gray-900 border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              Yearly AC Mean
            </th>
            <td className="px-6 py-4">
              {result.SolarResult.data_stats.ac_mean} kWhac
            </td>
          </tr>
          <tr className="text-lg bg-white text-gray-900 border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              Yearly DC Mean
            </th>
            <td className="px-6 py-4">
              {result.SolarResult.data_stats.dc_mean} kWhdc
            </td>
          </tr>

          <tr className="text-lg bg-white text-gray-900 border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              Station
            </th>
            <td className="px-6 py-4">
              <img
                height={30}
                width={30}
                src={result.SolarResult.station_info.flagIcon}
                alt=""
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
