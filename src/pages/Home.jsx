import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  ZoomControl,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

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
        </LayersControl>
      </MapContainer>
    </div>
  );
}
