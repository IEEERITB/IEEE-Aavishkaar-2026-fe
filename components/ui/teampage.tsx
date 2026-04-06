"use client";

import React, { useState } from "react";

type Member = {
  id: number;
  name: string;
  role: string;
  image: string;
  linkedin: string;
};

const teamMembers: Member[] = [
  { id: 1, name: "Aria Voss", role: "Lead Engineer", image: "https://i.pravatar.cc/300?img=1", linkedin: "https://linkedin.com" },
  { id: 2, name: "Zeon Malik", role: "UI Architect", image: "https://i.pravatar.cc/300?img=2", linkedin: "https://linkedin.com" },
  { id: 3, name: "Nova Chen", role: "Systems Dev", image: "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", linkedin: "https://linkedin.com" },
  { id: 4, name: "Orion Ray", role: "Backend Lead", image: "https://i.pravatar.cc/300?img=4", linkedin: "https://linkedin.com" },
  { id: 5, name: "Lyra Singh", role: "ML Engineer", image: "https://i.pravatar.cc/300?img=5", linkedin: "https://linkedin.com" },
  { id: 6, name: "Kade Solano", role: "DevOps", image: "https://i.pravatar.cc/300?img=6", linkedin: "https://linkedin.com" },
  { id: 7, name: "Echo Park", role: "Data Analyst", image: "https://i.pravatar.cc/300?img=7", linkedin: "https://linkedin.com" },
  { id: 8, name: "Vega Torres", role: "Product Lead", image: "https://i.pravatar.cc/300?img=8", linkedin: "https://linkedin.com" },
  { id: 9, name: "Siris Nair", role: "Security Eng", image: "https://i.pravatar.cc/300?img=9", linkedin: "https://linkedin.com" },
  { id: 10, name: "Rune Ellis", role: "Frontend Dev", image: "https://i.pravatar.cc/300?img=10", linkedin: "https://linkedin.com" },
  { id: 11, name: "Flux Patel", role: "API Dev", image: "https://i.pravatar.cc/300?img=11", linkedin: "https://linkedin.com" },
  { id: 12, name: "Aeon Joshi", role: "QA Lead", image: "https://i.pravatar.cc/300?img=12", linkedin: "https://linkedin.com" },
  { id: 13, name: "Dusk Rao", role: "Design Lead", image: "https://i.pravatar.cc/300?img=13", linkedin: "https://linkedin.com" },
  { id: 14, name: "Nyx Mehta", role: "Research Eng", image: "https://i.pravatar.cc/300?img=14", linkedin: "https://linkedin.com" },
  { id: 15, name: "Coda Verma", role: "Infra Lead", image: "https://i.pravatar.cc/300?img=15", linkedin: "https://linkedin.com" },
  { id: 16, name: "Helix Das", role: "Fullstack Dev", image: "https://i.pravatar.cc/300?img=16", linkedin: "https://linkedin.com" },
];

function MemberCard({ member, index }: { member: Member; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="card-wrapper"
      style={{ animationDelay: `${index * 0.07}s` }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className={`card-inner ${flipped ? "flipped" : ""}`}>
        <div className="card-face card-front">
          <div className="corner-tl" />
          <div className="corner-tr" />
          <div className="corner-bl" />
          <div className="corner-br" />
          <div className="scan-line" />
          <div className="front-content">
            <div className="img-frame glitch glitchOrange">
              <img src={member.image} alt={member.name} />
              <div className="img-overlay" />
            </div>
            <p className="member-name">{member.name}</p>
            <p className="hover-hint">HOVER ME</p>
          </div>
        </div>

        <div className="card-face card-back">
          <div className="corner-tl" />
          <div className="corner-tr" />
          <div className="corner-bl" />
          <div className="corner-br" />
          <div className="grid-lines" />
          <div className="back-content">
            <div className="id-tag">ID_{String(member.id).padStart(3, "0")}</div>
            <p className="back-name">{member.name}</p>
            <div className="divider" />
            <p className="back-role">{member.role}</p>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              VIEW PROFILE
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .card-wrapper {
          perspective: 1000px;
          width: 190px;
          height: 254px;
          opacity: 0;
          animation: fadeIn 0.6s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .card-inner.flipped {
          transform: rotateY(180deg);
        }
        .card-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 10px;
          overflow: hidden;
          background: #0d0d14;
          border: 1px solid rgba(255, 100, 30, 0.25);
          box-shadow: 0 0 20px rgba(255, 80, 20, 0.08), inset 0 0 30px rgba(0, 0, 0, 0.5);
        }
        .corner-tl, .corner-tr, .corner-bl, .corner-br {
          position: absolute;
          width: 16px; height: 16px;
          z-index: 10;
        }
        .corner-tl { top: 6px; left: 6px; border-top: 2px solid #ff5a1e; border-left: 2px solid #ff5a1e; border-radius: 2px 0 0 0; }
        .corner-tr { top: 6px; right: 6px; border-top: 2px solid #1e8fff; border-right: 2px solid #1e8fff; border-radius: 0 2px 0 0; }
        .corner-bl { bottom: 6px; left: 6px; border-bottom: 2px solid #1e8fff; border-left: 2px solid #1e8fff; border-radius: 0 0 0 2px; }
        .corner-br { bottom: 6px; right: 6px; border-bottom: 2px solid #ff5a1e; border-right: 2px solid #ff5a1e; border-radius: 0 0 2px 0; }
        .scan-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 90, 30, 0.6), transparent);
          animation: scan 3s linear infinite;
          z-index: 5;
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .front-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 14px;
          padding: 20px;
        }
        .img-frame {
          position: relative;
          width: 90px; height: 90px;
          border-radius: 10%;
          border: 2px solid rgba(255, 90, 30, 0.5);
          box-shadow: 0 0 20px rgba(255, 90, 30, 0.3), 0 0 40px rgba(30, 143, 255, 0.1);
          overflow: hidden;
        }
        .img-frame img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: saturate(0.7) contrast(1.1);
        }
        .img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,90,30,0.1), rgba(30,143,255,0.1));
          mix-blend-mode: screen;
        }
        .member-name {
          color: #f0ece4;
          font-family: 'Courier New', monospace;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: center;
        }
        .hover-hint {
          color: rgba(255, 90, 30, 0.5);
          font-family: 'Courier New', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          animation: blink 1.5s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .card-back {
          transform: rotateY(180deg);
          background: #080c14;
          border-color: rgba(30, 143, 255, 0.3);
          box-shadow: 0 0 20px rgba(30, 143, 255, 0.1), inset 0 0 30px rgba(0, 0, 0, 0.6);
        }
        .grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(30,143,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,143,255,0.04) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .back-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 10px;
          padding: 24px 16px;
        }
        .id-tag {
          font-family: 'Courier New', monospace;
          font-size: 9px;
          color: rgba(30, 143, 255, 0.6);
          letter-spacing: 0.15em;
          background: rgba(30, 143, 255, 0.08);
          padding: 3px 8px;
          border: 1px solid rgba(30, 143, 255, 0.2);
          border-radius: 2px;
        }
        .back-name {
          color: #f0ece4;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-align: center;
        }
        .divider {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ff5a1e, transparent);
        }
        .back-role {
          color: rgba(255, 90, 30, 0.85);
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .linkedin-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 6px;
          padding: 7px 14px;
          background: transparent;
          border: 1px solid rgba(30, 143, 255, 0.5);
          border-radius: 3px;
          color: #1e8fff;
          font-family: 'Courier New', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .linkedin-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(30, 143, 255, 0.1);
          transform: translateX(-100%);
          transition: transform 0.2s ease;
        }
        .linkedin-btn:hover::before {
          transform: translateX(0);
        }
        .linkedin-btn:hover {
          border-color: #1e8fff;
          box-shadow: 0 0 12px rgba(30, 143, 255, 0.3);
          color: #fff;
        }
      `}</style>
    </div>
  );
}

export default function TeamPage() {
  return (
    <main className="page">
      <div className="noise" />
      <div className="grid-bg" />

      <header className="page-header">
        <p className="event-label">◈ TECHFEST 2047 · TEAM ROSTER</p>
        <h1 className="page-title">
          THE <span className="accent-orange">BUILDERS</span>
          <br />
          <span className="accent-blue">BEHIND THE</span> CODE
        </h1>
        <div className="title-line" />
        <p className="subtitle">RETRO FUTURE DIVISION · CLASS OF 2047</p>
      </header>

      <div className="grid">
        {teamMembers.map((m, i) => (
          <MemberCard key={m.id} member={m} index={i} />
        ))}
      </div>

      <footer className="page-footer">
        <span>◈ END OF ROSTER ◈</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .page {
          min-height: 100vh;
          background: #070810;
          position: relative;
          overflow-x: hidden;
          padding: 60px 40px 80px;
          font-family: 'Share Tech Mono', monospace;
        }
        .noise {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }
        .grid-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            linear-gradient(rgba(30,143,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,143,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .page-header {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-bottom: 60px;
        }
        .event-label {
          color: rgba(30, 143, 255, 0.6);
          font-size: 11px;
          letter-spacing: 0.3em;
          margin-bottom: 18px;
        }
          .glitch, .glitchOrange {
  font-family: 'Orbitron', monospace;
  font-size: clamp(60px, 13vw, 140px);
  font-weight: 900;
  letter-spacing: 8px;
  position: relative;
  display: inline-block;
}

.glitch {
  color: #00aaff;
  text-shadow:
    0 0 30px rgba(0, 170, 255, 0.8),
    0 0 60px rgba(0, 170, 255, 0.4);
}

.glitch::before { content: attr(data-text); position: absolute; top: 0; left: 0; color: #ff6b00; animation: glitch1 4s steps(1) infinite; clip-path: inset(0 0 90% 0); opacity: 0.7; }
.glitch::after { content: attr(data-text); position: absolute; top: 0; left: 0; color: #00f5ff; animation: glitch2 3.5s steps(1) infinite; clip-path: inset(70% 0 0 0); opacity: 0.7; }

.glitchOrange {
  color: #ff6b00;
  text-shadow:
    0 0 30px rgba(255, 107, 0, 0.8),
    0 0 60px rgba(255, 107, 0, 0.4);
}

.glitchOrange::before { content: attr(data-text); position: absolute; top: 0; left: 0; color: #00aaff; animation: glitch2 4s steps(1) infinite 0.5s; clip-path: inset(0 0 80% 0); opacity: 0.7; }
.glitchOrange::after { content: attr(data-text); position: absolute; top: 0; left: 0; color: #ffcc00; animation: glitch1 3s steps(1) infinite 1s; clip-path: inset(60% 0 20% 0); opacity: 0.7; }

@keyframes glitch1 {
  0%, 85%, 100% { transform: translate(0); clip-path: inset(0 0 90% 0); }
  86% { transform: translate(-3px, 1px); clip-path: inset(30% 0 50% 0); }
  88% { transform: translate(3px, -1px); clip-path: inset(70% 0 10% 0); }
  90% { transform: translate(-1px, 2px); clip-path: inset(10% 0 80% 0); }
}

@keyframes glitch2 {
  0%, 88%, 100% { transform: translate(0); clip-path: inset(70% 0 0 0); }
  89% { transform: translate(3px, 1px); clip-path: inset(40% 0 40% 0); }
  91% { transform: translate(-3px, -1px); clip-path: inset(80% 0 5% 0); }
  93% { transform: translate(1px, 2px); clip-path: inset(55% 0 30% 0); }
}
        .page-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(28px, 5vw, 56px);
          font-weight: 900;
          color: #e8e4dc;
          line-height: 1.1;
          letter-spacing: 0.04em;
          margin-bottom: 16px;
        }
          .page-title::before {
            content: attr(data-text);
            position: absolute;
            opacity : 0;
            left: 0;
            color: #ff6b00;
            animation: Hero_glitch1__L9NuM 4s steps(1) infinite;
            -webkit-clip-path: inset(0 0 90% 0);
            clip-path: inset(0 0 90% 0);
            opacity: 0.7;
          }
          .page-title::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            color: #00f5ff;
            animation: Hero_glitch2__pUhD1 3.5s steps(1) infinite;
            -webkit-clip-path: inset(70% 0 0 0);
            clip-path: inset(70% 0 0 0);
            opacity: 0.7;
          }
        .accent-orange { color: #ff5a1e; text-shadow: 0 0 30px rgba(255,90,30,0.4); }
        .accent-blue { color: #1e8fff; text-shadow: 0 0 30px rgba(30,143,255,0.4); }
        .title-line {
          width: 120px;
          height: 2px;
          background: linear-gradient(90deg, #ff5a1e, #1e8fff);
          margin: 0 auto 14px;
          border-radius: 2px;
        }
        .subtitle {
          color: rgba(232, 228, 220, 0.3);
          font-size: 10px;
          letter-spacing: 0.4em;
        }
        .grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(4, 200px);
          gap: 65px;
          justify-content: center;
          max-width: 1300px;
          margin: 0 auto;
        }
        @media (max-width: 900px) {
          .grid { grid-template-columns: repeat(3, 190px); }
        }
        @media (max-width: 680px) {
          .grid { grid-template-columns: repeat(2, 190px); }
        }
        .page-footer {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-top: 60px;
          color: rgba(255, 90, 30, 0.3);
          font-size: 11px;
          letter-spacing: 0.3em;
        }
      `}</style>
    </main>
  );
}
