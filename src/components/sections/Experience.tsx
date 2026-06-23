import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { experience } from '@/config/siteData';

const Experience = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="experience" className="section-wrapper relative bg-dark-50/20">
      <div className="blob blob-cyan absolute top-1/2 right-0 w-72 h-72 opacity-5" />

      <div className="container mx-auto px-6 max-w-5xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="section-tag"><Briefcase size={12} /> Experience</span>
          <h2 className="section-title mt-3">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4 text-slate-400">
            Building expertise through hands-on work in networking, security, and software development.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-500/30 to-transparent hidden md:block" />

          <div className="space-y-12">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 -translate-x-1/2 top-6 hidden md:block z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.2 + 0.3, type: 'spring' }}
                    className="timeline-dot"
                  />
                  <div className="absolute inset-0 rounded-full animate-pulse"
                    style={{ background: exp.color, opacity: 0.3, transform: 'scale(2.5)' }} />
                </div>

                {/* Date tag (desktop) */}
                <div className={`hidden md:flex flex-1 ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass border text-xs font-semibold mt-5 self-start"
                    style={{ borderColor: `${exp.color}30`, color: exp.color }}
                  >
                    <Calendar size={12} />
                    {exp.period}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="glass border border-white/08 rounded-2xl p-6 hover:border-primary-500/20 transition-all duration-300"
                    style={{ boxShadow: `0 4px 30px ${exp.color}08` }}
                  >
                    {/* Mobile date */}
                    <div className="flex items-center gap-2 mb-3 md:hidden">
                      <Calendar size={12} style={{ color: exp.color }} />
                      <span className="text-xs font-semibold" style={{ color: exp.color }}>{exp.period}</span>
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}25` }}
                      >
                        <Briefcase size={18} style={{ color: exp.color }} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-white text-lg">{exp.role}</h3>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-sm font-medium" style={{ color: exp.color }}>{exp.company}</span>
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <MapPin size={10} />
                            {exp.location}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs glass border border-white/08 text-slate-400">
                            {exp.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((desc, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: i * 0.2 + j * 0.07 + 0.4 }}
                          className="flex items-start gap-2 text-sm text-slate-400"
                        >
                          <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: exp.color }} />
                          {desc}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map(t => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md text-xs font-mono"
                          style={{ background: `${exp.color}10`, color: exp.color, border: `1px solid ${exp.color}20` }}
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
