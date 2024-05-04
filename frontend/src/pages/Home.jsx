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
import Spinner from "../components/spinner/Spinner";
import SolarData from "../components/datainputandresult/SolarData";
import Results from "../components/datainputandresult/Results";
import axios from "axios";
import Corodinate from "../components/datainputandresult/Corodinate";

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
  const center = [30.3753, 69.3451]; // Sets the initial center coordinates of the map.
  const zoom = 4; //  Sets the initial zoom level of the map.

  // Set initial coordinates and zoom level, and later update it
  const [newCenter, setNewCenter] = useState(center);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Get user address form input and set here
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null); // Initialize result state
  const [addressFound, setAddressFound] = useState(false);

  // For solar pv result
  const [resultLoading, setResultLoading] = useState(false);

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
    // provider
    //   .search({ query: "Pakistan" })
    //   .then(function (result) {
    //     // Set new initial center
    //     setNewCenter([result[0].y, result[0].x]);
    //     console.log("New Center on Map load: ", newCenter);
    //   })
    //   .catch((error) => error.message);
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
      // If Result card is open then close it to avoid screen blocking
      setResult(null);

      // Retrieve co-ordinates form address
      try {
        const searchResult = await provider.search({ query: address });
        // Set new center: Round to 4 decimal places
        setNewCenter([
          searchResult[0].y.toFixed(4),
          searchResult[0].x.toFixed(4),
        ]);
        console.log("Address Found: New Coordinates: ", newCenter);
        setIsLoading(false);
        setAddressFound(true);
      } catch (error) {
        console.error("Address retrieval failed:", error.message);
        // Display a user-friendly error message
        notify();
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Submit data to server
  const handleSubmit = async (formData) => {
    setResultLoading(true);

    try {
      // Send system info and user id to the data retrievel service
      // Store the reuslts with the user id in assessment document
      // Display each user history in recent activity of user
      formData.coordinates = { lat: newCenter[0], lon: newCenter[1] };
      formData.user = { id: localStorage.getItem("UserID") };
      const res = await axios.post(
        "http://localhost:8003/api/v1/solar/pv-assessment",
        formData
      );
      console.log("Server Request: ", formData);
      console.log("Server Response: ", res);
      console.log("Server Status: ", res.data.status);
      console.log("Server Data: ", res.data.solarpvdata);

      // Store the result in this form
      // System info: The data posted to server
      // Solar PV results: Result revied form NREL
      const systemInfoAndResult = {
        SystemInfo: formData,
        SolarResult: res.data.solarpvdata,
      };
      setResult(systemInfoAndResult);
    } catch (error) {
      console.log(error);
      alert("Could not find any weather stations within the 2,000 mile limit.");
    } finally {
      setResultLoading(false);
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
        scrollWheelZoom={false}
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
              Lat: {newCenter[0]}, Lon: {newCenter[1]}
              <br />
              Location: {address || "Pakistan"}
            </Popup>
          </Marker>
        </LayersControl>

        {/* 
          TODO: Convert this to smaller components
        */}

        {/* 
          Custom Styled Overlay Control Section. Used to Get Location or Lattitude and Logititude and Other Input parameters 
        */}
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
              required
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
          <Corodinate
            lat={addressFound ? newCenter[0] : ""}
            lon={addressFound ? newCenter[1] : ""}
          />
          <hr />
          {/* Load Solar Data Paramters component */}
          {/* TODO: Check for coordinates: when not diable result button */}
          <SolarData
            onSubmit={handleSubmit}
            addressFound={addressFound}
            setAddress={setAddress}
            resultLoading={resultLoading}
          />
          <hr />
        </Controls>
        {/* 
        Pass the setResult and setAddressFound via prop drilling to SolarInfo.jsx which set result to null and setAddressFound to false and closed this Results.jsx card 
        */}
        {result && (
          <Results
            result={result}
            setResult={setResult}
            setAddressFound={setAddressFound}
          />
        )}
        <ToastContainer />
      </MapContainer>
    </div>
  );
}
