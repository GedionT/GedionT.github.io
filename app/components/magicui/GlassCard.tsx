import React, { forwardRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  solid?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = "", delay = 0, solid = false }, ref) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 120 };
    const rotateX = useSpring(0, springConfig);
    const rotateY = useSpring(0, springConfig);
    const radialHighlight = useMotionTemplate`
      radial-gradient(
        600px circle at ${mouseX}px ${mouseY}px,
        rgba(37, 99, 235, 0.05),
        transparent 80%
      )
    `;

    const handleMouseMove = (
      { currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>
    ) => {
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;

      const xPct = x / width - 0.5;
      const yPct = y / height - 0.5;

      rotateX.set(yPct * -5);
      rotateY.set(xPct * 5);

      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, type: "spring", stiffness: 50 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`${solid ? "bg-white" : "bg-white/70 backdrop-blur-3xl"} border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 relative overflow-hidden group/card ${className}`}
      >
        {!solid && (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover/card:opacity-100 z-10"
            style={{
              background: radialHighlight,
            }}
          />
        )}

        <div style={{ transform: "translateZ(30px)" }} className="relative z-20">
          {children}
        </div>

        {!solid && (
          <>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none group-hover/card:bg-blue-200/40 transition-colors" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none group-hover/card:bg-indigo-200/40 transition-colors" />
          </>
        )}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
