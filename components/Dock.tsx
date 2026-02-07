
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { User, Mail, Home, Code, BookOpen } from "lucide-react";
import { Tab } from "../types";

interface DockProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

// Fixed: Explicitly typed DockIcon using React.FC to handle React-specific props like 'key' when used in map
const DockIcon: React.FC<{
  item: any;
  isActive: boolean;
  onClick: () => void
}> = ({
  item,
  isActive,
  onClick
}) => {
    const mouseX = useMotionValue(Infinity);
    const ref = useRef<HTMLButtonElement>(null);

    const distance = useTransform(mouseX, (val) => {
      const bounds = ref.current?.getBoundingClientRect();
      if (!bounds) return 0;
      return val - (bounds.x + bounds.width / 2);
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
      <motion.button
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        onClick={onClick}
        style={{ width }}
        className={`relative flex items-center justify-center aspect-square rounded-full transition-all duration-300 group
        ${isActive
            ? `shadow-2xl shadow-blue-500/20 ${item.color}`
            : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900"
          }
      `}
      >
        <item.icon size={22} className={isActive ? "text-white" : "text-current"} />

        {/* Label Tooltip */}
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-white text-[10px] font-black uppercase tracking-widest border border-slate-200 rounded-lg text-slate-900 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          {item.label}
        </span>

        {isActive && (
          <motion.div
            layoutId="active-nav-dot"
            className="absolute -bottom-1.5 w-1 h-1 bg-blue-600 rounded-full"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </motion.button>
    );
  };

const Dock: React.FC<DockProps> = ({ activeTab, setActiveTab }) => {
  const items = [
    { id: Tab.Home, icon: Home, color: "bg-slate-900 text-white", label: "Home" },
    { id: Tab.About, icon: User, color: "bg-blue-600 text-white", label: "About" },
    { id: Tab.Projects, icon: Code, color: "bg-indigo-600 text-white", label: "Work" },
    { id: Tab.Blogs, icon: BookOpen, color: "bg-violet-600 text-white", label: "Logs" },
    { id: Tab.Contact, icon: Mail, color: "bg-pink-600 text-white", label: "Connect" },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-4 px-6 py-4 rounded-full bg-white/80 backdrop-blur-3xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
      >
        {items.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            isActive={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Dock;
