import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, MapPin, Code2, Network, Shield, Cpu } from 'lucide-react';
import { personalInfo } from '@/config/siteData';

const focusAreas = [
  {
    icon: Code2,
    title: 'Full-Stack & Systems Architecture',
    desc: 'Designing maintainable services with Node.js, TypeScript, React, and relational databases with proper normalization and indexing.',
  },
  {
    icon: Cpu,
    title: 'Intelligent Microservices & AI',
    desc: 'Integrating LLMs, predictive models, and asynchronous worker queues for practical business intelligence and automation.',
  },
  {
    icon: Network,
    title: 'Networking & Infrastructure',
    desc: 'Enterprise routing and switching (Cisco, Huawei), Linux systems administration, and Docker containerization.',
  },
  {
    icon: Shield,
    title: 'Security & Payment Integration',
    desc: 'Automated M-Pesa STK push handling, webhook signature validation, idempotency, and defense-in-depth principles.',
  },
];

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="section-gap">
      <div className="container-main">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <span className="section-label">About</span>
          <h2 className="text-heading mt-3 text-[var(--text-primary)]">
            Engineering philosophy & background
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Narrative Philosophy (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="lg:col-span-7 space-y-6 text-body text-[var(--text-secondary)]"
          >
            <p className="text-large text-[var(--text-primary)] font-medium leading-relaxed">
              I view software as living operational systems rather than static code. When building an application, I consider data flow, edge failure modes, and operational observability first.
            </p>

            <p>
              My background bridges traditional computer networking, infrastructure administration, and modern software development. Having diagnosed packet flows and configured enterprise switches before writing distributed APIs, I approach application engineering with deep respect for latency, state consistency, and hardware constraints.
            </p>

            <p>
              I focus on building complete, production-grade products: from designing intuitive user interfaces and robust REST/WebSocket APIs, to provisioning databases, containerizing environments with Docker, and wiring secure payment workflows like M-Pesa.
            </p>

            {/* Quick Education & Location Callout */}
            <div className="pt-6 border-t border-[var(--border-color)] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <GraduationCap size={18} className="text-[var(--color-accent)] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-small font-medium text-[var(--text-primary)]">
                    {personalInfo.degree}
                  </p>
                  <p className="text-caption text-[var(--text-muted)]">
                    {personalInfo.university}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[var(--color-accent)] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-small font-medium text-[var(--text-primary)]">
                    Based in {personalInfo.location}
                  </p>
                  <p className="text-caption text-[var(--text-muted)]">
                    Available for full-time & high-impact roles
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Core Focus Areas (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <h3 className="section-label mb-2">Technical Core</h3>
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.title}
                  className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2.5 text-[var(--text-primary)]">
                    <Icon size={16} className="text-[var(--color-accent)]" />
                    <span className="text-small font-medium">{area.title}</span>
                  </div>
                  <p className="text-caption text-[var(--text-secondary)] leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
