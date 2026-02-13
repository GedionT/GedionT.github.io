import React from "react";
import { Cpu, Calendar, Hash, Tag, ArrowRight } from "lucide-react";
import { GlassCard } from "../magicui/GlassCard";
import type { ArticleMetadata } from "../../types";

interface Props {
    articles: ArticleMetadata[];
}

const BlogListView: React.FC<Props> = ({ articles }) => {
    return (
        <div className="max-w-4xl w-full h-[85vh] py-12 px-4 flex flex-col relative">

            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 text-blue-600 mb-2">
                    <Cpu size={18} />
                    <span className="font-mono text-xs tracking-[0.4em] uppercase">
                        Knowledge log
                    </span>
                </div>

                <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
                    Quick Reads
                </h1>
            </div>

            {/* Article Grid */}
            <div className="grid gap-4 overflow-y-auto pr-1 scrollbar-hide">
                {articles.map((article) => (
                    <a
                        key={article.id}
                        href={`/blog/${article.slug}`}
                        className="group"
                    >
                        <GlassCard className="!p-8 hover:border-blue-400 transition-all border-slate-100 group">

                            <div className="flex flex-col gap-4">

                                {/* Meta Row */}
                                <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5 text-blue-500 font-bold">
                                        <Hash size={12} /> {article.id}
                                    </span>

                                    <span className="h-1 w-1 rounded-full bg-slate-200" />

                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={12} /> {article.date}
                                    </span>
                                </div>

                                {/* Title + Excerpt */}
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

                                {/* Tags */}
                                <div className="flex gap-2 pt-4">
                                    {article.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-400 border border-slate-100 px-2 py-1 rounded-md"
                                        >
                                            <Tag size={10} /> {tag}
                                        </span>
                                    ))}
                                </div>

                            </div>

                        </GlassCard>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default BlogListView;
