import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://firstcut.film"),
  title: "First Cut | The film is already in there",
  description:
    "First Cut watches your raw footage, finds the story, builds the first cut, and lets you direct the edit through conversation.",
  alternates: {
    canonical: "https://firstcut.film",
  },
  openGraph: {
    title: "First Cut | The film is already in there",
    description:
      "First Cut watches your raw footage, finds the story, builds the first cut, and lets you direct the edit through conversation.",
    url: "https://firstcut.film",
    siteName: "First Cut",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
