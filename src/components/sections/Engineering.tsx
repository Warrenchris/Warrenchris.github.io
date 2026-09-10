import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { techStack, engineeringProcess } from '@/config/siteData';

export default function Engineering() {
  const [activeCategory, setActiveCategory] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: processRef, inView: processInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="engineering" className="section-gap bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="container-main">
        {/* ---- TECH STACK ---- */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <span className="section-label">Engineering</span>
          <h2 className="text-heading mt-3 text-[var(--text-primary)]">
            Technologies I work with
          </h2>
          <p className="text-body text-[var(--text-secondary)] mt-3 max-w-xl">
            Each technology is linked to the projects where I've used it.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-1 mt-8 mb-8">
          {techStack.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`px-3.5 py-2 rounded-md text-small font-medium transition-all ${
                activeCategory === i
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active category content */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {techStack[activeCategory].technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col gap-2 p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)]"
            >
              <span className="text-small font-medium text-[var(--text-primary)]">
                {tech.name}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {tech.projects.map((proj) => (
                  <span
                    key={proj}
                    className="text-caption font-mono text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ---- BUILD PROCESS ---- */}
        <motion.div
          ref={processRef}
          initial={{ opacity: 0, y: 12 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mt-20"
        >
          <h3 className="section-label mb-8">Build Process</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-color)] rounded-lg overflow-hidden border border-[var(--border-color)]">
            {engineeringProcess.slice(0, 4).map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0 }}
                animate={processInView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-[var(--bg-primary)] p-5 flex flex-col gap-2"
              >
                <span className="font-mono text-caption font-medium text-[var(--color-accent)]">
                  {step.step}
                </span>
                <h4 className="text-small font-semibold text-[var(--text-primary)]">
                  {step.title}
                </h4>
                <p className="text-caption text-[var(--text-secondary)]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--border-color)] rounded-lg overflow-hidden border border-[var(--border-color)] mt-px">
            {engineeringProcess.slice(4).map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0 }}
                animate={processInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.32 + i * 0.08, duration: 0.4 }}
                className="bg-[var(--bg-primary)] p-5 flex flex-col gap-2"
              >
                <span className="font-mono text-caption font-medium text-[var(--color-accent)]">
                  {step.step}
                </span>
                <h4 className="text-small font-semibold text-[var(--text-primary)]">
                  {step.title}
                </h4>
                <p className="text-caption text-[var(--text-secondary)]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
