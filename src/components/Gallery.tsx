import React from 'react';
import { motion } from 'motion/react';
import { WebsiteGallery } from '../types';
import { cn } from '../lib/utils';

interface GalleryProps {
  images: WebsiteGallery[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  if (images.length === 0) return null;

  return (
    <section id="gallery" className="section-padding bg-slate-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]"></div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-emerald-400 border border-white/10 mb-8"
          >
            <span className="text-xs font-extrabold uppercase tracking-widest">Showreel</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-6">Digital Campus Life</h2>
          <p className="text-lg text-slate-400 font-medium">
            A glimpse into the vibrant and innovative environment at our digital-first campus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-[2.5rem] bg-slate-900 aspect-[4/5]",
                index % 3 === 0 ? "md:col-span-2 md:aspect-[16/10]" : ""
              )}
            >
              <img
                src={image.image_url}
                alt={image.caption || 'Gallery image'}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                {image.caption && (
                  <p className="text-white font-extrabold text-xl mb-2">{image.caption}</p>
                )}
                <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
