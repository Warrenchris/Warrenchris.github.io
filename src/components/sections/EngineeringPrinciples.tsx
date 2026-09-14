import { ShieldCheck, Flame, Database, Activity } from 'lucide-react';
import { engineeringPrinciples } from '@/config/siteData';
import ScrollReveal from '@/components/layout/ScrollReveal';

const iconMap = {
  ShieldCheck,
  Flame,
  Database,
  Activity,
};

export default function EngineeringPrinciples() {
  return (
    <section id="principles" className="section-gap">
      <div className="container-main">
        {/* Section Heading */}
        <ScrollReveal className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">
            <span className="text-[var(--color-accent)]">◆</span>
            <span>ENGINEERING PHILOSOPHY</span>
          </div>
          <h2 className="text-heading text-[var(--text-primary)]">
            How I Architect & Build Systems
          </h2>
          <p className="text-body text-[var(--text-secondary)] mt-3 max-w-2xl leading-relaxed">
            Disciplined engineering standards derived from deploying real-world platforms, managing asynchronous queues, and hardening infrastructure.
          </p>
        </ScrollReveal>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {engineeringPrinciples.map((principle, index) => {
            const Icon = iconMap[principle.iconName as keyof typeof iconMap] || Activity;
            
            return (
              <ScrollReveal key={principle.id} delay={index * 0.1}>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 hover:border-[var(--border-hover)] transition-all duration-200 flex flex-col justify-between space-y-6 group">
                  <div className="space-y-4">
                    
                    {/* Header with Number & Icon */}
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] group-hover:border-[var(--border-hover)] transition-colors">
                          <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-[var(--text-muted)] font-bold tracking-widest uppercase block">
                            PRINCIPLE {principle.number}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mt-0.5">
                            {principle.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Tagline */}
                    <div className="text-xs sm:text-sm italic text-[var(--text-secondary)] border-l border-[var(--border-color)] pl-3.5 py-0.5">
                      &ldquo;{principle.tagline}&rdquo;
                    </div>

                    {/* Body */}
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {principle.description}
                    </p>
                  </div>

                  {/* Implementation in Practice */}
                  <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl p-4 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] font-semibold block">
                      PRACTICAL IMPLEMENTATION PATTERN:
                    </span>
                    <p className="text-xs text-[var(--text-secondary)] font-mono leading-relaxed">
                      {principle.implementation}
                    </p>
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