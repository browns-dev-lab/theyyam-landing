import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

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

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="bg-black">
      {isMobile && <MobileBlock />}
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;
