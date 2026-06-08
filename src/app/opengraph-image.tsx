import { ImageResponse } from "next/og";

export const alt = "First Cut";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#080706",
          color: "#f2eee6",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, Helvetica, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(242,238,230,0.16)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: "56px",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "#c69a5b",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            First Cut
          </div>
          <div style={{ fontSize: 88, fontWeight: 600, lineHeight: 0.94 }}>
            The film is already in there.
          </div>
          <div style={{ color: "#aaa198", fontSize: 30 }}>
            Editing starts before the timeline now.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
