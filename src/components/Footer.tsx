import React from 'react';
import { ArrowRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  schoolName: string;
  footerText: string;
  primaryColor: string;
}

export const Footer: React.FC<FooterProps> = ({ schoolName, footerText, primaryColor }) => {
  return (
    <footer className="bg-white pt-32 pb-12 border-t border-slate-100 overflow-hidden relative">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div 
                className="w-12 h-12 rounded-[var(--radius-el)] flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: primaryColor }}
              >
                <span className="text-2xl font-black">{schoolName.charAt(0)}</span>
              </div>
              <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">{schoolName}</h2>
            </div>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md mb-10">
              Empowering the next generation with digital-first education and global standards. Join us in shaping the future of learning.
            </p>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                AI Integrated
              </div>
              <div className="px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                Global Curriculum
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Facilities', 'Gallery', 'Notices', 'Admission'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-slate-500 hover:text-emerald-600 transition-colors font-bold flex items-center gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-emerald-500 transition-colors"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-8">Newsletter</h4>
            <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">
              Subscribe to stay updated with our latest news and events.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-slate-50 border border-slate-100 rounded-[var(--radius-el)] px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-emerald-500 transition-all w-full"
              />
              <button 
                className="p-3 rounded-[var(--radius-el)] text-white shadow-lg shrink-0"
                style={{ backgroundColor: primaryColor }}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-slate-400 text-sm font-medium">
            {footerText}
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors text-sm font-medium">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors text-sm font-medium">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
