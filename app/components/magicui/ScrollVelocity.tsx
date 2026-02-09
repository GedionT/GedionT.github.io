import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";

interface VelocityProps {
  children: string;
  baseVelocity: number;
  className?: string;
}

export const ScrollVelocityRow: React.FC<VelocityProps> = ({
  children,
  baseVelocity = 100,
  className = "",
}) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${v % 100}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`flex flex-nowrap whitespace-nowrap overflow-hidden ${className}`}>
      <motion.div className="flex flex-nowrap whitespace-nowrap gap-8" style={{ x }}>
        {[...Array(8)].map((_, i) => (
          <span key={i} className="flex-shrink-0">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const ScrollVelocityContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return <div className={`relative w-full ${className}`}>{children}</div>;
};
