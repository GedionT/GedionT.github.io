import React from "react";
import { motion, Variants } from "framer-motion";
import { GlassCard } from "../GlassCard";
import {
  Code2,
  BookOpen,
  Award,
  Download,
  Cpu,
  Zap,
  Mic2,
  ShieldCheck,
  Fingerprint
} from "lucide-react";
import { TimelineItem } from "../TimelineItem";
import { SOCIAL_LINKS, PUBLICATIONS, TALKS_AND_WORKSHOPS, TECHNICAL_STACK, ACCOMPLISHMENTS, CAREER_TIMELINE } from '../constants';

const AboutView: React.FC = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: Variants = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction * 50,
      y: 20
    }),
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  return (
    <article className="max-w-6xl w-full py-20 px-4">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        {/* Verified Entity Card */}
        <motion.div
          custom={-1}
          variants={cardVariants}
          className="md:col-span-4 lg:col-span-3"
        >
          <GlassCard className="h-full border-blue-100 overflow-hidden !p-6 shadow-blue-500/5">
            <div className="absolute top-0 left-0 w-full scan-line z-0" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <ShieldCheck className="text-blue-600" size={24} />
                <span className="text-[10px] font-mono text-blue-600 tracking-[0.2em] uppercase">Verified</span>
              </div>

              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 mb-6 mx-auto shadow-2xl flex items-center justify-center overflow-hidden">
                <Fingerprint size={48} className="text-white/40" />
              </div>

              <div className="text-center mb-8">
                <h2 className="text-xl font-black text-slate-900 mb-1">GEDION T. DISASSA</h2>
                <p className="text-slate-400 text-[10px] font-mono uppercase tracking-widest">All things tech</p>
              </div>

              <div className="space-y-4 flex-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-tighter mb-1">Specialization</span>
                  <span className="text-xs text-slate-900 font-bold">Research Engineer</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-tighter mb-1">Current</span>
                  <span className="text-xs text-slate-900 font-bold">UNDP, HQ</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex justify-center gap-4">
                  {SOCIAL_LINKS.map(s => (
                    <a key={s.id} href={s.href} className="text-slate-400 hover:text-slate-900 transition-colors">
                      <s.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Main Bio Card */}
        <motion.div
          custom={0}
          variants={cardVariants}
          className="md:col-span-8 lg:col-span-9"
        >

          <GlassCard className="h-full">
            <div className="space-y-8">
              <header className="space-y-2">
                <h3 className="text-blue-600 font-mono text-xs tracking-[0.3em] uppercase">Knowledge Profile</h3>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-none">
                  Architecting Intelligence.
                </h1>
              </header>

              <div className="prose prose-slate">
                <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed">
                  <span className="text-slate-900 font-medium">Gedion Teshome Disassa</span>, is a digital architect passionate about the convergence of performance and cognition. His work spans the creation of <span className="text-blue-600">highly-optimized systems and products</span> and the orchestration of <span className="text-indigo-600">autonomous AI agents</span> creating ambient intelligent platforms.
                </p>
                <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed mt-4">
                  His mission is to build infrastructure that doesn't just process data, but understands it. By leveraging agentic workflows and low-latency system design, to create environments where AI moves from a tool to a teammate.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#0f172a" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl transition-all"
                  onClick={
                    () => {
                      const link = document.createElement("a");
                      link.href = "/2026.01 Gedion CV.pdf";
                      link.download = "Gedion_Disassa_Resume.pdf";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }
                  }
                >
                  <Download size={20} />
                  RESUME (PDF)
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, borderColor: "#cbd5e1" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 px-8 py-4 border border-slate-200 text-slate-700 font-bold rounded-2xl backdrop-blur-md"
                  onClick={
                    () => {

                    }
                  }
                >
                  <BookOpen size={20} />
                  RESEARCH
                </motion.button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* featured publications */}
        <motion.div
          custom={1}
          variants={cardVariants}
          className="md:col-span-12 lg:col-span-5"
        >
          <GlassCard className="h-full border-blue-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-50 rounded-xl">
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Featured Publications</h3>
            </div>
            <div className="space-y-4">
              {PUBLICATIONS.map((pub, i) => (
                <a
                  key={i}
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-300 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="text-blue-600" size={18} />
                    <span className="font-semibold text-slate-900 text-sm">{pub.title}</span>
                  </div>
                  <div className="text-xs text-slate-400">{pub.venue}</div>
                  <div className="flex gap-1 mt-1">
                    {pub.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-blue-100 text-blue-600 text-[10px] font-mono uppercase">{tag}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* talks and workshops */}
        <motion.div
          custom={2}
          variants={cardVariants}
          className="md:col-span-8 lg:col-span-7"
        >
          <GlassCard className="h-full border-indigo-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Mic2 className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Talks & Workshops</h3>
            </div>
            <div className="space-y-4">
              {TALKS_AND_WORKSHOPS.map((talk, i) => (
                <a
                  key={i}
                  href={talk.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-indigo-50 rounded-xl border border-indigo-100 hover:border-indigo-300 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="text-indigo-600" size={18} />
                    <span className="font-semibold text-slate-900 text-sm">{talk.title}</span>
                  </div>
                  <div className="text-xs text-slate-500">{talk.details}</div>
                  <div className="flex gap-1 mt-1">
                    {talk.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-indigo-200 text-indigo-700 text-[10px] font-mono uppercase">{tag}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Technical Registry Card */}
        <motion.div
          custom={-1}
          variants={cardVariants}
          className="md:col-span-12 lg:col-span-7"
        >
          <GlassCard className="h-full border-indigo-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Cpu className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Technical Stack</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {TECHNICAL_STACK.map((group) => (
                <div key={group.label} className="space-y-3">
                  <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{group.label}</h4>
                  <ul className="space-y-2">
                    {group.items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-slate-600 text-sm">
                        <div className="h-1 w-1 bg-indigo-400 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Accomplishments Card */}
        <motion.div
          custom={1}
          variants={cardVariants}
          className="md:col-span-12 lg:col-span-5"
        >
          <GlassCard className="h-full border-emerald-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-emerald-50 rounded-xl">
                <Award className="text-emerald-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Milestones</h3>
            </div>

            <div className="space-y-4">
              {ACCOMPLISHMENTS.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-300 transition-all cursor-default group">
                  <div className="flex items-center gap-3">
                    <m.icon size={18} className="text-emerald-600 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-900 text-sm font-medium">{m.title}</span>
                  </div>
                  <span className="text-slate-400 text-[10px] font-mono">{m.date}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* career timeline */}
        <motion.div
          custom={3}
          variants={cardVariants}
          className="md:col-span-8 lg:col-span-12"
        >
          <GlassCard className="h-full border-emerald-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-emerald-50 rounded-xl">
                <Zap className="text-emerald-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Career Timeline</h3>
            </div>

            <div className="space-y-6">
              {CAREER_TIMELINE.map((event, index) => (
                <TimelineItem
                  key={`${event.organization}-${event.year}-${index}`}
                  event={event}
                  isLast={index === CAREER_TIMELINE.length - 1}
                  index={index}
                />
              ))}
            </div>

          </GlassCard>

        </motion.div>

      </motion.div>
    </article>
  );
};

export default AboutView;