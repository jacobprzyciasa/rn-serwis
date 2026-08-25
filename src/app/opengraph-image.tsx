import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/utils/constants";

export const alt = `${SITE_NAME} — naprawa elektroniki Sosnowiec`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#F7F8FA",
          backgroundImage:
            "linear-gradient(to right, rgba(10,14,20,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,14,20,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 22px",
            borderRadius: 999,
            border: "2px solid rgba(8,145,178,0.35)",
            background: "rgba(8,145,178,0.06)",
            alignSelf: "flex-start",
            fontSize: 26,
            fontWeight: 600,
            color: "#0891B2",
            letterSpacing: 2,
          }}
        >
          25 LAT DOŚWIADCZENIA · SOSNOWIEC
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 72,
            fontWeight: 800,
            color: "#0A0E14",
            lineHeight: 1.08,
            letterSpacing: -2,
            maxWidth: 980,
          }}
        >
          Naprawiam elektronikę, której inni nie potrafią naprawić.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 32,
            color: "#5A6770",
          }}
        >
          {SITE_NAME} — Sosnowiec i okolice
        </div>
      </div>
    ),
    { ...size },
  );
}
