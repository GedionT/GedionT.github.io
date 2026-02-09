import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const AnimatedSpan: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ 
  children, 
  className = "",
  delay = 0 
}) => (
  <motion.div
    initial={{ opacity: 0, x: -5 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.3 }}
    className={`block mb-1 ${className}`}
  >
    {children}
  </motion.div>
);

export const TypingAnimation: React.FC<{ children: string; className?: string; delay?: number }> = ({ 
  children, 
  className = "",
  delay = 0 
}) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(children.substring(0, i));
        i++;
        if (i > children.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [children, delay]);

  return <div className={`block mb-1 ${className}`}>{displayText}<span className="animate-pulse">_</span></div>;
};

export const Terminal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-white/10 font-mono text-[11px] leading-tight">
      <div className="bg-slate-900 px-4 py-2 border-b border-white/5 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        </div>
        <div className="text-slate-500 text-[9px] uppercase tracking-widest ml-2">gedion-disassa-core.sys</div>
      </div>
      <div className="p-4 text-slate-300 min-h-[180px]">
        {children}
      </div>
    </div>
  );
};
