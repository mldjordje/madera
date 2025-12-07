"use client";

import AppData from "@data/app.json";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export const mapboxInit = () => {
  const mapContainer = document.querySelector('#map');

  const envToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const token = envToken && envToken !== "*" ? envToken : AppData.settings.mapbox.AccessToken;

  if (!token || token === "*") {
    console.warn("Mapbox token missing or placeholder, skipping map init.");
    return;
  }

  if (mapContainer !== undefined) {
    mapboxgl.accessToken = token;
    var map = new mapboxgl.Map({
      container: 'map',
      style: AppData.settings.mapbox.style,
      center: [AppData.settings.mapbox.long, AppData.settings.mapbox.lat],
      zoom: AppData.settings.mapbox.zoom
    });
    var marker = new mapboxgl.Marker()
      .setLngLat([AppData.settings.mapbox.long, AppData.settings.mapbox.lat])
      .addTo(map);
  }
}
