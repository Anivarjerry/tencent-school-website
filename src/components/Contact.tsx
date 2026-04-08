import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface ContactProps {
  address: string;
  phone: string;
  email: string;
  primaryColor: string;
}

export const Contact: React.FC<ContactProps> = ({ address, phone, email, primaryColor }) => {
  return (
    <section id="contact" className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-600 border border-slate-200 mb-8 shadow-sm">
              <span className="text-xs font-black uppercase tracking-widest">Contact Us</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-10 leading-tight">
              Let's start a <span className="text-emerald-600">conversation.</span>
            </h2>
            
            <div className="space-y-8">
              {[
                { icon: MapPin, title: 'Our Campus', value: address },
                { icon: Phone, title: 'Call Us', value: phone },
                { icon: Mail, title: 'Email Us', value: email }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-md"
                    style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}
                  >
                    <item.icon size={28} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-xl font-black text-slate-900 leading-relaxed">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-all duration-300 shadow-sm"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[var(--radius-section)] overflow-hidden shadow-[var(--premium-shadow)] border-8 border-white aspect-square">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110123.456789!2d74.29!3d29.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3911adb!2sHanumangarh%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1234567890" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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
