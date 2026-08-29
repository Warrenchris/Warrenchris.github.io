import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Briefcase, MapPin, CheckCircle2, ShieldCheck, Terminal, Layers, Cpu } from 'lucide-react';
import { personalInfo, experience, principles } from '@/config/siteData';

const principleIcons = [
  <ShieldCheck size={20} className="text-primary" strokeWidth={1.5} key="security" />,
  <Terminal size={20} className="text-primary" strokeWidth={1.5} key="production" />,
  <Layers size={20} className="text-primary" strokeWidth={1.5} key="systems" />,
  <Cpu size={20} className="text-primary" strokeWidth={1.5} key="learning" />,
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-wrapper relative bg-[var(--bg-secondary)] border-y border-[var(--border-color)]"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-20"
        >
          {/* Header */}
          <div className="text-center sm:text-left">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
              <User size={13} />
              <span>About Me</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="section-title font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              Engineering with purpose &amp; discipline.
            </motion.h2>
          </div>

          {/* Narrative Bio */}
          <motion.div variants={itemVariants} className="space-y-5 max-w-3xl">
            <p className="text-lg sm:text-xl font-medium leading-relaxed text-[var(--text-primary)]">
              {personalInfo.bio}
            </p>
            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              {personalInfo.bioExtended}
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <Briefcase size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                  Experience
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Practical engineering, support, and infrastructure consulting.
                </p>
              </div>
            </div>

            <div className="space-y-8 border-l border-[var(--border-color)] ml-4 pl-6 sm:pl-8 relative">
              {experience.map((exp, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Node */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary border-2 border-[var(--bg-secondary)] shadow-sm" />

                  <div className="bg-[var(--glass-bg)] border border-[var(--border-color)] rounded-2xl p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-[var(--text-secondary)]/30">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)] tracking-tight">
                          {exp.role}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)] mt-0.5">
                          <span className="font-semibold text-primary">{exp.company}</span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1">
                            <MapPin size={11} /> {exp.location}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-medium text-[var(--text-secondary)] px-2.5 py-1 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] self-start sm:self-auto mt-2 sm:mt-0">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                          <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="tech-pill text-[11px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Engineering Principles */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-1">
                Engineering Principles
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Core mental models and standards that guide every architecture decision.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-[var(--glass-bg)] border border-[var(--border-color)] backdrop-blur-md transition-all duration-300 hover:border-primary/40 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/15 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                    {principleIcons[index % principleIcons.length]}
                  </div>
                  <h4 className="text-base font-bold text-[var(--text-primary)] mb-2 tracking-tight">
                    {principle.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
