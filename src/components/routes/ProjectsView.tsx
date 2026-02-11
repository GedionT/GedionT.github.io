import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../magicui/GlassCard";
import { ExternalLink, Github, Search, Cpu, Database, Network } from "lucide-react";
import { PROJECTS } from "../../constants";

const ProjectsView: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = activeFilter === "All" || p.tech.includes(activeFilter);
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  return (
    <div className="max-w-6xl w-full flex flex-col pt-12 pb-24">
      <div className="sticky top-0 z-30 py-4 mb-6 flex flex-col md:flex-row gap-6 items-center px-4 bg-white/40 backdrop-blur-xl border-b border-slate-100/50">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by system, tech, or concept..."
            className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] py-4 pl-14 pr-6 text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-xl shadow-slate-200/50"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
          {["All", "Python", "Rust", "Go", "AI Infra"].map(filter => (
            <motion.button
              key={filter}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black tracking-widest uppercase transition-all whitespace-nowrap border ${activeFilter === filter
                ? "bg-slate-900 text-white border-slate-900 shadow-xl"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="px-4">
        <header className="mb-8 sr-only">
          <h2>Gedion Disassa's Portfolio Projects</h2>
          <p>A collection of high-performance backend systems and AI research projects.</p>
        </header>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <GlassCard className="!p-6 h-full border-slate-100 hover:border-blue-300 transition-colors cursor-default">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                      {project.tags.includes("Database") ? <Database size={20} /> : project.tags.includes("Network") ? <Network size={20} /> : <Cpu size={20} />}
                    </div>
                    <div className="flex gap-3 text-slate-400">
                      <Github size={18} className="hover:text-slate-900 transition-colors cursor-pointer" />
                      <ExternalLink size={18} className="hover:text-slate-900 transition-colors cursor-pointer" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-500">
                        {t}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center space-y-4"
          >
            <div className="text-slate-200 text-5xl font-black">404</div>
            <p className="text-slate-400">No matching projects found.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectsView;