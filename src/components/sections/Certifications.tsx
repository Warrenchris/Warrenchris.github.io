import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { certifications } from '@/config/siteData';

export default function Certifications() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="certifications" className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-primary)]">
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Credentials</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
              Certifications
            </motion.h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative flex flex-col p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--border-hover)] hover:-translate-y-1 transition-all duration-300 ease-out"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                    {cert.issuer}
                  </span>
                  <span className="text-xs font-medium text-[var(--text-muted)] bg-[var(--bg-primary)] px-2 py-1 rounded-md border border-[var(--border-primary)]">
                    {cert.year}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 leading-tight group-hover:text-[var(--text-accent)] transition-colors duration-300">
                  {cert.title}
                </h3>
                
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-auto">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
