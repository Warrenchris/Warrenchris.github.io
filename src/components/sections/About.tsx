import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Briefcase, MapPin, CheckCircle2 } from 'lucide-react';
import { personalInfo, experience, principles } from '@/config/siteData';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-[var(--bg-primary)]"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-20"
        >
          {/* Header */}
          <div className="space-y-4">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-500 text-sm font-medium">
              <Heart className="w-4 h-4" />
              <span>About</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-[var(--text-primary)]">
              About Me
            </motion.h2>
          </div>

          {/* Part A: Bio narrative */}
          <motion.div variants={itemVariants} className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-[var(--text-secondary)]">
            <p className="text-xl font-medium leading-relaxed text-[var(--text-primary)]">
              {personalInfo.bio}
            </p>
            <p className="text-lg leading-relaxed">
              {personalInfo.bioExtended}
            </p>
          </motion.div>

          {/* Part B: Experience Timeline */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">Experience</h3>
            </div>
            
            <div className="space-y-8 border-l-2 border-slate-200 dark:border-slate-800 ml-4 pl-8 relative">
              {experience.map((exp, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[var(--bg-primary)] border-4 border-blue-500 group-hover:scale-110 transition-transform duration-300" />
                  
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h4 className="text-xl font-semibold text-[var(--text-primary)]">{exp.role}</h4>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-tertiary)] mt-1">
                          <span className="font-medium text-[var(--text-secondary)]">{exp.company}</span>
                          <span>•</span>
                          <span>{exp.period}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {exp.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 text-[var(--text-secondary)]">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex gap-2 text-sm leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.tech.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-[var(--text-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Part C: Engineering Principles */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">Engineering Principles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {principles.map((principle, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-colors"
                >
                  <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-3">{principle.title}</h4>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
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
};
