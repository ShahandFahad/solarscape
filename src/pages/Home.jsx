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

/**
 * - Set initial home screen for user
 * - Provide a MapContainer with different layers
 * - Default co-ordinates are set to Pakistan
 * - Put a marker on the selected place
 * @returns MapContainer With Zoom Controls and Different Map Layers
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

  // Update bounds
  useEffect(() => {
    setbounds([
      [-90, -180],
      [90, 180],
    ]);
  }, []);

  // Setup custom marker for the map
  const locationMarker = new Icon({
    iconUrl: locationIcon,
    iconSize: [42, 42],
  });

  // Making a styled controls component
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

          {/* Pop Up Marker */}
          <Marker position={center} icon={locationMarker}>
            <Popup>
              Current Marked Location: <br /> {center}.
            </Popup>
          </Marker>
        </LayersControl>

        {/* Custom Styled Overlay Control Section. Used to Get Location or Lattitude and Logititude and Other Input parameters */}
        <Controls>
          <div className="flex m-4 gap-2">
            <input
              type="text"
              placeholder="Search by location"
              className="flex-1 border h-auto p-2 rounded text-gray-900 text-l ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300"
            />
            <button className="bg-orange-500 p-2  h-auto rounded text-white font-bold text-l">
              Search
            </button>
          </div>
        </Controls>
      </MapContainer>
    </div>
  );
}
