import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Trophy } from 'lucide-react';

interface HeroProps {
  heading: string;
  subheading: string;
  bannerUrl: string;
  ctaText: string;
  primaryColor: string;
}

export const Hero: React.FC<HeroProps> = ({ heading, subheading, bannerUrl, ctaText, primaryColor }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-slate-50">
      {/* 3D Scene Background (Stylized with SVGs/Blobs) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/5 blur-[120px] pointer-events-none"></div>
        
        {/* Floating 3D-like elements */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] w-64 h-64 opacity-20"
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill={primaryColor} d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,86.1,-0.6C85.1,14.5,79.7,29,71.4,41.4C63.1,53.8,51.9,64.1,38.8,71.2C25.7,78.3,10.7,82.2,-3.6,88.4C-17.9,94.6,-31.5,103.1,-43.8,101.4C-56.1,99.7,-67.1,87.8,-75.4,74.4C-83.7,61,-89.3,46.1,-92.4,30.8C-95.5,15.5,-96.1,-0.2,-93.1,-15.1C-90.1,-30,-83.5,-44.1,-73.2,-55.4C-62.9,-66.7,-48.9,-75.2,-34.5,-80.7C-20.1,-86.2,-5.3,-88.7,9.1,-84.3C23.5,-79.9,31.3,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 40, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[5%] w-80 h-80 opacity-10"
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill={primaryColor} d="M47.5,-67.2C59.6,-59.1,66.4,-42.1,70.6,-25.4C74.8,-8.7,76.4,7.7,72.1,22.4C67.8,37.1,57.6,50.1,44.5,58.8C31.4,67.5,15.7,71.9,0.3,71.4C-15.1,70.9,-30.2,65.5,-43.5,56.5C-56.8,47.5,-68.3,34.9,-73.1,20.1C-77.9,5.3,-76,-11.7,-68.9,-26C-61.8,-40.3,-49.5,-51.9,-36.1,-59.5C-22.7,-67.1,-8.2,-70.7,8.2,-81.9C24.6,-93.1,35.4,-75.3,47.5,-67.2Z" transform="translate(100 100)" />
          </svg>
        </motion.div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block px-5 py-2 mb-10 rounded-full bg-emerald-50 border border-emerald-100 shadow-sm"
            >
              <span className="text-xs font-extrabold uppercase tracking-[0.4em] text-emerald-600">Digital-First Education</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight mb-10 text-slate-900 leading-[0.9]"
            >
              {heading}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-slate-500 mb-16 max-w-2xl leading-relaxed font-medium"
            >
              {subheading}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 20px 40px -10px ${primaryColor}40` }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 rounded-2xl font-extrabold text-white shadow-2xl flex items-center gap-4 transition-all text-xl w-full sm:w-auto justify-center"
                style={{ backgroundColor: primaryColor }}
              >
                {ctaText}
                <ArrowRight size={28} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.9)' }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 rounded-2xl font-extrabold text-slate-700 bg-white/60 backdrop-blur-xl border border-slate-200 shadow-xl transition-all text-xl w-full sm:w-auto justify-center"
              >
                Virtual Tour
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-[12px] border-white">
              <img 
                src={bannerUrl} 
                alt="School Hero" 
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* 3D-like floating card */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl shadow-2xl border-white/20 z-20 max-w-xs"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  <Trophy size={24} />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Achievement</p>
                  <p className="text-lg font-extrabold text-slate-900">#1 Digital School</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Recognized for excellence in AI-integrated education and student success.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
