import { useState, useEffect } from 'react';
import { getSupabaseClient } from './lib/supabase';
import { getSubdomain } from './lib/utils';
import { SchoolData, WebsiteSettings, WebsiteGallery, WebsiteNotice } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Highlights } from './components/Highlights';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Notices } from './components/Notices';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Facilities } from './components/Facilities';
import { AdmissionForm } from './components/AdmissionForm';
import { AlertCircle } from 'lucide-react';

const DEFAULT_SETTINGS: WebsiteSettings = {
  id: 'default',
  school_id: 'default',
  content: {
    header: {
      title: 'VidyaSetu AI Digital School',
      logo_url: ''
    },
    hero: {
      heading: 'Empowering the Next Generation of Digital Learners',
      subheading: 'Experience the future of education with AI-integrated learning and modern infrastructure in Hanumangarh, Rajasthan.',
      banner_url: 'https://picsum.photos/seed/school-hero/1920/1080',
      cta_text: 'Apply Now'
    },
    about: {
      content: '<p>VidyaSetu AI Digital School is at the forefront of educational transformation. We believe in empowering students through technology and modern pedagogical approaches.</p><p>Our mission is to provide accessible, high-quality digital education that prepares students for the challenges of the 21st century.</p>',
      image_url: 'https://picsum.photos/seed/school-about/800/1000'
    },
    highlights: ["Smart Classes", "100% Result", "Robotics Lab", "Digital Library", "Sports Excellence"],
    facilities: [
      { id: '1', label: 'Smart Classrooms', icon: 'Monitor', enabled: true },
      { id: '2', label: 'Robotics Lab', icon: 'Cpu', enabled: true },
      { id: '3', label: 'Digital Library', icon: 'Library', enabled: true },
      { id: '4', label: 'Sports Arena', icon: 'Trophy', enabled: true },
      { id: '5', label: 'Science Lab', icon: 'Microscope', enabled: true },
      { id: '6', label: 'Music Studio', icon: 'Music', enabled: true },
    ],
    events: [
      { image_url: 'https://picsum.photos/seed/event1/800/600', caption: 'Annual Day 2025', date: '2025-02-15' },
      { image_url: 'https://picsum.photos/seed/event2/800/600', caption: 'Science Fair', date: '2025-03-10' },
    ],
    form_config: [
      { id: 'student_name', label: 'Student Name', enabled: true },
      { id: 'parent_name', label: 'Parent Name', enabled: true },
      { id: 'email', label: 'Email Address', enabled: true },
      { id: 'phone', label: 'Phone Number', enabled: true },
      { id: 'grade', label: 'Grade Applying For', enabled: true },
      { id: 'message', label: 'Additional Message', enabled: true },
    ],
    contact: {
      phone: '+91 98765 43210',
      email: 'info@vidyasetu.ai',
      address: 'Hanumangarh, Rajasthan, India (Pin: 335512)'
    },
    footer: {
      text: '© 2026 VidyaSetu AI Digital School. All rights reserved.'
    }
  },
  config: {
    primary_color: '#10b981',
    font_family: 'Inter'
  }
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);

  useEffect(() => {
    async function fetchSchoolData() {
      try {
        setLoading(true);
        const subdomain = getSubdomain();
        const supabase = getSupabaseClient();
        
        if (!subdomain || !supabase) {
          setSchoolData({
            settings: DEFAULT_SETTINGS,
            gallery: [],
            notices: []
          });
          setLoading(false);
          return;
        }

        // 1. Find school_id from schools_auth
        const { data: authData, error: authError } = await supabase
          .from('schools_auth')
          .select('school_id')
          .eq('subdomain', subdomain)
          .single();

        if (authError || !authData) {
          setSchoolData({
            settings: DEFAULT_SETTINGS,
            gallery: [],
            notices: []
          });
          setLoading(false);
          return;
        }

        const schoolId = authData.school_id;

        // 2. Fetch all data in parallel
        const [settingsRes, galleryRes, noticesRes] = await Promise.all([
          supabase.from('website_settings').select('*').eq('school_id', schoolId).single(),
          supabase.from('website_gallery').select('*').eq('school_id', schoolId).order('order_index', { ascending: true }),
          supabase.from('website_notices').select('*').eq('school_id', schoolId).eq('is_active', true).order('published_at', { ascending: false })
        ]);

        if (settingsRes.error || !settingsRes.data) {
          setSchoolData({
            settings: DEFAULT_SETTINGS,
            gallery: (galleryRes.data || []) as WebsiteGallery[],
            notices: (noticesRes.data || []) as WebsiteNotice[]
          });
        } else {
          setSchoolData({
            settings: settingsRes.data as WebsiteSettings,
            gallery: (galleryRes.data || []) as WebsiteGallery[],
            notices: (noticesRes.data || []) as WebsiteNotice[]
          });
        }

      } catch (err: any) {
        console.error('Error fetching school data:', err);
        setError(err.message || 'Failed to load school website');
        setSchoolData({
          settings: DEFAULT_SETTINGS,
          gallery: [],
          notices: []
        });
      } finally {
        setLoading(false);
      }
    }

    fetchSchoolData();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-50 gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-emerald-100 rounded-full"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-display font-extrabold text-slate-900 mb-2">VidyaSetu AI</h2>
          <p className="text-slate-500 font-medium animate-pulse">Initializing Digital Campus...</p>
        </div>
      </div>
    );
  }

  const data = schoolData || { settings: DEFAULT_SETTINGS, gallery: [], notices: [] };
  const { settings, gallery, notices } = data;
  const { content, config } = settings;

  return (
    <div className="min-h-screen selection:bg-emerald-100 selection:text-emerald-900" style={{ fontFamily: config.font_family }}>
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4">
          <div className="glass border-red-100 rounded-2xl p-4 flex items-center gap-3 shadow-2xl">
            <AlertCircle className="text-red-500 shrink-0" size={24} />
            <p className="text-red-700 text-sm font-bold">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600 font-bold text-xl">×</button>
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
}
