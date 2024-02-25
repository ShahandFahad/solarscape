import React from "react";
import sun from "../assets/images/sun.png";

export default function Contact() {
  return (
    // <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    //   <div className="relative py-3 sm:max-w-xl sm:mx-auto">

    <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 sm:p-10">
      <div className="max-w-md">
        <div className="flex items-center space-x-5">
          <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
            <img className="bg-white" alt="Logo" src={sun} />
          </div>
          <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
            <h2 className="leading-relaxed">Contact</h2>
            <p className="text-sm text-gray-500 font-normal leading-relaxed">
              Please contact us in case you need any additional information
              about Solar Scape.
            </p>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="flex flex-row gap-10">
              <label className="leading-loose w-10">Name</label>
              <input
                type="text"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Name"
              />
            </div>
            <div className="flex flex-row gap-10">
              <label className="leading-loose w-10">Email</label>
              <input
                type="email"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Email address"
              />
            </div>
            <div className="flex flex-row gap-10">
              <label className="leading-loose w-10">Subject</label>
              <input
                type="text"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Optional"
              />
            </div>
            <div className="flex flex-row gap-10">
              <label className="leading-loose w-10">Message</label>
              <textarea
                rows="5"
                className="block px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Message"
              ></textarea>
            </div>
          </div>
          <div className="pt-4 flex items-center space-x-4">
            <button
              style={{ backgroundColor: "#f2f2f2" }}
              className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
            >
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              Cancel
            </button>
            <button
              style={{ background: "#f76b1c" }}
              className="flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>

    //   </div>
    // </div>
  );
}
