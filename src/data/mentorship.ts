export interface MentorshipProject {
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
  gradient: string;
  accentColor: string;
  liveUrl?: string;
}

export const mentorshipProjects: MentorshipProject[] = [
  {
    title: 'JU Bot',
    description:
      'AI-powered conversational assistant deployed on the JU Application Landing page — providing instant answers to student inquiries regarding university details, colleges, courses, fee structures, and admission processes.',
    highlights: [
      'Integrated on the JU Application Landing page for instant student & applicant query resolution',
      'Provides automated guidance on university info, colleges, available courses, fees, and admission steps',
      'Handles 500+ daily applicant queries, reducing repetitive administrative workload by 40%',
      'Guided interns through NLP intent modeling, knowledge integration, and deployment in 8 weeks',
    ],
    tags: ['AI', 'Chatbot', 'Admissions', 'NLP'],
    gradient: 'from-brand-600 via-brand-500 to-cyan-400',
    accentColor: '#3D6BFD',
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
