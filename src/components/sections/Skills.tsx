import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap } from 'lucide-react';
import { skills } from '@/config/siteData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const currentSkills = skills[activeCategory];

  return (
    <section id="skills" className="section-wrapper relative bg-dark-50/30">
      <div className="blob blob-cyan absolute top-20 right-20 w-72 h-72 opacity-6" />

      <div className="container mx-auto px-6 max-w-7xl" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-14">
            <span className="section-tag"><Zap size={12} /> Technical Skills</span>
            <h2 className="section-title mt-3">
              My <span className="gradient-text">Expertise</span>
            </h2>
            <p className="section-subtitle mx-auto mt-4 text-slate-400">
              A curated set of skills built through hands-on projects, certifications, and real-world consulting.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
            {skills.map((cat, i) => (
              <motion.button
                key={cat.category}
                onClick={() => setActiveCategory(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeCategory === i
                    ? 'text-dark bg-gradient-to-r from-primary-500 to-accent-purple shadow-neon-cyan'
                    : 'glass border border-white/08 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.category}
              </motion.button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-4"
          >
            {currentSkills.items.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="glass border border-white/06 rounded-2xl p-5 group hover:border-primary-500/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-white text-sm">{skill.name}</span>
                  <motion.span
                    className="text-xs font-bold font-mono"
                    style={{ color: currentSkills.color }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>

                {/* Progress Bar */}
                <div className="skill-progress-track">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.4, delay: 0.3 + i * 0.06, ease: 'easeOut' }}
                    style={{
                      background: `linear-gradient(90deg, ${currentSkills.color}, ${currentSkills.color}80)`,
                    }}
                  />
                </div>

                {/* Proficiency Label */}
                <div className="mt-2 text-xs text-slate-600">
                  {skill.level >= 90 ? '⭐ Expert' :
                    skill.level >= 80 ? '✅ Advanced' :
                    skill.level >= 70 ? '📈 Intermediate' : '🌱 Learning'}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech Stack Icons */}
          <motion.div variants={itemVariants} className="mt-14">
            <p className="text-center text-xs text-slate-600 uppercase tracking-widest mb-6">Technologies I Work With</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Python', 'React', 'TypeScript', 'Node.js', 'Java', 'Flask',
                'Linux', 'Cisco IOS', 'Docker', 'MySQL', 'PostgreSQL', 'Git',
                'AWS', 'Wireshark', 'Nmap', 'C/C++',
              ].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.03 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="tech-pill cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
