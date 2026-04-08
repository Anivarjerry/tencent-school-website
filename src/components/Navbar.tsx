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
        'container-custom mx-auto transition-all duration-500 rounded-[var(--radius-el)] border',
        isScrolled 
          ? 'glass shadow-[var(--premium-shadow)] px-8' 
          : 'bg-transparent border-transparent px-4'
      )}>
        <div className="flex items-center justify-between h-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div 
              className="w-10 h-10 rounded-[var(--radius-el)] flex items-center justify-center text-white font-black text-xl shadow-lg transition-transform duration-500 group-hover:rotate-12"
              style={{ backgroundColor: primaryColor }}
            >
              {schoolName.charAt(0)}
            </div>
            <span className="font-display font-black text-xl tracking-tight text-slate-900">
              {schoolName}
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary py-2 px-6 text-sm"
              style={{ backgroundColor: primaryColor }}
            >
              Apply Now
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 rounded-[var(--radius-el)] bg-slate-100 text-slate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-24 left-6 right-6 glass rounded-[var(--radius-section)] p-8 lg:hidden z-50 shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-slate-100" />
              <button 
                className="btn-primary w-full"
                style={{ backgroundColor: primaryColor }}
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
