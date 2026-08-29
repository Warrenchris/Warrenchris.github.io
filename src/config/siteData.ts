// ============================================================
// SITE DATA — Single source of truth for all portfolio content
// ============================================================

export const personalInfo = {
  name: 'Warren Chris',
  title: 'Software Engineer & Systems Builder',
  headline: 'I build software systems that solve real problems.',
  subheadline:
    'Full-stack engineering · Intelligent systems · Infrastructure · Security',
  bio: "I engineer software systems end-to-end — from database schema to deployment pipeline. My work spans full-stack development, network infrastructure, cybersecurity, and intelligent systems.",
  bioExtended:
    "I'm completing a BSc in Information Technology at JKUAT, but my focus has always been on building production systems. I care about clean architecture, security by default, and software that works reliably under real conditions.",
  email: 'warrenchris745@gmail.com',
  location: 'Nairobi, Kenya',
  github: 'https://github.com/Warrenchris',
  linkedin: 'https://www.linkedin.com/in/warren-chris-723a00263',
  university: 'Jomo Kenyatta University of Agriculture and Technology',
  degree: 'Bachelor of Science in Information Technology',
  avatar: '/warren-avatar.jpg',
  cvUrl: '/warren-chris-cv.pdf',
};

export const skillGroups = [
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C / C++', 'SQL'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Vite', 'Tailwind CSS', 'HTML / CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Flask', 'Spring Boot', 'REST APIs'],
  },
  {
    category: 'Data',
    items: ['MySQL', 'PostgreSQL', 'SQLite', 'Redis'],
  },
  {
    category: 'Infrastructure',
    items: ['Docker', 'Linux', 'Git', 'CI/CD', 'Cloud (AWS / Azure)'],
  },
  {
    category: 'Security',
    items: [
      'Network Security',
      'Application Security',
      'Firewall Configuration',
      'SIEM Tools',
      'Vulnerability Assessment',
    ],
  },
  {
    category: 'Networking',
    items: ['Cisco Routing & Switching', 'Huawei Datacom', 'VPN', 'SD-WAN'],
  },
];

export const projects = [
  {
    id: 1,
    title: 'ISP Billing & Management System',
    subtitle: 'Full-Stack Telecom Platform',
    description:
      'Enterprise-grade ISP billing and customer management system with automated invoicing, bandwidth monitoring, and real-time network utilization dashboards.',
    problem:
      'ISPs struggle with manual billing processes, inaccurate bandwidth tracking, and lack of real-time customer management tools.',
    solution:
      'Built a comprehensive platform automating billing cycles, bandwidth monitoring via FreeRADIUS integration, and a customer self-service portal.',
    architecture:
      'React frontend with Node.js/Express backend, MySQL database, Redis for caching, BullMQ for async job queues, FreeRADIUS for RADIUS authentication, Docker for containerized deployment.',
    engineering:
      'Implemented rate limiting, service isolation, automated database backups, and production hardening. Integrated M-Pesa API for mobile payment processing.',
    security:
      'JWT authentication, role-based access control, encrypted payment data, secure API endpoints with rate limiting and input validation.',
    outcome:
      'Automated billing workflows, reduced manual errors, real-time bandwidth monitoring for 500+ subscribers.',
    tech: [
      'React',
      'Node.js',
      'Express',
      'MySQL',
      'Redis',
      'BullMQ',
      'FreeRADIUS',
      'M-Pesa',
      'Docker',
    ],
    github: 'https://github.com/Warrenchris',
    demo: '',
    image: '/isp-billing.png',
    featured: true,
    tags: ['Full Stack', 'Backend', 'Infrastructure'],
  },
  {
    id: 2,
    title: 'SigmaHRM Human Capital Suite',
    subtitle: 'Enterprise HR Platform',
    description:
      'Full-featured Human Resource Management System covering employee lifecycle, payroll processing, leave management, and performance reviews.',
    problem:
      'Organizations need streamlined HR operations for employee onboarding, payroll automation, and performance tracking.',
    solution:
      'End-to-end HR platform with automated workflows, payroll processing with tax calculations, and applicant tracking system.',
    architecture:
      'React frontend with TypeScript, Node.js/Express backend, PostgreSQL database, RESTful API design, Docker deployment.',
    engineering:
      'Implemented complex payroll tax calculation engine, leave balance algorithms, and KPI-based performance scoring systems.',
    security:
      'Role-based access control, encrypted employee data, audit logging, secure file uploads for documents.',
    outcome:
      'Reduced HR administrative overhead, automated payroll processing for 200+ employees.',
    tech: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'PostgreSQL',
      'REST API',
      'Docker',
    ],
    github: 'https://github.com/Warrenchris',
    demo: '',
    image: '/sigma-hrm.png',
    featured: true,
    tags: ['Full Stack', 'Business Systems', 'Backend'],
  },
  {
    id: 3,
    title: 'Zana POS & Business Platform',
    subtitle: 'Point of Sale & Business Suite',
    description:
      'Modern point-of-sale and business management platform for retail and hospitality with inventory control, sales analytics, and multi-location support.',
    problem:
      'SMEs lack integrated systems for POS operations, inventory management, and business analytics.',
    solution:
      'Complete business ecosystem with barcode scanning, multi-payment methods including M-Pesa, offline mode, and back-office analytics.',
    architecture:
      'React frontend, Python/Flask backend, SQLite for local storage, Electron for desktop deployment, M-Pesa API integration.',
    engineering:
      'Implemented offline-first architecture with sync capabilities, real-time inventory updates, and receipt printing.',
    security:
      'Local data encryption, secure payment processing, user authentication with role-based permissions.',
    outcome:
      'Streamlined retail operations for 3 locations, reduced inventory discrepancies.',
    tech: [
      'React',
      'Python',
      'Flask',
      'SQLite',
      'Electron',
      'Tailwind CSS',
      'M-Pesa API',
    ],
    github: 'https://github.com/Warrenchris',
    demo: '',
    image: '/zana-pos.png',
    featured: true,
    tags: ['Full Stack', 'Business Systems', 'Infrastructure'],
  },
  {
    id: 4,
    title: 'Kenya Road Accidents Analyzer',
    subtitle: 'ML-Powered Analytics Dashboard',
    description:
      'Machine learning model and interactive dashboard for analyzing road accident patterns, identifying hotspots, and predicting high-risk areas.',
    problem:
      'Kenya lacks data-driven tools for analyzing road accident patterns and predicting high-risk areas for intervention.',
    solution:
      'Built ML classification model with interactive visualization dashboard using KNBS road accident data.',
    architecture:
      'Python backend with Scikit-learn for ML, Flask API, JavaScript frontend with Leaflet.js for geospatial visualization.',
    engineering:
      'Trained classification model for accident severity prediction, implemented geospatial heatmaps, trend analysis algorithms.',
    security:
      'API rate limiting, input validation, secure data handling for sensitive location data.',
    outcome:
      'Identified high-risk accident hotspots, provided data-driven recommendations for policy intervention.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'JavaScript', 'Leaflet.js'],
    github: 'https://github.com/Warrenchris/road-accident-analyzer',
    demo: '',
    image: '',
    featured: false,
    tags: ['AI', 'Backend', 'Full Stack'],
  },
  {
    id: 5,
    title: 'Network Security Audit Tool',
    subtitle: 'Cybersecurity Automation',
    description:
      'Automated network security scanning and vulnerability assessment tool for identifying security gaps and generating compliance reports.',
    problem:
      'Manual security audits are time-consuming and error-prone, leading to missed vulnerabilities.',
    solution:
      'Automated scanning tool with Nmap integration, vulnerability detection, and automated report generation.',
    architecture:
      'Python backend with Nmap integration, scanning scheduler, report generation engine, web dashboard for results.',
    engineering:
      'Implemented parallel scanning, vulnerability database integration, CIS benchmark compliance checking.',
    security:
      'Encrypted scan results, role-based access, secure credential management for target systems.',
    outcome:
      'Reduced audit time significantly, improved vulnerability detection accuracy.',
    tech: ['Python', 'Nmap', 'Flask', 'Automation'],
    github: 'https://github.com/Warrenchris',
    demo: '',
    image: '',
    featured: false,
    tags: ['Cybersecurity', 'Backend'],
  },
  {
    id: 6,
    title: 'Car Rental Management System',
    subtitle: 'Full-Stack Rental Platform',
    description:
      'Complete car rental management with booking portal, fleet management, payment processing, and revenue analytics.',
    problem:
      'Car rental businesses need integrated systems for fleet management, booking, and payment processing.',
    solution:
      'Full-stack platform with customer booking portal and admin dashboard for fleet and revenue management.',
    architecture:
      'Flask backend with SQLAlchemy ORM, PostgreSQL database, Stripe payment integration, React admin dashboard.',
    engineering:
      'Implemented booking availability algorithms, automated payment processing, fleet utilization analytics.',
    security:
      'Secure payment processing, user authentication, encrypted customer data.',
    outcome: 'Automated booking workflows, increased fleet utilization.',
    tech: ['Python', 'Flask', 'SQLAlchemy', 'PostgreSQL', 'React', 'Stripe API'],
    github: 'https://github.com/Warrenchris/python-car-rental-system',
    demo: '',
    image: '',
    featured: false,
    tags: ['Full Stack', 'Backend', 'Business Systems'],
  },
  {
    id: 7,
    title: 'E-Commerce Platform',
    subtitle: 'Java-Based Shopping Solution',
    description:
      'Full-stack e-commerce platform with product catalog, shopping cart, secure checkout, and admin inventory management.',
    problem:
      'Small businesses need affordable e-commerce solutions with inventory management and payment integration.',
    solution:
      'Java-based e-commerce platform with Spring Boot backend, secure checkout, and admin dashboard.',
    architecture:
      'Spring Boot backend, MySQL database, Thymeleaf templates, Stripe payment integration, RESTful APIs.',
    engineering:
      'Implemented shopping cart state management, order processing workflows, inventory tracking algorithms.',
    security:
      'Spring Security authentication, CSRF protection, secure payment processing, input validation.',
    outcome: 'Functional e-commerce platform with order processing capabilities.',
    tech: ['Java', 'Spring Boot', 'MySQL', 'Thymeleaf', 'Stripe API', 'REST API'],
    github: 'https://github.com/Warrenchris',
    demo: '',
    image: '',
    featured: false,
    tags: ['Full Stack', 'Backend'],
  },
];

export const experience = [
  {
    role: 'Freelance IT Consultant',
    company: 'Self-Employed',
    period: '2023 – Present',
    location: 'Nairobi, Kenya',
    description: [
      'Network security consulting for small and medium businesses',
      'Custom web application development using React, Node.js, and Python',
      'Cybersecurity audits and compliance implementation',
      'Cloud infrastructure design and deployment',
    ],
    tech: ['Python', 'React', 'Cisco', 'Linux', 'AWS'],
  },
  {
    role: 'Technical Support Engineer',
    company: 'Realmer Technology Limited',
    period: '2024 – 2025',
    location: 'Nairobi, Kenya',
    description: [
      'Network infrastructure setup and maintenance',
      'Real-time network performance monitoring and troubleshooting',
      'Cybersecurity policy implementation',
      'Cisco and Huawei networking equipment configuration',
    ],
    tech: ['Cisco IOS', 'Huawei VRP', 'Wireshark', 'Linux', 'SIEM'],
  },
];

export const principles = [
  {
    title: 'Security First',
    description:
      'Systems designed with authentication, authorization, and failure scenarios in mind from the start.',
  },
  {
    title: 'Production Mindset',
    description:
      "Software isn't finished when it runs locally. Monitoring, logging, and error handling are essential.",
  },
  {
    title: 'Systems Thinking',
    description:
      'Frontend, backend, databases, infrastructure, and external services must work as one cohesive system.',
  },
  {
    title: 'Continuous Learning',
    description:
      'Technology evolves, so engineering practice must evolve with it.',
  },
];

export const certifications = [
  {
    title: 'Cisco DevNet Associate',
    issuer: 'Cisco',
    year: '2025',
    description:
      'Network automation, programmability, and application development',
  },
  {
    title: 'HCIA – Datacom',
    issuer: 'Huawei',
    year: '2024',
    description:
      'Data communications, routing, and switching technologies',
  },
  {
    title: 'Enterprise Design Thinking Practitioner',
    issuer: 'IBM',
    year: '2023',
    description:
      'Human-centered design principles and enterprise innovation methodology',
  },
  {
    title: 'Red Hat System Administration I',
    issuer: 'Red Hat',
    year: '2024',
    description:
      'Linux administration, system management, and enterprise deployments',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    year: '2025',
    description:
      'Cybersecurity fundamentals, threat landscape, and defense strategies',
  },
];

export const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];
