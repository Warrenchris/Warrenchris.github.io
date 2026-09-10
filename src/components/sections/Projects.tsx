import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Github, ExternalLink, CheckCircle2, Terminal, Layers } from 'lucide-react';
import { projects, type Project } from '@/config/siteData';

// Fallback architectural preview for GroupDeal to avoid blank image slots
function DealArchitectureDiagram() {
  return (
    <div className="w-full h-full min-h-[260px] p-6 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] font-mono text-[11px] flex flex-col justify-between select-none">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[var(--color-accent)]" />
          <span className="text-[var(--text-muted)] uppercase tracking-wider text-[10px]">
            Deal Lifecycle State Machine
          </span>
        </div>
        <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Atomic Locking</span>
      </div>

      <div className="py-4 space-y-3">
        <div className="p-2.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between">
          <span className="text-[var(--text-secondary)]">01. INITIATED</span>
          <span className="text-[var(--text-muted)] text-[10px]">Deal created with minimum participant quota</span>
        </div>
        <div className="p-2.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between">
          <span className="text-[var(--text-secondary)]">02. THRESHOLD MET</span>
          <span className="text-[var(--text-muted)] text-[10px]">Bulk pricing discount unlocked</span>
        </div>
        <div className="p-2.5 rounded bg-[var(--bg-secondary)] border border-[var(--color-accent)]/40 flex items-center justify-between">
          <span className="text-[var(--color-accent)] font-semibold">03. ATOMIC LOCK</span>
          <span className="text-[var(--text-muted)] text-[10px]">Slots reserved via atomic DB queries</span>
        </div>
        <div className="p-2.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between">
          <span className="text-[var(--text-secondary)]">04. SETTLED</span>
          <span className="text-[var(--text-muted)] text-[10px]">Batched payment coordination complete</span>
        </div>
      </div>

      <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between text-[10px] text-[var(--text-muted)]">
        <span>Type-safe monorepo</span>
        <span>PostgreSQL · Express · React</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const isFlagship = project.id === 'isp-billing';
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className={`group ${
        isFlagship
          ? 'p-6 sm:p-8 rounded-xl border-2 border-[var(--color-accent)]/30 bg-[var(--bg-secondary)] shadow-sm'
          : 'p-6 sm:p-8 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]'
      }`}
    >
      {/* Flagship Header Pill */}
      {project.highlight && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-mono text-[11px] font-semibold uppercase tracking-wider mb-4">
          <Layers size={13} />
          <span>{project.highlight}</span>
        </div>
      )}

      {/* Number & Categories */}
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-3">
        <span className="font-mono text-caption font-semibold text-[var(--text-muted)]">
          {project.number}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {project.categories.map((cat) => (
            <span key={cat} className="section-label">{cat}</span>
          ))}
        </div>
      </div>

      {/* Project Title & Positioning */}
      <h3 className="text-heading text-[var(--text-primary)] mb-2 font-semibold">
        {project.title}
      </h3>
      <p className="text-body text-[var(--text-secondary)] max-w-3xl mb-6 leading-relaxed">
        {project.positioning}
      </p>

      {/* Two Column Grid: Visual & Detailed Engineering Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Media or Architectural Preview */}
        <div className={`lg:col-span-6 ${!isEven ? 'lg:order-2' : ''}`}>
          {project.image ? (
            <div className="overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] group-hover:border-[var(--border-hover)] transition-colors">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                loading="lazy"
              />
            </div>
          ) : project.id === 'group-deal' ? (
            <DealArchitectureDiagram />
          ) : null}
        </div>

        {/* Right Column: Structured Engineering Content */}
        <div className={`lg:col-span-6 space-y-4 ${!isEven ? 'lg:order-1' : ''}`}>
          {/* Problem */}
          <div>
            <h4 className="font-mono text-caption font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
              What Problem
            </h4>
            <p className="text-small text-[var(--text-secondary)] leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* What I Built */}
          <div>
            <h4 className="font-mono text-caption font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
              What I Built
            </h4>
            <p className="text-small text-[var(--text-secondary)] leading-relaxed">
              {project.built}
            </p>
          </div>

          {/* Why Technically Interesting */}
          <div>
            <h4 className="font-mono text-caption font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
              Why Technically Interesting
            </h4>
            <p className="text-small text-[var(--text-secondary)] leading-relaxed">
              {project.engineering}
            </p>
          </div>

          {/* Current State / Result */}
          <div>
            <h4 className="font-mono text-caption font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
              Current State &amp; Verification
            </h4>
            <div className="flex items-start gap-2 text-small text-[var(--text-secondary)]">
              <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>{project.result}</span>
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="pt-2">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-3 border-t border-[var(--border-color)]">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-small font-medium text-[var(--text-primary)] hover:text-[var(--color-accent)] transition-colors"
            >
              <Github size={15} />
              <span>GitHub Repository</span>
            </a>

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-small font-medium text-[var(--text-primary)] hover:text-[var(--color-accent)] transition-colors"
              >
                <ExternalLink size={15} />
                <span>Live Deployment</span>
                <ArrowUpRight size={13} />
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
          className="mb-12"
        >
          <span className="section-label">Selected Work</span>
          <h2 className="text-heading mt-3 text-[var(--text-primary)]">
            Systems &amp; Applications Built
          </h2>
          <p className="text-body text-[var(--text-secondary)] mt-3 max-w-2xl leading-relaxed">
            Production-oriented systems evaluated by problem complexity, architecture rigor, payment integration, and real-time data flow.
          </p>
        </motion.div>

        {/* Featured Projects with Strong Visual Hierarchy */}
        <div className="space-y-12">
          {featured.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Secondary Projects — Visually Receding Grid */}
        {secondary.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[var(--border-color)]">
            <span className="section-label mb-2 block">Additional Engineering Projects</span>
            <p className="text-small text-[var(--text-secondary)] mb-6">
              Prototypes, algorithms, and data science models with verified public code.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {secondary.map((project) => (
                <a
                  key={project.id}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-5 rounded-lg border border-[var(--border-color)] hover:border-[var(--border-hover)] bg-[var(--bg-secondary)] transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-mono text-caption text-[var(--text-muted)]">
                        {project.number}
                      </span>
                      <ArrowUpRight size={14} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
                    </div>
                    <h4 className="text-small font-medium text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-caption text-[var(--text-secondary)] line-clamp-2">
                      {project.positioning}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[var(--border-color)] flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="tech-tag text-[10px]">{t}</span>
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
