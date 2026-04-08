import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MousePointer2 } from 'lucide-react';

interface HeroProps {
  heading: string;
  subheading: string;
  bannerUrl: string;
  ctaText: string;
  primaryColor: string;
}

export const Hero: React.FC<HeroProps> = ({ heading, subheading, bannerUrl, ctaText, primaryColor }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Parallax Background */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-slate-950/40 z-10"></div>
        <img 
          src={bannerUrl} 
          alt="School Campus" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="container-custom relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Admissions Open 2026-27</span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight">
            {heading.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="inline-block mr-4 last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl md:text-2xl text-white/80 font-medium mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: ["0 0 0 0px rgba(16, 185, 129, 0)", "0 0 0 20px rgba(16, 185, 129, 0)"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="btn-primary px-10 py-5 text-lg"
              style={{ backgroundColor: primaryColor }}
            >
              {ctaText}
              <ArrowRight size={24} />
            </motion.button>
            
            <button className="btn-secondary px-10 py-5 text-lg bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20">
              Virtual Tour
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Scroll to Explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
};
