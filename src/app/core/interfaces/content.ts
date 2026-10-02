// Mirrors the API content collections; `position` is the display order set by the owner.
export type ContentCollection =
  | 'experiences'
  | 'projects'
  | 'testimonials'
  | 'highlights'
  | 'social-links'
  | 'technologies'
  | 'contact-info';

interface ContentItem {
  id: number;
  position: number;
}

export interface Experience extends ContentItem {
  period: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
  current: boolean;
}

export interface Project extends ContentItem {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
}

export interface Testimonial extends ContentItem {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface Highlight extends ContentItem {
  icon: string;
  title: string;
  description: string;
}

export interface SocialLink extends ContentItem {
  icon: string;
  href: string;
}

export interface Technology extends ContentItem {
  name: string;
}

export interface ContactInfo extends ContentItem {
  icon: string;
  label: string;
  value: string;
  href: string;
}
