import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.firstcut.film"),
  title: "First Cut | The fastest way from footage to story",
  description:
    "First Cut turns hours of raw video into a first edit you can watch, revise, and share.",
  alternates: {
    canonical: "https://www.firstcut.film",
  },
  openGraph: {
    title: "First Cut | The fastest way from footage to story",
    description:
      "First Cut turns hours of raw video into a first edit you can watch, revise, and share.",
    url: "https://www.firstcut.film",
    siteName: "First Cut",
    type: "website",
  },
};

// Structured data so search engines can associate the brand, its logo, and
// the canonical site. Kept in sync with the visible metadata above.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.firstcut.film/#organization",
      name: "First Cut",
      url: "https://www.firstcut.film",
      logo: {
        "@type": "ImageObject",
        url: "https://www.firstcut.film/icon.png",
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.firstcut.film/#website",
      name: "First Cut",
      url: "https://www.firstcut.film",
      publisher: { "@id": "https://www.firstcut.film/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {/* Filmic grain over the whole frame. Subtle, analog, intentional. */}
        <div aria-hidden="true" className="grain-overlay" />
      </body>
    </html>
  );
}
