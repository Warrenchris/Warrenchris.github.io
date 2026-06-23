// ============================================================
// SITE DATA — Single source of truth for all portfolio content
// ============================================================

export const personalInfo = {
  name: 'Warren Chris',
  title: 'Network Engineer',
  roles: [
    'Network Engineer',
    'Cybersecurity Specialist',
    'Full Stack Developer',
    'Cloud Solutions Architect',
    'IT Consultant',
  ],
  bio: "I'm a passionate IT professional with 2+ years of experience in networking, cybersecurity, and software development. My mission is to build secure, scalable solutions that drive business innovation.",
  bioExtended:
    'Currently pursuing my Bachelor of Science in Information Technology at Jomo Kenyatta University of Agriculture and Technology, while freelancing. I specialize in network security and developing efficient, high-impact applications.',
  email: 'warrenchris745@gmail.com',
  phone: '+254 742 118572',
  location: 'Nairobi, Kenya',
  github: 'https://github.com/Warrenchris',
  linkedin: 'https://www.linkedin.com/in/warren-chris-723a00263',
  twitter: '#',
  university: 'Jomo Kenyatta University of Agriculture and Technology',
  degree: 'Bachelor of Science in Information Technology',
  avatar: '/warren.jpg',
  cvUrl: '#',
};

export const stats = [
  { label: 'Years Experience', value: 2, suffix: '+' },
  { label: 'Projects Completed', value: 15, suffix: '+' },
  { label: 'Certifications', value: 5, suffix: '' },
  { label: 'Happy Clients', value: 20, suffix: '+' },
];

export const skills = [
  {
    category: 'Security',
    icon: '🔒',
    color: '#FDE900',
    items: [
      { name: 'Network Security', level: 95 },
      { name: 'Cybersecurity', level: 88 },
      { name: 'Firewall Configuration', level: 90 },
      { name: 'SIEM Tools', level: 80 },
      { name: 'Compliance Standards', level: 85 },
      { name: 'Threat Analysis', level: 82 },
    ],
  },
  {
    category: 'Development',
    icon: '💻',
    color: '#F5A623',
    items: [
      { name: 'JavaScript / TypeScript', level: 85 },
      { name: 'Python', level: 90 },
      { name: 'React', level: 85 },
      { name: 'Node.js', level: 78 },
      { name: 'Java', level: 75 },
      { name: 'C / C++', level: 70 },
      { name: 'SQL / NoSQL', level: 82 },
      { name: 'RESTful APIs', level: 88 },
    ],
  },
  {
    category: 'Networking',
    icon: '🌐',
    color: '#FDE900',
    items: [
      { name: 'Cisco Routing & Switching', level: 92 },
      { name: 'Huawei Networking', level: 88 },
      { name: 'VPN Configuration', level: 85 },
      { name: 'Load Balancing', level: 80 },
      { name: 'SD-WAN', level: 78 },
      { name: 'Network Monitoring', level: 87 },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁️',
    color: '#F5A623',
    items: [
      { name: 'Cloud Computing', level: 82 },
      { name: 'Linux Administration', level: 88 },
      { name: 'Docker', level: 72 },
      { name: 'CI/CD Pipelines', level: 68 },
      { name: 'AWS / Azure Basics', level: 70 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: 'Artemis II Live Tracker',
    subtitle: 'NASA Mission Tracking Platform',
    description:
      'Real-time mission tracking platform for NASA Artemis II crewed lunar mission. Features live telemetry data visualization, trajectory mapping, and mission milestone tracking with interactive 3D Earth-Moon system.',
    longDescription:
      'A sophisticated mission control dashboard built for tracking the Artemis II crewed lunar mission. Integrates with NASA public APIs for live telemetry, features a 3D visualization of the spacecraft trajectory, countdown timers, crew information, and mission phase status indicators. Deployed as a public-facing awareness platform.',
    tech: ['React', 'Python', 'Three.js', 'NASA API', 'WebSocket', 'D3.js'],
    category: 'web',
    github: 'https://github.com/Warrenchris',
    demo: '#',
    image: '/artemis-tracker.png',
    featured: true,
    color: '#FDE900',
    tags: ['NASA', 'Space', 'Real-time', 'Visualization'],
  },
  {
    id: 2,
    title: 'ISP Billing & Management System',
    subtitle: 'Full-Stack Telecom Platform',
    description:
      'Enterprise-grade ISP billing and customer management system with automated invoicing, bandwidth monitoring, package management, and real-time network utilization dashboards.',
    longDescription:
      'A comprehensive platform designed for Internet Service Providers to manage subscribers, automate billing cycles, track bandwidth usage, enforce QoS policies, and generate detailed financial reports. Includes role-based admin portal, customer self-service portal, and automated payment gateway integration.',
    tech: ['Python', 'Flask', 'MySQL', 'JavaScript', 'Chart.js', 'Bootstrap'],
    category: 'cloud',
    github: 'https://github.com/Warrenchris',
    demo: '#',
    image: '/isp-billing.png',
    featured: true,
    color: '#F5A623',
    tags: ['ISP', 'Billing', 'Enterprise', 'Telecom'],
  },
  {
    id: 3,
    title: 'SigmaHRM Human Capital Suite',
    subtitle: 'HR Management Platform',
    description:
      'Full-featured Human Resource Management System covering employee lifecycle, payroll processing, leave management, performance reviews, and recruitment pipeline.',
    longDescription:
      'SigmaHRM is an end-to-end human capital management solution that streamlines HR operations for organizations. Features include employee onboarding workflows, automated payroll with tax calculation, leave and attendance tracking, KPI-based performance management, and an applicant tracking system (ATS) for recruitment.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'REST API', 'Docker'],
    category: 'web',
    github: 'https://github.com/Warrenchris',
    demo: '#',
    image: '/sigma-hrm.png',
    featured: true,
    color: '#FDE900',
    tags: ['HRM', 'Payroll', 'Enterprise', 'HR'],
  },
  {
    id: 4,
    title: 'Zana POS & Business Platform',
    subtitle: 'Point of Sale & Business Suite',
    description:
      'Modern point-of-sale and business management platform for retail and hospitality, featuring inventory control, sales analytics, multi-location support, and mobile receipt printing.',
    longDescription:
      'Zana is a complete business management ecosystem for SMEs. The POS system supports barcode scanning, multi-payment methods (cash, card, mobile money), and offline mode. The back-office suite includes real-time inventory tracking, supplier management, customer loyalty programs, and detailed sales reports with export capabilities.',
    tech: ['React', 'Python', 'SQLite', 'Electron', 'Tailwind CSS', 'M-Pesa API'],
    category: 'web',
    github: 'https://github.com/Warrenchris',
    demo: '#',
    image: '/zana-pos.png',
    featured: false,
    color: '#FFB800',
    tags: ['POS', 'Retail', 'Business', 'M-Pesa'],
  },
  {
    id: 5,
    title: 'Kenya Road Accidents Analyzer',
    subtitle: 'ML-Powered Analytics Dashboard',
    description:
      'Machine learning model and interactive dashboard for analyzing road accident patterns across Kenya, identifying hotspots, and predicting high-risk areas.',
    longDescription:
      'A data science project that combines machine learning with interactive visualization to analyze Kenya National Bureau of Statistics road accident data. Features a trained classification model for accident severity prediction, geospatial heatmaps, trend analysis by region/time/cause, and policy recommendation engine.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'JavaScript', 'Leaflet.js', 'Flask'],
    category: 'cloud',
    github: 'https://github.com/Warrenchris/road-accident-analyzer.git',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    featured: false,
    color: '#F5A623',
    tags: ['Machine Learning', 'Data Science', 'Python', 'Analytics'],
  },
  {
    id: 6,
    title: 'Flask-Based Car Rental Platform',
    subtitle: 'Full-Stack Rental Management',
    description:
      'Web application built with Flask enabling users to book, return, and pay for cars while providing admins with comprehensive vehicle, user, and payment management features.',
    longDescription:
      'A complete car rental management system with a customer-facing booking portal and an admin dashboard. Customers can browse available vehicles, make reservations, upload KYC documents, and process payments. Admins manage the fleet, track rental status, handle returns, process payments, and generate revenue reports.',
    tech: ['Python', 'Flask', 'SQLAlchemy', 'HTML', 'CSS', 'JavaScript'],
    category: 'web',
    github: 'https://github.com/Warrenchris/python-car-rental-system.git',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    featured: false,
    color: '#FFD700',
    tags: ['Flask', 'Python', 'CRUD', 'Payments'],
  },
  {
    id: 7,
    title: 'E-Commerce Platform',
    subtitle: 'Full-Stack Shopping Solution',
    description:
      'Comprehensive full-stack e-commerce solution with payment integration, inventory management, order tracking, and admin dashboard.',
    longDescription:
      'A feature-rich e-commerce platform built with Java and MySQL. Includes product catalog management, shopping cart, secure checkout with payment gateway integration, order management, customer accounts, admin inventory control, and sales analytics dashboard.',
    tech: ['Java', 'MySQL', 'Spring Boot', 'HTML', 'CSS', 'JavaScript'],
    category: 'web',
    github: 'https://github.com/Warrenchris',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    featured: false,
    color: '#FFED00',
    tags: ['Java', 'E-Commerce', 'MySQL', 'Spring'],
  },
];

export const experience = [
  {
    id: 1,
    role: 'Freelance IT Consultant',
    company: 'Self-Employed',
    period: '2023 – Present',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    description: [
      'Provided network security consulting for small to medium businesses',
      'Developed custom web applications using modern frameworks',
      'Implemented cybersecurity best practices and compliance standards',
      'Designed and deployed cloud-based solutions for clients',
      'Conducted security audits and vulnerability assessments',
    ],
    tech: ['Python', 'React', 'Cisco', 'Linux', 'AWS'],
    color: '#FDE900',
  },
  {
    id: 2,
    role: 'Technical Support Engineer',
    company: 'Realmer Technology Limited',
    period: '2024 – 2025',
    location: 'Nairobi, Kenya',
    type: 'Contract',
    description: [
      'Assisted in network infrastructure setup and maintenance',
      'Monitored network performance and troubleshot issues in real time',
      'Supported cybersecurity initiatives and policy implementation',
      'Managed help desk operations and resolved Level 1/2 tickets',
      'Configured and maintained Cisco and Huawei networking equipment',
    ],
    tech: ['Cisco IOS', 'Huawei VRP', 'Wireshark', 'Linux', 'SIEM'],
    color: '#F5A623',
  },
];

export const certifications = [
  {
    id: 1,
    title: 'Cisco DevNet Associate',
    issuer: 'Cisco',
    year: '2025',
    logo: 'https://images.credly.com/size/340x340/images/e21e94f7-feec-4717-9687-ac150b213f64/Cisco_DevNetAsst_600.png',
    color: '#00bceb',
    description: 'Network automation, programmability, and application development',
  },
  {
    id: 2,
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    year: '2025',
    logo: 'https://images.credly.com/size/340x340/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png',
    color: '#00bceb',
    description: 'Cybersecurity fundamentals, threat landscape, and defense strategies',
  },
  {
    id: 3,
    title: 'HCIA – Datacom',
    issuer: 'Huawei',
    year: '2024',
    logo: 'https://images.credly.com/size/340x340/images/53549a05-47b4-4638-afe0-c9bf57f03c64/image.png',
    color: '#cf0a2c',
    description: 'Huawei data communications, routing, and switching technologies',
  },
  {
    id: 4,
    title: 'Red Hat System Administration I',
    issuer: 'Red Hat',
    year: '2024',
    logo: '/images/redhat-logo.png',
    color: '#ee0000',
    description: 'Linux administration, system management, and enterprise deployments',
  },
  {
    id: 5,
    title: 'Enterprise Design Thinking Practitioner',
    issuer: 'IBM',
    year: '2023',
    logo: '/images/ibm-logo.png',
    color: '#0530ad',
    description: 'Human-centered design principles and enterprise innovation methodology',
  },
];

export const services = [
  {
    icon: '🌐',
    title: 'Full Stack Development',
    description: 'End-to-end web applications using React, Node.js, Python with modern architecture and clean code practices.',
    features: ['React / Next.js Frontend', 'Python / Node.js Backend', 'REST & GraphQL APIs', 'Database Design'],
    color: '#FDE900',
  },
  {
    icon: '🔒',
    title: 'Cybersecurity Consulting',
    description: 'Comprehensive security audits, penetration testing, compliance implementation, and threat mitigation strategies.',
    features: ['Security Audits', 'Vulnerability Assessment', 'Compliance (ISO 27001)', 'Incident Response'],
    color: '#FFB800',
  },
  {
    icon: '🌐',
    title: 'Network Engineering',
    description: 'Design, implementation, and optimization of enterprise network infrastructure using Cisco and Huawei technologies.',
    features: ['Cisco & Huawei Setup', 'VPN & SD-WAN', 'Network Monitoring', 'Troubleshooting'],
    color: '#FDE900',
  },
  {
    icon: '☁️',
    title: 'Cloud Solutions',
    description: 'Cloud architecture design, migration strategies, and deployment automation for scalable, resilient infrastructure.',
    features: ['Cloud Architecture', 'Migration Planning', 'Cost Optimization', 'DevOps Integration'],
    color: '#F5A623',
  },
  {
    icon: '🔌',
    title: 'API Development',
    description: 'Robust, well-documented REST and GraphQL APIs with authentication, rate limiting, and comprehensive testing.',
    features: ['RESTful API Design', 'GraphQL', 'API Security', 'Documentation'],
    color: '#F5A623',
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Modern, intuitive interfaces with a focus on user experience, accessibility, and premium visual design.',
    features: ['Responsive Design', 'Prototyping', 'Component Libraries', 'Accessibility'],
    color: '#FFD700',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'James Mwangi',
    role: 'CEO, TechBridge Solutions',
    avatar: 'https://ui-avatars.com/api/?name=James+Mwangi&background=00d4ff&color=020817&size=100',
    content: "Warren delivered an outstanding network security overhaul for our company. His attention to detail and deep technical knowledge made the project a huge success. Highly recommended!",
    rating: 5,
    color: '#FDE900',
  },
  {
    id: 2,
    name: 'Aisha Kamau',
    role: 'CTO, FinServe Africa',
    avatar: 'https://ui-avatars.com/api/?name=Aisha+Kamau&background=9333ea&color=fff&size=100',
    content: "The ISP billing system Warren built completely transformed our operations. Automated billing, real-time monitoring — everything we needed and more. Exceptional work.",
    rating: 5,
    color: '#F5A623',
  },
  {
    id: 3,
    name: 'David Ochieng',
    role: 'Operations Manager, Realmer Technology',
    avatar: 'https://ui-avatars.com/api/?name=David+Ochieng&background=10b981&color=fff&size=100',
    content: "Working with Warren was an absolute pleasure. He's technically brilliant, communicates clearly, and always delivers on time. Our network uptime improved dramatically.",
    rating: 5,
    color: '#FDE900',
  },
  {
    id: 4,
    name: 'Sarah Njeri',
    role: 'Founder, RetailPro Kenya',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Njeri&background=ec4899&color=fff&size=100',
    content: "Zana POS has been a game-changer for our retail chain. Warren understood exactly what we needed and built a robust, easy-to-use system that our staff love.",
    rating: 5,
    color: '#FFB800',
  },
];

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];
