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
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-600 border border-slate-200 mb-8 shadow-sm">
                <Bell size={18} className="text-emerald-500 animate-bounce" />
                <span className="text-xs font-black uppercase tracking-widest">Digital Notice Board</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
                Stay updated with <span className="text-emerald-600">real-time</span> campus news.
              </h2>
              
              <p className="text-lg text-slate-500 font-medium mb-10 leading-relaxed">
                Our digital-first approach ensures that parents and students are always informed about the latest happenings, schedules, and achievements.
              </p>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  Trusted by <span className="text-slate-900">1,500+</span> parents
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-8 md:p-12 rounded-[var(--radius-section)] shadow-[var(--premium-shadow)] max-h-[600px] overflow-y-auto custom-scrollbar"
            >
              <div className="space-y-10">
                {notices.map((notice, index) => (
                  <motion.div
                    key={notice.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative pl-10 pb-10 border-l-2 border-slate-100 last:pb-0 last:border-l-0"
                  >
                    {/* Timeline dot */}
                    <div 
                      className="absolute left-[-9px] top-0 w-4 h-4 rounded-full border-4 border-white shadow-md transition-transform duration-500 group-hover:scale-150"
                      style={{ backgroundColor: primaryColor }}
                    ></div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                        <Calendar size={14} />
                        {new Date(notice.published_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                        Latest
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
                      {notice.title}
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      {notice.content}
                    </p>
                    
                    <div className="mt-6">
                      <button className="text-sm font-black text-slate-900 flex items-center gap-2 group/btn">
                        Read More 
                        <ArrowRight size={16} className="text-emerald-500 transition-transform group-hover/btn:translate-x-1" />
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
