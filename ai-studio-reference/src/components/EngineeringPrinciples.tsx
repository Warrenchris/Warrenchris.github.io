import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Flame, 
  Boxes, 
  Cpu, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Lock,
  Server,
  Code
} from 'lucide-react';
import { ENGINEERING_PRINCIPLES } from '../data/portfolioData';

export const EngineeringPrinciples: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldCheck className="w-5 h-5 text-white/70" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-white/70" />;
      case 'Boxes':
        return <Boxes className="w-5 h-5 text-white/70" />;
      case 'Cpu':
      default:
        return <Cpu className="w-5 h-5 text-white/70" />;
    }
  };

  return (
    <section 
      id="principles" 
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      aria-label="Engineering Principles & Philosophy"
    >
      {/* Section Heading */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono-code uppercase tracking-widest text-white/60 mb-3">
          <Code className="w-3.5 h-3.5 text-white/50" />
          <span>ENGINEERING PHILOSOPHY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
          How I Architect & Build Systems
        </h2>
        <p className="text-white/60 text-sm sm:text-base max-w-2xl mt-2 font-normal">
          Disciplined engineering standards derived from deploying real-world platforms, managing asynchronous queues, and hardening infrastructure.
        </p>
      </motion.div>

      {/* Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ENGINEERING_PRINCIPLES.map((principle, index) => (
          <motion.div
            key={principle.id}
            id={`principle-card-${principle.id}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1, 
              ease: [0.21, 0.47, 0.32, 0.98] 
            }}
            className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/15 transition-all duration-200 flex flex-col justify-between space-y-6 backdrop-blur-sm group"
          >
            <div className="space-y-4">
              
              {/* Header with Number & Icon */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-black/60 border border-white/5 group-hover:border-white/15 transition-colors">
                    {getIcon(principle.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code text-white/40 font-bold tracking-widest uppercase block">
                      PRINCIPLE {principle.number}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-white mt-0.5">
                      {principle.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <div className="text-xs sm:text-sm font-editorial-serif italic text-white/90 font-normal border-l border-white/30 pl-3.5 py-0.5">
                &ldquo;{principle.tagline}&rdquo;
              </div>

              {/* Body */}
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                {principle.description}
              </p>
            </div>

            {/* Implementation in Practice */}
            <div className="bg-black/60 border border-white/5 rounded-xl p-4 space-y-1.5">
              <span className="text-[10px] font-mono-code uppercase tracking-widest text-white/40 font-semibold block">
                PRACTICAL IMPLEMENTATION PATTERN:
              </span>
              <p className="text-xs text-white/80 font-mono-code leading-relaxed">
                {principle.implementation}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
