import { useEffect, useRef } from "react";

const Map = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
    });

    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
    });
  }, [latitude, longitude]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default Map;
