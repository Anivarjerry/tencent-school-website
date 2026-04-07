import React from 'react';
import { motion } from 'motion/react';
import { Bell, Calendar, ArrowRight } from 'lucide-react';
import { WebsiteNotice } from '../types';

interface NoticesProps {
  notices: WebsiteNotice[];
  primaryColor: string;
}

export const Notices: React.FC<NoticesProps> = ({ notices, primaryColor }) => {
  if (notices.length === 0) return null;

  return (
    <section id="notices" className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 mb-8"
              >
                <Bell size={18} className="animate-bounce" />
                <span className="text-xs font-extrabold uppercase tracking-widest">Live Updates</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 mb-8 leading-tight">
                Stay ahead with <span className="text-emerald-600">real-time</span> campus news.
              </h2>
              
              <p className="text-lg text-slate-500 font-medium mb-10 leading-relaxed">
                Our digital notice board ensures you never miss an important update, from academic schedules to extracurricular events.
              </p>

              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-extrabold text-slate-400 uppercase tracking-widest">
                  Joined by <span className="text-slate-900">2,400+</span> parents
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass p-8 md:p-12 rounded-[3rem] border-slate-100 shadow-2xl shadow-emerald-500/5 max-h-[600px] overflow-y-auto custom-scrollbar"
            >
              <div className="space-y-8">
                {notices.map((notice, index) => (
                  <motion.div
                    key={notice.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative pl-10 pb-8 border-l-2 border-slate-100 last:pb-0 last:border-l-0"
                  >
                    {/* Timeline dot */}
                    <div 
                      className="absolute left-[-9px] top-0 w-4 h-4 rounded-full border-4 border-white shadow-md transition-transform duration-500 group-hover:scale-150"
                      style={{ backgroundColor: primaryColor }}
                    ></div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                        {new Date(notice.published_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                      <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                        New
                      </div>
                    </div>

                    <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                      {notice.title}
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      {notice.content}
                    </p>
                    
                    <div className="mt-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <button className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                        View Details <ArrowRight size={16} className="text-emerald-500" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
