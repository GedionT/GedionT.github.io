import React from "react";

export const VideoText: React.FC<{
  src: string;
  children: string;
  className?: string;
}> = ({ src, children, className = "" }) => {
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
        }}
      >
        {children}
      </span>
    </div>
  );
};
