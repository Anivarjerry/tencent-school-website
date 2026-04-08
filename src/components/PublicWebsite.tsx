import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Highlights } from './Highlights';
import { About } from './About';
import { Facilities } from './Facilities';
import { Gallery } from './Gallery';
import { Notices } from './Notices';
import { AdmissionForm } from './AdmissionForm';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { SchoolData } from '../types';
import { AlertCircle } from 'lucide-react';

interface PublicWebsiteProps {
  data: SchoolData;
  error: string | null;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({ data, error }) => {
  const { settings, gallery, notices } = data;
  const { published_content, core_config } = settings;

  useEffect(() => {
    if (core_config.primary_color) {
      document.documentElement.style.setProperty('--primary-color', core_config.primary_color);
    }
  }, [core_config.primary_color]);

  return (
    <div className="min-h-screen selection:bg-emerald-100 selection:text-emerald-900" style={{ fontFamily: core_config.font_family }}>
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4">
          <div className="glass border-red-100 rounded-2xl p-4 flex items-center gap-3 shadow-2xl">
            <AlertCircle className="text-red-500 shrink-0" size={24} />
            <p className="text-red-700 text-sm font-bold">{error}</p>
          </div>
        </div>
      )}

      <Navbar 
        schoolName={published_content.header.title} 
        primaryColor={core_config.primary_color}
      />

      <main>
        <Hero 
          heading={published_content.hero.heading}
          subheading={published_content.hero.subheading}
          bannerUrl={published_content.hero.banner_url}
          ctaText={published_content.hero.cta_text}
          primaryColor={core_config.primary_color}
        />

        <Highlights items={published_content.highlights} />

        <About content={published_content.about.content} imageUrl={published_content.about.image_url} />

        <Facilities 
          items={published_content.facilities}
          primaryColor={core_config.primary_color}
        />

        <Gallery images={gallery} />

        <Notices notices={notices} primaryColor={core_config.primary_color} />

        <AdmissionForm 
          fields={published_content.form_config}
          primaryColor={core_config.primary_color}
          schoolId={settings.school_id}
        />

        <Contact 
          address={published_content.contact.address}
          phone={published_content.contact.phone}
          email={published_content.contact.email}
          primaryColor={core_config.primary_color}
        />
      </main>

      <Footer 
        schoolName={published_content.header.title}
        footerText={published_content.footer.text}
        primaryColor={core_config.primary_color}
      />
    </div>
  );
};
