import React from "react";
import Contact from "./Contact";
import sun from "../assets/images/sun.png";

export default function About() {
  return (
    <>
      {/*  */}
      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        <div className="w-full flex flex-col 2xl:w-2/4">
          <div className="flex-1 bg-white p-8">
            <div className="flex-1 bg-white p-8">
              <div className="flex items-center space-x-5">
                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                  <img className="bg-white" alt="Logo" src={sun} />
                </div>
                <h4 className="text-xl text-gray-900 font-bold">About</h4>
              </div>
              <p className="mt-2 text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt voluptates obcaecati numquam error et ut fugiat
                asperiores. Sunt nulla ad incidunt laboriosam, laudantium est
                unde natus cum numquam, neque facere. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Ut, magni odio magnam commodi sunt
                ipsum eum! Voluptas eveniet aperiam at maxime, iste id dicta
                autem odio laudantium eligendi commodi distinctio!
              </p>
            </div>
            <div className="flex-1 bg-white p-8">
              <h4 className="text-xl text-gray-900 font-bold">Team Members</h4>
              <div className="flex gap-8 mt-8">
                <a
                  href="##"
                  className="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600"
                  title="View Profile"
                >
                  <img
                    src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                    className="w-24 rounded-full"
                    alt=""
                  />
                  <p className="text-center font-bold text-sm mt-1">
                    Shah Fahad
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    Fullstack Developer
                  </p>
                </a>
                <a
                  href="##"
                  className="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600"
                  title="View Profile"
                >
                  <img
                    src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                    className="w-24 rounded-full"
                    alt=""
                  />
                  <p className="text-center font-bold text-sm mt-1">
                    Ubaid-Ur-Rehman
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    Frontend Developer
                  </p>
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white mt-4 p-8">
          {/* Send messages to the team */}
          <Contact />
        </div>
      </div>
    </>
  );
}
