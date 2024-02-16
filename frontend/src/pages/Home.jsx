import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  ZoomControl,
  Marker,
  Popup,
} from "react-leaflet";
import { Icon } from "leaflet";
import locationIcon from "../assets/images/location.png";

import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import MapRecenter from "../components/Map/MapRecenter";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * - Set initial home screen for user
 * - Provide a MapContainer with different layers
 * - Default co-ordinates are set to Pakistan
 * - Put a marker on the selected place
 * @returns MapContainer With Zoom Controls and Different Map Layers
 */

// Making a styled controls component
/**
 * Styled components should be not defined inside render componente
 * In such case: It cause infinite render for handle onChange input
 * So moved it right here
 */
const Controls = styled.div`
  position: absolute;
  z-index: 500;
  top: 25px;
  left: 25px;
  background: #fff;
  box-shadow: 0 6px 20px 3px rgba(0, 0, 0, 0.3);
  width: 400px;
  max-height: calc(100% - 50px);
  overflow-y: auto;
  border-radius: 10px;
`;

// Custom loader
const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
//  Used to recenter the map to new coordinates
// const Recenter = ({ lat, lng }) => {
//   const map = useMap();
//   useEffect(() => {
//     // Fly to that coordinates and set zoom level to 4
//     // change the zoom level dynamically for diferent location
//     // such as city, country etc
//     map.flyTo([lat, lng], 4);
//   }, [lat, lng]);
//   return null;
// };

/**
 * The Home compoenent is responsible for
 * - Display Map using OpenStreetMap form react-leaflet
 * - Display Controls overs map. Insert any address retrieves from address.
 * - Display Notification on invalid address
 *
 */

export default function Home() {
  // The bounds state manages the visible area of the map.
  // Initialize bounds with appropriate coordinates to set the initial view.
  const [bounds, setbounds] = useState([
    [-90, -180],
    [90, 180],
  ]);

  // Pakistan's coordinates are 30.375321 latitude and 69.345116 longitude.
  const center = [30.375321, 69.345116]; // Sets the initial center coordinates of the map.
  const zoom = 4; //  Sets the initial zoom level of the map.

  // Set initial coordinates and zoom level, and later update it
  const [newCenter, setNewCenter] = useState([30.375321, 69.345116]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Get user address form input and set here
  const [address, setAddress] = useState("");

  // Provide OpenStreetMap Access
  const provider = new OpenStreetMapProvider();
  // Set notification for invalid address
  const notify = () =>
    toast.error("Invalid Address: Provide valid address.", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  // Update bounds
  useEffect(() => {
    setbounds([
      [-90, -180],
      [90, 180],
    ]);

    // Initial Request so that data loads first for a specific location
    provider
      .search({ query: "Pakistan" })
      .then(function (result) {
        // Set new initial center
        setNewCenter([result[0].y, result[0].x]);
        console.log("New Center on Map load: ", newCenter);
      })
      .catch((error) => error.message);
  }, []);

  // Setup custom marker for the map
  const locationMarker = new Icon({
    iconUrl: locationIcon,
    iconSize: [42, 42],
  });

  // Get user address from input field
  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  // Get address from user and search locaiton for the address
  const handleClick = async (e) => {
    if (address.length === 0) {
      console.log("No address provided");
      // Add user-friendly notification for empty address
    } else {
      console.log("Address: ", address);
      setIsLoading(true);

      // Retrieve co-ordinates form address
      try {
        const searchResult = await provider.search({ query: address });
        // Set new center
        setNewCenter([searchResult[0].y, searchResult[0].x]);
        console.log("New Center after search: ", newCenter);
        setIsLoading(false);
      } catch (error) {
        console.error("Address retrieval failed:", error.message);
        // Display a user-friendly error message
        notify();
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={{ marginTop: "60px" }}>
      <MapContainer
        zoomControl={false}
        center={center}
        zoom={zoom}
        minZoom={2}
        bounceAtZoomLimits={true}
        maxBoundsViscosity={0.95}
        maxBounds={bounds}
        style={{
          position: "absolute",
          width: "100%",
          height: "92%",
          overflow: "hidden",
        }}
      >
        {/* Custom zoom control, Shifted to right bottom corner */}
        <ZoomControl position="bottomright" zoomInText="+" zoomOutText="-" />
        {/* Cusotm Recenterig of Map component */}
        {/* <Recenter lat={newCenter[0]} lng={newCenter[1]} /> */}
        <MapRecenter lat={newCenter[0]} lng={newCenter[1]} />

        {/* Layer 1: Defalt Open Street Layer */}
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              noWrap={false}
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>

          {/* Layer 2: Staellite Layer */}
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              noWrap={false}
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>

          {/* Layer 3: Terrain Layer */}
          <LayersControl.BaseLayer name="Terrain">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            />
          </LayersControl.BaseLayer>

          {/* Pop Up Marker: The Marker updates with the newCenter for the map */}
          <Marker position={[newCenter[0], newCenter[1]]} icon={locationMarker}>
            <Popup>
              Co-Ordinates: {newCenter[0]}, {newCenter[1]}
              <br />
              Address: {address}.
            </Popup>
          </Marker>
        </LayersControl>

        {/* Custom Styled Overlay Control Section. Used to Get Location or Lattitude and Logititude and Other Input parameters */}
        <Controls>
          <div className="m-4">
            <h1 className="text-xl font-bold text-orange-500">
              Solar Photovoltic Power (PVWatts)
            </h1>
          </div>
          <hr />
          <div className="flex m-4 gap-2">
            <input
              type="text"
              placeholder="Search by location"
              className="flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-none"
              value={address}
              onChange={handleChange}
            />

            {/* Search button */}
            <button
              style={{ height: 36.4, width: 56.04 }}
              onClick={handleClick}
              className="bg-orange-500 p-2 rounded text-white font-bold text-"
            >
              {/* If no laading display "Search". If loading Display spinner  */}
              {!isLoading ? "Search" : <Spinner />}
            </button>
            {/* <Spinner class="loader"></Spinner> */}
          </div>

          {/* Corodinates Box */}
          <div className="flex m-4 gap-2 items-center">
            <h1 className="text-gray-900 text-l">Lat</h1>
            <input
              style={{ width: "40px" }}
              type="text"
              placeholder={center[0]}
              value={newCenter[0]}
              className="flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-none"
            />
            <h1 className="text-gray-900 text-l">Lon</h1>
            <input
              style={{ width: "40px" }}
              type="text"
              placeholder={center[1]}
              value={newCenter[1]}
              className="flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-none"
            />

            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-900"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                />
              </svg>
            </>
          </div>

          <hr />

          {/* Solar PV Data Parameters */}
          <div className="m-4 flex flex-col gap-4">
            {/* DC System Size */}
            <div>
              <h1 className="text-gray-900 text-l">DC System Size(KW)</h1>
              <input
                type="text"
                placeholder=""
                value={4}
                className="w-full flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-none"
              />
            </div>
            {/* System Loss */}
            <div>
              <h1 className="text-gray-900 text-l">System Loss(%)</h1>
              <input
                type="text"
                placeholder=""
                value={14.8}
                className="w-full flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-none"
              />
            </div>
            {/* Tilt in Degree */}
            <div>
              <h1 className="text-gray-900 text-l">Tilt(Deg)</h1>
              <input
                type="text"
                placeholder=""
                value={35}
                className="w-full flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-none"
              />
            </div>
            {/*  Azimuth Angel*/}
            <div>
              <h1 className="text-gray-900 text-l">Azimuth(Deg)</h1>
              <input
                type="text"
                placeholder=""
                value={180}
                className="w-full flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-none"
              />
            </div>

            {/* Check box for raw data */}
            <div>
              <div class="flex items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  "
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900"
                >
                  Include Raw Data
                </label>
              </div>
              <span className="dark:text-gray-400">
                Tick the box to add additional raw data for improved
                perfomrance.
              </span>
            </div>
            <hr />
            {/* Run Button */}
            <div className="flex justify-end">
              {/* TODO: UPDATE THIS BUTTON. WHEN CORDINATES ARE AVAILABLE MAKE IT ENABLE */}
              <button
                style={{ height: 36.4, width: 56.04 }}
                // onClick={handleClick}
                className="bg-orange-500 p-2 rounded text-white font-bold text-"
              >
                {/* If no laading display "Search". If loading Display spinner  */}
                {!isLoading ? "Result" : <Spinner />}
              </button>
            </div>
          </div>
        </Controls>
        <ToastContainer />
      </MapContainer>
    </div>
  );
}
