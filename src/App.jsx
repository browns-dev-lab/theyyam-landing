import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  createContext,
  useContext,
} from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TheAwakening from "./components/TheAwakening";
import SacredSymbols from "./components/SacredSymbols";
import CulturalLegacy from "./components/CulturalLegacy";
import fireVideo from "./assets/fire.mp4";
import TheRitual from "./components/TheRitual";

// ── Global Cursor Context ─────────────────────────────────────────────────────
export const CursorContext = createContext(null);

export const useCursor = () => useContext(CursorContext);

// ── FireCursor (global, rendered once) ───────────────────────────────────────
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

// ── MobileBlock ───────────────────────────────────────────────────────────────
const MobileBlock = () => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "#000",
      zIndex: 99999,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "2rem",
      fontFamily: "'Anton', Impact, sans-serif",
      color: "#fff",
    }}
  >
    <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔥</p>
    <h1
      style={{
        fontSize: "1.6rem",
        letterSpacing: "0.05em",
        marginBottom: "1rem",
      }}
    >
      DESKTOP ONLY
    </h1>
    <p
      style={{
        fontFamily: "sans-serif",
        fontWeight: 300,
        fontSize: "0.9rem",
        color: "rgba(255,255,255,0.5)",
        maxWidth: 280,
        lineHeight: 1.6,
      }}
    >
      This experience is designed for desktop and laptop screens. Please visit
      on a larger device.
    </p>
  </div>
);

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [cursor, setCursor] = useState({ x: -999, y: -999, visible: false });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Global mouse tracking for fire cursor
  useEffect(() => {
    const handleMove = (e) =>
      setCursor({ x: e.clientX, y: e.clientY, visible: true });
    const handleLeave = () => setCursor((c) => ({ ...c, visible: false }));
    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <CursorContext.Provider value={cursor}>
      <div className="bg-black" style={{ cursor: "none" }}>
        {isMobile && <MobileBlock />}

        {/* Global fire cursor */}
        <FireCursor
          x={cursor.x}
          y={cursor.y}
          visible={cursor.visible}
          threshold={40}
        />

        <Navbar />
        <Hero />
        <TheRitual />
        <TheAwakening />
        <SacredSymbols />
        <CulturalLegacy />
      </div>
    </CursorContext.Provider>
  );
}

export default App;
