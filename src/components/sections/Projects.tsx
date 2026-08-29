'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, FolderOpen, ArrowRight } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { projects } from '@/config/siteData';

const filters = ['All', 'Full Stack', 'Backend', 'AI', 'Cybersecurity', 'Business Systems'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = projects.filter((project) =>
    activeFilter === 'All' ? true : project.tags.includes(activeFilter)
  );

  return (
    <section id="projects" className="py-20 bg-background text-foreground relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className={`group rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-all flex flex-col ${
                  project.featured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Image or Placeholder */}
                <div className={`relative overflow-hidden w-full ${project.featured ? 'h-64' : 'h-48'}`}>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/80 to-secondary flex items-center justify-center">
                      <span className="text-5xl font-bold text-white uppercase opacity-50">
                        {project.title.substring(0, 2)}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary">
                    {project.subtitle}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tech.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-sm font-medium flex items-center gap-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={`GitHub repository for ${project.title}`}
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No projects found for this category.</p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <Dialog.Root open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Dialog.Title className="text-3xl font-bold mb-2">
                      {selectedProject.title}
                    </Dialog.Title>
                    <Dialog.Description className="text-xl text-primary font-medium">
                      {selectedProject.subtitle}
                    </Dialog.Description>
                  </div>
                  <Dialog.Close className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close</span>
                  </Dialog.Close>
                </div>

                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-auto max-h-[400px] object-cover rounded-lg border border-border"
                  />
                ) : (
                  <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-primary/80 to-secondary flex items-center justify-center rounded-lg">
                    <span className="text-6xl font-bold text-white uppercase opacity-50">
                      {selectedProject.title.substring(0, 2)}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      View Source
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-6">
                    {selectedProject.problem && (
                      <section>
                        <h4 className="text-lg font-semibold mb-2">The Problem</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{selectedProject.problem}</p>
                      </section>
                    )}
                    {selectedProject.solution && (
                      <section>
                        <h4 className="text-lg font-semibold mb-2">The Solution</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{selectedProject.solution}</p>
                      </section>
                    )}
                    {selectedProject.outcome && (
                      <section>
                        <h4 className="text-lg font-semibold mb-2">Outcome & Impact</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{selectedProject.outcome}</p>
                      </section>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    {selectedProject.architecture && (
                      <section>
                        <h4 className="text-lg font-semibold mb-2">Architecture</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{selectedProject.architecture}</p>
                      </section>
                    )}
                    {selectedProject.engineering && (
                      <section>
                        <h4 className="text-lg font-semibold mb-2">Engineering Challenges</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{selectedProject.engineering}</p>
                      </section>
                    )}
                    {selectedProject.security && (
                      <section>
                        <h4 className="text-lg font-semibold mb-2">Security Considerations</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{selectedProject.security}</p>
                      </section>
                    )}
                  </div>
                </div>

                <section className="pt-4 border-t border-border">
                  <h4 className="text-lg font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
