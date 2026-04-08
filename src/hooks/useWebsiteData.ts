import { useState, useEffect } from 'react';
import { getSubdomain } from '../lib/utils';
import { getSupabaseClient } from '../lib/supabase';
import { SchoolData, WebsiteSettings, WebsiteGallery, WebsiteNotice } from '../types';

const DEFAULT_SETTINGS: WebsiteSettings = {
  id: 'default',
  school_id: 'default',
  subdomain_slug: 'default',
  published_content: {
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
  core_config: {
    primary_color: '#10b981',
    font_family: 'Inter'
  }
};

export function useWebsiteData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SchoolData>({
    settings: DEFAULT_SETTINGS,
    gallery: [],
    notices: []
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const slug = getSubdomain();
        const supabase = getSupabaseClient();

        if (!slug || !supabase) {
          setData({
            settings: DEFAULT_SETTINGS,
            gallery: [],
            notices: []
          });
          setLoading(false);
          return;
        }

        // 1. Fetch settings by subdomain_slug
        const { data: settingsData, error: settingsError } = await supabase
          .from('website_settings')
          .select('*')
          .eq('subdomain_slug', slug)
          .single();

        if (settingsError || !settingsData) {
          setData({
            settings: DEFAULT_SETTINGS,
            gallery: [],
            notices: []
          });
          setLoading(false);
          return;
        }

        const schoolId = settingsData.school_id;

        // 2. Fetch gallery and notices in parallel
        const [galleryRes, noticesRes] = await Promise.all([
          supabase.from('website_gallery').select('*').eq('school_id', schoolId).order('order_index', { ascending: true }),
          supabase.from('website_notices').select('*').eq('school_id', schoolId).eq('is_active', true).order('published_at', { ascending: false })
        ]);

        setData({
          settings: settingsData as WebsiteSettings,
          gallery: (galleryRes.data || []) as WebsiteGallery[],
          notices: (noticesRes.data || []) as WebsiteNotice[]
        });

      } catch (err: any) {
        console.error('Error in useWebsiteData:', err);
        setError(err.message || 'Failed to load website data');
        setData({
          settings: DEFAULT_SETTINGS,
          gallery: [],
          notices: []
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
