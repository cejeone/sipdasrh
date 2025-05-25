"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./MapView"), {
  ssr: false,
});

export default function MapPage() {
  return <DynamicMap />;
}
