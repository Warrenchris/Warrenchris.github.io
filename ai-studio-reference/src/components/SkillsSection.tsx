import React, { useState } from 'react';
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
  Layers,
  Sparkles
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<number | null>(null);

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server': return <Server className="w-4 h-4 text-white/70" />;
      case 'Layout': return <Layout className="w-4 h-4 text-white/70" />;
      case 'Database': return <Database className="w-4 h-4 text-white/70" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-white/70" />;
      case 'Network': return <Network className="w-4 h-4 text-white/70" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-white/70" />;
      default: return <Layers className="w-4 h-4 text-white/50" />;
    }
  };

  return (
    <section 
      id="skills" 
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      aria-label="Technical Skills & Competencies"
    >
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono-code uppercase tracking-widest text-white/60 mb-3">
          <Terminal className="w-3.5 h-3.5 text-white/50" />
          <span>TECHNICAL MATRIX</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
          Engineering Competencies
        </h2>
        <p className="text-white/60 text-sm sm:text-base max-w-2xl mt-2 font-normal">
          Disciplined technical skills grounded in production deployments, distributed background jobs, networking protocols, and application security.
        </p>
      </motion.div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((category, idx) => {
          const isSelected = selectedDomain === idx;
          return (
            <motion.div
              key={category.title}
              id={`skill-category-${idx}`}
              onClick={() => setSelectedDomain(isSelected ? null : idx)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ 
                duration: 0.6, 
                delay: idx * 0.08, 
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              className={`bg-[#0d0d0d] border rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-5 backdrop-blur-sm ${
                isSelected 
                  ? 'border-white/30 ring-1 ring-white/20 bg-white/[0.04] shadow-2xl shadow-black/80' 
                  : 'border-white/5 hover:border-white/15'
              }`}
            >
              <div className="space-y-3">
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-black/60 border border-white/5">
                      {getDomainIcon(category.iconName)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-display text-white">
                        {category.title}
                      </h3>
                      <span className="text-[10px] font-mono-code text-white/40">
                        {category.skills.length} core proficiencies
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-white/60 leading-relaxed font-normal">
                  {category.description}
                </p>

                {/* Skills List */}
                <div className="space-y-2 pt-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`p-2.5 rounded-xl border transition-colors ${
                        skill.highlight 
                          ? 'bg-black/80 border-white/15' 
                          : 'bg-black/40 border-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white/90 font-mono-code flex items-center gap-1.5">
                          {skill.highlight && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
                          )}
                          {skill.name}
                        </span>
                        <span className={`text-[10px] font-mono-code px-1.5 py-0.5 rounded ${
                          skill.level === 'Advanced' 
                            ? 'bg-white/10 text-white border border-white/20' 
                            : 'bg-white/[0.03] text-white/50'
                        }`}>
                          {skill.level}
                        </span>
                      </div>
                      <div className="text-[11px] text-white/50 font-mono-code mt-1">
                        {skill.context}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[10px] font-mono-code text-white/40 flex items-center justify-between border-t border-white/5">
                <span>VERIFIED VIA PRODUCTION WORK</span>
                <span className="text-white/70">● ACTIVE</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
