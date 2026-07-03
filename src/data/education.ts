export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade?: string;
  details: string[];
  logo?: string;
}

export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Technology (B.Tech)',
    institution: 'Dr. A.P.J. Abdul Kalam Technical University',
    period: '2017 — 2021',
    grade: 'A',
    details: [
      'Major: Computer Science',
      'College Team Captain (Football)',
      'Training & Placement Cell Member',
    ],
  },
  {
    degree: 'React.js & MERN Stack',
    institution: 'Udemy',
    period: 'Jul 2024 — Sep 2024',
    details: [
      'React fundamentals, hooks, routing, state management',
      'Context API and Redux for state management',
      'API integration and Styled Components',
      'Testing with Jest and React Testing Library',
    ],
  },
  {
    degree: 'Python Programming Course',
    institution: 'AVC Education, Agra',
    period: 'Jul 2019 — Sep 2019',
    grade: 'A+',
    details: [
      'Python fundamentals and advanced concepts',
      'Data structures and algorithms',
    ],
  },
];
