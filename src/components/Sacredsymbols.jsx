import { useRef, useCallback } from "react";
import kolam from "../assets/kolam.jpeg";
import mudi from "../assets/mudi.jpeg";
import varna from "../assets/varna.jpeg";
import aabharanam from "../assets/aabharanam.jpeg";
import theeppori from "../assets/theeppori.jpeg";

/**
 * Section 3 — SACRED SYMBOLS
 * Row 1: kolam + mudi — 2 wide cards
 * Row 2: aabharanam + varna + theeppori — 3 cards
 * Each card uses its image as background, dark overlay lifts on hover.
 * Body text slides up on hover.
 */

const symbols = [
  {
    img: kolam,
    glyph: "◈",
    title: "THE FACE",
    sub: "Kolam",
    body: "The face paint is the most visible transformation. Red symbolises divine power; black marks the boundary between earthly and spiritual; gold elevates the wearer to a deity's radiance.",
    row: 1,
  },
  {
    img: mudi,
    glyph: "▲",
    title: "THE CROWN",
    sub: "Mudi",
    body: "The towering headgear — some exceeding ten feet — is built from bamboo, cloth, and sacred materials. Its height signals the deity's cosmic reach, bridging earth and the heavens.",
    row: 1,
  },
  {
    img: aabharanam,
    glyph: "⬡",
    title: "THE ORNAMENTS",
    sub: "Aabharanam",
    body: "Every bangle, anklet, and chest plate is ritually consecrated. The ornaments are not jewellery — they are armour of the divine, each piece tied to a specific mythological narrative.",
    row: 2,
  },
  {
    img: varna,
    glyph: "⊕",
    title: "THE COLOUR",
    sub: "Varna",
    body: "Each Theyyam deity carries a dominant colour identity rooted in Sanskrit chromatic symbolism — colours that communities can read at a glance, knowing which divine force has arrived.",
    row: 2,
  },
  {
    img: theeppori,
    glyph: "◉",
    title: "THE FLAME",
    sub: "Theeppori",
    body: "Fire is not backdrop — it is participant. Some forms involve the performer walking through flame or circling pits of fire. The deity, it is believed, is immune to harm.",
    row: 2,
  },
];

const Card = ({ sym }) => {
  const cardRef = useRef(null);

  const handleEnter = () => {
    const overlay = cardRef.current?.querySelector(".card-overlay");
    const body = cardRef.current?.querySelector(".card-body");
    const img = cardRef.current?.querySelector(".card-img");
    if (overlay) overlay.style.background = "rgba(0,0,0,0.3)";
    if (body) {
      body.style.opacity = "1";
      body.style.transform = "translateY(0)";
    }
    if (img) img.style.transform = "scale(1.06)";
  };

  const handleLeave = () => {
    const overlay = cardRef.current?.querySelector(".card-overlay");
    const body = cardRef.current?.querySelector(".card-body");
    const img = cardRef.current?.querySelector(".card-img");
    if (overlay) overlay.style.background = "rgba(0,0,0,0.72)";
    if (body) {
      body.style.opacity = "0";
      body.style.transform = "translateY(10px)";
    }
    if (img) img.style.transform = "scale(1)";
  };

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden"
      style={{ minHeight: sym.row === 1 ? "520px" : "400px" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Image */}
      <img
        src={sym.img}
        alt={sym.title}
        className="card-img absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0, transition: "transform 0.7s ease" }}
      />

      {/* Dark overlay */}
      <div
        className="card-overlay absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.72)",
          zIndex: 1,
          transition: "background 0.5s ease",
        }}
      />

      {/* Bottom gradient for text legibility always */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col justify-between p-8"
        style={{ zIndex: 3 }}
      >
        {/* Top glyph */}
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "1.6rem",
            color: "rgba(255,255,255,0.2)",
            lineHeight: 1,
          }}
        >
          {sym.glyph}
        </span>

        {/* Bottom text */}
        <div>
          <span
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.35rem",
            }}
          >
            {sym.sub}
          </span>
          <h3
            style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.95)",
              marginBottom: "0.8rem",
              lineHeight: 1,
            }}
          >
            {sym.title}
          </h3>
          <p
            className="card-body"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 400,
              fontSize: "0.82rem",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 340,
              opacity: 0,
              transform: "translateY(10px)",
              transition: "opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s",
            }}
          >
            {sym.body}
          </p>
        </div>
      </div>
    </div>
  );
};

const SacredSymbols = () => {
  const overlayRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (overlayRef.current) {
      overlayRef.current.style.background = `
        radial-gradient(
          ellipse 300px 400px at ${x}px ${y}px,
          rgba(0,0,0,0.00)  0%,
          rgba(0,0,0,0.48) 38%,
          rgba(0,0,0,0.85) 63%,
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

  const row1 = symbols.filter((s) => s.row === 1);
  const row2 = symbols.filter((s) => s.row === 2);

  return (
    <section
      className="relative w-full overflow-hidden bg-black text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => {
        if (overlayRef.current)
          overlayRef.current.style.background = "rgba(0,0,0,0.97)";
      }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10 z-20" />

      <div className="relative z-20 px-12 md:px-20 pt-24 pb-16">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-8">
          <div>
            <span
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300,
                fontSize: "0.65rem",
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              Chapter Three
            </span>
            <h2
              style={{
                fontFamily: "'Anton', Impact, sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                letterSpacing: "0.03em",
                lineHeight: 1,
                WebkitTextStroke: "1px rgba(255,255,255,0.9)",
                color: "transparent",
              }}
            >
              SACRED SYMBOLS
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.3)",
              maxWidth: 260,
              lineHeight: 1.7,
              textAlign: "right",
            }}
          >
            The visual language of Theyyam — where every colour, shape, and
            material is a sentence in a sacred scripture.
          </p>
        </div>

        {/* Row 1 — 2 equal wide cards */}
        <div
          className="grid grid-cols-2"
          style={{
            gap: "2px",
            marginBottom: "2px",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          {row1.map((sym, i) => (
            <Card key={i} sym={sym} />
          ))}
        </div>

        {/* Row 2 — 3 equal cards */}
        <div
          className="grid grid-cols-3"
          style={{ gap: "2px", background: "rgba(255,255,255,0.06)" }}
        >
          {row2.map((sym, i) => (
            <Card key={i} sym={sym} />
          ))}
        </div>
      </div>

      {/* Section spotlight overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.97)" }}
      />
    </section>
  );
};

export default SacredSymbols;
