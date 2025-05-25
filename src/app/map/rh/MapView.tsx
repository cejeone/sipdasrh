"use client";

import { useEffect } from "react";
// Import esriConfig untuk set API key
import esriConfig from "@arcgis/core/config";

export default function MapView() {
  useEffect(() => {
    esriConfig.apiKey =
      "mzFcMRqhxzPAoRJavp2MJmXjstRW4iYoBwBIfvYU08EI3DI_AYgZWd0WgeFoxvrYLjfSDSn019KnSuZFbN2Le8dzz7aF1Guw35f9zPj5pKRn193QLiddGXqisDT2L3qwjlxw9sFU8Ce6cHcgG0wP_29LmMPW_Lm0iswZASqjdRdFlQMr7CeXvoPdN0Y9Wt8K";
  }, []);

  return (
    <div className="w-full h-screen">
      <arcgis-map basemap="arcgis/topographic" center="-118.805,34.027" zoom="13" class="block w-full h-full">
        <arcgis-zoom position="top-left"></arcgis-zoom>
        <arcgis-compass position="top-left"></arcgis-compass>
        <arcgis-home></arcgis-home>
        <arcgis-fullscreen></arcgis-fullscreen>
        <arcgis-scale-bar position="bottom-left" bar-style="line" unit="metric" />

        <arcgis-search position="top-right"></arcgis-search>
        <arcgis-basemap-gallery position="top-right"></arcgis-basemap-gallery>
      </arcgis-map>
    </div>
  );
}
