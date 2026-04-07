import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  schoolName: string;
  primaryColor: string;
}

export const Navbar: React.FC<NavbarProps> = ({ schoolName, primaryColor }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Notices', href: '#notices' },
    { label: 'Admission', href: '#admission' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4',
        isScrolled ? 'py-3' : 'py-6'
      )}
    >
      <div className={cn(
        'container-custom mx-auto transition-all duration-500 rounded-[2rem] border',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-2xl border-white/20 shadow-2xl shadow-slate-900/5 px-8' 
          : 'bg-transparent border-transparent px-4'
      )}>
        <div className="flex items-center justify-between h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-lg group-hover:rotate-12 transition-transform duration-500"
              style={{ backgroundColor: primaryColor }}
            >
              {schoolName.charAt(0)}
            </div>
            <span className={cn(
              "font-display font-extrabold text-2xl tracking-tight transition-colors duration-300",
              isScrolled ? "text-slate-900" : "text-slate-900"
            )}>
              {schoolName}
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "text-sm font-extrabold uppercase tracking-widest transition-all hover:scale-110",
                  isScrolled ? "text-slate-600 hover:text-slate-900" : "text-slate-600 hover:text-slate-900"
                )}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl font-extrabold text-white shadow-lg transition-all text-sm uppercase tracking-widest"
              style={{ backgroundColor: primaryColor }}
            >
              Portal Login
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-3 rounded-xl bg-slate-100 text-slate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-24 left-6 right-6 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 lg:hidden z-50"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-extrabold text-slate-900 hover:text-emerald-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-slate-100" />
              <button 
                className="w-full py-4 rounded-2xl font-extrabold text-white shadow-xl"
                style={{ backgroundColor: primaryColor }}
              >
                Portal Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
