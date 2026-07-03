import { Layout, Server, Database, CreditCard, Wrench } from 'lucide-react';
import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Development',
    icon: Layout,
    description:
      'Building responsive, accessible interfaces for university platforms and conference sites — from simple static pages to React-powered SPAs.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js', 'Bootstrap'],
  },
  {
    title: 'Backend & APIs',
    icon: Server,
    description:
      'Writing server-side logic for registration systems, ERP workflows, OTP authentication, and REST API integrations.',
    tags: ['PHP (PDO)', 'Node.js', 'REST APIs', 'OTP Auth', 'Webhooks'],
  },
  {
    title: 'Database Design',
    icon: Database,
    description:
      'Designing relational schemas that handle real transactional load — duplicate prevention, data integrity, and admin-friendly querying.',
    tags: ['MySQL', 'Schema Design', 'Query Optimization', 'PDO'],
  },
  {
    title: 'Payments & Security',
    icon: CreditCard,
    description:
      'Integrating payment gateways end-to-end: order creation, webhook verification, reconciliation, and fraud-safe duplicate prevention.',
    tags: ['Razorpay', 'Cashfree', 'Webhook Verification', 'HMAC Signatures'],
  },
  {
    title: 'Tools & Workflow',
    icon: Wrench,
    description:
      'Working in team environments with version control, issue tracking, and a focus on clean, reviewable code.',
    tags: ['Git', 'JIRA', 'Database Optimization', 'Code Review'],
  },
];
