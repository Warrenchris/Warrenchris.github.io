import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Cpu, Layers, Zap, Lock, Database } from 'lucide-react';

const principles = [
  {
    icon: <Shield size={20} strokeWidth={1.5} />,
    title: 'Security First',
    description: 'Systems designed with authentication, authorization, and failure scenarios in mind from the start.',
  },
  {
    icon: <Cpu size={20} strokeWidth={1.5} />,
    title: 'Production Mindset',
    description: 'Software isn\'t finished when it runs locally. Monitoring, logging, and error handling are essential.',
  },
  {
    icon: <Layers size={20} strokeWidth={1.5} />,
    title: 'Systems Thinking',
    description: 'Frontend, backend, databases, infrastructure, and external services must work as one cohesive system.',
  },
  {
    icon: <Zap size={20} strokeWidth={1.5} />,
    title: 'Performance Matters',
    description: 'Optimized code, efficient algorithms, and thoughtful architecture create better user experiences.',
  },
  {
    icon: <Lock size={20} strokeWidth={1.5} />,
    title: 'Defense in Depth',
    description: 'Multiple layers of security, input validation, and secure coding practices protect against threats.',
  },
  {
    icon: <Database size={20} strokeWidth={1.5} />,
    title: 'Data Integrity',
    description: 'Consistent, validated, and properly managed data is the foundation of reliable systems.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
};

const Principles = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="principles" className="section-wrapper relative bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/2 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-purple/2 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="section-tag">
              <Zap size={12} className="text-primary" /> Engineering Principles
            </span>
            <h2 className="section-title mt-3 font-display">How I Build</h2>
            <p className="section-subtitle mx-auto mt-4 text-[var(--text-secondary)] font-light text-base">
              Core principles that guide my approach to building software systems.
            </p>
          </motion.div>

          {/* Principles Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {principles.map((principle) => (
              <motion.div
                key={principle.title}
                variants={itemVariants}
                whileHover={{ y: -4, borderColor: 'rgba(221, 161, 94, 0.3)' }}
                className="bg-[var(--glass-bg)] border border-[var(--border-color)] backdrop-blur-md rounded-2xl p-6 transition-all duration-300 hover:border-[var(--text-secondary)]/30 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10 mb-4">
                  {principle.icon}
                </div>
                <h3 className="font-sans font-bold text-[var(--text-primary)] text-lg mb-2 tracking-tight">
                  {principle.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Principles;
