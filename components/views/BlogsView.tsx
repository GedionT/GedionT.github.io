import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { GlassCard } from "../GlassCard";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  ArrowRight,
  Cpu,
  Tag,
  Hash,
  Terminal
} from "lucide-react";
import { ArticleMetadata } from "@/types";
import { articleRegistry } from "../constants";

// Custom Hook for Scalable Content Management
const useArticle = (article: ArticleMetadata | null) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!article) return;

    setLoading(true);
    setError(null);

    // Simulate high-speed data transmission for aesthetic
    const loadData = async () => {
      try {
        const res = await fetch(article.filePath);
        if (!res.ok) throw new Error("Link unstable");
        const text = await res.text();
        setContent(text);
      } catch (err) {
        setError("Transmission interrupted. Data lost in transit.");
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };

    loadData();
  }, [article]);

  return { content, loading, error };
};

const BlogsView: React.FC = () => {
  const [selectedMeta, setSelectedMeta] = useState<ArticleMetadata | null>(null);
  const { content, loading, error } = useArticle(selectedMeta);

  const mdComponents = {
    h1: ({ children }: any) => <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-black text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100 flex items-center gap-3"><Terminal size={20} className="text-blue-500" /> {children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold text-blue-600 mt-8 mb-3">{children}</h3>,
    p: ({ children }: any) => <p className="text-slate-600 text-lg leading-relaxed mb-6 font-light">{children}</p>,
    code: ({ inline, children, className }: any) => {
      if (inline) {
        return (
          <code className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        );
      }

      return (
        <pre className="bg-slate-950 text-slate-300 p-6 rounded-2xl overflow-x-auto font-mono text-sm mb-8 border border-white/5 shadow-2xl relative">
          <div className="absolute top-3 right-3 flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-800" />
            <div className="w-2 h-2 rounded-full bg-slate-800" />
          </div>
          <code className={className}>{children}</code>
        </pre>
      );
    },
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-4 italic text-slate-500 mb-8 bg-blue-50/50 rounded-r-2xl">
        {children}
      </blockquote>
    ),
    ul: ({ children }: any) => <ul className="list-disc list-inside space-y-3 mb-8 text-slate-600 pl-4">{children}</ul>,
  };

  return (
    <div className="max-w-4xl w-full h-[85vh] py-12 px-4 flex flex-col relative">
      <AnimatePresence mode="wait">
        {!selectedMeta ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="mb-12">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <Cpu size={18} />
                <span className="font-mono text-xs tracking-[0.4em] uppercase">Knowledge log</span>
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Quick Reads</h1>
            </div>

            <div className="grid gap-4">
              {articleRegistry.map((article) => (
                <article
                  key={article.id}
                  onClick={() => setSelectedMeta(article)}
                  className="group cursor-pointer"
                >
                  <GlassCard className="!p-8 hover:border-blue-400 transition-all border-slate-100 group">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 text-blue-500 font-bold"><Hash size={12} /> {article.id}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-200" />
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {article.date}</span>
                      </div>

                      <div className="flex justify-between items-start gap-8">
                        <div className="space-y-3">
                          <h2 className="text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                            {article.title}
                          </h2>
                          <p className="text-slate-500 text-sm font-light leading-relaxed line-clamp-2 max-w-2xl">
                            {article.excerpt}
                          </p>
                        </div>
                        <div className="hidden md:flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        {article.tags.map(tag => (
                          <span key={tag} className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-400 border border-slate-100 px-2 py-1 rounded-md">
                            <Tag size={10} /> {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </article>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >

            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setSelectedMeta(null)}
                className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold uppercase tracking-widest text-[10px]"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Return to Registry
              </button>
              <div className="flex gap-4">
                <Share2 size={16} className="text-slate-300 hover:text-blue-500 cursor-pointer transition-colors" />
              </div>
            </div>

            <GlassCard className="flex-1 overflow-y-auto scrollbar-hide !p-0 border-slate-100 relative">
              {loading && (
                <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center space-y-6">
                  <div className="relative">
                    <Cpu className="text-blue-600 animate-pulse" size={48} />
                    <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full animate-ping scale-150" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-mono text-blue-600 uppercase tracking-[0.5em] mb-2">Neural Link Active</p>
                    <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="p-8 md:p-20 max-w-3xl mx-auto">
                <header className="mb-16 space-y-6">
                  <div className="flex items-center gap-6 text-[10px] font-mono text-blue-600 uppercase tracking-[0.3em]">
                    <span className="flex items-center gap-2"><Calendar size={14} /> {selectedMeta.date}</span>
                    <span className="flex items-center gap-2"><Clock size={14} /> {selectedMeta.readingTime}</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tight">
                    {selectedMeta.title}
                  </h1>
                </header>

                <div className="markdown-content">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={mdComponents}
                  >
                    {content}
                  </ReactMarkdown>
                </div>

              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogsView;