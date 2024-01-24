import { useEffect } from "react";
import { useMap } from "react-leaflet";

// Used to recenter the map to new coordinates
// Recies coordinates via props form OpenStreetMap provider
export default function MapRecenter({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    // Fly to that coordinates and set zoom level to 4
    // change the zoom level dynamically for diferent location
    // such as city, country etc
    map.flyTo([lat, lng], 6);
  }, [lat, lng, map]);
  return null;
}
