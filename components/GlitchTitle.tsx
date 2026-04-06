"use client";

import { useState, useEffect } from "react";

export default function GlitchTitle() {
  const [glitchIdx, setGlitchIdx] = useState(-1);
  const [glitchOffset, setGlitchOffset] = useState(0);
  const letters = "EVENTS";

  useEffect(() => {
    const t = setInterval(() => {
      setGlitchIdx(Math.floor(Math.random() * letters.length));
      setGlitchOffset((Math.random() - 0.5) * 4);
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
                ? `translateX(${glitchOffset}px) scaleY(1.12)`
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