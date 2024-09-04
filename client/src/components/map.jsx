import { useEffect, useRef } from "react";

const Map = ({ latitude, longitude }) => {
  // Create a reference to the DOM element where the map will be rendered
  const mapRef = useRef(null);

  useEffect(() => {
    // Only initialize the map if latitude and longitude are provided
    if (!latitude || !longitude) return;

    // Initialize the Google Map
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 15, // Zoom level
    });

    // Add a marker to the map at the specified latitude and longitude
    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
    });
  }, [latitude, longitude]); // Re-run the effect if latitude or longitude changes

  return (
    // The map will be rendered inside this div
    <div ref={mapRef} className="w-full h-full" />
  );
};

export default Map;
