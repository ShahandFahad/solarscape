import React from "react";

export default function PersonalInfo({ currentUser }) {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
      <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
      <ul className="mt-2 text-gray-700">
        <li className="flex border-y py-2">
          <span className="font-bold w-24">First name:</span>
          <span className="text-gray-700">{currentUser.firstName}</span>
        </li>
        <li className="flex border-y py-2">
          <span className="font-bold w-24">Last name:</span>
          <span className="text-gray-700">{currentUser.lastName}</span>
        </li>
        {/* <li className="flex border-b py-2">
          <span className="font-bold w-24">Birthday:</span>
          <span className="text-gray-700">24 Jul, 1991</span>
        </li> */}
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Joined:</span>
          <span className="text-gray-700">
            {currentUser.createdAt.split("T")[0]}
          </span>
        </li>
        {/* <li className="flex border-b py-2">
          <span className="font-bold w-24">Mobile:</span>
          <span className="text-gray-700">(123) 123-1234</span>
        </li> */}
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Email:</span>
          <span className="text-gray-700">{currentUser.email}</span>
        </li>
        {/* <li className="flex border-b py-2">
          <span className="font-bold w-24">Location:</span>
          <span className="text-gray-700">New York, US</span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Languages:</span>
          <span className="text-gray-700">English, Spanish</span>
        </li> */}
      </ul>
    </div>
  );
}
