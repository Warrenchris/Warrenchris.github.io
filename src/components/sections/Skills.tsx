import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Code2, Server, Database, Box, Shield, Globe, Terminal } from 'lucide-react';
import { skillGroups } from '@/config/siteData';

const categoryIcons: Record<string, React.ReactNode> = {
  Languages: <Terminal size={18} className="text-primary" strokeWidth={1.5} />,
  Frontend: <Code2 size={18} className="text-primary" strokeWidth={1.5} />,
  Backend: <Server size={18} className="text-primary" strokeWidth={1.5} />,
  Data: <Database size={18} className="text-primary" strokeWidth={1.5} />,
  Infrastructure: <Box size={18} className="text-primary" strokeWidth={1.5} />,
  Security: <Shield size={18} className="text-primary" strokeWidth={1.5} />,
  Networking: <Globe size={18} className="text-primary" strokeWidth={1.5} />,
};

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <section id="skills" ref={ref} className="section-wrapper relative bg-[var(--bg-primary)]">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap size={13} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-title font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            Skills &amp; Technologies
          </h2>
          <p className="section-subtitle mx-auto text-sm sm:text-base text-[var(--text-secondary)] mt-3 max-w-2xl">
            A rigorously curated stack developed through production systems, network engineering, and cybersecurity auditing.
          </p>
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.category}
              variants={itemVariants}
              className="bg-[var(--glass-bg)] border border-[var(--border-color)] rounded-2xl p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/15">
                    {categoryIcons[group.category] || <Zap size={16} className="text-primary" />}
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    {group.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="tech-pill text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
