import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IEEE Aavishkaar 2026 | Events",
  description:
    "IEEE Student Branch · RIT Campus — Explore technical events, register your team, and be part of Aavishkaar 2026.",
  keywords: ["IEEE", "Aavishkaar", "RIT", "technical events", "hackathon", "cipher", "i-spy"],
  authors: [{ name: "IEEE Student Branch, RIT" }],
  openGraph: {
    title: "IEEE Aavishkaar 2026",
    description: "Technical events by IEEE Student Branch · RIT Campus",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon placeholder — replace with your actual favicon in /public */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}

