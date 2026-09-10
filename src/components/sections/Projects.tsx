import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects, type Project } from '@/config/siteData';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className="group"
    >
      {/* Project number + categories */}
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-4">
        <span className="font-mono text-caption font-medium text-[var(--text-muted)]">
          {project.number}
        </span>
        <div className="flex flex-wrap gap-2">
          {project.categories.map((cat) => (
            <span key={cat} className="section-label">{cat}</span>
          ))}
        </div>
      </div>

      {/* Title + positioning */}
      <h3 className="text-heading text-[var(--text-primary)] mb-3">
        {project.title}
      </h3>
      <p className="text-body text-[var(--text-secondary)] max-w-2xl mb-6">
        {project.positioning}
      </p>

      {/* Visual + details grid */}
      <div className={`grid grid-cols-1 ${project.image ? 'lg:grid-cols-2' : ''} gap-8 items-start`}>
        {/* Screenshot */}
        {project.image && (
          <div className={`${isEven ? '' : 'lg:order-2'} overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)]`}>
            <img
              src={project.image}
              alt={`${project.title} interface`}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        )}

        {/* Engineering details */}
        <div className={`${project.image && !isEven ? 'lg:order-1' : ''} space-y-6`}>
          {/* Problem */}
          <div>
            <h4 className="font-mono text-caption font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Problem
            </h4>
            <p className="text-small text-[var(--text-secondary)]">
              {project.problem}
            </p>
          </div>

          {/* What I built */}
          <div>
            <h4 className="font-mono text-caption font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
              What I Built
            </h4>
            <p className="text-small text-[var(--text-secondary)]">
              {project.built}
            </p>
          </div>

          {/* Engineering highlights */}
          <div>
            <h4 className="font-mono text-caption font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Engineering
            </h4>
            <p className="text-small text-[var(--text-secondary)]">
              {project.engineering}
            </p>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-1">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-small font-medium text-[var(--text-primary)] hover:text-[var(--color-accent)] transition-colors"
            >
              <Github size={14} />
              Source
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-small font-medium text-[var(--text-primary)] hover:text-[var(--color-accent)] transition-colors"
              >
                Live Demo
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const secondary = projects.filter((p) => !p.featured);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="work" className="section-gap">
      <div className="container-main">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <span className="section-label">Selected Work</span>
          <h2 className="text-heading mt-3 text-[var(--text-primary)]">
            Projects I've built
          </h2>
          <p className="text-body text-[var(--text-secondary)] mt-3 max-w-xl">
            Production-oriented systems across billing, retail, data science, and real-time applications.
          </p>
        </motion.div>

        {/* Featured projects — editorial layout */}
        <div className="space-y-20">
          {featured.map((project, index) => (
            <div key={project.id}>
              <ProjectCard project={project} index={index} />
              {index < featured.length - 1 && (
                <hr className="section-divider mt-20" />
              )}
            </div>
          ))}
        </div>

        {/* Secondary projects — compact list */}
        {secondary.length > 0 && (
          <div className="mt-20">
            <hr className="section-divider mb-12" />
            <h3 className="section-label mb-6">Other Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {secondary.map((project) => (
                <a
                  key={project.id}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 p-5 rounded-lg border border-[var(--border-color)] hover:border-[var(--border-hover)] bg-[var(--bg-secondary)] transition-all"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-small font-medium text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                      {project.title}
                    </h4>
                    <ArrowUpRight size={14} className="text-[var(--text-muted)] flex-shrink-0" />
                  </div>
                  <p className="text-caption text-[var(--text-secondary)]">
                    {project.positioning}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.tech.slice(0, 4).map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
