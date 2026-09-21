import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Layout, 
  Database, 
  Cpu, 
  Network, 
  ShieldCheck, 
  CheckCircle2,
  Terminal,
  Layers
} from 'lucide-react';
import { skillCategories } from '@/config/siteData';
import ScrollReveal from '@/components/layout/ScrollReveal';

export default function SkillsSection() {
  const [selectedDomain, setSelectedDomain] = useState<number | null>(null);

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server': return <Server className="w-4 h-4 text-[var(--color-accent)]" />;
      case 'Layout': return <Layout className="w-4 h-4 text-[var(--color-accent)]" />;
      case 'Database': return <Database className="w-4 h-4 text-[var(--color-accent)]" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-[var(--color-accent)]" />;
      case 'Network': return <Network className="w-4 h-4 text-[var(--color-accent)]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-[var(--color-accent)]" />;
      default: return <Layers className="w-4 h-4 text-[var(--text-muted)]" />;
    }
  };

  return (
    <section id="skills" className="section-gap">
      <div className="container-main">
        {/* Section Header */}
        <ScrollReveal className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">
            <Terminal className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            <span>TECHNICAL MATRIX</span>
          </div>
          <h2 className="text-heading text-[var(--text-primary)]">
            Technical Competency Matrix
          </h2>
          <p className="text-body text-[var(--text-secondary)] mt-3 max-w-2xl leading-relaxed">
            Comprehensive technical capabilities across backend systems, frontend engineering, infrastructure, networking, and security domains.
          </p>
        </ScrollReveal>

        {/* Domain Selection */}
        <ScrollReveal delay={0.1} className="mb-8">
          <div className="flex flex-wrap gap-2">
            {skillCategories.map((category, index) => (
              <button
                key={category.title}
                onClick={() => setSelectedDomain(selectedDomain === index ? null : index)}
                className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
                  selectedDomain === index
                    ? 'bg-[var(--color-accent)] text-[var(--bg-primary)]'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-color)]'
                }`}
              >
                {getDomainIcon(category.iconName)}
                {category.title}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const isSelected = selectedDomain === null || selectedDomain === categoryIndex;
            
            return (
              <ScrollReveal key={category.title} delay={categoryIndex * 0.1}>
                <div 
                  className={`bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 transition-all duration-300 ${
                    isSelected ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  {/* Domain Header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-color)]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)]">
                        {getDomainIcon(category.iconName)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[var(--text-primary)]">
                          {category.title}
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div 
                        key={skill.name}
                        className="p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {skill.highlight && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0" />
                              )}
                              <span className="text-sm font-semibold text-[var(--text-primary)]">
                                {skill.name}
                              </span>
                            </div>
                            <p className="text-xs text-[var(--text-secondary)]">
                              {skill.context}
                            </p>
                          </div>
                          <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded ${
                            skill.level === 'Advanced' 
                              ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' 
                              : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                          }`}>
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}