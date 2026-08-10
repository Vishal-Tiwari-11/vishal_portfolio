import type { ProjectItem } from '@/types';

export const projects: ProjectItem[] = [
  {
    title: 'Centre for Leadership & Enterprise',
    category: 'Web',
    description:
      'Web platform for JECRC University in partnership with Centre for Leadership & Enterprise and Chhatra Sansad India — empowering India’s next generation of student leaders.',
    highlights: [
      'Empowers student leaders through a campus-embedded leadership program with monthly themes & deliverables',
      'Simple, user-friendly application form for student registration and cohort onboarding',
      'Dedicated admin dashboard for university staff to review, manage, and filter incoming applications',
      'Built full-stack web system using JavaScript, PHP, MySQL, and CSS for fast and secure data management',
    ],
    stack: ['PHP', 'MySQL', 'JavaScript', 'CSS3'],
    gradient: 'from-amber-500 via-rose-500 to-brand-500',
    accentColor: '#f43f5e',
    liveUrl: "https://cle.jecrcuniversity.edu.in/",
  },
  {
    title: 'Reimagine by Dhruvi',
    category: 'Payments',
    description:
      'Secure event booking system with OTP-verified registration, Cashfree gateway, HMAC webhook verification, and bulletproof duplicate-booking prevention.',
    highlights: [
      'Processed 200+ bookings with zero duplicate transactions under concurrent load',
      'OTP-based attendee verification reducing fraudulent registrations to 0%',
      'Cashfree gateway with HMAC webhook signature verification and instant confirmation',
      'Transactional DB logic maintaining 100% data integrity across concurrent sessions',
    ],
    stack: ['PHP', 'MySQL', 'Cashfree', 'JavaScript'],
    gradient: 'from-indigo-600 via-brand-500 to-purple-400',
    accentColor: '#818cf8',
    liveUrl: 'https://reimaginebydhruvi.com',
  },
  {
    title: 'JU Service & Grievance Portal',
    category: 'Web',
    description:
      'Centralized Single Window System for JECRC University — one unified platform for student support services, account management, and grievance resolution.',
    highlights: [
      'Serving 3,000+ students through a unified platform replacing 8 fragmented touchpoints',
      'Reduced average grievance resolution time by 60% through streamlined workflows',
      'Account management and access to essential university services in one place',
      'Improved student satisfaction with a single, consistent self-service interface',
    ],
    stack: ['PHP', 'MySQL', 'JavaScript'],
    gradient: 'from-teal-500 via-brand-500 to-emerald-400',
    accentColor: '#14b8a6',
    liveUrl: 'https://sws.jecrcuniversity.edu.in',
  },
  {
    title: 'JU 9th Convocation Portal',
    category: 'Payments',
    description:
      'University convocation registration portal for JECRC University — Razorpay-integrated, with admin analytics, export tooling, and automated email confirmations.',
    highlights: [
      'Handled 500+ student registrations with 0% payment failure rate',
      'Reduced manual admin processing time by 80% via automated email confirmations',
      'Admin analytics dashboard with real-time data and CSV/Excel export',
      'Duplicate-entry prevention maintaining 100% data integrity throughout event',
    ],
    stack: ['PHP (PDO)', 'MySQL', 'Razorpay', 'JavaScript'],
    gradient: 'from-brand-600 via-brand-500 to-cyan-400',
    accentColor: '#3D6BFD',
  },
  {
    title: 'ICETACQ Conference Website',
    category: 'Conference',
    description:
      'Official site for an international conference on AI, Cloud Computing & Quantum Technology — built for a global academic audience.',
    highlights: [
      'Served 300+ international delegates across 12+ countries with 99.9% uptime',
      'Fully responsive across mobile and desktop, covering 100% of delegate device types',
      'Cross-browser compatible with <2s average load time on standard connections',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    gradient: 'from-emerald-500 via-brand-500 to-blue-500',
    accentColor: '#10b981',
    liveUrl: 'https://conference.jecrcuniversity.edu.in/icetacq',
  },
  {
    title: 'R&D Cell Website',
    category: 'Web',
    description:
      "Fast, scalable Next.js application for JECRC University's Research & Development Cell, showcasing research, faculty, and student projects.",
    highlights: [
      'Achieved 95+ Lighthouse performance score with Next.js SSR, reducing page load time by 60%',
      'Dynamic sections covering 20+ research projects, faculty teams, and publications',
      'Accessible, responsive UI serving 500+ monthly faculty and student visitors',
    ],
    stack: ['React.js', 'Next.js'],
    gradient: 'from-amber-500 via-orange-500 to-brand-500',
    accentColor: '#f59e0b',
    liveUrl: 'https://research.jecrcuniversity.edu.in',
  },
  {
    title: 'IAMSSG-2025 Conference',
    category: 'Conference',
    description:
      'International conference website for materials science and sustainable growth — speaker profiles, program schedule, and online registration.',
    highlights: [
      'Served 200+ international delegates with speaker profiles and full program schedule',
      'Online registration with dual-layer validation, achieving 0% invalid submission rate',
      'Clean academic design optimised for a global audience across 10+ countries',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    gradient: 'from-sky-500 via-brand-500 to-indigo-500',
    accentColor: '#38bdf8',
    liveUrl: 'https://conference.jecrcuniversity.edu.in/iamssg2025',
  },
  {
    title: 'ASI Symposium 003 — 2025',
    category: 'Conference',
    description:
      'Interactive website for the Astronomical Society of India Symposium 003, focused on Cosmic Vision 2047 — covering solar missions, planetary science, and AI/ML in space research.',
    highlights: [
      "Covered 5+ active solar missions including Aditya-L1 and NASA's Parker Solar Probe",
      'Planetary science section spanning 3 major ISRO missions including Chandrayaan-3',
      'AI/ML themes across 4 research tracks: flare detection, CME prediction, planetary mapping',
      'Delivered conference site for 150+ registered attendees with peer-reviewed proceedings',
    ],
    stack: ['HTML5', 'CSS3'],
    gradient: 'from-rose-500 via-fuchsia-500 to-brand-500',
    accentColor: '#f43f5e',
    liveUrl: 'https://conference.jecrcuniversity.edu.in/asi-symposium',
  },
];
