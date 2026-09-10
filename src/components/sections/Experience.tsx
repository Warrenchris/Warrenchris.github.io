import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experience, certifications } from '@/config/siteData';

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: certRef, inView: certInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="experience" className="section-gap">
      <div className="container-main">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <span className="section-label">Experience</span>
          <h2 className="text-heading mt-3 text-[var(--text-primary)]">
            Where I've worked
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="mt-10 space-y-0">
          {experience.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className={`grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-10 py-8 ${
                i < experience.length - 1 ? 'border-b border-[var(--border-color)]' : ''
              }`}
            >
              {/* Left — metadata */}
              <div className="flex flex-col gap-1">
                <span className="font-mono text-caption font-medium text-[var(--text-muted)]">
                  {job.period}
                </span>
                <span className="text-caption text-[var(--text-muted)]">
                  {job.location}
                </span>
              </div>

              {/* Right — content */}
              <div className="flex flex-col gap-3">
                <div>
                  <h3 className="text-subheading text-[var(--text-primary)]">
                    {job.role}
                  </h3>
                  <p className="text-small text-[var(--text-secondary)] mt-0.5">
                    {job.company}
                  </p>
                </div>

                <ul className="space-y-2">
                  {job.contributions.map((c, ci) => (
                    <li key={ci} className="text-small text-[var(--text-secondary)] flex gap-2">
                      <span className="text-[var(--color-accent)] mt-1.5 flex-shrink-0">·</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mt-1">
                  {job.tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications — compact inline */}
        <motion.div
          ref={certRef}
          initial={{ opacity: 0, y: 12 }}
          animate={certInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mt-16"
        >
          <h3 className="section-label mb-6">Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 8 }}
                animate={certInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className="flex items-start gap-3 p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)]"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-small font-medium text-[var(--text-primary)] truncate">
                    {cert.title}
                  </p>
                  <p className="text-caption text-[var(--text-muted)] mt-0.5">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
