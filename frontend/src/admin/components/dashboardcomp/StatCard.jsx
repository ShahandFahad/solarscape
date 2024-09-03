import React from "react";

export default function StatCard({ name, value, icon, color }) {
  return (
    <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-md shadow">
      <div className="flex items-center justify-between">
        <span className={`font-bold text-sm ${color}`}>{name}</span>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div>{icon}</div>
        <div className="flex flex-col">
          <div className="flex items-end">
            <span className="text-2xl 2xl:text-3xl font-bold">{value}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
