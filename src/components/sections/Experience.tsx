import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { experience } from '@/config/siteData';

const Experience = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="experience" className="section-wrapper relative bg-black border-b border-[var(--border-color)]">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/2 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="section-tag"><Briefcase size={12} className="text-primary" /> Experience</span>
          <h2 className="section-title mt-3 font-display">Professional Journey</h2>
          <p className="section-subtitle mx-auto mt-4 text-[var(--text-secondary)] font-light text-base">
            Building expertise through hands-on work in networking, security, and software development.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block" />

          <div className="space-y-12">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 -translate-x-1/2 top-6 hidden md:block z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.15 + 0.2, type: 'spring' }}
                    className="w-3.5 h-3.5 rounded-full bg-primary border-2 border-black shadow-sm"
                  />
                </div>

                {/* Date tag (desktop) */}
                <div className={`hidden md:flex flex-1 ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] mt-4 self-start">
                    <Calendar size={12} className="text-primary" />
                    {exp.period}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="bg-white/[0.01] border border-white/[0.04] backdrop-blur-md rounded-3xl p-6 transition-all duration-300 hover:border-white/[0.08] shadow-sm"
                  >
                    {/* Mobile date */}
                    <div className="flex items-center gap-2 mb-3 md:hidden text-[var(--text-secondary)]">
                      <Calendar size={12} className="text-primary" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider">{exp.period}</span>
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10 flex-shrink-0 text-primary">
                        <Briefcase size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-sans font-bold text-white text-base tracking-tight">{exp.role}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-0.5">
                          <span className="text-xs font-semibold text-primary">{exp.company}</span>
                          <span className="text-[var(--text-muted)] font-medium text-xs">&bull;</span>
                          <span className="flex items-center gap-1 text-[11px] text-[var(--text-secondary)]">
                            <MapPin size={10} />
                            {exp.location}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] border border-[var(--border-color)] bg-white/[0.02] text-[var(--text-secondary)]">
                            {exp.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-5">
                      {exp.description.map((desc, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -5 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: i * 0.15 + j * 0.05 + 0.3 }}
                          className="flex items-start gap-2 text-xs text-[var(--text-secondary)] leading-relaxed"
                        >
                          <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0 text-primary" />
                          <span>{desc}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map(t => (
                        <span
                          key={t}
                          className="tech-pill text-[10px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
