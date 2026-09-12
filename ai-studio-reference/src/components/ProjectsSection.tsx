import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Github, 
  ExternalLink, 
  Layers, 
  ShieldCheck, 
  Server, 
  Cpu, 
  Network, 
  Database,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { ProjectCaseStudy, ProjectCategory } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (projectId: string) => void;
  onOpenArchitectureDemo: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onOpenArchitectureDemo
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Systems' },
    { id: 'backend', label: 'Backend & Queues' },
    { id: 'fullstack', label: 'Full-Stack Platforms' },
    { id: 'infrastructure', label: 'Infrastructure & Docker' },
    { id: 'business', label: 'Business & Procurement' },
    { id: 'security', label: 'Security & Networking' }
  ];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (selectedCategory === 'all') return true;
    return project.category.includes(selectedCategory);
  });

  return (
    <section 
      id="projects" 
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      aria-label="Engineered Systems and Projects"
    >
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono-code uppercase tracking-widest text-white/60 mb-3">
            <Layers className="w-3.5 h-3.5 text-white/50" />
            <span>PRODUCTION & SYSTEMS WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
            Case Studies & Architecture
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mt-2 font-normal">
            Real software systems engineered with production constraints, distributed queue workers, network automation, and relational data modeling.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 flex-wrap bg-[#0d0d0d] p-1.5 rounded-xl border border-white/5" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              id={`filter-btn-${cat.id}`}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg font-mono-code transition-all duration-150 ${
                selectedCategory === cat.id
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/40 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="space-y-8">
        
        {filteredProjects.map((project, index) => {
          return (
            <motion.article
              key={project.id}
              id={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ 
                duration: 0.6, 
                delay: Math.min(index * 0.08, 0.25),
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              className={`group bg-[#0d0d0d] border rounded-2xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden backdrop-blur-sm ${
                project.isFlagship 
                  ? 'border-white/15 hover:border-white/30 shadow-2xl shadow-black/60' 
                  : 'border-white/5 hover:border-white/15'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left/Main Column: Title, Subtitle, Problem & Solution */}
                <div className="lg:col-span-8 space-y-4">
                  
                  {/* Badges & Role */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    {project.isFlagship && (
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white font-mono-code text-[10px] uppercase font-semibold tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>FLAGSHIP SYSTEM</span>
                      </span>
                    )}
                    <span className="text-xs font-mono-code text-white/50 bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/5">
                      {project.role}
                    </span>
                    <span className="text-xs font-mono-code text-white/40">
                      {project.period}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-white group-hover:text-white/90 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/70 mt-1.5 leading-relaxed font-normal">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Brief Description */}
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    {project.brief}
                  </p>

                  {/* High Impact Highlights / Outcomes */}
                  <div className="bg-black/60 border border-white/5 rounded-xl p-4 space-y-2">
                    <span className="text-[10px] font-mono-code text-white/40 uppercase tracking-widest block font-semibold">
                      Engineering Highlights & Impact:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.outcomes.slice(0, 2).map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-white/50 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/5 text-xs font-mono-code text-white/60 group-hover:border-white/10 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Right Column: Case Study Actions & Tech Summary */}
                <div className="lg:col-span-4 bg-black/60 border border-white/5 rounded-xl p-5 space-y-4 flex flex-col justify-between h-full">
                  
                  <div className="space-y-3">
                    <div className="text-xs font-mono-code text-white/40 flex items-center justify-between pb-2 border-b border-white/5">
                      <span className="uppercase tracking-wider">DOMAIN</span>
                      <span className="text-white/80">{project.category[1]?.toUpperCase() || 'SYSTEMS'}</span>
                    </div>

                    <div className="text-xs text-white/70 space-y-1.5 font-mono-code">
                      {project.coreTech.backend && (
                        <div>
                          <span className="text-white/30 block text-[10px]">CORE BACKEND:</span>
                          <span className="text-white/90">{project.coreTech.backend.join(' · ')}</span>
                        </div>
                      )}
                      {project.coreTech.data && (
                        <div>
                          <span className="text-white/30 block text-[10px]">STORAGE & QUEUES:</span>
                          <span className="text-white/90">{project.coreTech.data.join(' · ')}</span>
                        </div>
                      )}
                      {project.coreTech.infra && (
                        <div>
                          <span className="text-white/30 block text-[10px]">INFRASTRUCTURE:</span>
                          <span className="text-white/90">{project.coreTech.infra.join(' · ')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => onSelectProject(project.id)}
                      id={`project-deepdive-btn-${project.id}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 hover:border-white/30 text-xs font-semibold font-mono-code flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/70" />
                    </button>

                    {project.hasInteractiveDemo && (
                      <button
                        onClick={onOpenArchitectureDemo}
                        className="w-full py-2 px-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] text-white/60 hover:text-white text-xs font-mono-code flex items-center justify-center gap-1.5 border border-white/5 transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5 text-white/50" />
                        <span>Interactive Simulator</span>
                      </button>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] text-white/40 hover:text-white text-xs font-mono-code flex items-center justify-center gap-1.5 border border-white/5 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Repository on GitHub</span>
                      </a>
                    )}
                  </div>

                </div>

              </div>
            </motion.article>
          );
        })}

      </div>
    </section>
  );
};
