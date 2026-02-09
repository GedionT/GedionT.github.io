import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { GlassCard } from "../components/magicui/GlassCard";
import { Tab } from "../../types";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Highlighter } from "../components/magicui/Highlighter";
import { VideoText } from "../components/magicui/VideoText";
import { ScrollVelocityContainer, ScrollVelocityRow } from "../components/magicui/ScrollVelocity";

const HomeView: React.FC = () => {
  const navigate = useNavigate();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  return (
    <div className="max-w-4xl w-full text-center">
      <GlassCard className="py-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold tracking-[0.3em] uppercase text-blue-600">
            <Sparkles size={12} />
            Open for collaboration
          </motion.div>

          <motion.h1 variants={item} className="text-3xl md:text-[5rem] font-black mb-8 tracking-tighter text-slate-900 leading-[0.85]">
            HI, I'M <VideoText
              src="https://cdn.magicui.design/ocean-small.webm"
              className="text-transparent bg-clip-text"
            >GEDION</VideoText>
            {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600">GEDION</span> */}
          </motion.h1>

          <motion.p variants={item} className="text-xl md:text-2xl text-slate-600 mb-8 font-light leading-snug max-w-2xl mx-auto">
            I architect <span className="text-slate-900 font-medium border-b border-blue-500/20"><Highlighter action="underline" color="#3b82f6">digital universes</Highlighter></span> through code,
            focusing on the harmony of data,  <Highlighter color="#8b5cf6">ambient intelligence</Highlighter>, and design.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="px-12 py-4 bg-slate-900 text-white font-black rounded-2xl flex items-center gap-3"
            >
              LET'S TALK <ArrowUpRight size={20} />
            </motion.button>

            <motion.button
              whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/projects')}
              className="px-10 py-4 border border-slate-200 text-slate-700 font-bold rounded-2xl"
            >
              VIEW PROJECTS
            </motion.button>
          </motion.div>

          <motion.div variants={item} className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap justify-center gap-x-12 gap-y-4 text-[10px] text-slate-400 font-mono tracking-widest uppercase">
            <ScrollVelocityContainer className="font-black uppercase select-none pointer-events-none py-2">
              <ScrollVelocityRow baseVelocity={-2} className="mb-2">SYSTEMS ARCHITECTURE • AGENTIC WORKFLOWS • DATA INTELLIGENCE •</ScrollVelocityRow>
            </ScrollVelocityContainer>
            <ScrollVelocityContainer className="font-black uppercase select-none pointer-events-none py-0">
              <ScrollVelocityRow baseVelocity={2} className="mb-2">FULLSTACK SYSTEMS • DISTRIBUTED BACKENDS • AMBIENT INTELLIGENCE </ScrollVelocityRow>
            </ScrollVelocityContainer>
          </motion.div>
        </motion.div>
      </GlassCard>
    </div>
  );
};

export default HomeView;