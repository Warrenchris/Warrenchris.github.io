import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ShieldCheck } from 'lucide-react';
import { certifications } from '@/config/siteData';

export default function Certifications() {
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
    <section id="certifications" ref={ref} className="section-wrapper relative bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <Award size={13} />
            <span>Credentials</span>
          </div>
          <h2 className="section-title font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            Certifications &amp; Training
          </h2>
          <p className="section-subtitle mx-auto text-sm sm:text-base text-[var(--text-secondary)] mt-3 max-w-2xl">
            Industry-standard certifications validating expertise in network programmability, system administration, and security.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[var(--glass-bg)] border border-[var(--border-color)] rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/40 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                    {cert.issuer}
                  </span>
                  <span className="text-xs font-mono font-medium text-[var(--text-muted)]">
                    {cert.year}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[var(--text-primary)] mb-2.5 tracking-tight group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border-color)] flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-muted)]">
                <ShieldCheck size={13} className="text-primary" />
                <span>Verified Credential</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
