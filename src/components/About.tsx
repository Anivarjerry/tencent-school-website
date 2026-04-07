import React from 'react';
import { motion } from 'motion/react';

interface AboutProps {
  content: string;
  imageUrl: string;
}

export const About: React.FC<AboutProps> = ({ content, imageUrl }) => {
  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-0 right-0 text-[20rem] font-display font-black text-slate-50 select-none pointer-events-none -translate-y-1/4 translate-x-1/4">
        ABOUT
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-700">
              <img 
                src={imageUrl} 
                alt="School Campus" 
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <div className="glass p-6 rounded-2xl border-white/20">
                  <p className="text-white font-extrabold text-xl">Founded on Excellence</p>
                  <p className="text-white/80 text-sm font-medium">Est. 1995 • Hanumangarh</p>
                </div>
              </div>
            </div>
            
            {/* Decorative slanted box */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-[2rem] -z-10 rotate-12"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-indigo-500/10 rounded-[3rem] -z-10 -rotate-12"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              <span className="text-xs font-extrabold uppercase tracking-widest">Our Vision</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 mb-10 leading-tight">
              Crafting the future of <span className="text-emerald-600">digital education.</span>
            </h2>
            
            <div 
              className="prose prose-lg prose-slate max-w-none font-medium text-slate-500 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="grid grid-cols-2 gap-10 mt-16">
              <div>
                <h4 className="text-4xl font-display font-black text-slate-900 mb-2">25+</h4>
                <p className="text-sm font-extrabold uppercase tracking-widest text-slate-400">Years of Legacy</p>
              </div>
              <div>
                <h4 className="text-4xl font-display font-black text-slate-900 mb-2">5k+</h4>
                <p className="text-sm font-extrabold uppercase tracking-widest text-slate-400">Alumni Worldwide</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
