import React from 'react';
import { motion } from 'motion/react';

interface AboutProps {
  content: string;
  imageUrl: string;
}

export const About: React.FC<AboutProps> = ({ content, imageUrl }) => {
  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 mb-8">
              <span className="text-xs font-black uppercase tracking-widest">Our Legacy</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
              Shaping the <span className="text-emerald-600">future</span> of digital education.
            </h2>
            <div 
              className="rich-text text-lg"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-4xl font-black text-slate-900 mb-2">25+</h4>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Years of Excellence</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-slate-900 mb-2">5000+</h4>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Global Alumni</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
            className="relative"
          >
            <div className="relative z-10 rounded-[var(--radius-section)] overflow-hidden shadow-[var(--premium-shadow)] border-8 border-white">
              <img 
                src={imageUrl} 
                alt="About School" 
                className="w-full h-full object-cover aspect-[4/5]"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
