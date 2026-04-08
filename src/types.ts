export interface WebsiteSettingsContent {
  header: {
    title: string;
    logo_url: string;
  };
  hero: {
    heading: string;
    subheading: string;
    banner_url: string;
    cta_text: string;
  };
  about: {
    content: string;
    image_url: string;
  };
  highlights: string[];
  facilities: {
    id: string;
    label: string;
    icon: string;
    enabled: boolean;
  }[];
  events: {
    image_url: string;
    caption: string;
    date: string;
  }[];
  form_config: {
    id: string;
    label: string;
    enabled: boolean;
  }[];
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  footer: {
    text: string;
  };
}

export interface WebsiteSettingsConfig {
  primary_color: string;
  font_family: string;
}

export interface WebsiteSettings {
  id: string;
  school_id: string;
  subdomain_slug: string;
  content: WebsiteSettingsContent;
  config: WebsiteSettingsConfig;
}

export interface WebsiteGallery {
  id: string;
  school_id: string;
  image_url: string;
  caption: string;
  order_index: number;
}

export interface WebsiteNotice {
  id: string;
  school_id: string;
  title: string;
  content: string;
  image_url?: string;
  is_active: boolean;
  published_at: string;
}

export interface SchoolData {
  settings: WebsiteSettings;
  gallery: WebsiteGallery[];
  notices: WebsiteNotice[];
}
