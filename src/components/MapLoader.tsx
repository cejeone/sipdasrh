"use client";

import { useEffect } from "react";

export default function MapLoader() {
  useEffect(() => {
    const addScript = (src: string, type: "module" | "text/javascript" = "text/javascript") => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement("script");
        script.src = src;
        script.type = type;
        script.async = true;
        document.body.appendChild(script);
      }
    };

    const addModule = (src: string) => addScript(src, "module");

    const addLink = (href: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    };

    // Inject once
    addModule("https://js.arcgis.com/calcite-components/3.0.3/calcite.esm.js");
    addScript("https://js.arcgis.com/4.32/");
    addModule("https://js.arcgis.com/map-components/4.32/arcgis-map-components.esm.js");
    addLink("https://js.arcgis.com/4.32/esri/themes/light/main.css");
  }, []);

  return null; // no UI
}
