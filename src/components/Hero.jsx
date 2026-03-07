import { useRef, useCallback } from "react";
import bg from "../assets/bg.jpeg";
import mainVideo from "../assets/subject.mp4";
import BlackKeyVideo from "./BlackKeyVideo";

// ── Google Fonts ──────────────────────────────────────────────────────────────
const injectFonts = () => {
  if (document.getElementById("theyyam-fonts")) return;
  const link = document.createElement("link");
  link.id = "theyyam-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@300;400;600&display=swap";
  document.head.appendChild(link);
};
injectFonts();

// ── SpotlightOverlay ──────────────────────────────────────────────────────────
// Each section that wants the overlay can use this hook pattern.
// Hero manages its own overlay tied to section-local mouse coords.
const Hero = () => {
  const overlayRef = useRef(null);

  const closeSpotlight = useCallback(() => {
    if (overlayRef.current)
      overlayRef.current.style.background = "rgba(0,0,0,0.97)";
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (overlayRef.current) {
      overlayRef.current.style.background = `
        radial-gradient(
          ellipse 220px 340px at ${x}px ${y}px,
          rgba(0,0,0,0.00)  0%,
          rgba(0,0,0,0.55) 40%,
          rgba(0,0,0,0.88) 65%,
          rgba(0,0,0,0.97) 85%,
          rgba(0,0,0,0.99) 100%
        )
      `;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeSpotlight();
  }, [closeSpotlight]);

  const stats = [
    { value: "1500+", sub: "Years of history" },
    { value: "NORTH MALABAR", sub: "Rooted in Kerala's soil" },
    { value: "800+", sub: "Sacred grounds" },
    { value: "400+", sub: "Deities" },
  ];

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={closeSpotlight}
    >
      {/* Background */}
      <img
        src={bg}
        alt="Temple background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 z-10 pointer-events-none" />

      {/* Heading */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none text-center px-6">
        <h1
          className="leading-none whitespace-nowrap"
          style={{
            fontFamily: "'Anton', Impact, Arial Narrow, sans-serif",
            fontSize: "clamp(3rem, 9vw, 9rem)",
            letterSpacing: "0.01em",
            WebkitTextStroke: "1px white",
            paintOrder: "stroke fill",
          }}
        >
          DIVINE RITUAL OF MALABAR
        </h1>
        <p
          className="mt-5 text-lg md:text-2xl text-white/70 tracking-[0.15em]"
          style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600 }}
        >
          From the coasts of Kerala for over 1500 years
        </p>
      </div>

      {/* Description + CTA */}
      <div className="absolute bottom-28 left-0 right-0 z-20 flex flex-col md:flex-row justify-between gap-10 px-6 md:px-12">
        <div
          className="max-w-[380px] text-white/85 text-sm leading-relaxed"
          style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}
        >
          Theyyam is a sacred ritual tradition of North Malabar where performers
          embody deities, ancestors, and heroic spirits. Rooted in village
          shrines and passed through generations, it is not merely performance,
          but an act of worship where the divine is believed to manifest among
          the people.
        </div>
        <div
          className="flex flex-col gap-4 w-full md:w-[260px]"
          style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600 }}
        >
          <button className="border border-white py-3 rounded-xs hover:bg-white hover:text-black transition-all tracking-wider text-sm">
            Visit Instagram page
          </button>
          <button className="bg-white text-black py-3 rounded-xs font-semibold hover:bg-orange-50 transition-all tracking-wider text-sm">
            Get to know more
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center py-7 px-4"
          >
            <span
              className="text-sm tracking-wide"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600 }}
            >
              {s.value}
            </span>
            <span
              className="text-[11px] text-white/45 mt-1 tracking-widest uppercase text-center"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
            >
              {s.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Theyyam video */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-40 pointer-events-none w-[70vw] max-w-[900px]">
        <BlackKeyVideo src={mainVideo} threshold={40} />
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

export default Hero;
