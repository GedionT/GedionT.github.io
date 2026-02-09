import React, { useEffect, useState } from "react";

export const VideoText: React.FC<{
  src: string;
  children: string;
  className?: string;
  speed?: number;
  delay?: number;
}> = ({ src, children, className = "", speed = 50, delay = 900 }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    // Reset display text if children change
    setDisplayText("");

    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(children.substring(0, i + 1));
        i++;
        if (i >= children.length) {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [children, speed, delay]);

  return (
    <div className={`relative inline-block ${className}`} aria-label={children} role="text" >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          clipPath: "inset(0 0 0 0)",
          WebkitBackgroundClip: "text",
        }}
      >
        <source src={src} type="video/webm" />
      </video>
      <span
        className="relative block font-black leading-none bg-white mix-blend-screen"
        style={{
          color: "black",
          minWidth: "1ch",
        }}
        aria-label="true"
      >
        {displayText || "\u00A0"}
      </span>
    </div>
  );
};

