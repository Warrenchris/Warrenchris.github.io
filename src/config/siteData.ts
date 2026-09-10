// ============================================================
// SITE DATA — Single source of truth for all portfolio content
// All claims are verified from GitHub repos + existing data
// ============================================================

export const personalInfo = {
  name: 'Warren Chris',
  title: 'Software Engineer',
  role: 'Full-Stack, Distributed Systems & AI',
  headline: 'Software Engineer specializing in full-stack platforms, distributed services, and intelligent systems.',
  subheadline:
    'Building production-ready systems from database architecture to real-time clients. Focused on reliability, security, and measurable impact.',
  bio: "I'm a software engineer based in Nairobi focused on building practical systems across full-stack development, AI, infrastructure, and automation. I care about clean architecture, security by default, and software that works reliably under real conditions.",
  email: 'warrenchris745@gmail.com',
  location: 'Nairobi, Kenya',
  github: 'https://github.com/Warrenchris',
  linkedin: 'https://www.linkedin.com/in/warren-chris-723a00263',
  avatar: '/warren-avatar.jpg',
  resumeRequestUrl: 'mailto:warrenchris745@gmail.com?subject=Resume%20Request%20-%20Warren%20Chris',
};

// -----------------------------------------------------------
// NAVIGATION
// -----------------------------------------------------------
export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

// -----------------------------------------------------------
// CREDIBILITY — verified facts only
// -----------------------------------------------------------
export interface CredibilityItem {
  label: string;
  value: string;
  icon: string; // Icon name from lucide-react
}

export const credibilityItems: CredibilityItem[] = [
  { label: 'Public Repositories', value: '18', icon: 'GitHub' },
  { label: 'Stack Scope', value: 'Frontend → Backend → Data → AI', icon: 'Layers' },
  { label: 'Certifications', value: 'Cisco · Huawei · IBM · Red Hat', icon: 'Award' },
  { label: 'Location', value: 'Nairobi, Kenya (UTC+3)', icon: 'MapPin' },
  { label: 'Years Experience', value: '2+ Years', icon: 'Clock' },
  { label: 'Focus Areas', value: 'Full-Stack · AI · Security', icon: 'Target' },
  { label: 'Tech Stack', value: 'React · Node.js · Python · Docker', icon: 'Cpu' },
  { label: 'Available For', value: 'Full-time · Contract · Remote', icon: 'Briefcase' },
];

// -----------------------------------------------------------
// ARCHITECTURE VISUALIZATION NODES — 100% verified across projects
// -----------------------------------------------------------
export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  role: string;
  technologies: string[];
  evidence: string;
}

export const systemArchitectureNodes: ArchitectureNode[] = [
  {
    id: 'client',
    label: 'CLIENT LAYER',
    sublabel: 'React / TypeScript / Vite',
    role: 'Responsive UI, optimistic state, and offline synchronization queues.',
    technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'IndexedDB'],
    evidence: 'ISP Billing Frontend, Zena POS, GroupDeal',
  },
  {
    id: 'gateway',
    label: 'API GATEWAY',
    sublabel: 'Node.js / Express / REST',
    role: 'JWT authorization, rate limiting, route orchestration, and payment webhooks.',
    technologies: ['Node.js', 'Express', 'JWT', 'M-Pesa STK Webhooks'],
    evidence: 'ISP Billing Backend, Zena POS API',
  },
  {
    id: 'workers',
    label: 'WORKER SERVICES',
    sublabel: 'Redis / BullMQ / Jobs',
    role: 'Asynchronous invoice generation, retry logic, and recurring billing cycles.',
    technologies: ['Redis 7', 'BullMQ', 'Cron Workers', 'FreeRADIUS Accounting'],
    evidence: 'ISP Billing System Queue Workers',
  },
  {
    id: 'database',
    label: 'RELATIONAL DB',
    sublabel: 'MySQL / Sequelize / ACID',
    role: 'Normalized schema modeling, ACID transactions, and subscriber billing audit logs.',
    technologies: ['MySQL 8', 'Sequelize ORM', 'Relational Schemas', 'Indexes'],
    evidence: 'ISP Billing Database, Zena POS DB',
  },
  {
    id: 'ai',
    label: 'AI MICROSERVICE',
    sublabel: 'Python / Flask / Analytics',
    role: 'Bandwidth usage demand forecasting, anomaly detection, and LLM insights.',
    technologies: ['Python 3', 'Flask', 'Scikit-Learn', 'Pandas'],
    evidence: 'ISP Billing AI Service, Road Accident Analyzer',
  },
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
  result: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
  featured: boolean;
  highlight?: string;
}

export const projects: Project[] = [
  {
    id: 'isp-billing',
    number: '01',
    title: 'Intelligent ISP Billing System',
    highlight: 'Flagship Architecture',
    positioning:
      'A production-oriented ISP billing and subscriber management platform combining M-Pesa automated payments, FreeRADIUS network accounting, asynchronous job queues, and predictive AI analytics.',
    categories: ['Business Systems', 'Payments', 'AI Microservice', 'Infrastructure'],
    problem:
      'Internet service providers struggle with fragmented subscriber management, manual monthly invoicing, inaccurate bandwidth tracking, and absent usage forecasting under high concurrency.',
    built:
      'A multi-service platform with automated invoicing, M-Pesa Daraja STK push integration, FreeRADIUS network session authentication, Redis-backed job queues, and a dedicated Python AI microservice providing usage forecasting, anomaly detection, and LLM-assisted operational insights.',
    engineering:
      'Engineered BullMQ background queues for asynchronous billing and payment reconciliation. Integrated FreeRADIUS accounting packets for subscriber bandwidth control. Architected JWT authentication with role-based access control (RBAC). Built a Python Flask microservice serving time-series usage forecasting models. Orchestrated full multi-container deployment via Docker Compose with isolated service networks.',
    result:
      'Complete production-ready monorepo with automated billing workers, M-Pesa sandbox integration, and containerized deployment with Docker Compose.',
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
    title: 'Zena POS & Retail Platform',
    positioning:
      'Point-of-sale and retail business management platform for retail and hospitality with offline-first synchronization, inventory control, and mobile money checkout.',
    categories: ['Business Systems', 'Payments', 'Full Stack'],
    problem:
      'Small and medium retail businesses suffer revenue loss when network outages halt transactions, and frequently lack unified inventory tracking connected directly to mobile payment verification.',
    built:
      'Offline-first retail platform featuring barcode scanning, local transaction queueing with IndexedDB, real-time inventory ledger updates, receipt generation, and integrated M-Pesa STK push.',
    engineering:
      'Designed an offline-first state synchronization engine that buffers sales during network dropouts and reconciles with the backend server upon reconnection. Implemented database transaction rollbacks for concurrent inventory decrements.',
    result:
      'Functional retail platform with offline sync queues, receipt generation, and mobile payment processing.',
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
    title: 'GroupDeal Platform',
    positioning:
      'Group buying platform enabling collective bulk purchasing through deal lifecycle tracking, participant groups, and coordinated checkout.',
    categories: ['Full Stack', 'TypeScript', 'Platform'],
    problem:
      'Consumers and small businesses miss bulk purchasing volume discounts because coordinating group orders manually across chat groups is prone to order dropping and payment failure.',
    built:
      'End-to-end TypeScript group buying system supporting dynamic deal creation, participant quotas, tiered pricing milestones, and coordinated transaction management.',
    engineering:
      'Strict TypeScript domain models shared across client and API. State machine for deal lifecycle (initiated → threshold reached → locked → settled). Atomic reservation queries to prevent over-allocation of bulk slots.',
    result:
      'TypeScript monorepo with multi-user deal coordination and stateful checkout workflows.',
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
      'Real-time space mission tracking dashboard for the Artemis II lunar mission with live telemetry visualization, orbital position calculations, and mission timelines.',
    categories: ['Frontend', 'Data Visualization', 'Real-time'],
    problem:
      'Spaceflight mission telemetry is scattered across technical NASA documentation and unstructured feeds without a consolidated, responsive consumer interface.',
    built:
      'Interactive mission command dashboard visualizing spacecraft position, velocity vectors, mission milestone timeline, and orbital trajectory coordinates.',
    engineering:
      'Optimized lightweight canvas and SVG trajectory rendering running at 60fps. Resilient API polling with exponential backoff and cached fallback state to prevent rate limiting.',
    result:
      'Production live dashboard with simulated and NASA public API telemetry streaming.',
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
      'ML-powered predictive analytics platform for road accident severity prediction and high-risk geospatial clustering using Kenya National Bureau of Statistics (KNBS) data.',
    categories: ['AI / ML', 'Data Science', 'Python'],
    problem:
      'Public transport safety officials lack data-driven geospatial tooling to identify accident blackspots and forecast collision severity trends from historical national records.',
    built:
      'Supervised classification pipeline predicting accident severity coupled with interactive Leaflet.js geospatial heatmaps and demographic risk factor correlations.',
    engineering:
      'Scikit-learn classification pipeline with feature imputation and categorical encoding. Geospatial clustering algorithms for incident density mapping. Lightweight Flask REST API serving inferences.',
    result:
      'Functional ML model and geospatial analytics dashboard utilizing KNBS datasets.',
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
      'Community engagement platform connecting users through shared geographic initiatives, real-time coordination, and service discovery.',
    categories: ['Full Stack', 'TypeScript', 'Web'],
    problem:
      'Community organizers lack lightweight, low-friction platforms to announce localized community initiatives and track volunteer participation.',
    built:
      'Web application for localized group events, volunteer signups, and community noticeboard announcements.',
    engineering:
      'TypeScript and React frontend with Node.js backend services, relational schema for member groups, and event participation indexing.',
    result:
      'Full-stack community connection prototype with Node.js backend.',
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
      'Full-stack vehicle rental management platform featuring automated booking reservation validation, fleet inventory tracking, and billing.',
    categories: ['Full Stack', 'Python', 'Business Systems'],
    problem:
      'Independent vehicle rental operators rely on spreadsheets that cause double-booking and untracked vehicle maintenance downtimes.',
    built:
      'Centralized rental portal with date-range vehicle collision checking, customer reservation management, and administrative fleet utilization analytics.',
    engineering:
      'SQLAlchemy ORM with PostgreSQL database schema. Date-range collision algorithms for vehicle availability checking. Role-based admin panels.',
    result:
      'Functional vehicle booking and fleet scheduling application built on Python and Flask.',
    tech: ['Python', 'Flask', 'SQLAlchemy', 'PostgreSQL'],
    github: 'https://github.com/Warrenchris/python-car-rental-system',
    demo: '',
    image: '',
    featured: false,
  },
];

// -----------------------------------------------------------
// TECH STACK — concrete evidence for each technology
// -----------------------------------------------------------
export interface TechItem {
  name: string;
  usage: string;
  projects: string[];
}

export interface TechCategory {
  name: string;
  description: string;
  technologies: TechItem[];
}

export const techStack: TechCategory[] = [
  {
    name: 'Backend & APIs',
    description: 'Server architecture, APIs, and background job processing',
    technologies: [
      {
        name: 'Node.js / Express',
        usage: 'Used for REST APIs, JWT authentication, rate limiting, and STK webhook ingest pipelines.',
        projects: ['ISP Billing Backend', 'GroupDeal API', 'UniteUS'],
      },
      {
        name: 'Python / Flask',
        usage: 'Used for AI inference microservices, time-series forecasting, and data analysis pipelines.',
        projects: ['ISP Billing AI Service', 'Road Accident Analyzer', 'Zena POS'],
      },
      {
        name: 'Redis / BullMQ',
        usage: 'Used for asynchronous billing cycle jobs, payment reconciliation queues, and retries.',
        projects: ['ISP Billing System'],
      },
      {
        name: 'RESTful Architecture',
        usage: 'Used for consistent HTTP route contracts, idempotency headers, and structured error responses.',
        projects: ['All full-stack systems'],
      },
    ],
  },
  {
    name: 'Frontend & UI',
    description: 'Client-side platforms, responsive design, and state management',
    technologies: [
      {
        name: 'React',
        usage: 'Used for modular component hierarchies, optimistic UI updates, and real-time dashboard monitoring.',
        projects: ['ISP Billing Frontend', 'Zena POS', 'GroupDeal', 'Artemis Tracker'],
      },
      {
        name: 'TypeScript',
        usage: 'Used for strict end-to-end type safety, shared API contracts, and domain models.',
        projects: ['GroupDeal', 'UniteUS', 'Portfolio Rebuild'],
      },
      {
        name: 'Tailwind CSS',
        usage: 'Used for consistent design system tokens, responsive breakpoints, and dark mode theming.',
        projects: ['ISP Billing Frontend', 'Zena POS', 'Portfolio'],
      },
      {
        name: 'Vite',
        usage: 'Used for fast ES-module builds, optimized chunking, and bundle size control.',
        projects: ['Portfolio', 'GroupDeal'],
      },
    ],
  },
  {
    name: 'Databases & Storage',
    description: 'Relational data modeling, ACID transactions, and caching',
    technologies: [
      {
        name: 'MySQL / Sequelize',
        usage: 'Used for subscriber ledgers, foreign key constraints, composite indexes, and ACID transactions.',
        projects: ['ISP Billing Database'],
      },
      {
        name: 'PostgreSQL',
        usage: 'Used for relational deal modeling, complex join queries, and fleet reservation tables.',
        projects: ['GroupDeal', 'Car Rental System'],
      },
      {
        name: 'SQLite / IndexedDB',
        usage: 'Used for offline local storage and client-side transaction buffer queues in retail POS.',
        projects: ['Zena POS'],
      },
      {
        name: 'Redis In-Memory',
        usage: 'Used for distributed session caching and BullMQ delayed job processing.',
        projects: ['ISP Billing System'],
      },
    ],
  },
  {
    name: 'AI, ML & Data',
    description: 'Predictive modeling, data pipelines, and intelligence services',
    technologies: [
      {
        name: 'Scikit-learn',
        usage: 'Used for supervised classification pipelines, feature engineering, and accident risk prediction.',
        projects: ['Road Accident Analyzer'],
      },
      {
        name: 'Pandas & NumPy',
        usage: 'Used for cleaning national statistical records, aggregation, and time-series feature extraction.',
        projects: ['Road Accident Analyzer', 'ISP Usage Forecasting'],
      },
      {
        name: 'Predictive Modeling',
        usage: 'Used for bandwidth demand forecasting and statistical anomaly detection on subscriber usage.',
        projects: ['ISP Billing AI Service'],
      },
      {
        name: 'LLM Integration',
        usage: 'Used for automated diagnostic summarization and natural-language business metric queries.',
        projects: ['ISP Billing AI Service'],
      },
    ],
  },
  {
    name: 'Infrastructure & Net',
    description: 'Containerization, networking protocols, security, and deployments',
    technologies: [
      {
        name: 'Docker & Docker Compose',
        usage: 'Used for local multi-service container orchestration (frontend, backend, MySQL, Redis, AI service).',
        projects: ['ISP Billing System'],
      },
      {
        name: 'M-Pesa Daraja API',
        usage: 'Used for automated C2B / STK push mobile money payments, signature verification, and callbacks.',
        projects: ['ISP Billing System', 'Zena POS'],
      },
      {
        name: 'FreeRADIUS / AAA',
        usage: 'Used for RADIUS protocol integration, subscriber bandwidth accounting, and session validation.',
        projects: ['ISP Billing System'],
      },
      {
        name: 'Enterprise Networking',
        usage: 'Hands-on configuration of Cisco IOS and Huawei VRP enterprise switches and routers.',
        projects: ['Realmer Technology Enterprise Client Infrastructure'],
      },
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
    description: 'Clarify the core user problem, identify operational constraints, and define measurable outcomes.',
  },
  {
    step: '02',
    title: 'Architect',
    description: 'Design data models, API boundaries, security perimeters, and asynchronous failure strategies.',
  },
  {
    step: '03',
    title: 'Build',
    description: 'Implement with type safety, clean abstractions, transactional safety, and defense-in-depth.',
  },
  {
    step: '04',
    title: 'Test',
    description: 'Validate edge cases, network dropouts, concurrency limits, and integration contracts.',
  },
  {
    step: '05',
    title: 'Harden',
    description: 'Enforce authentication, rate limits, input validation schemas, and structured error logs.',
  },
  {
    step: '06',
    title: 'Ship',
    description: 'Containerize services with Docker, configure environment isolation, and automate deployment.',
  },
  {
    step: '07',
    title: 'Iterate',
    description: 'Monitor latency and resource usage, collect operational telemetry, and optimize.',
  },
];

// -----------------------------------------------------------
// EXPERIENCE — verified & conservative
// -----------------------------------------------------------
export const experience = [
  {
    role: 'Freelance Software Engineer & IT Consultant',
    company: 'Self-Employed',
    period: '2023 — Present',
    location: 'Nairobi, Kenya',
    contributions: [
      'Designed and built full-stack business applications including ISP billing, retail POS, and group purchasing platforms',
      'Integrated M-Pesa mobile money APIs (STK push, C2B) for automated customer billing and payment verification',
      'Engineered Python microservices for bandwidth demand forecasting and statistical data analysis',
      'Conducted network infrastructure audits, vulnerability reviews, and system hardening for SMB clients',
    ],
    tech: ['React', 'Node.js', 'Python', 'MySQL', 'Redis', 'Docker', 'M-Pesa API'],
  },
  {
    role: 'Technical Support Engineer',
    company: 'Realmer Technology Limited',
    period: '2024 — 2025',
    location: 'Nairobi, Kenya',
    contributions: [
      'Diagnosed and resolved networking, hardware, and software issues across production client infrastructure',
      'Configured and maintained Cisco and Huawei enterprise routing and switching hardware',
      'Monitored network uptime, traffic flow, and security policies to ensure high infrastructure availability',
      'Authored operational deployment guides, topology diagrams, and incident resolution runbooks',
    ],
    tech: ['Cisco IOS', 'Huawei VRP', 'Wireshark', 'Linux', 'TCP/IP', 'DNS/DHCP'],
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
    description: 'Full-stack ISP billing and subscriber management platform with AI analytics',
    language: 'JavaScript',
    stars: 1,
    url: 'https://github.com/Warrenchris/ISP-BILLING-SYSTEM',
  },
  {
    name: 'GROUP-DEAL',
    description: 'TypeScript group buying platform with deal coordination and tiered pricing',
    language: 'TypeScript',
    stars: 1,
    url: 'https://github.com/Warrenchris/GROUP-DEAL',
  },
  {
    name: 'zena-pos',
    description: 'Offline-first point-of-sale system with M-Pesa mobile money integration',
    language: 'JavaScript',
    stars: 1,
    url: 'https://github.com/Warrenchris/zena-pos',
  },
  {
    name: 'ARTEMIS-II-LIVE-TRACKER',
    description: 'Real-time Artemis II lunar mission tracking dashboard and orbital telemetry',
    language: 'JavaScript',
    stars: 1,
    url: 'https://github.com/Warrenchris/ARTEMIS-II-LIVE-TRACKER',
  },
  {
    name: 'road-accident-analyzer',
    description: 'Supervised ML model for accident severity prediction and geospatial mapping',
    language: 'Python',
    stars: 0,
    url: 'https://github.com/Warrenchris/road-accident-analyzer',
  },
  {
    name: 'UniteUS',
    description: 'Community engagement platform connecting users for shared local initiatives',
    language: 'TypeScript',
    stars: 1,
    url: 'https://github.com/Warrenchris/UniteUS',
  },
  {
    name: 'python-car-rental-system',
    description: 'Full-stack vehicle booking and fleet reservation management system',
    language: 'Python',
    stars: 0,
    url: 'https://github.com/Warrenchris/python-car-rental-system',
  },
  {
    name: 'HuffmanTextCompression',
    description: 'Huffman coding lossless text compression algorithm implementation in C',
    language: 'C',
    stars: 0,
    url: 'https://github.com/Warrenchris/HuffmanTextCompression',
  },
];
