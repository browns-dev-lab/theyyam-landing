import { useRef, useCallback, useState } from "react";
import bg from "../assets/bg.jpeg";
import mainImg from "../assets/main.png";

// ── Google Fonts injected at runtime ─────────────────────────────────────────
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

const Hero = () => {
  const overlayRef = useRef(null);
  const [cursor, setCursor] = useState({ x: -999, y: -999, visible: false });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCursor({ x: e.clientX, y: e.clientY, visible: true });

    if (overlayRef.current) {
      overlayRef.current.style.background = `
        radial-gradient(
          circle 180px at ${x}px ${y}px,
          rgba(0,0,0,0.0) 0%,
          rgba(0,0,0,0.75) 50%,
          rgba(0,0,0,0.97) 70%,
          rgba(0,0,0,0.99) 100%
        )
      `;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursor((c) => ({ ...c, visible: false }));
    if (overlayRef.current) {
      overlayRef.current.style.background = "rgba(0,0,0,0.97)";
    }
  }, []);

  const stats = [
    { value: "1500+", sub: "Years of history" },
    { value: "NORTH MALABAR", sub: "Rooted in Kerala's soil" },
    { value: "800+", sub: "Sacred grounds" },
    { value: "400+", sub: "Deities" },
  ];

  return (
    <>
      {/* Custom cursor */}
      <div
        className="fixed z-[9999] pointer-events-none"
        style={{
          left: cursor.x,
          top: cursor.y,
          transform: "translate(-50%, -50%)",
          opacity: cursor.visible ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        <div
          className="absolute"
          style={{
            width: 36,
            height: 36,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="rounded-full bg-gray-100"
          style={{
            width: 10,
            height: 10,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <section
        className="relative w-full min-h-screen overflow-hidden text-white flex flex-col"
        style={{ cursor: "none" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Image */}
        <img
          src={bg}
          alt="Temple background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Static bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 z-10 pointer-events-none" />

        {/* Main Content */}
        <div className="relative z-20 flex flex-col flex-1 px-6 md:px-12 pt-32">
          {/* Big Headline — Anton font, extra stroke for thickness */}
          <h1
            className="leading-none select-none whitespace-nowrap w-full"
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

          {/* Subtitle */}
          <p
            className="mt-5 text-lg md:text-2xl text-white/70 tracking-[0.15em] text-center w-full"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600 }}
          >
            From the coasts of Kerala for over 1500 years
          </p>

          {/* Content Row */}
          <div className="mt-12 flex flex-col md:flex-row justify-between gap-10">
            {/* Left Description */}
            <div
              className="max-w-[380px] rounded-2xl p-6 text-white/85 text-sm leading-relaxed"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}
            >
              Theyyam is a sacred ritual tradition of North Malabar where
              performers embody deities, ancestors, and heroic spirits. Rooted
              in village shrines and passed through generations, it is not
              merely performance, but an act of worship where the divine is
              believed to manifest among the people.
            </div>

            {/* Right CTA */}
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

          {/* Spacer */}
          <div className="flex-1" />

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center py-7 px-4"
              >
                <span
                  className="text-sm tracking-wide"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[11px] text-white/45 mt-1 tracking-widest uppercase text-center"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {s.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Foreground Theyyam Image */}
        <img
          src={mainImg}
          alt="Theyyam performer"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[75%] md:h-[80%] object-contain z-40 pointer-events-none"
        />

        {/* Spotlight overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-30 pointer-events-none"
          style={{ background: "rgba(0,0,0,0.85)" }}
        />
      </section>
    </>
  );
};

export default Hero;
