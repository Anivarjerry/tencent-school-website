import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { cn } from '../lib/utils';

interface FacilitiesProps {
  items: { id: string; label: string; icon: string; enabled: boolean }[];
  primaryColor: string;
}

export const Facilities: React.FC<FacilitiesProps> = ({ items, primaryColor }) => {
  const enabledItems = items.filter(item => item.enabled);
  if (enabledItems.length === 0) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="facilities" className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-600 border border-slate-200 mb-8 shadow-sm"
          >
            <span className="text-xs font-black uppercase tracking-widest">Infrastructure</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">World-Class Campus</h2>
          <p className="text-lg text-slate-500 font-medium">
            Equipped with state-of-the-art facilities to foster innovation, creativity, and academic excellence.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {enabledItems.map((item) => {
            const IconComponent = (Icons as any)[item.icon] || Icons.HelpCircle;
            
            return (
              <motion.div
                key={item.id}
                variants={itemAnim}
                whileHover={{ y: -10, scale: 1.05 }}
                className="premium-card p-8 text-center group"
              >
                <div 
                  className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:rotate-12"
                  style={{ backgroundColor: primaryColor }}
                >
                  <IconComponent size={32} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3">{item.label}</h4>
                <div className="w-8 h-1 bg-slate-100 mx-auto rounded-full group-hover:w-16 group-hover:bg-emerald-500 transition-all duration-500"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
