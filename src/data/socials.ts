import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import type { SocialLink, NavLink } from '@/types';

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', url: 'https://linkedin.com/in/vishaltiwari642', icon: Linkedin },
  { label: 'GitHub', url: 'https://github.com/Vishal-Tiwari-11', icon: Github },
  { label: 'Email', url: 'mailto:vishaltiwari642@gmail.com', icon: Mail },
  { label: 'Phone', url: 'tel:+918532014119', icon: Phone },
];

export const emailAddress = 'vishaltiwari642@gmail.com';
export const emailLink: SocialLink = {
  label: 'Email',
  url: `mailto:${emailAddress}`,
  icon: Mail,
};

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Mentorship', href: '#mentorship' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
