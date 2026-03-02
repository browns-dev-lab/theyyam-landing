import { useRef, useEffect } from "react";

const BlackKeyVideo = ({
  src,
  width = "100%",
  height = "100%",
  threshold = 35,
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationId;

    const render = () => {
      if (!video.paused && !video.ended) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          if (r < threshold && g < threshold && b < threshold) {
            data[i + 3] = 0;
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      animationId = requestAnimationFrame(render);
    };

    const handleLoaded = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      video.play(); // 🔥 force play
      render(); // 🔥 start loop AFTER metadata loads
    };

    video.addEventListener("loadeddata", handleLoaded);

    return () => {
      cancelAnimationFrame(animationId);
      video.removeEventListener("loadeddata", handleLoaded);
    };
  }, [threshold]);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
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
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
        }}
      />
    </>
  );
};

export default BlackKeyVideo;
