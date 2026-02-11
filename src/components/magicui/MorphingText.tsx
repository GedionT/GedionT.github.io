import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const MorphingText: React.FC<{ texts: string[]; className?: string }> = ({
  texts,
  className = "",
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [texts]);

  return (
    <div
      className={`relative h-12 flex items-center justify-center overflow-hidden ${className}`}
      aria-live="polite"
      aria-label={`Values: ${texts.join(', ')}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute text-center font-black"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
