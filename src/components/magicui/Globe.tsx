import React, { useEffect, useRef } from "react";

export const Globe: React.FC<{ className?: string }> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    let rotation = 0;
    let points: { x: number; y: number; z: number }[] = [];

    // Initialize points for the globe
    const count = 400;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      points.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
      });
    }

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);
      rotation += 0.005;

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.4;

      points.forEach((p) => {
        // Rotate point
        const cosR = Math.cos(rotation);
        const sinR = Math.sin(rotation);
        const x = p.x * cosR - p.z * sinR;
        const z = p.x * sinR + p.z * cosR;
        const y = p.y;

        const size = (z + 2) * 1.2;
        const opacity = (z + 1.2) / 2.5;

        if (z > -0.5) {
          ctx.beginPath();
          ctx.arc(centerX + x * radius, centerY + y * radius, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(37, 99, 235, ${opacity * 0.6})`;
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    animate();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />;
};
