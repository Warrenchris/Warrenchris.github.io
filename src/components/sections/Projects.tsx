import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Search, FolderOpen, X, Star, Rocket } from 'lucide-react';
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
    <section id="projects" className="section-wrapper relative">
      <div className="blob blob-purple absolute top-10 left-10 w-80 h-80 opacity-6" />
      <div className="blob blob-magenta absolute bottom-10 right-10 w-60 h-60 opacity-5" />

      <div className="container mx-auto px-6 max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <span className="section-tag"><FolderOpen size={12} /> Projects</span>
            <h2 className="section-title mt-3">
              Featured <span className="gradient-text">Work</span>
            </h2>
            <p className="section-subtitle mx-auto mt-4 text-slate-400">
              A showcase of projects spanning cybersecurity, networking, full-stack development, and data science.
            </p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="form-input pl-11"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex gap-2 flex-wrap">
              {filters.map(filter => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-primary-500 to-accent-purple text-white shadow-neon-cyan'
                      : 'glass border border-white/08 text-slate-400 hover:text-white'
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  layout
                >
                  <Tilt
                    tiltMaxAngleX={8}
                    tiltMaxAngleY={8}
                    scale={1.01}
                    transitionSpeed={400}
                    className="h-full"
                  >
                    <div className="project-card-inner h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-50 via-transparent to-transparent" />

                        {/* Featured badge */}
                        {project.featured && (
                          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-primary-500 to-accent-purple text-white text-xs font-semibold">
                            <Star size={10} fill="white" />
                            Featured
                          </div>
                        )}

                        {/* Color accent */}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-1"
                          style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="mb-1 text-xs text-slate-500 font-medium uppercase tracking-wider">
                          {project.subtitle}
                        </div>
                        <h3 className="font-display font-bold text-white text-lg mb-2 leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Tech pills */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tech.slice(0, 4).map(t => (
                            <span key={t} className="tech-pill text-xs px-2 py-0.5">{t}</span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="tech-pill text-xs px-2 py-0.5">+{project.tech.length - 4}</span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl glass border border-white/08 text-slate-400 hover:text-white hover:border-primary-500/30 text-sm font-medium transition-all duration-200"
                          >
                            <Github size={14} /> GitHub
                          </motion.a>
                          <motion.button
                            onClick={() => setSelectedProject(project)}
                            whileHover={{ scale: 1.05 }}
                            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-purple/20 border border-primary-500/20 text-primary-400 hover:from-primary-500/30 hover:to-accent-purple/30 text-sm font-medium transition-all duration-200"
                          >
                            <ExternalLink size={14} /> Details
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
                  className="col-span-full text-center py-16 text-slate-500"
                >
                  <FolderOpen size={40} className="mx-auto mb-3 opacity-30" />
                  <p>No projects match your search.</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
            style={{ background: 'rgba(2, 8, 23, 0.9)', backdropFilter: 'blur(20px)' }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="w-full max-w-2xl glass-card overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-52 overflow-hidden">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-50 to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-white hover:text-red-400 transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-4 left-5">
                  <h3 className="font-display text-2xl font-bold text-white">{selectedProject.title}</h3>
                  <p className="text-sm text-primary-400">{selectedProject.subtitle}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-slate-300 leading-relaxed mb-5 text-sm">{selectedProject.longDescription}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="tech-pill">{t}</span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass border border-white/10 text-white font-medium hover:border-primary-500/30 transition-all"
                  >
                    <Github size={16} /> View on GitHub
                  </a>
                  <a
                    href={selectedProject.demo}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-purple text-white font-medium shadow-neon-cyan"
                  >
                    <Rocket size={16} /> Live Demo
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
