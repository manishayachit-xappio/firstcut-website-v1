import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "First Cut";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/fc-mark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
          <div style={{ alignItems: "center", display: "flex", gap: 22 }}>
            <img src={logoSrc} alt="" width={58} height={69} />
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
          </div>
          <div style={{ fontSize: 84, fontWeight: 600, lineHeight: 0.96 }}>
            The fastest way from footage to story
          </div>
          <div style={{ color: "#aaa198", fontSize: 30, lineHeight: 1.3 }}>
            First Cut turns hours of raw video into a first edit you can watch,
            revise, and share.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
