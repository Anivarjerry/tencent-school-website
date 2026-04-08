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
    <section id="gallery" className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 mb-8"
          >
            <span className="text-xs font-black uppercase tracking-widest">Visual Journey</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Campus Life</h2>
          <p className="text-lg text-slate-500 font-medium">
            Explore the vibrant and diverse experiences of our students through our digital gallery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={cn(
                "group relative overflow-hidden rounded-[var(--radius-section)] bg-slate-100 shadow-[var(--premium-shadow)]",
                index % 4 === 0 ? "lg:col-span-2 aspect-[16/9]" : "aspect-[4/5]"
              )}
            >
              <img
                src={image.image_url}
                alt={image.caption || 'Gallery image'}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                {image.caption && (
                  <p className="text-white font-bold text-xl mb-2">{image.caption}</p>
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
