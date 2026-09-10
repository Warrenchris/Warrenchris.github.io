import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { techStack, engineeringProcess } from '@/config/siteData';

export default function Engineering() {
  const [activeCategory, setActiveCategory] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: processRef, inView: processInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="engineering" className="section-gap bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="container-main">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <span className="section-label">Engineering Standards &amp; Stack</span>
          <h2 className="text-heading mt-3 text-[var(--text-primary)]">
            Verified Technical Capabilities
          </h2>
          <p className="text-body text-[var(--text-secondary)] mt-3 max-w-2xl leading-relaxed">
            Every technology listed reflects hands-on production or monorepo implementation with concrete architectural purpose.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div
          className="flex flex-wrap gap-1.5 mt-8 mb-6"
          role="tablist"
          aria-label="Technology Domains"
        >
          {techStack.map((cat, i) => {
            const isActive = activeCategory === i;
            return (
              <button
                key={cat.name}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(i)}
                className={`px-3.5 py-2 rounded-md text-small font-medium transition-all ${
                  isActive
                    ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Active Category Description */}
        <p className="text-caption font-mono text-[var(--text-muted)] mb-6">
          {techStack[activeCategory].description}
        </p>

        {/* Technologies Grid — with Concrete Usage Evidence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {techStack[activeCategory].technologies.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col justify-between gap-3 p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)]"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-small font-semibold text-[var(--text-primary)]">
                      {tech.name}
                    </span>
                  </div>
                  <p className="text-caption text-[var(--text-secondary)] leading-relaxed">
                    {tech.usage}
                  </p>
                </div>

                <div className="pt-2 border-t border-[var(--border-color)] flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] mr-1">
                    Applied in:
                  </span>
                  {tech.projects.map((proj) => (
                    <span
                      key={proj}
                      className="text-[11px] font-mono text-[var(--text-secondary)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ---- 7-STEP ENGINEERING PROCESS ROADMAP ---- */}
        <motion.div
          ref={processRef}
          initial={{ opacity: 0, y: 12 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mt-20 pt-16 border-t border-[var(--border-color)]"
        >
          <span className="section-label mb-3 block">Methodology</span>
          <h3 className="text-heading text-[var(--text-primary)] mb-3 font-semibold">
            How I Build Software
          </h3>
          <p className="text-body text-[var(--text-secondary)] max-w-2xl mb-8 leading-relaxed">
            A disciplined engineering lifecycle preventing technical debt, security oversights, and unmaintainable abstractions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {engineeringProcess.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <span className="font-mono text-caption font-semibold text-[var(--color-accent)]">
                    {step.step}
                  </span>
                  <h4 className="text-small font-medium text-[var(--text-primary)]">
                    {step.title}
                  </h4>
                  <p className="text-caption text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
