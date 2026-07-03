export interface MentorshipProject {
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
  gradient: string;
  accentColor: string;
}

export const mentorshipProjects: MentorshipProject[] = [
  {
    title: 'JU Bot',
    description:
      'AI-powered conversational assistant serving 2,000+ JECRC University students — handling admissions, timetables, faculty contacts, and FAQs, reducing admin staff workload by 40%.',
    highlights: [
      'Serves 2,000+ active student users within the university ecosystem',
      'Handles 500+ daily queries, reducing repetitive admin staff workload by 40%',
      'Natural language understanding for 50+ university FAQ categories',
      'Guided interns from architecture to deployment in 8 weeks',
    ],
    tags: ['AI', 'Chatbot', 'Automation', 'NLP'],
    gradient: 'from-brand-600 via-brand-500 to-cyan-400',
    accentColor: '#3D6BFD',
  },
  {
    title: 'AI-Powered HR Portal',
    description:
      'Recruitment automation platform that reduced resume screening time by 70% — parsing and ranking candidates against job requirements with AI-driven analysis across 100+ applications.',
    highlights: [
      'Cuts resume screening time by 70%, processing 100+ applications in minutes',
      'AI-driven candidate ranking with relevance scoring against job descriptions',
      'End-to-end workflow from application intake to interview scheduling',
      'Mentored 2 interns through ML model integration and full-stack deployment',
    ],
    tags: ['AI', 'Automation', 'HR Tech', 'Resume Screening'],
    gradient: 'from-indigo-600 via-brand-500 to-purple-400',
    accentColor: '#818cf8',
  },
  {
    title: 'University Automation Initiatives',
    description:
      'Suite of AI-driven automation tools deployed across 5+ university departments, eliminating 200+ hours of manual monthly administrative work through intelligent data pipelines.',
    highlights: [
      'Deployed across 5+ departments, saving 200+ hours of manual admin work monthly',
      'AI data pipelines replacing manual spreadsheet-based reporting workflows',
      'Scalable architecture designed to onboard additional departments incrementally',
      'Guided 4 interns through design, development, and cross-department rollout',
    ],
    tags: ['AI', 'Automation', 'Process Optimisation'],
    gradient: 'from-emerald-500 via-brand-500 to-teal-400',
    accentColor: '#10b981',
  },
  {
    title: 'JECRC Student Service Portal',
    description:
      'Online document request portal serving 1,500+ students — replacing in-person admin visits with a self-service platform for certificates, TC, migration, and duplicate marksheets.',
    highlights: [
      'Serves 1,500+ students with self-service document request workflows',
      'Eliminated 90% of in-person admin visits for routine certificate requests',
      'End-to-end status tracking from submission to document dispatch',
      'Built by mentored interns using React, Node.js, and SQL in 10 weeks',
    ],
    tags: ['React', 'Node.js', 'SQL'],
    gradient: 'from-violet-500 via-brand-500 to-pink-400',
    accentColor: '#8b5cf6',
    liveUrl: 'https://ai.jecrcuniversity.edu.in/service',
  },
];
