import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, FolderOpen, ArrowUpRight, Check } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { projects } from '@/config/siteData';

const filters = ['All', 'Full Stack', 'Backend', 'AI', 'Cybersecurity', 'Infrastructure', 'Business Systems'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      activeFilter === 'All' ? true : project.tags.includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <section id="projects" className="section-wrapper relative bg-[var(--bg-primary)]">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <FolderOpen size={13} />
            <span>Portfolio</span>
          </div>
          <h2 className="section-title font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            Featured Projects
          </h2>
          <p className="section-subtitle mx-auto text-sm sm:text-base text-[var(--text-secondary)] mt-3 max-w-2xl">
            Real-world systems spanning full-stack development, telecom billing, HR platforms, point-of-sale infrastructure, and security automation.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sm:mb-16">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-sm scale-102'
                    : 'border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className={`group rounded-3xl overflow-hidden border border-[var(--border-color)] bg-[var(--glass-bg)] backdrop-blur-md transition-all duration-300 hover:border-primary/40 flex flex-col h-full shadow-sm hover:shadow-lg ${
                  project.featured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Media Banner / Placeholder */}
                <div className={`relative overflow-hidden w-full bg-[var(--bg-secondary)] border-b border-[var(--border-color)] ${project.featured ? 'h-56 sm:h-64' : 'h-48'}`}>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/15 via-[var(--bg-secondary)] to-primary/5 flex items-center justify-center">
                      <div className="text-center p-6">
                        <span className="text-4xl sm:text-5xl font-mono font-bold text-primary/40">
                          {project.title.substring(0, 3).toUpperCase()}
                        </span>
                        <p className="text-xs text-[var(--text-muted)] mt-1 font-mono tracking-wider">
                          SYSTEM ARCHITECTURE
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--bg-primary)]/85 backdrop-blur-md text-primary border border-[var(--border-color)] shadow-sm">
                      {project.subtitle}
                    </span>
                  </div>

                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-white shadow-sm">
                        Flagship
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow">
                  <h3 className="font-sans text-xl font-bold text-[var(--text-primary)] mb-2.5 tracking-tight group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.slice(0, 5).map((tech, idx) => (
                      <span
                        key={idx}
                        className="tech-pill text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="tech-pill text-[11px] text-[var(--text-muted)]">
                        +{project.tech.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)] mt-auto gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-600 transition-colors"
                    >
                      <span>Case Study &amp; Specs</span>
                      <ArrowUpRight size={14} />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-all"
                          aria-label={`GitHub repository for ${project.title}`}
                        >
                          <Github size={14} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-600 transition-all"
                          aria-label={`Live demo for ${project.title}`}
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-[var(--text-muted)]">
            <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-40 text-primary" />
            <p className="text-sm">No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Case Study Detail Modal (Radix Accessible Dialog) */}
      <Dialog.Root open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-md z-[2000]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[2001] w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-2xl focus:outline-none">
            {selectedProject && (
              <div className="space-y-6">
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
                      {selectedProject.subtitle}
                    </span>
                    <Dialog.Title className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                      {selectedProject.title}
                    </Dialog.Title>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-color)] transition-colors shrink-0"
                      aria-label="Close modal"
                    >
                      <X size={16} />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Banner */}
                {selectedProject.image ? (
                  <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-primary)]">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-all"
                    >
                      <Github size={15} />
                      <span>View Source on GitHub</span>
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-600 transition-all"
                    >
                      <ExternalLink size={14} />
                      <span>Live Deployment</span>
                    </a>
                  )}
                </div>

                {/* Deep Engineering Case Study Sections */}
                <div className="space-y-6 pt-4 border-t border-[var(--border-color)]">
                  {selectedProject.problem && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">Problem</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{selectedProject.problem}</p>
                    </div>
                  )}

                  {selectedProject.solution && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">Solution</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{selectedProject.solution}</p>
                    </div>
                  )}

                  {selectedProject.architecture && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">Architecture &amp; Data Flow</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{selectedProject.architecture}</p>
                    </div>
                  )}

                  {selectedProject.engineering && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">Engineering Highlights</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{selectedProject.engineering}</p>
                    </div>
                  )}

                  {selectedProject.security && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">Security Considerations</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{selectedProject.security}</p>
                    </div>
                  )}

                  {selectedProject.outcome && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">Outcome</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{selectedProject.outcome}</p>
                    </div>
                  )}
                </div>

                {/* Tech Stack */}
                <div className="pt-4 border-t border-[var(--border-color)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="tech-pill text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
