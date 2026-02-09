import React, { useState } from "react";
import { GlassCard } from "../magicui/GlassCard";
import { Send, Mail, MapPin } from "lucide-react";
import { AvatarCircles } from "../magicui/AvatarCircles";
import { Globe } from "../magicui/Globe";
import { Terminal, AnimatedSpan, TypingAnimation } from "../magicui/Terminal";
import { MorphingText } from "../magicui/MorphingText";

const avatars = [
    { imageUrl: "https://avatars.githubusercontent.com/u/16860528", profileUrl: "https://github.com/gediont" },
    { imageUrl: "https://avatars.githubusercontent.com/u/20110627", profileUrl: "https://github.com/tomonarifeehan" },
    { imageUrl: "https://avatars.githubusercontent.com/u/106103625", profileUrl: "https://github.com/BankkRoll" },
    { imageUrl: "https://avatars.githubusercontent.com/u/59228569", profileUrl: "https://github.com/safethecode" },
    { imageUrl: "https://avatars.githubusercontent.com/u/59442788", profileUrl: "https://github.com/sanjay-mali" },
    { imageUrl: "https://avatars.githubusercontent.com/u/89768406", profileUrl: "https://github.com/itsarghyadas" },
];

const morphTexts = [
    "Connected",
    "Scalable",
    "Intelligent",
    "Efficient",
    "Distributed",
];


const ContactView: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => setStatus('sent'), 1500);
    };

    return (
        <div className="max-w-6xl w-full py-12 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Left Column: Form and Social Proof */}
                <div className="space-y-8">
                    <GlassCard className="border-slate-100 !p-8 h-full">
                        <h2 className="text-3xl font-black mb-6 text-slate-900">Contact</h2>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    Whether you're looking to architect a new AI system or scale your distributed backend, or
                                    integrate ambient intelligence in your legacy platform my terminal is always open for communication.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-3 text-slate-600 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                                        <Mail size={16} className="text-blue-600" />
                                        <span className="text-xs font-mono">contact@gedion.dev</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                                        <MapPin size={16} className="text-pink-600" />
                                        <span className="text-xs font-mono">Global</span>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Identity" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400" />
                                    <input type="email" placeholder="Email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400" />
                                </div>
                                <textarea rows={4} placeholder="Message" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 resize-none" />

                                <button
                                    disabled={status !== 'idle'}
                                    className="w-full bg-slate-900 text-white font-black py-4 rounded-xl shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                                >
                                    {status === 'idle' && <>Send Message <Send size={16} /></>}
                                    {status === 'sending' && 'Transmitting...'}
                                    {status === 'sent' && 'Transmission Success'}
                                </button>
                            </form>

                            <div className="pt-6 border-t border-slate-100">
                                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-4">Trusted by 100+ Network Entities</p>
                                <AvatarCircles numPeople={99} avatarUrls={avatars} />
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Right Column: Globe and Terminal */}
                <div className="space-y-6 flex flex-col">
                    <GlassCard className="flex-1 !p-0 border-slate-100 overflow-hidden relative min-h-[300px]">
                        <Globe className="opacity-80" />
                        <MorphingText texts={morphTexts} className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter" />
                    </GlassCard>

                    <Terminal>
                        <TypingAnimation delay={0.5}>&gt; initializing gedion-disassa-init --env production</TypingAnimation>
                        <AnimatedSpan className="text-emerald-500" delay={1.5}>✔ Neural engines online.</AnimatedSpan>
                        <AnimatedSpan className="text-emerald-500" delay={1.7}>✔ Distributed architecture verified.</AnimatedSpan>
                        <AnimatedSpan className="text-emerald-500" delay={1.9}>✔ AI agent mesh established.</AnimatedSpan>
                        <AnimatedSpan className="text-blue-500" delay={2.5}>
                            <span>ℹ Current Status:</span>
                            <span className="pl-2">Ready for deployment.</span>
                        </AnimatedSpan>
                        <TypingAnimation className="text-slate-500" delay={3.5}>
                            Standing by for incoming transmission...
                        </TypingAnimation>
                    </Terminal>
                </div>
            </div>
        </div>
    );
};

export default ContactView;