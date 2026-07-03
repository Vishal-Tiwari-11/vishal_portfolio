import type { IconType } from 'react-icons';
import type { LucideIcon } from 'lucide-react';

export interface TechItem {
  name: string;
  icon: IconType;
  color: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
  achievements: string[];
  stack: string[];
}

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  highlights: string[];
  stack: string[];
  gradient: string;
  accentColor: string;
  repoUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  description: string;
  tags: string[];
}

export interface SocialLink {
  label: string;
  url: string;
  icon: LucideIcon;
}

export interface NavLink {
  label: string;
  href: string;
}
