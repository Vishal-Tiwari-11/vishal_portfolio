import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    role: "Programmer",
    company: "JECRC University",
    period: "Oct 2024 — Present",
    summary:
      "Building and maintaining responsive web apps for university initiatives and international conference platforms, while supporting and enhancing the ERP system for academic and administrative workflows. Also mentors student interns on AI and automation projects.",
    achievements: [
      "Built the JU 9th Convocation portal handling 500+ registrations with Razorpay integration, reducing manual processing time by 80% through automated confirmations and admin analytics",
      "Developed 4 international conference websites (ICETACQ, IAMSSG-2025) serving 1,000+ global delegates with 99.9% uptime",
      "Built the R&D Cell website using Next.js, achieving 95+ Lighthouse performance score and reducing page load time by 60%",
      "Delivered the JU Service & Grievance Portal (Single Window System) serving 3,000+ students, replacing 8 fragmented service touchpoints",
      "Mentors 3+ interns at JECRC's AI program on production-ready projects including JU Bot (an AI admissions & course fee assistant on the application portal), AI-Powered HR Portal, and university automation tools",
    ],
    stack: [
      "PHP (PDO)",
      "MySQL",
      "React.js",
      "Next.js",
      "Razorpay",
      "Cashfree",
      "JavaScript",
    ],
  },
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    period: "Apr 2024 — Sep 2024",
    summary:
      "Delivered independent web projects for clients, including event booking platforms and payment-integrated systems, handling the full project lifecycle from requirements to deployment.",
    achievements: [
      "Built Reimagine by Dhruvi — a secure event booking system with OTP auth and Cashfree gateway, processing 200+ bookings with zero duplicate transactions under concurrent load",
      "Managed full project lifecycle for 5 client projects — requirements, development, testing, and deployment — with 100% on-time delivery",
      "Built secure, responsive web applications reducing client operational overhead by an average of 50%",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
  },
  {
    role: "Software Engineer",
    company: "Cosmo Infomatics Pvt. Ltd.",
    period: "May 2023 — Mar 2024",
    summary:
      "Built responsive, cross-browser websites and integrated third-party APIs for client projects, with a focus on performance optimisation and user experience.",
    achievements: [
      "Delivered 10+ responsive, cross-browser-compatible client websites using HTML5, CSS3, Bootstrap, and JavaScript, achieving 95%+ browser compatibility",
      "Integrated 5+ third-party APIs (payment gateways, analytics, CRM) extending platform functionality across multiple client projects",
      "Improved average site performance by 40% through auditing, code optimization, and modern best practices implementation",
    ],
    stack: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "REST APIs"],
  },
  {
    role: "Programming Instructor & Co-Founder",
    company: "MS Computer Education and Training Institute",
    period: "Jul 2021 — Mar 2023",
    summary:
      "Co-founded and operated a computer education institute in Agra, teaching programming languages and foundational software skills to students before the institute was closed.",
    achievements: [
      "Co-founded the institute with 2 partners, handling curriculum design, scheduling, and day-to-day operations",
      "Taught C, Python, Java, HTML, CSS, and JavaScript to batches of students across beginner and intermediate levels",
      "Designed structured course modules covering core programming concepts from scratch to intermediate level",
    ],
    stack: ["C", "Python", "Java", "HTML", "CSS", "JavaScript", "Teaching"],
  },
];
