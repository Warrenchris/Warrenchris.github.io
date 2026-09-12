import { ProjectCaseStudy, SkillCategory, Certification, EngineeringPrinciple } from '../types';

export const PERSONAL_INFO = {
  name: "Warren Chris",
  role: "Software Engineer & Systems Builder",
  location: "Nairobi, Kenya (Available Worldwide / Remote)",
  timezone: "EAT (UTC+3)",
  email: "warrenchris745@gmail.com",
  github: "https://github.com/warrenchris",
  linkedin: "https://linkedin.com/in/warrenchris",
  tagline: "I build software systems that solve real problems.",
  shortBio: "Software engineer and systems builder with deep focus on distributed backend services, asynchronous queues, network automation (FreeRADIUS / AAA), and operational business platforms.",
  yearsExperience: "3+ Years Building Systems",
  availabilityStatus: "Open for Full-Time Roles & High-Impact Contracts"
};

export const PROJECTS_DATA: ProjectCaseStudy[] = [
  {
    id: "isp-billing-engine",
    title: "ISP Billing & Subscriber Management Engine",
    subtitle: "High-throughput AAA billing, FreeRADIUS automation, M-Pesa instant settlement & BullMQ lifecycle queues",
    category: ["all", "backend", "fullstack", "infrastructure", "security"],
    isFlagship: true,
    featuredOrder: 1,
    period: "Flagship Production System",
    role: "Lead Systems Architect & Backend Engineer",
    brief: "An end-to-end automated ISP billing engine integrating M-Pesa Daraja API for idempotent payments, BullMQ/Redis for time-critical subscriber expiration workflows, and FreeRADIUS for dynamic PPPoE/Hotspot network access enforcement.",
    problem: {
      overview: "Small-to-medium Internet Service Providers (ISPs) suffer high operational friction and revenue leakage due to manual account provisioning, delayed mobile money reconciliations, and desynchronized router access lists.",
      keyChallenges: [
        "Handling concurrent M-Pesa webhook callbacks without double-crediting customer accounts.",
        "Executing instantaneous bandwidth cut-off and reconnection across distributed MikroTik Network Access Servers (NAS).",
        "Maintaining deterministic subscriber state despite unexpected network timeouts or database latency."
      ]
    },
    solution: {
      overview: "Engineered a containerized microservices platform combining asynchronous worker queues, a hardened Express.js API, and a custom FreeRADIUS MySQL schema dictionary.",
      coreCapabilities: [
        "Instant M-Pesa C2B/STK Push webhook processor with cryptographic signature verification and idempotent payload caching in Redis.",
        "BullMQ distributed scheduler triggering deterministic user activation, speed profile throttle, and automated RADIUS accounting updates.",
        "Service-isolated Docker Compose deployment with automated daily mysqldump volume snapshots and healthcheck probes.",
        "Real-time administrative dashboard for subscriber bandwidth usage, active PPPoE sessions, revenue charts, and manual router CoA (Change of Authorization) overrides."
      ]
    },
    architecture: {
      description: "Asynchronous, event-driven pipeline where incoming webhook events are acknowledged immediately (<50ms), stored in a Redis job queue, and processed by isolated background workers updating both MySQL state and FreeRADIUS authorization records.",
      diagramType: "isp-flow",
      flowSteps: [
        {
          step: 1,
          title: "Payment Ingestion",
          description: "M-Pesa sends instant transaction webhook to `/api/v1/payments/callback`. Express validates token & logs raw payload.",
          tech: "Express / JWT / Crypto"
        },
        {
          step: 2,
          title: "Idempotency Lock & Queueing",
          description: "Acquires Redis lock on TransactionID. Dispatches `renew-subscriber` job to BullMQ queue with retry backoff.",
          tech: "Redis / BullMQ"
        },
        {
          step: 3,
          title: "Subscriber Lifecycle State",
          description: "Worker updates MySQL account expiry, generates invoice ledger, and refreshes radcheck / radreply attributes.",
          tech: "Node.js / MySQL"
        },
        {
          step: 4,
          title: "FreeRADIUS Access Enforcement",
          description: "FreeRADIUS daemon reads updated credentials, issuing MikroTik CoA packet to unblock bandwidth or disconnect expired session.",
          tech: "FreeRADIUS 3.x / UDP / CoA"
        }
      ]
    },
    engineeringDecisions: [
      {
        decision: "BullMQ + Redis for Subscriber Lifecycle",
        rationale: "Directly triggering network timeouts inside HTTP requests creates cascade failures when NAS routers lag. Queues decouple payment acceptance from router provisioning.",
        impact: "Zero lost transactions during network blips; guaranteed 99.9% reconciliation SLA."
      },
      {
        decision: "FreeRADIUS Direct MySQL Dictionary mapping",
        rationale: "Rather than custom router scripting over SSH/REST, utilizing FreeRADIUS standard radcheck/radgroupreply enables native router hardware interoperability.",
        impact: "Universal support for MikroTik, Cisco, and pfSense without altering application code."
      },
      {
        decision: "Strict Atomic DB Transactions & Redis Distributed Locks",
        rationale: "Prevents race conditions when automated scheduled checks and customer payment webhooks hit the subscriber record concurrently.",
        impact: "Completely eliminated double billing and erroneous service terminations."
      }
    ],
    securityAndReliability: [
      "Rate-limited API endpoints via token bucket algorithm to prevent brute-force portal attacks.",
      "Input validation & parameterized SQL queries eliminating SQL injection risks.",
      "Strict network isolation: FreeRADIUS and Database containers reside on private Docker bridge networks without exposed public ports.",
      "Automated automated offsite backup routine with gzip compression and SHA256 integrity checksums."
    ],
    outcomes: [
      "Reduced average subscriber renewal turnaround from ~12 minutes (manual) to < 3 seconds end-to-end.",
      "Successfully scaled to thousands of active concurrent RADIUS authentication sessions.",
      "Completely automated revenue reconciliation with zero discrepancy across mobile money statements."
    ],
    tags: ["Node.js", "Express", "MySQL", "Redis", "BullMQ", "FreeRADIUS", "M-Pesa Daraja", "Docker", "MikroTik CoA"],
    coreTech: {
      backend: ["Node.js", "Express.js", "BullMQ Worker Engine"],
      frontend: ["React", "TypeScript", "Tailwind CSS", "Lucide Icons"],
      data: ["MySQL (InnoDB)", "Redis (In-Memory Cache & Job Queue)"],
      infra: ["Docker", "Docker Compose", "Nginx Reverse Proxy", "Linux (Ubuntu Server)"],
      protocols: ["RADIUS (RFC 2865)", "PPPoE", "HTTP/REST", "Webhooks"]
    },
    githubUrl: "https://github.com/warrenchris",
    hasInteractiveDemo: true,
    snippets: [
      {
        title: "Idempotent Webhook & BullMQ Dispatcher",
        language: "typescript",
        code: `// Express Route: M-Pesa C2B Settlement Webhook
export async function handleMpesaCallback(req: Request, res: Response) {
  const { TransID, BillRefNumber, TransAmount } = req.body;
  
  // 1. Acquire distributed lock on transaction ID to prevent duplicate callbacks
  const acquired = await redisClient.set(\`lock:tx:\${TransID}\`, '1', 'NX', 'EX', 60);
  if (!acquired) {
    return res.status(200).json({ ResultCode: 0, ResultDesc: 'Already processed' });
  }

  // 2. Enqueue asynchronous subscriber renewal job
  await subscriberQueue.add('renew-subscription', {
    accountNumber: BillRefNumber.trim(),
    transactionId: TransID,
    amount: parseFloat(TransAmount),
    receivedAt: new Date().toISOString()
  }, {
    attempts: 5,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: true
  });

  // 3. Fast acknowledgment to mobile money gateway (<50ms)
  return res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted for processing' });
}`,
        explanation: "Separates fast webhook acknowledgment from long-running database updates and RADIUS CoA packet dispatches."
      }
    ]
  },
  {
    id: "supplier-intelligence-platform",
    title: "Supplier Intelligence & Procurement Optimization Platform",
    subtitle: "Canonical product identity resolution, FX currency normalization, and supplier price variance engine",
    category: ["all", "fullstack", "backend", "business"],
    isFlagship: true,
    featuredOrder: 2,
    period: "Enterprise Systems Project",
    role: "Full-Stack Engineer & Database Architect",
    brief: "A data-intensive procurement platform that normalizes disparate supplier catalogs, resolves fuzzy product naming into unified canonical SKUs, and generates real-time cost-variance matrices for optimal purchase decisions.",
    problem: {
      overview: "Procurement teams struggle to compare multiple vendor price lists due to irregular item descriptions, differing unit metrics (e.g. box vs case vs kg), and volatile exchange rates.",
      keyChallenges: [
        "Matching identical items across different vendors without reliable universal UPC/EAN barcodes.",
        "Calculating real landed cost accounting for fluctuating foreign exchange rates and shipping tariffs.",
        "Providing historical price trend analytics without causing expensive analytical query latency."
      ]
    },
    solution: {
      overview: "Built an intelligent catalog ingestion pipeline that parses supplier data feeds, matches them against canonical product profiles, and exposes decision snapshots for purchasing leads.",
      coreCapabilities: [
        "Canonical Product Identity Engine mapping supplier SKU variants to master product records.",
        "Dynamic FX Normalization service indexing daily exchange rates with automatic margin simulation.",
        "Supplier scorecard computing fulfillment reliability, price stability, and lead-time deviation metrics.",
        "Point-in-time Decision Snapshots enabling immutable historical auditing of why a specific vendor was selected."
      ]
    },
    architecture: {
      description: "Modular full-stack service with layered data transformations: Ingestion -> Fuzzy Identity Matching -> Currency Normalization -> Cost Matrix Calculation -> Interactive Analytics View.",
      diagramType: "procurement-matrix",
      flowSteps: [
        {
          step: 1,
          title: "Catalog Ingestion",
          description: "Vendors upload CSV/JSON price feeds. Data is validated and stored in staging records.",
          tech: "TypeScript / Node Streams"
        },
        {
          step: 2,
          title: "Identity Normalization",
          description: "Fuzzy string matching & phonetic tokenization resolves items to Canonical Master IDs.",
          tech: "Levenshtein & Custom Tokenizer"
        },
        {
          step: 3,
          title: "Cost & Currency Engine",
          description: "Multi-currency prices are normalized to base currency using cached central bank FX rates.",
          tech: "PostgreSQL / Redis"
        },
        {
          step: 4,
          title: "Procurement Matrix UI",
          description: "React dashboard presents ranked supplier options with price elasticity and lead-time scores.",
          tech: "React / Tailwind / Recharts"
        }
      ]
    },
    engineeringDecisions: [
      {
        decision: "Canonical Item Identity vs Raw Direct Supplier Tables",
        rationale: "Decoupled supplier-specific naming from internal product inventory to ensure vendor catalog changes never corrupt internal stock references.",
        impact: "Seamlessly supports switching vendors without re-training warehouse or accounting staff."
      },
      {
        decision: "Materialized Decision Snapshots",
        rationale: "Saved purchases store an immutable JSON snapshot of all comparison metrics at the exact moment of order authorization.",
        impact: "Guaranteed audit compliance; eliminates discrepancies if vendor later modifies catalog rates."
      }
    ],
    securityAndReliability: [
      "Strict role-based access control (RBAC) preventing unauthorized price adjustments or purchase order approvals.",
      "Input sanitation on bulk CSV uploads guarding against formula injection (CSV injection).",
      "Redis caching layer for FX rates with stale-while-revalidate fallback to avoid blocking on external API downtime."
    ],
    outcomes: [
      "Reduced procurement catalog comparison time from hours of spreadsheet manual lookup to under 15 seconds.",
      "Identified 8–14% cost variance on identical commodity SKUs across competing vendors.",
      "Architected clean relational schema supporting hundreds of thousands of item catalog records."
    ],
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "Data Modeling", "Business Intelligence"],
    coreTech: {
      backend: ["Node.js", "Express / REST", "PostgreSQL"],
      frontend: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
      data: ["PostgreSQL (Relational Schema)", "Redis (FX Cache)"],
      infra: ["Docker", "Linux"]
    },
    githubUrl: "https://github.com/warrenchris"
  },
  {
    id: "pos-business-suite",
    title: "Point of Sale & Business Operations Suite",
    subtitle: "Offline-resilient retail point-of-sale, double-entry inventory ledger & multi-branch sales reporting",
    category: ["all", "fullstack", "business"],
    isFlagship: false,
    featuredOrder: 3,
    period: "Production Business Application",
    role: "Full-Stack Software Engineer",
    brief: "A comprehensive retail management system featuring instant barcode checkout, inventory receiving workflows, dual-entry stock ledger, and cash-drawer reconciliation.",
    problem: {
      overview: "Retail businesses encounter inventory shrinkage and checkout bottlenecks due to laggy cloud-only POS systems that crash during network intermittency.",
      keyChallenges: [
        "Zero-latency barcode scanning and instant cart calculation during peak checkout lines.",
        "Maintaining rigorous double-entry stock ledger so every physical unit is accounted for across receipts, adjustments, and returns."
      ]
    },
    solution: {
      overview: "Engineered a rapid-response desktop and web POS application utilizing local-first optimistic UI updates, background database synchronization, and structured cashier shift reconciliation.",
      coreCapabilities: [
        "Sub-10ms cart state calculations with keyboard shortcuts and physical barcode scanner integration.",
        "Inventory receiving module with purchase order matching and landed cost adjustments.",
        "Cash drawer shift tracking with opening float, mid-shift pay-outs, and closing variance audits.",
        "Daily profit-and-loss and fast-moving SKU velocity analytics."
      ]
    },
    architecture: {
      description: "Client-side cached state with optimistic transaction staging, backed by a normalized MySQL relational schema with foreign key constraints and ACID transaction isolation.",
      diagramType: "pos-ledger",
      flowSteps: [
        {
          step: 1,
          title: "Barcode Ingestion",
          description: "Hardware scanner event parsed into indexed SKU lookup with sub-10ms UI update.",
          tech: "React State Machine"
        },
        {
          step: 2,
          title: "Checkout & Tender",
          description: "Split-tender payment (Cash, Card, M-Pesa) processed with atomic stock deduction.",
          tech: "Express / MySQL Transaction"
        },
        {
          step: 3,
          title: "Dual-Entry Stock Ledger",
          description: "System writes debit/credit records to `inventory_ledger` table with immutable timestamp.",
          tech: "MySQL Stored Procedures"
        }
      ]
    },
    engineeringDecisions: [
      {
        decision: "Immutable Inventory Ledger vs Mutable Quantity Columns",
        rationale: "Rather than updating a single `stock_qty` cell, every movement generates an immutable ledger row (SALE, RECEIVING, ADJUSTMENT).",
        impact: "Enabled 100% forensic auditability for stock discrepancies and shrinkage detection."
      }
    ],
    securityAndReliability: [
      "Strict cashier permission boundaries; sensitive operations (e.g. price overrides, order voids) require supervisor pin verification.",
      "Database connection pooling and prepared statements preventing SQL injection.",
      "Encrypted local storage for offline cart recovery during sudden power interruptions."
    ],
    outcomes: [
      "Handled rapid barcode scanning seamlessly without UI frame drops.",
      "Provided store owners with clear insight into margins, top-selling categories, and dead stock."
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MySQL", "Inventory Systems", "REST API"],
    coreTech: {
      frontend: ["React", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express"],
      data: ["MySQL", "IndexedDB Cache"]
    },
    githubUrl: "https://github.com/warrenchris"
  },
  {
    id: "sigma-hrm-platform",
    title: "SigmaHRM Enterprise Workflow System",
    subtitle: "Multi-tier employee lifecycle, granular RBAC permissions, state machine leave management & automated payroll",
    category: ["all", "fullstack", "business", "security"],
    isFlagship: false,
    featuredOrder: 4,
    period: "Enterprise Management System",
    role: "Full-Stack Engineer",
    brief: "An enterprise human resource management platform with fine-grained role-based access controls, workflow approval state machines, statutory payroll deduction pipelines, and audit logs.",
    problem: {
      overview: "Organizations struggle with HR data leaks and payroll calculation errors caused by spreadsheets and disjointed email approval chains.",
      keyChallenges: [
        "Enforcing strict separation of duties between department heads, HR managers, and finance officers.",
        "Handling complex statutory tax tiers and custom deduction formulas across diverse employee contract types."
      ]
    },
    solution: {
      overview: "Built a centralized HR platform featuring role-based permission matrices, deterministic leave state machines, and transparent payroll run generation.",
      coreCapabilities: [
        "Granular RBAC permission hierarchy guarding sensitive employee PII and compensation data.",
        "Multi-stage leave request approvals with real-time balance accrual and conflict detection.",
        "Automated payroll calculation engine computing statutory taxes (PAYE, NHIF, NSSF, Housing Levy) and custom allowances.",
        "Comprehensive change-log audit trail tracking all employee profile modifications."
      ]
    },
    architecture: {
      description: "State-machine driven workflow backend with JWT session security, role verification middleware, and relational data integrity rules.",
      diagramType: "hrm-rbac",
      flowSteps: [
        {
          step: 1,
          title: "Authentication & Role Claim",
          description: "User signs in; JWT token issued with signed permission claims and department scope.",
          tech: "JWT / bcrypt / Middleware"
        },
        {
          step: 2,
          title: "Approval State Transition",
          description: "Leave or expense request transitions through strict states (SUBMITTED -> DEPT_APPROVED -> HR_AUTHORIZED).",
          tech: "TypeScript State Engine"
        },
        {
          step: 3,
          title: "Statutory Payroll Execution",
          description: "Batch processor calculates tax tiers and exports itemized payslips and bank settlement files.",
          tech: "Node.js / PDF Generation"
        }
      ]
    },
    engineeringDecisions: [
      {
        decision: "Explicit Permission Matrix vs Generic Roles",
        rationale: "Instead of hardcoding 'admin' checks, created fine-grained permissions (`employee:read_salary`, `leave:override_balance`).",
        impact: "Allows bespoke role creation for auditors and temporary acting department leads without modifying code."
      }
    ],
    securityAndReliability: [
      "PII data encryption at rest for identification documents and banking details.",
      "Immutable audit log records with actor IP address and user-agent stamps.",
      "Strict CORS policy and HTTP-only cookie authentication storage."
    ],
    outcomes: [
      "Eliminated payroll calculation discrepancies across multi-tiered tax calculations.",
      "Streamlined leave approval turnaround from days of paper routing to one-click manager sign-off."
    ],
    tags: ["React", "TypeScript", "Node.js", "Express", "MySQL", "RBAC", "Enterprise Workflows"],
    coreTech: {
      frontend: ["React", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express", "JWT Auth"],
      data: ["MySQL", "Data Modeling"]
    },
    githubUrl: "https://github.com/warrenchris"
  },
  {
    id: "network-security-packet-analyzer",
    title: "Network Telemetry & Protocol State Monitor",
    subtitle: "Connection state tracker, anomalous traffic frequency detector & socket baseline analyzer",
    category: ["all", "backend", "security", "infrastructure"],
    isFlagship: false,
    featuredOrder: 5,
    period: "Systems & Security Project",
    role: "Systems & Network Engineer",
    brief: "A lightweight network telemetry tool for capturing raw socket metrics, classifying IP connection states, and detecting rapid port scans and suspicious protocol anomalies.",
    problem: {
      overview: "Network administrators need accessible, low-overhead tooling to inspect traffic flows and pinpoint irregular socket behavior without deploying bloated enterprise monitoring agents.",
      keyChallenges: [
        "Parsing raw packet headers efficiently without dropping frames during high burst activity.",
        "Correlating TCP connection flags (SYN, ACK, FIN, RST) to identify scanning patterns."
      ]
    },
    solution: {
      overview: "Created a socket-level telemetry service with real-time connection state tables, threshold-based alert triggers, and an interactive diagnostic console.",
      coreCapabilities: [
        "Protocol distribution inspector (TCP, UDP, ICMP, DNS).",
        "Connection state tracker flagging unusual SYN flood or half-open socket surges.",
        "Configurable threshold alert triggers for unassigned port probe detection."
      ]
    },
    architecture: {
      description: "Low-overhead daemon capturing interface socket data, pushing aggregated telemetry counters into memory, and serving metrics via a lightweight REST/WebSocket interface.",
      diagramType: "network-ids",
      flowSteps: [
        {
          step: 1,
          title: "Socket Capture",
          description: "Raw socket listener binds to interface and decodes IP/TCP/UDP packet headers.",
          tech: "Python / Socket / Linux PF_PACKET"
        },
        {
          step: 2,
          title: "State Table Aggregation",
          description: "Maintains rolling time-window frequency counters per source IP address.",
          tech: "In-Memory Sliding Window"
        },
        {
          step: 3,
          title: "Telemetry Stream",
          description: "Metrics streamed to dashboard for real-time visual inspection.",
          tech: "WebSocket / React Dashboard"
        }
      ]
    },
    engineeringDecisions: [
      {
        decision: "Sliding-Window Ring Buffer for Metrics",
        rationale: "Using a fixed-size ring buffer guarantees deterministic memory footprint regardless of traffic spikes.",
        impact: "Zero memory leak risk during sustained packet capture runs."
      }
    ],
    securityAndReliability: [
      "Runs under dedicated unprivileged user with strictly bounded capabilities (`CAP_NET_RAW`).",
      "Sanitized terminal output preventing ANSI escape code injection attacks."
    ],
    outcomes: [
      "Demonstrated deep practical comprehension of OSI layer 3/4 packet formats and TCP state transition mechanics.",
      "Provided instant baseline visibility into local subnet traffic."
    ],
    tags: ["Python", "Networking", "TCP/IP", "Security", "Linux Sockets", "Docker", "HCIA-Datacom"],
    coreTech: {
      backend: ["Python", "Sockets", "Flask API"],
      frontend: ["React", "TypeScript", "Tailwind CSS"],
      infra: ["Docker", "Linux Kernel Networking"]
    },
    githubUrl: "https://github.com/warrenchris"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Backend & Systems",
    description: "Designing resilient APIs, asynchronous job queues, and robust server architectures.",
    iconName: "Server",
    skills: [
      { name: "Node.js & Express", level: "Advanced", context: "High-throughput APIs & microservices", highlight: true },
      { name: "BullMQ & Redis Queues", level: "Advanced", context: "Distributed asynchronous job workflows", highlight: true },
      { name: "Python & FastAPI / Flask", level: "Proficient", context: "Automation, scripts & data services" },
      { name: "RESTful API Architecture", level: "Advanced", context: "Idempotent design, versioning, contract testing", highlight: true },
      { name: "Background Workers", level: "Advanced", context: "Cron jobs, event listeners & retry policies" }
    ]
  },
  {
    title: "Frontend Engineering",
    description: "Building responsive, accessible, and high-performance user interfaces.",
    iconName: "Layout",
    skills: [
      { name: "React 18/19", level: "Advanced", context: "Custom hooks, state management & performance", highlight: true },
      { name: "TypeScript", level: "Advanced", context: "Strict type safety & domain modeling", highlight: true },
      { name: "Tailwind CSS", level: "Advanced", context: "Design systems & responsive styling" },
      { name: "Vite & Build Tooling", level: "Proficient", context: "Modern bundle optimization & fast HMR" },
      { name: "State Machines & Local Cache", level: "Proficient", context: "Optimistic UI & offline recovery" }
    ]
  },
  {
    title: "Databases & Caching",
    description: "Data modeling, relational integrity, transactions, and caching layers.",
    iconName: "Database",
    skills: [
      { name: "MySQL (InnoDB)", level: "Advanced", context: "Relational schemas, indexes, ACID transactions", highlight: true },
      { name: "PostgreSQL", level: "Proficient", context: "Complex joins, views & schema constraints" },
      { name: "Redis", level: "Advanced", context: "Distributed locks, caching & job queuing", highlight: true },
      { name: "Data Modeling & Normalization", level: "Advanced", context: "Clean relational structures & dual-entry ledgers", highlight: true },
      { name: "Query Optimization", level: "Proficient", context: "EXPLAIN plan analysis & indexing strategies" }
    ]
  },
  {
    title: "Infrastructure & DevOps",
    description: "Containerization, service orchestration, Linux server administration, and CI/CD.",
    iconName: "Cpu",
    skills: [
      { name: "Docker & Docker Compose", level: "Advanced", context: "Multi-container isolated production environments", highlight: true },
      { name: "Linux Server Administration", level: "Advanced", context: "Ubuntu / Debian, systemd, shell automation", highlight: true },
      { name: "Nginx Reverse Proxy", level: "Proficient", context: "SSL termination, rate limiting, gzip" },
      { name: "Git & Version Control", level: "Advanced", context: "Branching strategies, code reviews, semantic tags" },
      { name: "Automated Backups & Monitoring", level: "Proficient", context: "mysqldump cron tasks, health probes" }
    ]
  },
  {
    title: "Networking & AAA Services",
    description: "Network protocols, authentication systems, routing, and access control.",
    iconName: "Network",
    skills: [
      { name: "FreeRADIUS 3.x", level: "Advanced", context: "AAA server, MySQL dictionary, CoA disconnects", highlight: true },
      { name: "TCP/IP & Routing Protocols", level: "Advanced", context: "OSPF, VLANs, Subnetting, IPv4/IPv6 (HCIA)", highlight: true },
      { name: "MikroTik RouterOS", level: "Proficient", context: "PPPoE Server, Hotspot, API integration" },
      { name: "Socket Programming", level: "Proficient", context: "Raw sockets, packet parsing, protocol analysis" },
      { name: "VPN & Network Security", level: "Proficient", context: "Firewalls, NAT, IPsec, ACLs" }
    ]
  },
  {
    title: "Application Security & DevSecOps",
    description: "Defensive engineering, access control, credential management, and threat mitigation.",
    iconName: "ShieldCheck",
    skills: [
      { name: "Role-Based Access Control (RBAC)", level: "Advanced", context: "Granular permission matrices & claims", highlight: true },
      { name: "API Security & Rate Limiting", level: "Advanced", context: "Token bucket, CORS, helmet, input sanitation", highlight: true },
      { name: "JWT & Session Security", level: "Advanced", context: "HttpOnly cookies, token rotation, signature checks" },
      { name: "Idempotency & Secret Isolation", level: "Advanced", context: "Distributed locks & environment isolation", highlight: true },
      { name: "Defensive Coding Practices", level: "Proficient", context: "OWASP Top 10 mitigation, parameterization" }
    ]
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: "hcia-datacom",
    title: "Huawei Certified ICT Associate — Datacom",
    issuer: "Huawei",
    issueDate: "Certified",
    badgeCode: "HCIA-Datacom",
    skillsCovered: [
      "IP Routing (OSPF, Static)",
      "Ethernet Switching (VLANs, STP)",
      "Network Security (ACLs, AAA, NAT)",
      "IPv4 & IPv6 Addressing & Subnetting",
      "WLAN Fundamentals & WAN Technologies"
    ],
    description: "Demonstrates practical competence in designing, deploying, and troubleshooting enterprise network infrastructures, routing protocols, and access control architectures.",
    iconName: "Network"
  },
  {
    id: "cisco-devnet",
    title: "Cisco DevNet Associate",
    issuer: "Cisco",
    issueDate: "Certified",
    badgeCode: "DEVASC",
    skillsCovered: [
      "Software Development & Design",
      "Understanding & Using APIs (REST, Webhooks)",
      "Cisco Platforms & Programmability",
      "Application Deployment & Security",
      "Infrastructure & Network Automation"
    ],
    description: "Validates ability to integrate software automation with network infrastructure, interact with REST APIs, and implement CI/CD pipelines for network operational environments.",
    iconName: "Cpu"
  },
  {
    id: "ibm-design-thinking",
    title: "Enterprise Design Thinking Practitioner",
    issuer: "IBM",
    issueDate: "Certified",
    badgeCode: "EDT-Practitioner",
    skillsCovered: [
      "User-Centric Systems Design",
      "Problem Framing & Need Finding",
      "Iterative Prototyping & Validation",
      "Cross-Functional Collaboration"
    ],
    description: "Focuses on applying human-centered design frameworks to complex business software architectures, ensuring engineering solutions solve the root operational need.",
    iconName: "Sparkles"
  }
];

export const ENGINEERING_PRINCIPLES: EngineeringPrinciple[] = [
  {
    id: "principle-security",
    number: "01",
    title: "Security by Architecture, Not by Afterthought",
    tagline: "Assume malicious input at every perimeter boundary.",
    description: "Security is an architectural requirement, not a checkbox added before launch. Every public endpoint must be authenticated, rate-limited, and parameterized. Secrets belong in isolated runtime environments, never in client builds or source control.",
    implementation: "Strict input validation, distributed locks for webhook idempotency, network bridge isolation for databases, and least-privilege RBAC matrices.",
    iconName: "ShieldAlert"
  },
  {
    id: "principle-production",
    number: "02",
    title: "Production Mindset from Line One",
    tagline: "Software isn't finished when it works on localhost.",
    description: "Code that works on a single developer machine is just a prototype. Real engineering accounts for process crashes, network partitions, sudden power losses, and unexpected third-party downtime.",
    implementation: "Asynchronous job queues with exponential retry backoff, container health probes, automated offsite database snapshots, and graceful process shutdown handlers.",
    iconName: "Flame"
  },
  {
    id: "principle-systems",
    number: "03",
    title: "Systems Thinking & Coherent Data Flows",
    tagline: "A system is only as reliable as its weakest synchronization step.",
    description: "Software engineering is not just writing UI components or isolated route handlers. The frontend state, backend business rules, queue workers, database schema, and networking access layer must operate as one harmonized system.",
    implementation: "Decoupling long-running operations from synchronous HTTP lifecycles, using immutable ledgers for state audits, and standardizing protocol dictionaries.",
    iconName: "Boxes"
  },
  {
    id: "principle-simplicity",
    number: "04",
    title: "Relentless Operational Simplicity",
    tagline: "Choose boring, battle-tested primitives over fragile complexity.",
    description: "Premature microservice fragmentation and unnecessary framework layers multiply maintenance overhead. High-value software relies on well-structured relational databases, robust queuing engines, and clean modular code.",
    implementation: "Using proven relational constraints (InnoDB/PostgreSQL) and standard Redis primitives rather than complex, unproven distributed tooling.",
    iconName: "Cpu"
  }
];
