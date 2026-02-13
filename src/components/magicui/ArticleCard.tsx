import React from "react";
import { GlassCard } from "../magicui/GlassCard";
import { ArrowRight, Calendar, Hash, Tag } from "lucide-react";

interface Props {
    article: any; // Type this strictly if you prefer
    slug: string;
}

export const ArticleCard: React.FC<Props> = ({ article, slug }) => {
    return (
        <a href={`/blog/${slug}`} className="block group cursor-pointer no-underline">
            <GlassCard className="!p-8 hover:border-blue-400 transition-all border-slate-100 group">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 text-blue-500 font-bold">
                            <Hash size={12} /> {slug}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-200" />
                        <span className="flex items-center gap-1.5">
                            <Calendar size={12} /> {article.data.date}
                        </span>
                    </div>

                    <div className="flex justify-between items-start gap-8">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                                {article.data.title}
                            </h2>
                            <p className="text-slate-500 text-sm font-light leading-relaxed line-clamp-2 max-w-2xl">
                                {article.data.excerpt}
                            </p>
                        </div>
                        <div className="hidden md:flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                        {article.data.tags.map((tag: string) => (
                            <span key={tag} className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-400 border border-slate-100 px-2 py-1 rounded-md">
                                <Tag size={10} /> {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </GlassCard>
        </a>
    );
};