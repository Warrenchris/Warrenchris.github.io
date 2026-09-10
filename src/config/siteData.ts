// ============================================================
// SITE DATA — Single source of truth for all portfolio content
// All claims are verified from GitHub repos + existing data
// ============================================================

export const personalInfo = {
  name: 'Warren Chris',
  title: 'Software Engineer',
  headline: 'I build software that solves real problems.',
  subheadline:
    'Full-stack engineer building intelligent systems across software, infrastructure, data, and AI.',
  bio: "I'm a software engineer based in Nairobi focused on building practical systems across full-stack development, AI, infrastructure, and automation. I care about clean architecture, security by default, and software that works reliably under real conditions.",
  email: 'warrenchris745@gmail.com',
  location: 'Nairobi, Kenya',
  github: 'https://github.com/Warrenchris',
  linkedin: 'https://www.linkedin.com/in/warren-chris-723a00263',
  university: 'Jomo Kenyatta University of Agriculture and Technology',
  degree: 'BSc Information Technology',
  avatar: '/warren-avatar.jpg',
  cvUrl: '/warren-chris-cv.pdf',
};

// -----------------------------------------------------------
// NAVIGATION
// -----------------------------------------------------------
export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

// -----------------------------------------------------------
// CREDIBILITY — verified facts only
// -----------------------------------------------------------
export const credibilityItems = [
  { label: 'Public Repositories', value: '18' },
  { label: 'Stack', value: 'Frontend → Backend → Data → AI' },
  { label: 'Certifications', value: 'Cisco · Huawei · IBM · Red Hat' },
  { label: 'Location', value: 'Nairobi, Kenya' },
];

// -----------------------------------------------------------
// PROJECTS — ordered by engineering depth
// -----------------------------------------------------------
export interface Project {
  id: string;
  number: string;
  title: string;
  positioning: string;
  categories: string[];
  problem: string;
  built: string;
  engineering: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'isp-billing',
    number: '01',
    title: 'Intelligent ISP Billing System',
    positioning:
      'A production-oriented ISP billing and management platform combining payments, customer management, network usage monitoring, and AI-powered analytics.',
    categories: ['Business Systems', 'Payments', 'AI', 'Infrastructure'],
    problem:
      'Internet service providers struggle with manual billing, inaccurate bandwidth tracking, and lack of real-time customer and network management tools.',
    built:
      'Full-stack billing platform with automated invoicing, M-Pesa payment integration, FreeRADIUS network authentication, Redis-backed job queues, and an AI microservice providing usage forecasting, anomaly detection, and LLM-powered business insights.',
    engineering:
      'JWT authentication with role-based access control. M-Pesa STK push integration for mobile payments. BullMQ background workers for invoice generation and payment reconciliation. FreeRADIUS integration for subscriber bandwidth control. Python AI service with forecasting, anomaly detection, and LLM integration. Docker-composed deployment with service isolation.',
    tech: [
      'React',
      'Node.js',
      'Express',
      'MySQL',
      'Redis',
      'BullMQ',
      'Python',
      'Docker',
      'M-Pesa API',
      'FreeRADIUS',
    ],
    github: 'https://github.com/Warrenchris/ISP-BILLING-SYSTEM',
    demo: 'https://isp-billing-system-five.vercel.app',
    image: '/isp-billing.png',
    featured: true,
  },
  {
    id: 'zena-pos',
    number: '02',
    title: 'Zena POS & Business Platform',
    positioning:
      'Point-of-sale and business management platform for retail and hospitality with inventory control, sales analytics, and M-Pesa payment processing.',
    categories: ['Business Systems', 'Payments', 'Full Stack'],
    problem:
      'Small and medium enterprises lack integrated systems for POS operations, inventory management, and business analytics that work with local payment methods.',
    built:
      'Complete business ecosystem with barcode scanning, multi-payment methods including M-Pesa, real-time inventory tracking, receipt printing, and back-office analytics dashboard.',
    engineering:
      'Offline-first architecture with data synchronization. Real-time inventory updates across locations. M-Pesa API integration for mobile money payments. Role-based permissions for staff and admin access.',
    tech: [
      'React',
      'Python',
      'Flask',
      'SQLite',
      'Tailwind CSS',
      'M-Pesa API',
    ],
    github: 'https://github.com/Warrenchris/zena-pos',
    demo: '',
    image: '/zana-pos.png',
    featured: true,
  },
  {
    id: 'group-deal',
    number: '03',
    title: 'GroupDeal',
    positioning:
      'Group buying platform enabling collective purchasing with deal negotiation, user groups, and transaction management.',
    categories: ['Full Stack', 'TypeScript', 'Platform'],
    problem:
      'Consumers miss bulk-purchasing savings because coordinating group buys is complex and fragmented across messaging apps.',
    built:
      'TypeScript group buying platform with deal creation, user group management, payment coordination, and real-time deal status tracking.',
    engineering:
      'TypeScript throughout frontend and backend. Group state management with deal lifecycle tracking. User authentication and group permission systems.',
    tech: ['TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL'],
    github: 'https://github.com/Warrenchris/GROUP-DEAL',
    demo: '',
    image: '',
    featured: true,
  },
  {
    id: 'artemis-tracker',
    number: '04',
    title: 'Artemis II Live Tracker',
    positioning:
      'Real-time mission tracking dashboard for the Artemis II lunar mission with live telemetry visualization and mission timeline.',
    categories: ['Frontend', 'Data Visualization', 'Real-time'],
    problem:
      'Space mission data is scattered across NASA feeds with no unified, consumer-friendly real-time tracking interface.',
    built:
      'Interactive mission tracker with real-time position data, mission phase timeline, crew information, and trajectory visualization.',
    engineering:
      'Real-time data fetching and state management. Interactive trajectory visualization. Responsive dashboard layout optimized for live monitoring.',
    tech: ['JavaScript', 'React', 'APIs', 'CSS'],
    github: 'https://github.com/Warrenchris/ARTEMIS-II-LIVE-TRACKER',
    demo: '',
    image: '/artemis-tracker.png',
    featured: true,
  },
  {
    id: 'road-accident-analyzer',
    number: '05',
    title: 'Kenya Road Accidents Analyzer',
    positioning:
      'ML-powered analytics dashboard for analyzing road accident patterns and predicting high-risk areas using KNBS data.',
    categories: ['AI / ML', 'Data Science', 'Python'],
    problem:
      'Kenya lacks data-driven tools for analyzing road accident patterns and identifying intervention areas.',
    built:
      'Classification model for accident severity prediction with interactive geospatial visualization using Leaflet.js heatmaps and trend analysis.',
    engineering:
      'Scikit-learn classification pipeline. Geospatial heatmap visualization. Flask API serving model predictions. Data preprocessing pipeline for KNBS datasets.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'Leaflet.js'],
    github: 'https://github.com/Warrenchris/road-accident-analyzer',
    demo: '',
    image: '',
    featured: false,
  },
  {
    id: 'unite-us',
    number: '06',
    title: 'UniteUS',
    positioning:
      'Community platform connecting people for shared interests and collaborative projects.',
    categories: ['Full Stack', 'TypeScript', 'Platform'],
    problem:
      'Online communities lack purpose-built tools for organizing around shared goals and local collaboration.',
    built:
      'TypeScript community platform with user profiles, group creation, event coordination, and messaging.',
    engineering:
      'Full TypeScript stack. User authentication and profile management. Real-time features for community interaction.',
    tech: ['TypeScript', 'React', 'Node.js'],
    github: 'https://github.com/Warrenchris/UniteUS',
    demo: '',
    image: '',
    featured: false,
  },
  {
    id: 'python-car-rental',
    number: '07',
    title: 'Car Rental Management System',
    positioning:
      'Full-stack rental platform with booking management, fleet tracking, and payment processing.',
    categories: ['Full Stack', 'Python', 'Business Systems'],
    problem:
      'Car rental businesses need integrated fleet management, booking coordination, and payment systems.',
    built:
      'Booking portal with fleet management dashboard, automated availability checking, and payment integration.',
    engineering:
      'SQLAlchemy ORM with PostgreSQL. Booking availability algorithms. Admin dashboard for fleet utilization analytics.',
    tech: ['Python', 'Flask', 'SQLAlchemy', 'PostgreSQL'],
    github: 'https://github.com/Warrenchris/python-car-rental-system',
    demo: '',
    image: '',
    featured: false,
  },
];

// -----------------------------------------------------------
// TECH STACK — with project evidence
// -----------------------------------------------------------
export interface TechCategory {
  name: string;
  description: string;
  technologies: { name: string; projects: string[] }[];
}

export const techStack: TechCategory[] = [
  {
    name: 'Frontend',
    description: 'Interfaces and client applications',
    technologies: [
      { name: 'React', projects: ['ISP Billing', 'Zena POS', 'GroupDeal', 'Artemis Tracker'] },
      { name: 'TypeScript', projects: ['GroupDeal', 'UniteUS', 'Portfolio'] },
      { name: 'Vite', projects: ['Portfolio', 'GroupDeal'] },
      { name: 'Tailwind CSS', projects: ['Portfolio', 'Zena POS'] },
    ],
  },
  {
    name: 'Backend',
    description: 'Server applications and APIs',
    technologies: [
      { name: 'Node.js', projects: ['ISP Billing', 'GroupDeal', 'UniteUS'] },
      { name: 'Express', projects: ['ISP Billing', 'GroupDeal'] },
      { name: 'Python / Flask', projects: ['Zena POS', 'Road Accident Analyzer', 'Car Rental'] },
      { name: 'REST APIs', projects: ['ISP Billing', 'Zena POS', 'GroupDeal'] },
    ],
  },
  {
    name: 'Data',
    description: 'Databases and data layers',
    technologies: [
      { name: 'MySQL', projects: ['ISP Billing'] },
      { name: 'PostgreSQL', projects: ['GroupDeal', 'Car Rental'] },
      { name: 'SQLite', projects: ['Zena POS'] },
      { name: 'Redis', projects: ['ISP Billing'] },
    ],
  },
  {
    name: 'AI / ML',
    description: 'Intelligent systems and data science',
    technologies: [
      { name: 'Scikit-learn', projects: ['Road Accident Analyzer'] },
      { name: 'Pandas', projects: ['Road Accident Analyzer'] },
      { name: 'LLM Integration', projects: ['ISP Billing AI Service'] },
      { name: 'Forecasting', projects: ['ISP Billing AI Service'] },
    ],
  },
  {
    name: 'Infrastructure',
    description: 'Deployment, networking, and security',
    technologies: [
      { name: 'Docker', projects: ['ISP Billing'] },
      { name: 'Linux', projects: ['Server deployments'] },
      { name: 'Networking', projects: ['Cisco / Huawei equipment'] },
      { name: 'Git / CI/CD', projects: ['All projects'] },
    ],
  },
];

// -----------------------------------------------------------
// ENGINEERING PROCESS
// -----------------------------------------------------------
export const engineeringProcess = [
  {
    step: '01',
    title: 'Understand',
    description: 'Define the real problem. Talk to users. Map constraints.',
  },
  {
    step: '02',
    title: 'Architect',
    description: 'Design data models, APIs, and service boundaries before writing code.',
  },
  {
    step: '03',
    title: 'Build',
    description: 'Implement with clean separation of concerns and reusable patterns.',
  },
  {
    step: '04',
    title: 'Test',
    description: 'Validate edge cases, failure modes, and integration points.',
  },
  {
    step: '05',
    title: 'Harden',
    description: 'Add authentication, rate limiting, input validation, and error handling.',
  },
  {
    step: '06',
    title: 'Ship',
    description: 'Containerize, configure CI/CD, and deploy to production.',
  },
  {
    step: '07',
    title: 'Iterate',
    description: 'Monitor, gather feedback, and improve based on real usage data.',
  },
];

// -----------------------------------------------------------
// EXPERIENCE
// -----------------------------------------------------------
export const experience = [
  {
    role: 'Freelance Software Engineer & IT Consultant',
    company: 'Self-Employed',
    period: '2023 — Present',
    location: 'Nairobi, Kenya',
    contributions: [
      'Designed and built full-stack business systems including ISP billing, POS, and group purchasing platforms',
      'Integrated M-Pesa mobile payment APIs for automated billing and transaction processing',
      'Built AI microservices for usage forecasting, anomaly detection, and LLM-powered business analytics',
      'Conducted network security audits and cybersecurity compliance reviews for SMBs',
    ],
    tech: ['React', 'Node.js', 'Python', 'MySQL', 'Docker', 'M-Pesa'],
  },
  {
    role: 'Technical Support Engineer',
    company: 'Realmer Technology Limited',
    period: '2024 — 2025',
    location: 'Nairobi, Kenya',
    contributions: [
      'Diagnosed and resolved software, networking, and security issues across client environments',
      'Configured Cisco and Huawei networking equipment for enterprise deployments',
      'Implemented network monitoring and security policies for infrastructure reliability',
      'Supported system deployments and maintained infrastructure documentation',
    ],
    tech: ['Cisco IOS', 'Huawei VRP', 'Wireshark', 'Linux', 'SIEM'],
  },
];

// -----------------------------------------------------------
// CERTIFICATIONS — verified
// -----------------------------------------------------------
export const certifications = [
  { title: 'Cisco DevNet Associate', issuer: 'Cisco', year: '2025' },
  { title: 'HCIA — Datacom', issuer: 'Huawei', year: '2024' },
  { title: 'Enterprise Design Thinking Practitioner', issuer: 'IBM', year: '2023' },
  { title: 'Red Hat System Administration I', issuer: 'Red Hat', year: '2024' },
  { title: 'Introduction to Cybersecurity', issuer: 'Cisco', year: '2025' },
];

// -----------------------------------------------------------
// GITHUB REPOS — static snapshot from verified API data
// -----------------------------------------------------------
export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
}

export const githubRepos: GitHubRepo[] = [
  {
    name: 'ISP-BILLING-SYSTEM',
    description: 'Full-stack ISP billing and management with AI analytics',
    language: 'JavaScript',
    stars: 1,
    url: 'https://github.com/Warrenchris/ISP-BILLING-SYSTEM',
  },
  {
    name: 'GROUP-DEAL',
    description: 'Group buying platform with deal coordination',
    language: 'TypeScript',
    stars: 1,
    url: 'https://github.com/Warrenchris/GROUP-DEAL',
  },
  {
    name: 'zena-pos',
    description: 'Point-of-sale system with M-Pesa integration',
    language: 'JavaScript',
    stars: 1,
    url: 'https://github.com/Warrenchris/zena-pos',
  },
  {
    name: 'ARTEMIS-II-LIVE-TRACKER',
    description: 'Real-time Artemis II mission tracking dashboard',
    language: 'JavaScript',
    stars: 1,
    url: 'https://github.com/Warrenchris/ARTEMIS-II-LIVE-TRACKER',
  },
  {
    name: 'road-accident-analyzer',
    description: 'ML-powered road accident analysis and prediction',
    language: 'Python',
    stars: 0,
    url: 'https://github.com/Warrenchris/road-accident-analyzer',
  },
  {
    name: 'UniteUS',
    description: 'Community connection platform',
    language: 'TypeScript',
    stars: 1,
    url: 'https://github.com/Warrenchris/UniteUS',
  },
  {
    name: 'HuffmanTextCompression',
    description: 'Huffman coding text compression implementation',
    language: 'C',
    stars: 0,
    url: 'https://github.com/Warrenchris/HuffmanTextCompression',
  },
  {
    name: 'REALMER-ECOMMERCE',
    description: 'E-commerce platform',
    language: 'PHP',
    stars: 0,
    url: 'https://github.com/Warrenchris/REALMER-ECOMMERCE',
  },
];
