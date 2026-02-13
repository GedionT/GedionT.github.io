import React from "react";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { GlassCard } from "../magicui/GlassCard";

interface Props {
    title: string;
    date: string;
    readingTime: string;
    children: React.ReactNode;
}


const BlogPostView: React.FC<Props> = ({
    children,
    title,
    date,
    readingTime,
}) => {

    return (
        <div className="max-w-6xl w-full h-[85vh] py-5 px-4 flex flex-col relative">

            {/* Top Bar */}
            <div className="flex items-center justify-between mb-5">
                <a
                    href="/blog"
                    className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold uppercase tracking-widest text-[10px]"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Return to Registry
                </a>

                <Share2 size={16} className="text-slate-300 hover:text-blue-500 cursor-pointer transition-colors" />
            </div>

            <GlassCard className="flex-1 overflow-y-auto scrollbar-hide !p-0 border-slate-100 relative">
                <div className="p-4 md:p-10 max-w-2xl mx-auto">

                    <header className="mb-16 space-y-6">
                        <div className="flex items-center gap-6 text-[10px] font-mono text-blue-600 uppercase tracking-[0.3em]">
                            <span className="flex items-center gap-2">
                                <Calendar size={14} /> {date}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={14} /> {readingTime}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[0.9] tracking-tight">
                            {title}
                        </h1>
                    </header>


                    <div className="prose prose-slate max-w-none prose-lg">
                        {children}
                    </div>


                </div>
            </GlassCard >
        </div >
    );
};

export default BlogPostView;
