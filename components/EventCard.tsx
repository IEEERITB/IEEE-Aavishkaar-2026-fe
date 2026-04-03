"use client";

import { useState, useRef, useEffect } from "react";


/* ── Types ───────────────────────────────────────────────────────────────────── */
interface Coordinator {
  name: string;
  phone: string;
}

interface Event {
  id: number;
  title: string;
  emoji: string;
  glowColor: string;
  accentColor: string;
  secondaryGlow: string;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  coordinators: Coordinator[];
  description: string;
}

/* ── Data ────────────────────────────────────────────────────────────────────── */

/* ── Matrix Rain Canvas Banner ───────────────────────────────────────────────── */
function MatrixBanner({ event, hovered }: { event: Event; hovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const dropsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Match canvas internal resolution to its displayed size
    const W = canvas.offsetWidth || 300;
    const H = 178;
    canvas.width = W;
    canvas.height = H;

    const fs = 11;
    const cols = Math.floor(W / fs);
    dropsRef.current = Array.from({ length: cols }, () =>
      Math.floor(Math.random() * H)
    );

    let alive = true;

    function draw() {
      if (!alive || !ctx) return;
      ctx.fillStyle = "rgba(0,0,0,0.07)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${fs}px monospace`;
      ctx.fillStyle = event.accentColor + "bb";
      for (let i = 0; i < dropsRef.current.length; i++) {
        const ch = String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96));
        ctx.fillText(ch, i * fs, dropsRef.current[i]);
        if (dropsRef.current[i] > H && Math.random() > 0.975)
          dropsRef.current[i] = 0;
        else dropsRef.current[i] += fs;
      }
      frameRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      alive = false;
      cancelAnimationFrame(frameRef.current);
    };
  }, [event.accentColor]);

  return (
    <div
      style={{
        position: "relative",
        height: 178,
        overflow: "hidden",
        background: `radial-gradient(ellipse at 50% 80%, ${event.glowColor}2a 0%, ${event.secondaryGlow}18 40%, #07070e 100%)`,
      }}
    >
      {/* Matrix canvas — fills full width of banner */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: hovered ? 0.9 : 0.35,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      {/* Horizontal sweep line on hover */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent 0%, ${event.accentColor} 50%, transparent 100%)`,
          boxShadow: `0 0 14px ${event.accentColor}`,
          top: hovered ? "105%" : "-5%",
          transition: hovered ? "top 0.9s cubic-bezier(0.4,0,0.2,1)" : "top 0s",
          zIndex: 6,
        }}
      />

      {/* Corner brackets */}
      {(
        [
          { top: 7, left: 7, r: 0 },
          { top: 7, right: 7, r: 90 },
          { bottom: 7, right: 7, r: 180 },
          { bottom: 7, left: 7, r: 270 },
        ] as Array<{
          top?: number;
          left?: number;
          right?: number;
          bottom?: number;
          r: number;
        }>
      ).map((pos, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
            transform: `rotate(${pos.r}deg)`,
            opacity: hovered ? 1 : 0.25,
            transition: "opacity 0.3s ease",
            zIndex: 7,
          }}
        >
          <path
            d="M1 7 L1 1 L7 1"
            fill="none"
            stroke={event.accentColor}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ))}

      {/* Orb */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5,
          paddingBottom: 28,
        }}
      >
        <div
          style={{
            width: hovered ? 74 : 64,
            height: hovered ? 74 : 64,
            borderRadius: "50%",
            border: `1.5px solid ${event.accentColor}${hovered ? "cc" : "44"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: hovered ? 32 : 28,
            background: `radial-gradient(circle at 38% 32%, ${event.glowColor}2a, transparent 65%)`,
            boxShadow: hovered
              ? `0 0 24px ${event.glowColor}88, 0 0 50px ${event.glowColor}33, inset 0 0 18px ${event.glowColor}18`
              : "none",
            transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {event.emoji}
        </div>
      </div>

      {/* Title badge */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 8,
        }}
      >
        <div
          style={{
            background: "rgba(4,4,12,0.82)",
            border: `1.5px solid ${event.accentColor}${hovered ? "cc" : "55"}`,
            borderRadius: 4,
            padding: "5px 22px",
            boxShadow: hovered ? `0 0 22px ${event.glowColor}77` : "none",
            transition: "box-shadow 0.4s ease, border-color 0.3s ease",
          }}
        >
          <span
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontWeight: 900,
              fontSize: 19,
              letterSpacing: "0.3em",
              color: event.accentColor,
              textShadow: hovered
                ? `0 0 10px ${event.accentColor}, 0 0 22px ${event.glowColor}`
                : "none",
              transition: "text-shadow 0.3s ease",
            }}
          >
            {event.title}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Floating Particles ──────────────────────────────────────────────────────── */
type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
};

function useParticles(active: boolean) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }
    const t = setInterval(() => {
      setParticles((prev) => {
        const next = prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.018,
          }))
          .filter((p) => p.life > 0);
        const fresh: Particle = {
          id: idRef.current++,
          x: Math.random() * 100,
          y: 96 + Math.random() * 8,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -(0.35 + Math.random() * 0.65),
          life: 1,
        };
        return [...next, fresh].slice(-20);
      });
    }, 55);
    return () => clearInterval(t);
  }, [active]);

  return particles;
}

/* ── Event Card ──────────────────────────────────────────────────────────────── */
function EventCard({ event }: { event: Event }) {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const particles = useParticles(hovered);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: 300,
        flexShrink: 0,               /* ← prevents card from squishing */
        borderRadius: 10,
        overflow: "visible",         /* ← was "hidden" — caused clipping on hover lift */
        background: "#0f0f17",
        border: `1.5px solid ${hovered ? event.glowColor : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered
          ? `0 0 0 1px ${event.glowColor}22,
             0 0 22px ${event.glowColor}55,
             0 0 60px ${event.glowColor}1a,
             0 22px 60px rgba(0,0,0,0.65)`
          : "0 4px 28px rgba(0,0,0,0.55)",
        transform: hovered
          ? "translateY(-10px) scale(1.025)"
          : "translateY(0) scale(1)",
        transition:
          "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.35s ease",
        cursor: "pointer",
      }}
    >
      {/* Inner clip wrapper so card contents stay rounded */}
      <div style={{ borderRadius: 10, overflow: "hidden" }}>

        {/* Particles — absolute over inner clip, so they escape cleanly */}
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: event.accentColor,
              opacity: p.life * 0.75,
              boxShadow: `0 0 5px ${event.accentColor}`,
              pointerEvents: "none",
              zIndex: 30,
            }}
          />
        ))}

        {/* Banner */}
        <MatrixBanner event={event} hovered={hovered} />

        {/* Ticker strip */}
        <div
          style={{
            height: hovered ? 18 : 0,
            overflow: "hidden",
            transition: "height 0.35s ease",
            background: `${event.glowColor}15`,
            display: "flex",
            alignItems: "center",
            paddingLeft: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 32,
              animation: hovered ? "ticker 7s linear infinite" : "none",
              whiteSpace: "nowrap",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: 9.5,
                  letterSpacing: "0.18em",
                  color: event.accentColor + "88",
                }}
              >
                {event.title} · {event.date} · {event.venue} ·&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(0,0,0,0.32)",
            fontFamily: "'Courier New', monospace",
            fontWeight: 700,
            fontSize: 10,
            color: hovered ? "#ccc" : "#777",
            transition: "color 0.3s ease",
          }}
        >
          {[
            { label: event.time },
            { label: event.date },
            { label: event.teamSize },
          ].map((col, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "8px 5px",
                textAlign: "center",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
                lineHeight: 1.4,
              }}
            >
              {col.label.split("\n").map((line, j) => (
                <div key={j}>{line}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Coordinators */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(0,0,0,0.18)",
            fontSize: 10,
            fontFamily: "'Courier New', monospace",
            fontWeight: 700,
            flexWrap: "wrap",
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke={event.accentColor}
            strokeWidth="2"
          >
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.14 2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          {event.coordinators.map((c, i) => (
            <span key={i}>
              <span style={{ color: event.accentColor }}>{c.name}</span>
              <span style={{ color: "#555" }}>-</span>
              <span style={{ color: "#999" }}>{c.phone}</span>
              {i < event.coordinators.length - 1 && (
                <span style={{ color: "#333", margin: "0 4px" }}>│</span>
              )}
            </span>
          ))}
        </div>

        {/* Body */}
        <div style={{ padding: "15px 16px 18px" }}>
          {/* Title */}
          <h3
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontWeight: 900,
              fontSize: 27,
              color: "#fff",
              letterSpacing: "0.06em",
              margin: "0 0 4px",
              textShadow: hovered
                ? `2px 0 ${event.glowColor}55, -1px 0 ${event.accentColor}33`
                : "none",
              transition: "text-shadow 0.3s ease",
            }}
          >
            {event.title}
          </h3>

          {/* Date with animated underline */}
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginBottom: 4,
            }}
          >
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                fontWeight: 900,
                fontSize: 13,
                color: event.accentColor,
                letterSpacing: "0.12em",
                margin: 0,
                textShadow: hovered ? `0 0 8px ${event.accentColor}` : "none",
                transition: "text-shadow 0.3s ease",
              }}
            >
              {event.date}
            </p>
            <div
              style={{
                position: "absolute",
                bottom: -1,
                left: 0,
                height: 1.5,
                width: hovered ? "100%" : "0%",
                background: event.accentColor,
                transition: "width 0.55s ease 0.1s",
                boxShadow: `0 0 6px ${event.accentColor}`,
              }}
            />
          </div>

          <p
            style={{
              fontFamily: "'Courier New', monospace",
              fontWeight: 700,
              fontSize: 11,
              color: "#4a4a5a",
              letterSpacing: "0.08em",
              margin: "6px 0 12px",
            }}
          >
            {event.venue}
          </p>

          <p
            style={{
              fontSize: 13.5,
              fontWeight: 500,
              color: hovered ? "#b0b0c0" : "#666",
              lineHeight: 1.68,
              marginBottom: 18,
              fontFamily: "system-ui, -apple-system, sans-serif",
              transition: "color 0.3s ease",
            }}
          >
            {event.description}
          </p>

          {/* CTA Button */}
          <button
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              position: "relative",
              width: "100%",
              padding: "11px 0",
              fontFamily: "'Courier New', Courier, monospace",
              fontWeight: 900,
              fontSize: 13.5,
              letterSpacing: "0.2em",
              color: btnHovered ? "#000" : event.accentColor,
              background: btnHovered ? event.accentColor : "transparent",
              border: `1.5px solid ${
                btnHovered ? event.accentColor : event.accentColor + "50"
              }`,
              borderRadius: 6,
              cursor: "pointer",
              overflow: "hidden",
              boxShadow: btnHovered
                ? `0 0 28px ${event.glowColor}99, 0 0 50px ${event.glowColor}33`
                : hovered
                ? `0 0 12px ${event.glowColor}33`
                : "none",
              transform: btnHovered ? "scale(1.025)" : "scale(1)",
              transition: "all 0.25s ease",
            }}
          >
            {/* Shimmer sweep */}
            <span
              style={{
                position: "absolute",
                top: 0,
                left: btnHovered ? "120%" : "-70%",
                width: "55%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
                transition: "left 0.5s ease",
                pointerEvents: "none",
              }}
            />
            REGISTER NOW →
          </button>
        </div>

        {/* Bottom neon bar */}
        <div
          style={{
            height: 2,
            background: hovered
              ? `linear-gradient(90deg, transparent, ${event.accentColor}, transparent)`
              : "transparent",
            boxShadow: hovered ? `0 0 10px ${event.accentColor}` : "none",
            transition: "background 0.4s ease, box-shadow 0.4s ease",
          }}
        />
      </div>{/* end inner clip wrapper */}
    </div>
  );
}

/* ── Glitch Title ────────────────────────────────────────────────────────────── */
function GlitchTitle() {
  const [glitchIdx, setGlitchIdx] = useState(-1);
  const letters = "EVENTS";

  useEffect(() => {
    const t = setInterval(() => {
      setGlitchIdx(Math.floor(Math.random() * letters.length));
      setTimeout(() => setGlitchIdx(-1), 100);
    }, 500);
    return () => clearInterval(t);
  }, []);

  return (
    <h1
      style={{
        fontFamily: "'Courier New', Courier, monospace",
        fontWeight: 900,
        fontSize: "clamp(3rem, 7vw, 5rem)",
        letterSpacing: "0.55em",
        margin: 0,
        display: "flex",
        lineHeight: 1,
      }}
    >
      {letters.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            color: glitchIdx === i ? "#ffffff" : "#f59e0b",
            textShadow:
              glitchIdx === i
                ? "3px 0 #e879f9, -3px 0 #34d399, 0 0 20px #fff"
                : "0 0 20px #f59e0b88, 0 0 40px #f59e0b33",
            transform:
              glitchIdx === i
                ? `translateX(${(Math.random() - 0.5) * 4}px) scaleY(1.12)`
                : "none",
            transition: "color 0.08s, text-shadow 0.08s, transform 0.08s",
          }}
        >
          {ch}
        </span>
      ))}
    </h1>
  );
}

export default EventCard;