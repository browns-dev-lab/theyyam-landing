import { useRef, useCallback } from "react";
import theyyamVideo from "../assets/theyyam.mp4"; // ← your full-screen Theyyam video

/**
 * Section 2 — THE AWAKENING
 * Full-screen video background. The spotlight overlay reveals the video underneath.
 * Minimal text anchored to bottom-left; large ghost heading on right.
 */
const TheAwakening = () => {
  const overlayRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (overlayRef.current) {
      overlayRef.current.style.background = `
        radial-gradient(
          ellipse 280px 420px at ${x}px ${y}px,
          rgba(0,0,0,0.00)  0%,
          rgba(0,0,0,0.45) 35%,
          rgba(0,0,0,0.82) 60%,
          rgba(0,0,0,0.97) 82%,
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
      className="relative w-full min-h-screen overflow-hidden text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => {
        if (overlayRef.current)
          overlayRef.current.style.background = "rgba(0,0,0,0.97)";
      }}
    >
      {/* ── Full-screen video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src={theyyamVideo} type="video/mp4" />
      </video>

      {/* Dark gradient at top and bottom to blend into adjacent sections */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 20%, transparent 75%, rgba(0,0,0,0.85) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Section label (top-left) ── */}
      <div className="absolute top-12 left-12 z-20">
        <span
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: "0.65rem",
            letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
          }}
        >
          Chapter Two
        </span>
      </div>

      {/* ── Ghost title (centered, massive) ── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none">
        <h2
          style={{
            fontFamily: "'Anton', Impact, sans-serif",
            fontSize: "clamp(4rem, 13vw, 14rem)",
            letterSpacing: "-0.01em",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.12)",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          THE AWAKENING
        </h2>
      </div>

      {/* ── Content: bottom-left ── */}
      <div className="absolute bottom-16 left-12 z-20 max-w-[500px]">
        <h3
          style={{
            fontFamily: "'Anton', Impact, sans-serif",
            fontSize: "clamp(1.8rem, 3vw, 3rem)",
            letterSpacing: "0.04em",
            lineHeight: 1.1,
            marginBottom: "1.2rem",
            color: "rgba(255,255,255,0.95)",
          }}
        >
          WHEN THE PERFORMER
          <br />
          BECOMES THE DEITY
        </h3>
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 400,
            fontSize: "0.9rem",
            lineHeight: 1.85,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 420,
          }}
        >
          Hours before the ritual begins, the performer enters a state of
          preparation that is itself sacred. Intricate face paint is applied
          layer by layer — red, black, white, and gold — each pigment carrying
          mythological significance.
        </p>
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 400,
            fontSize: "0.9rem",
            lineHeight: 1.85,
            color: "rgba(255,255,255,0.35)",
            maxWidth: 420,
            marginTop: "1rem",
          }}
        >
          Massive ceremonial headgear — some towering over ten feet — is
          assembled piece by piece. Ornaments, anklets, and sacred threads are
          fastened. By the time the performance begins, the man has stepped
          aside. The deity has arrived.
        </p>
      </div>

      {/* ── Step counter: bottom-right ── */}
      <div className="absolute bottom-16 right-12 z-20 flex flex-col items-end gap-6">
        {["Face Paint", "Ornaments", "Headgear", "Invocation"].map(
          (step, i) => (
            <div key={i} className="flex items-center gap-4">
              <span
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                }}
              >
                {step}
              </span>
              <span
                style={{
                  fontFamily: "'Anton', Impact, sans-serif",
                  fontSize: "1.1rem",
                  color: "rgba(255,255,255,0.15)",
                }}
              >
                0{i + 1}
              </span>
            </div>
          ),
        )}
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

export default TheAwakening;
