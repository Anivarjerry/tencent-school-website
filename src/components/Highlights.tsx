import React from 'react';
import { motion } from 'motion/react';

interface HighlightsProps {
  items: string[];
}

export const Highlights: React.FC<HighlightsProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-slate-950 py-10 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] pointer-events-none"></div>

      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex gap-12 items-center"
        >
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-6">
              <span className="text-2xl md:text-4xl font-black text-white/90 tracking-tight uppercase">
                {item}
              </span>
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
