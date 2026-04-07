"use client";

import { useEffect, useRef } from "react";

// Riyadh, Saudi Arabia — exact coordinates
const RIYADH_LAT = 24.7136;
const RIYADH_LNG = 46.6753;
const ZOOM = 12;

export default function RiyadhMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Dynamically import Leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      // Fix default marker icon paths broken by webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Create map centered exactly on Riyadh
      const map = L.map(containerRef.current!, {
        center:          [RIYADH_LAT, RIYADH_LNG],
        zoom:            ZOOM,
        zoomControl:     false,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      mapRef.current = map;

      // OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      // Custom teal pin icon matching our color theme
      const icon = L.divIcon({
        className: "",
        html: `
          <div style="
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
          ">
            <!-- Label bubble -->
            <div style="
              background: #ffffff;
              border: 1.5px solid rgba(5,139,127,0.25);
              border-radius: 999px;
              padding: 5px 12px;
              font-size: 13px;
              font-weight: 700;
              color: #1a2e2d;
              white-space: nowrap;
              box-shadow: 0 2px 12px rgba(0,0,0,0.12);
              font-family: 'Cairo', sans-serif;
              direction: rtl;
              margin-bottom: 6px;
            ">
              نحن هنا 📍
            </div>
            <!-- Dot -->
            <div style="
              position: relative;
              width: 16px;
              height: 16px;
            ">
              <div style="
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: linear-gradient(135deg, #058B7F, #0FAE9E);
                box-shadow: 0 0 0 4px rgba(5,139,127,0.22), 0 0 0 8px rgba(5,139,127,0.09);
              "></div>
              <!-- Ping ring (CSS animation via keyframes) -->
              <div class="riyadh-ping" style="
                position: absolute;
                inset: 0;
                border-radius: 50%;
                background: rgba(5,139,127,0.40);
              "></div>
            </div>
          </div>
        `,
        iconSize:   [120, 72],
        iconAnchor: [60, 72], // anchor at the bottom-center (the dot)
      });

      // Place marker at exact Riyadh coordinates
      L.marker([RIYADH_LAT, RIYADH_LNG], { icon }).addTo(map);
    });

    return () => {
      if (mapRef.current) {
        (mapRef.current as { remove: () => void }).remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      {/* Ping animation */}
      <style>{`
        @keyframes riyadh-ping {
          0%   { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .riyadh-ping {
          animation: riyadh-ping 1.6s cubic-bezier(0,0,0.2,1) infinite;
        }
      `}</style>

      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%", borderRadius: "inherit" }}
      />
    </>
  );
}
