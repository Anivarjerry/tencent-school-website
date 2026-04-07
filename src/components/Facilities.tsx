import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';

interface FacilitiesProps {
  items: { id: string; label: string; icon: string; enabled: boolean }[];
  primaryColor: string;
}

export const Facilities: React.FC<FacilitiesProps> = ({ items, primaryColor }) => {
  const enabledItems = items.filter(item => item.enabled);
  if (enabledItems.length === 0) return null;

  return (
    <section id="facilities" className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 mb-6"
          >
            <span className="text-xs font-extrabold uppercase tracking-widest">Infrastructure</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 mb-6">World-Class Facilities</h2>
          <p className="text-lg text-slate-500 font-medium">
            Our campus is equipped with state-of-the-art infrastructure to support a holistic and digital-first learning experience.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {enabledItems.map((item, index) => {
            const IconComponent = (Icons as any)[item.icon] || Icons.HelpCircle;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 text-center"
              >
                <div 
                  className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                  style={{ backgroundColor: primaryColor }}
                >
                  <IconComponent size={40} strokeWidth={1.5} />
                </div>
                <h4 className="text-2xl font-display font-extrabold text-slate-900 mb-3">{item.label}</h4>
                <div className="w-10 h-1 bg-slate-100 mx-auto rounded-full group-hover:w-20 group-hover:bg-emerald-500 transition-all duration-500"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
