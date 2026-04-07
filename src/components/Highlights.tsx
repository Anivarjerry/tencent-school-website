import React from 'react';
import { motion } from 'motion/react';

interface HighlightsProps {
  items: string[];
}

export const Highlights: React.FC<HighlightsProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-slate-900 py-6 overflow-hidden border-y border-white/10">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex gap-12 items-center"
        >
          {[...items, ...items, ...items].map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-white font-extrabold uppercase tracking-[0.2em] text-sm">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
