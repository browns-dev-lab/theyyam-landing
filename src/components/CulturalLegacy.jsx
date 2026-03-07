import { useRef, useCallback } from "react";

/**
 * Section 4 — CULTURAL LEGACY
 * Closing section. Full-width editorial layout with a strong CTA.
 * Large ghost number "04", manifesto-style copy, and two CTA buttons.
 * Spotlight overlay matches the rest of the page.
 */
const CulturalLegacy = () => {
  const overlayRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (overlayRef.current) {
      overlayRef.current.style.background = `
        radial-gradient(
          ellipse 260px 380px at ${x}px ${y}px,
          rgba(0,0,0,0.00)  0%,
          rgba(0,0,0,0.50) 40%,
          rgba(0,0,0,0.85) 65%,
          rgba(0,0,0,0.97) 85%,
          rgba(0,0,0,0.99) 100%
        )
      `;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (overlayRef.current)
      overlayRef.current.style.background = "rgba(0,0,0,0.97)";
  }, []);

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden bg-black text-white flex flex-col justify-between"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => {
        if (overlayRef.current)
          overlayRef.current.style.background = "rgba(0,0,0,0.97)";
      }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10 z-20" />

      {/* Ghost background number */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none select-none z-10"
        style={{
          fontFamily: "'Anton', Impact, sans-serif",
          fontSize: "clamp(12rem, 28vw, 32rem)",
          lineHeight: 0.85,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.04)",
          letterSpacing: "-0.02em",
          userSelect: "none",
        }}
      >
        04
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-20 px-12 md:px-20 pt-24 flex flex-col flex-1 justify-between pb-20">
        {/* Chapter label */}
        <span
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: "0.65rem",
            letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "4rem",
          }}
        >
          Chapter Four
        </span>

        {/* Large heading */}
        <div className="flex flex-col gap-2 mb-16">
          <h2
            style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontSize: "clamp(3rem, 8vw, 9rem)",
              letterSpacing: "0.02em",
              lineHeight: 0.95,
              color: "rgba(255,255,255,0.9)",
              maxWidth: "70vw",
            }}
          >
            CULTURAL
          </h2>
          <h2
            style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontSize: "clamp(3rem, 8vw, 9rem)",
              letterSpacing: "0.02em",
              lineHeight: 0.95,
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.4)",
              maxWidth: "70vw",
            }}
          >
            LEGACY
          </h2>
        </div>

        {/* Two-column: copy + CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
          {/* Left: manifesto copy */}
          <div className="flex flex-col gap-5">
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Theyyam is not a relic. It is a living, breathing act of devotion
              — performed today as it was a thousand years ago.
            </p>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 400,
                fontSize: "0.9rem",
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.45)",
              }}
            >
              In a world where traditions are documented, archived, and
              ultimately forgotten, Theyyam endures because it is not separate
              from the community — it is the community. The village, the deity,
              the performer, and the audience are not four things. They are one.
            </p>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 400,
                fontSize: "0.9rem",
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.3)",
              }}
            >
              This studio exists to witness and share that living flame —
              through photography, film, and documentation — so that those who
              have never stood before a Theyyam at dawn may feel its presence.
            </p>
          </div>

          {/* Right: CTA block */}
          <div className="flex flex-col gap-4 md:items-end">
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              Follow the journey
            </p>
            <button
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "white",
                color: "black",
                border: "none",
                padding: "1rem 2.5rem",
                width: 260,
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f97316"; // orange accent
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "black";
              }}
            >
              Visit Instagram
            </button>
            <button
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "transparent",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "1rem 2.5rem",
                width: 260,
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              }}
            >
              Explore Archive
            </button>
          </div>
        </div>

        {/* ── Footer bar ── */}
        <div className="mt-20 pt-8 border-t border-white/10 flex justify-between items-center">
          <span
            style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            THEYYAM — DIVINE RITUAL OF MALABAR
          </span>
          <span
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.15)",
              textTransform: "uppercase",
            }}
          >
            North Malabar · Kerala · India
          </span>
        </div>
      </div>

      {/* Spotlight overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.97)" }}
      />
    </section>
  );
};

export default CulturalLegacy;
