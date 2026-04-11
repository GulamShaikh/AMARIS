"use client";

import { Map, Marker, Overlay } from "pigeon-maps";
import { useEffect, useState } from "react";

export default function WeatherMap({
  lat: propLat,
  lon: propLon,
  temp = 26,
  city = "Mumbai",
}) {
  const [coords, setCoords] = useState({
    lat: propLat,
    lon: propLon,
  });

  // 📍 GET USER LOCATION IF NOT PROVIDED
  useEffect(() => {
    if (propLat && propLon) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Location error:", err);
      },
    );
  }, [propLat, propLon]);

  if (!coords?.lat || !coords?.lon) {
    return (
      <div className="h-full flex items-center justify-center text-sm opacity-60">
        Fetching location...
      </div>
    );
  }

  return (
    <Map center={[coords.lat, coords.lon]} defaultZoom={12} height={"100%"}>
      <Marker anchor={[coords.lat, coords.lon]} width={40} />

      <Overlay anchor={[coords.lat, coords.lon]} offset={[0, 0]}>
        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs shadow-lg">
          {city} • {temp}°
        </div>
      </Overlay>
    </Map>
  );
}
