
import React from 'react';
import type { CareerEvent } from '../../types';
import { MapPin, Briefcase } from 'lucide-react';

interface TimelineItemProps {
    event: CareerEvent;
    isLast: boolean;
    index: number;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ event, isLast, index }) => {
    return (
        <div className="relative pl-10 pb-12 group last:pb-0">
            {/* Vertical Connector Line */}
            {!isLast && (
                <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500/50 to-emerald-100/10" />
            )}

            {/* Timeline Bullet */}
            <div className="absolute left-0 top-0 w-8 h-8 flex items-center justify-center">
                <div className="z-10 w-4 h-4 rounded-full border-4 border-white bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-transform duration-300 group-hover:scale-125" />
            </div>

            {/* Content Container */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Logo Section */}
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white p-2 shadow-sm border border-slate-100 flex items-center justify-center transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                    <img
                        src={event.logo}
                        alt={event.organization}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${index}/100/100`;
                        }}
                    />
                </div>

                {/* Text Section */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 mb-1">
                        <span className="font-mono text-sm font-bold text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded">
                            {event.year}
                        </span>
                        <h4 className="text-xl font-bold text-slate-800 tracking-tight">
                            {event.title}
                        </h4>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 mb-3">
                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                            <Briefcase size={14} className="text-emerald-500" />
                            {event.organization}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <MapPin size={14} />
                            {event.location}
                        </span>
                    </div>

                    <p className="text-slate-600 leading-relaxed max-w-2xl mb-4">
                        {event.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {event.tags?.map((tag) => (
                            <span
                                key={tag}
                                className="text-[10px] uppercase tracking-wider font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-md transition-colors hover:bg-emerald-100 hover:text-emerald-700 cursor-default"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
