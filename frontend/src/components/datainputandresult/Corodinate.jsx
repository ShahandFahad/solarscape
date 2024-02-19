import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Corodinate({ lat, lon }) {
  const copied = () => {
    toast.info("Copied!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  /* Corodinates Box */

  //
  return (
    <div className="flex m-4 gap-2 items-center">
      <h1 className="text-gray-900 text-l">Lat</h1>
      <input
        style={{ width: "40px" }}
        type="text"
        value={lat}
        onChange={() => console.log("Lat")}
        className="flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-none"
      />
      <h1 className="text-gray-900 text-l">Lon</h1>
      <input
        style={{ width: "40px" }}
        type="text"
        value={lon}
        onChange={() => console.log("Lon")}
        className="flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-none"
      />

      {/* Copy text to clipboard and display toast */}
      <CopyToClipboard onCopy={() => copied()} text={`${lat} ${lon}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-gray-900"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
          />
        </svg>
      </CopyToClipboard>
    </div>
  );
}
