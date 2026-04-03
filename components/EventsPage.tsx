"use client";

import GlitchTitle from "./GlitchTitle";
import EventCard from "./EventCard";
import { events } from "./eventsData";

// Import your event data from EventCard file (you removed it earlier)

export default function EventsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 24px",
        background: "#050508",
      }}
    >
      {/* ⭐ HEADING SECTION */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <GlitchTitle />

        <p
          style={{
            fontFamily: "'Courier New', monospace",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.35em",
            color: "#f59e0b99",
            marginTop: 12,
          }}
        >
          IEEE STUDENT BRANCH · RIT CAMPUS
        </p>
      </div>

      {/* ⭐ CARDS GRID */}
      <div
        style={{
          display: "flex",
          gap: 32,
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          maxWidth: 1080,
        }}
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}