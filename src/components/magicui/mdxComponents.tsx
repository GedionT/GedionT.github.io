import { Terminal } from 'lucide-react';

export const mdxComponents = {
    h1: ({ children }: any) => <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-black text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100 flex items-center gap-3"><Terminal size={20} className="text-blue-500" /> {children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold text-blue-600 mt-8 mb-3">{children}</h3>,
    p: ({ children }: any) => <p className="text-slate-600 text-lg leading-relaxed mb-6 font-light">{children}</p>,
    code: ({ inline, children, className }: any) => {
        const match = /language-(\w+)/.exec(className || "");
        const language = match?.[1];

        if (inline) {
            return (
                <code className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-sm font-mono">
                    {children}
                </code>
            );
        }

        return (
            <pre className="bg-slate-950 text-slate-300 p-6 rounded-2xl overflow-x-auto font-mono text-sm mb-8 border border-white/5 shadow-2xl relative">
                {language && (
                    <span className="absolute top-3 left-4 text-xs uppercase tracking-wider text-slate-500">
                        {language}
                    </span>
                )}
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
    li: ({ children }: any) => (
        <li className="pl-2 marker:text-blue-500">
            {children}
        </li>
    ),
    ol: ({ children }: any) => (
        <ol className="list-decimal list-inside space-y-3 mb-8 text-slate-600 pl-4">
            {children}
        </ol>
    ),
    table: ({ children }: any) => (
        <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse text-left text-sm">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }: any) => (
        <thead className="bg-slate-100 text-slate-700">
            {children}
        </thead>
    ),
    th: ({ children }: any) => (
        <th className="px-4 py-3 font-semibold">
            {children}
        </th>
    ),
    td: ({ children }: any) => (
        <td className="px-4 py-3 border-t border-slate-100">
            {children}
        </td>
    ),

};