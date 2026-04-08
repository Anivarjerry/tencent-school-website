import React from 'react';
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
  const { content, config } = settings;

  return (
    <div className="min-h-screen selection:bg-emerald-100 selection:text-emerald-900" style={{ fontFamily: config.font_family }}>
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4">
          <div className="glass border-red-100 rounded-2xl p-4 flex items-center gap-3 shadow-2xl">
            <AlertCircle className="text-red-500 shrink-0" size={24} />
            <p className="text-red-700 text-sm font-bold">{error}</p>
          </div>
        </div>
      )}

      <Navbar 
        schoolName={content.header.title} 
        primaryColor={config.primary_color}
      />

      <main>
        <Hero 
          heading={content.hero.heading}
          subheading={content.hero.subheading}
          bannerUrl={content.hero.banner_url}
          ctaText={content.hero.cta_text}
          primaryColor={config.primary_color}
        />

        <Highlights items={content.highlights} />

        <About content={content.about.content} imageUrl={content.about.image_url} />

        <Facilities 
          items={content.facilities}
          primaryColor={config.primary_color}
        />

        <Gallery images={gallery} />

        <Notices notices={notices} primaryColor={config.primary_color} />

        <AdmissionForm 
          fields={content.form_config}
          primaryColor={config.primary_color}
          schoolId={settings.school_id}
        />

        <Contact 
          address={content.contact.address}
          phone={content.contact.phone}
          email={content.contact.email}
          primaryColor={config.primary_color}
        />
      </main>

      <Footer 
        schoolName={content.header.title}
        footerText={content.footer.text}
        primaryColor={config.primary_color}
      />
    </div>
  );
};
