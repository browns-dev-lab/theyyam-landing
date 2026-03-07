import { useRef, useCallback } from "react";

/**
 * Section 1 — THE RITUAL
 * Editorial two-column layout. Left: large rotated label + body copy.
 * Right: oversized pull-quote. Spotlight overlay matches Hero behaviour.
 */
const TheRitual = () => {
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
      className="relative w-full min-h-screen overflow-hidden bg-black text-white flex items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => {
        if (overlayRef.current)
          overlayRef.current.style.background = "rgba(0,0,0,0.97)";
      }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Thin horizontal rule at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10 z-20" />

      {/* Main content */}
      <div className="relative z-20 w-full px-12 md:px-20 py-24 grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* ── Left column ── */}
        <div className="flex flex-col justify-between pr-0 md:pr-16 border-r border-white/10">
          {/* Section label */}
          <div className="flex items-start gap-6 mb-16">
            <span
              style={{
                fontFamily: "'Anton', Impact, sans-serif",
                fontSize: "clamp(4rem, 8vw, 7rem)",
                lineHeight: 1,
                color: "rgba(255,255,255,0.06)",
                userSelect: "none",
              }}
            >
              01
            </span>
            <div className="flex flex-col pt-2">
              <span
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Chapter One
              </span>
              <h2
                style={{
                  fontFamily: "'Anton', Impact, sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  letterSpacing: "0.03em",
                  lineHeight: 1.05,
                  WebkitTextStroke: "1px rgba(255,255,255,0.9)",
                  color: "transparent",
                }}
              >
                THE RITUAL
              </h2>
            </div>
          </div>

          {/* Body text */}
          <div className="flex flex-col gap-6 max-w-[480px]">
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 400,
                fontSize: "0.95rem",
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Theyyam is not a performance in the conventional sense. It is a
              sacred ritual tradition rooted in the village shrines of North
              Malabar, Kerala — where the performer does not imitate the divine
              but becomes the divine.
            </p>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 400,
                fontSize: "0.95rem",
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Spanning over 1500 years of unbroken practice, Theyyam encompasses
              more than 400 distinct forms, each tied to a specific deity,
              ancestor, or heroic spirit. The rituals are performed at Kavus —
              sacred groves — and are deeply tied to the agricultural and
              spiritual calendar of the region.
            </p>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 400,
                fontSize: "0.95rem",
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Unlike classical dance forms codified in texts, Theyyam is an oral
              tradition — passed from father to son, from guru to student —
              alive only in living memory and sacred repetition.
            </p>
          </div>

          {/* Divider + footnote */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
              }}
            >
              North Malabar &nbsp;·&nbsp; Kerala, India &nbsp;·&nbsp; Oral
              Tradition
            </p>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="hidden md:flex flex-col justify-center pl-16">
          {/* Pull quote */}
          <blockquote>
            <span
              style={{
                fontFamily: "'Anton', Impact, sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                lineHeight: 1.1,
                color: "rgba(255,255,255,0.08)",
                display: "block",
                marginBottom: "1.5rem",
              }}
            >
              "
            </span>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "0.01em",
                maxWidth: 420,
              }}
            >
              The performer does not wear the mask of god. He ceases to exist —
              and the god steps forward.
            </p>
            <span
              style={{
                display: "block",
                marginTop: "2rem",
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300,
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
              }}
            >
              — Traditional belief, North Malabar
            </span>
          </blockquote>

          {/* Vertical stat bars */}
          <div className="flex gap-10 mt-20">
            {[
              { val: "400+", label: "Distinct Forms" },
              { val: "1500", label: "Years Unbroken" },
              { val: "800+", label: "Sacred Kavus" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span
                  style={{
                    fontFamily: "'Anton', Impact, sans-serif",
                    fontSize: "2rem",
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.val}
                </span>
                <span
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.3)",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spotlight overlay — fully dark, opens on mouse */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.97)" }}
      />
    </section>
  );
};

export default TheRitual;
