import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPhp,
  SiMysql,
  SiNodedotjs,
  SiTailwindcss,
  SiGit,
  SiGithub,
} from 'react-icons/si';
import { Network } from 'lucide-react';
import type { TechItem } from '@/types';

export const techStack: TechItem[] = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'PHP', icon: SiPhp, color: '#777BB4' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#9CA3AF' },
  // REST APIs has no single brand mark — Network reads clearly as "interconnected services"
  { name: 'REST APIs', icon: Network, color: '#3D6BFD' },
];
