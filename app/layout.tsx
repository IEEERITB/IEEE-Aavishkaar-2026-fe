import "./globals.css";
import Link from "next/link";
import { Space_Grotesk, Sora, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const sora = Sora({
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Press_Start_2P,
  Space_Mono,
  Share_Tech_Mono,
  Space_Grotesk,
  Inter,
  Orbitron,
  Audiowide
} from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

// 1. Initialize all fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-grotesk",
});

export const metadata = {
  title: "RIT TechFest",
  description: "TechFest Schedule",
const shareTech = Share_Tech_Mono({
  weight: "400",
  variable: "--font-share-tech",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: ["400"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  weight: "400",
  variable: "--font-audiowide",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IEEE Techfest 2026",
  description: "Official TechFest Registration System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(sora.variable, spaceGrotesk.variable, "font-sans", geist.variable)}>
      <body className="bg-transparent text-white">

        {/* 🔥 NAVBAR (clean, no orange strip) */}
        <nav className="w-full flex justify-between items-center px-10 py-5 bg-black/80 backdrop-blur-md border-b border-white/10">

          {/* LEFT */}
          <h1 className="text-xl font-semibold tracking-wide">
            RIT TechFest
          </h1>

          {/* RIGHT */}
          <div className="flex gap-10 text-sm text-gray-300">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/events" className="hover:text-white transition">Events</a>
            <a href="/schedule" className="hover:text-white transition text-orange-400">Schedule</a>
            <a href="/sponsors" className="hover:text-white transition">Sponsors</a>
            <Link href="/team" className="hover:text-white transition">Team</Link>
            <a href="/contact" className="hover:text-white transition">Contact</a>
          </div>

        </nav>

        {/* 🔥 MAIN CONTENT */}
        <main className="min-h-screen">
          {children}
        </main>

    <html
      lang="en"
      suppressHydrationWarning
      /* 2. Combined all font variables and kept the 'dark' class from main */
      className={`
        ${geistSans.variable} 
        ${geistMono.variable} 
        ${shareTech.variable} 
        ${spaceMono.variable} 
        ${pressStart.variable} 
        ${spaceGrotesk.variable} 
        ${inter.variable} 
        ${orbitron.variable} 
        ${audiowide.variable} 
        dark
      `}
    >
      <body 
        className="antialiased min-h-screen flex flex-col bg-bg-main text-white font-tech selection:bg-orange/30"
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}