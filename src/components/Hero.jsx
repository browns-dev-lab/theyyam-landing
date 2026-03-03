import { useRef, useCallback, useState, useEffect } from "react";
import bg from "../assets/bg.jpeg";
import mainVideo from "../assets/subject.mp4";
import BlackKeyVideo from "./BlackKeyVideo";
import fireVideo from "../assets/fire.mp4";

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

// ── FireCursor ────────────────────────────────────────────────────────────────
const FireCursor = ({ x, y, visible, threshold = 40 }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    let running = true;

    const render = () => {
      if (!running) return;
      if (!video.paused && !video.ended) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = frame.data;
        for (let i = 0; i < d.length; i += 4) {
          if (
            d[i] < threshold &&
            d[i + 1] < threshold &&
            d[i + 2] < threshold
          ) {
            d[i + 3] = 0;
          }
        }
        ctx.putImageData(frame, 0, 0);
      }
      animRef.current = requestAnimationFrame(render);
    };

    const handleLoaded = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.play();
      render();
    };

    video.addEventListener("loadeddata", handleLoaded);
    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
      video.removeEventListener("loadeddata", handleLoaded);
    };
  }, [threshold]);

  return (
    <>
      <video
        ref={videoRef}
        src={fireVideo}
        autoPlay
        loop
        muted
        playsInline
        crossOrigin="anonymous"
        style={{ display: "none" }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          left: x,
          top: y,
          width: 100,
          height: 100,
          transform: "translate(-50%, -85%)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s ease-out",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const overlayRef = useRef(null);
  const [cursor, setCursor] = useState({ x: -999, y: -999, visible: false });

  // Reset overlay to fully black (close the spotlight)
  const closeSpotlight = useCallback(() => {
    if (overlayRef.current) {
      overlayRef.current.style.background = "rgba(0,0,0,0.97)";
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    // Keep closed until first mousemove gives us coordinates
    closeSpotlight();
  }, [closeSpotlight]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCursor({ x: e.clientX, y: e.clientY, visible: true });

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
    setCursor((c) => ({ ...c, visible: false }));
    closeSpotlight(); // ← fully dark when cursor leaves
  }, [closeSpotlight]);

  const stats = [
    { value: "1500+", sub: "Years of history" },
    { value: "NORTH MALABAR", sub: "Rooted in Kerala's soil" },
    { value: "800+", sub: "Sacred grounds" },
    { value: "400+", sub: "Deities" },
  ];

  return (
    <>
      <FireCursor
        x={cursor.x}
        y={cursor.y}
        visible={cursor.visible}
        threshold={40}
      />

      <section
        className="relative w-full min-h-screen overflow-hidden text-white"
        style={{ cursor: "none" }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background */}
        <img
          src={bg}
          alt="Temple background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 z-10 pointer-events-none" />

        {/* ── Heading: truly centered in the full section ── */}
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

        {/* ── Description + CTA anchored near bottom ── */}
        <div className="absolute bottom-28 left-0 right-0 z-20 flex flex-col md:flex-row justify-between gap-10 px-6 md:px-12">
          <div
            className="max-w-[380px] text-white/85 text-sm leading-relaxed"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}
          >
            Theyyam is a sacred ritual tradition of North Malabar where
            performers embody deities, ancestors, and heroic spirits. Rooted in
            village shrines and passed through generations, it is not merely
            performance, but an act of worship where the divine is believed to
            manifest among the people.
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

        {/* ── Stats Bar pinned to very bottom ── */}
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

        {/* ── Foreground Theyyam video — z-40 overlaps centered heading ── */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-40 pointer-events-none w-[70vw] max-w-[900px]">
          <BlackKeyVideo src={mainVideo} threshold={40} />
        </div>

        {/* ── Spotlight overlay — default fully dark, opens on mouse move ── */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-30 pointer-events-none"
          style={{ background: "rgba(0,0,0,0.97)" }} // ← starts fully dark
        />
      </section>
    </>
  );
};

export default Hero;
