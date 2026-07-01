import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Search, FolderOpen, X, Star } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { projects } from '@/config/siteData';

const filters = ['All', 'Web', 'Cloud', 'Security'];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchFilter = activeFilter === 'All' || p.category === activeFilter.toLowerCase();
      const matchSearch = !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchFilter && matchSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section id="projects" className="section-wrapper relative bg-[var(--bg-primary)]">
      {/* Subtle blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/2 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/2 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="section-tag"><FolderOpen size={12} className="text-primary" /> Projects</span>
            <h2 className="section-title mt-3 font-display">Featured Work</h2>
            <p className="section-subtitle mx-auto mt-4 text-[var(--text-secondary)] font-light text-base">
              A showcase of projects spanning cybersecurity, networking, full-stack development, and data science.
            </p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12"
          >
            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="form-input pl-11 py-2 text-xs rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-slate-500 focus:border-primary focus:ring-0 w-full"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex gap-2 flex-wrap justify-center">
              {filters.map(filter => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 ${
                    activeFilter === filter
                      ? 'bg-primary text-white shadow-sm'
                      : 'border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]'
                  }`}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter + searchQuery}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  layout
                >
                  <Tilt
                    tiltMaxAngleX={4}
                    tiltMaxAngleY={4}
                    scale={1.005}
                    transitionSpeed={600}
                    className="h-full"
                  >
                    <div className="bg-[var(--glass-bg)] border border-[var(--border-color)] backdrop-blur-md rounded-3xl overflow-hidden shadow-md flex flex-col h-full hover:border-[var(--text-secondary)]/30 transition-all duration-300 group">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        {/* Featured badge */}
                        {project.featured && (
                          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-bold shadow-sm">
                            <Star size={10} fill="white" />
                            <span>Featured</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <span className="text-[10px] text-primary font-bold uppercase tracking-[0.25em] mb-1.5 block">
                          {project.subtitle}
                        </span>
                        <h3 className="font-sans font-bold text-[var(--text-primary)] text-lg mb-2.5 tracking-tight leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-5 flex-1 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Tech pills */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.tech.slice(0, 3).map(t => (
                            <span key={t} className="tech-pill text-[10px] px-2 py-0.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]">{t}</span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="tech-pill text-[10px] px-2 py-0.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]">+{project.tech.length - 3}</span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-auto">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] text-[12px] font-semibold transition-all duration-200"
                          >
                            <Github size={13} />
                            <span>GitHub</span>
                          </motion.a>
                          <motion.button
                            onClick={() => setSelectedProject(project)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full bg-primary text-white text-[12px] font-semibold hover:bg-primary-600 active:bg-primary-700 transition-all duration-200"
                          >
                            <ExternalLink size={13} />
                            <span>Details</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}

              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-16 text-[var(--text-muted)]"
                >
                  <FolderOpen size={36} className="mx-auto mb-3 opacity-30 text-primary" />
                  <p className="text-xs">No projects match your search query.</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal (Detailed dialog popup style) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(20px)' }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="w-full max-w-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-60 overflow-hidden bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
                <div className="absolute bottom-5 left-6">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-[0.25em] mb-1.5 block">{selectedProject.subtitle}</span>
                  <h3 className="font-sans text-2xl font-bold text-[var(--text-primary)] tracking-tight leading-tight">{selectedProject.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6 text-xs">{selectedProject.longDescription}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="tech-pill text-[10px] px-2 py-0.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]">{t}</span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] text-[12px] font-semibold transition-all"
                  >
                    <Github size={14} />
                    <span>View on GitHub</span>
                  </a>
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-primary text-white text-[12px] font-semibold hover:bg-primary-600 active:bg-primary-700 transition-all"
                  >
                    <ExternalLink size={14} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
