import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Zap, Shield, Terminal, Globe, Cloud,
  ShieldCheck, Lock, Sliders, Eye, CheckCircle, AlertTriangle,
  Code, Layers, Server, Cpu, Database, Network,
  Key, GitFork, Radio, BarChart2, HardDrive, Box, GitBranch
} from 'lucide-react';
import { skills } from '@/config/siteData';

const skillMeta: Record<string, { icon: React.ReactNode; desc: string }> = {
  // Security
  'Network Security': {
    icon: <ShieldCheck size={20} strokeWidth={1.5} />,
    desc: 'Designing and configuring access controls, VPNs, and firewall architectures to protect system perimeters.'
  },
  'Cybersecurity': {
    icon: <Lock size={20} strokeWidth={1.5} />,
    desc: 'Threat hunting, active vulnerability management, and implementing secure compliance benchmarks.'
  },
  'Firewall Configuration': {
    icon: <Sliders size={20} strokeWidth={1.5} />,
    desc: 'Deploying and managing Cisco ASA, Fortinet, and local iptables packet filtering rules.'
  },
  'SIEM Tools': {
    icon: <Eye size={20} strokeWidth={1.5} />,
    desc: 'Analyzing security logs, configuring alerts, and monitoring system activities via SIEM systems.'
  },
  'Compliance Standards': {
    icon: <CheckCircle size={20} strokeWidth={1.5} />,
    desc: 'Ensuring systems meet strict data privacy standards like ISO 27001, SOC2, and CIS benchmarks.'
  },
  'Threat Analysis': {
    icon: <AlertTriangle size={20} strokeWidth={1.5} />,
    desc: 'Analyzing network traffic packets and assessing vulnerability scores to mitigate entry vectors.'
  },
  // Development
  'JavaScript / TypeScript': {
    icon: <Code size={20} strokeWidth={1.5} />,
    desc: 'Writing strongly-typed, scalable frontend code and clean asynchronous clients.'
  },
  'Python': {
    icon: <Terminal size={20} strokeWidth={1.5} />,
    desc: 'Infrastructure scripting, system task automation, and machine learning model integrations.'
  },
  'React': {
    icon: <Layers size={20} strokeWidth={1.5} />,
    desc: 'Building interactive, high-performance web applications using state-driven components.'
  },
  'Node.js': {
    icon: <Server size={20} strokeWidth={1.5} />,
    desc: 'Designing secure RESTful endpoints and highly efficient backend event-driven services.'
  },
  'Java': {
    icon: <Cpu size={20} strokeWidth={1.5} />,
    desc: 'Building robust enterprise backend platforms with structural object-oriented architectures.'
  },
  'C / C++': {
    icon: <Terminal size={20} strokeWidth={1.5} />,
    desc: 'Writing low-level system firmware and optimizing memory-intensive algorithms.'
  },
  'SQL / NoSQL': {
    icon: <Database size={20} strokeWidth={1.5} />,
    desc: 'Designing, mapping, and indexing database schemes for high transactional efficiency.'
  },
  'RESTful APIs': {
    icon: <Network size={20} strokeWidth={1.5} />,
    desc: 'Designing clean, programmatic interfaces for client-server integrations and third-party tools.'
  },
  // Networking
  'Cisco Routing & Switching': {
    icon: <Server size={20} strokeWidth={1.5} />,
    desc: 'Configuring OSPF/BGP routing policies, VLANs, and enterprise core switches.'
  },
  'Huawei Networking': {
    icon: <Network size={20} strokeWidth={1.5} />,
    desc: 'Deploying Huawei datacom routing configurations and managing physical fabric topologies.'
  },
  'VPN Configuration': {
    icon: <Key size={20} strokeWidth={1.5} />,
    desc: 'Setting up IPsec site-to-site tunnels and secure remote access OpenVPN endpoints.'
  },
  'Load Balancing': {
    icon: <GitFork size={20} strokeWidth={1.5} />,
    desc: 'Configuring traffic distribution and caching reverse proxies to ensure high availability.'
  },
  'SD-WAN': {
    icon: <Radio size={20} strokeWidth={1.5} />,
    desc: 'Deploying software-defined networks for automated WAN path selections.'
  },
  'Network Monitoring': {
    icon: <BarChart2 size={20} strokeWidth={1.5} />,
    desc: 'Configuring SNMP agents and using packet captures for latency troubleshooting.'
  },
  // Cloud & DevOps
  'Cloud Computing': {
    icon: <Cloud size={20} strokeWidth={1.5} />,
    desc: 'Designing resilient Virtual Private Clouds (VPC), access controls, and virtual instances.'
  },
  'Linux Administration': {
    icon: <HardDrive size={20} strokeWidth={1.5} />,
    desc: 'Managing RedHat/Debian servers, shell automation scripting, and cron tasks.'
  },
  'Docker': {
    icon: <Box size={20} strokeWidth={1.5} />,
    desc: 'Containerizing application runtimes to achieve isolated, reproducible production states.'
  },
  'CI/CD Pipelines': {
    icon: <GitBranch size={20} strokeWidth={1.5} />,
    desc: 'Building automated workflows for testing, linting, packaging, and cloud deployment.'
  },
  'AWS / Azure Basics': {
    icon: <Cloud size={20} strokeWidth={1.5} />,
    desc: 'Utilizing cloud storage buckets, server execution nodes, and user identity frameworks.'
  }
};

const categoryIcons: Record<string, React.ReactNode> = {
  'Security': <Shield size={13} strokeWidth={1.5} />,
  'Development': <Terminal size={13} strokeWidth={1.5} />,
  'Networking': <Globe size={13} strokeWidth={1.5} />,
  'Cloud & DevOps': <Cloud size={13} strokeWidth={1.5} />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const currentSkills = skills[activeCategory];

  return (
    <section id="skills" className="section-wrapper relative bg-black">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/2 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="section-tag"><Zap size={12} className="text-primary" /> Technical Specs</span>
            <h2 className="section-title mt-3 font-display">System Capabilities</h2>
            <p className="section-subtitle mx-auto mt-4 text-[var(--text-secondary)] font-light text-base">
              A curated set of skills built through hands-on projects, certifications, and real-world consulting.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2.5 mb-14">
            {skills.map((cat, i) => (
              <motion.button
                key={cat.category}
                onClick={() => setActiveCategory(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 ${
                  activeCategory === i
                    ? 'bg-primary text-white shadow-sm'
                    : 'border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--text-secondary)]'
                }`}
              >
                <span className="opacity-80">{categoryIcons[cat.category] || <Zap size={13} />}</span>
                <span>{cat.category}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentSkills.items.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.04, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  className="bg-white/[0.01] border border-white/[0.04] backdrop-blur-md rounded-3xl p-6 transition-all duration-300 hover:border-white/[0.08] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      {/* Large Icon */}
                      <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                        {skillMeta[skill.name]?.icon || <Zap size={20} strokeWidth={1.5} />}
                      </div>
                      
                      {/* Progress Badge */}
                      <span className="text-xs font-mono font-semibold text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                        {skill.level}%
                      </span>
                    </div>

                    <h4 className="font-sans font-bold text-white text-base mb-2 tracking-tight">
                      {skill.name}
                    </h4>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                      {skillMeta[skill.name]?.desc || 'Applying industrial practices and engineering principles to scale infrastructure.'}
                    </p>
                  </div>

                  {/* Progress Bar (Apple style: pill track and fill) */}
                  <div className="skill-progress-track">
                    <motion.div
                      className="skill-progress-fill"
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: skill.level / 100 } : { scaleX: 0 }}
                      transition={{ duration: 1.2, delay: 0.1 + i * 0.04, ease: 'easeOut' }}
                      style={{ background: 'var(--color-primary)' }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Tech Stack Tags */}
          <motion.div variants={itemVariants} className="mt-20">
            <p className="text-center text-[10px] text-[var(--text-muted)] uppercase tracking-[0.25em] font-semibold mb-6">Technologies I Work With</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              {[
                'Python', 'React', 'TypeScript', 'Node.js', 'Java', 'Flask',
                'Linux', 'Cisco IOS', 'Docker', 'MySQL', 'PostgreSQL', 'Git',
                'AWS', 'Wireshark', 'Nmap', 'C/C++',
              ].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.02 }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  className="tech-pill text-[11px] px-3 py-1 rounded-full border border-[var(--border-color)] bg-white/[0.01] text-[var(--text-secondary)] transition-all duration-200 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
