import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { personalInfo } from '@/config/siteData';

// SVG System Visualization — shows system architecture understanding
function SystemViz() {
  const nodes = [
    { label: 'CLIENT', x: 0 },
    { label: 'API', x: 1 },
    { label: 'SERVICE', x: 2 },
    { label: 'DATABASE', x: 3 },
    { label: 'AI', x: 4 },
  ];

  return (
    <div className="hidden md:flex items-center justify-center gap-0 select-none" aria-hidden="true">
      {nodes.map((node, i) => (
        <div key={node.label} className="flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
            className="group flex flex-col items-center gap-1.5"
          >
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] opacity-60 group-hover:opacity-100 transition-opacity" />
              <motion.div
                className="absolute inset-0 w-2 h-2 rounded-full bg-[var(--color-accent)]"
                animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />
            </div>
            <span className="font-mono text-[9px] font-medium tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
              {node.label}
            </span>
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9 + i * 0.1, duration: 0.3 }}
              className="w-10 lg:w-14 h-px bg-[var(--border-color)] mx-2 origin-left"
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Mobile system viz — vertical
function SystemVizMobile() {
  const nodes = ['CLIENT', 'API', 'SERVICE', 'DB', 'AI'];
  return (
    <div className="flex md:hidden items-center justify-center gap-2 select-none" aria-hidden="true">
      {nodes.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-50" />
            <span className="font-mono text-[8px] font-medium tracking-wider text-[var(--text-muted)]">
              {label}
            </span>
          </div>
          {i < nodes.length - 1 && (
            <div className="w-4 h-px bg-[var(--border-color)]" />
          )}
        </div>
      ))}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-center pt-20 pb-12"
    >
      <div className="container-main flex flex-col gap-8 max-w-3xl">
        {/* Metadata line */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center gap-x-4 gap-y-1"
        >
          {['Software Engineering', 'Full-Stack', 'AI / Systems', 'Nairobi, Kenya'].map((item, i) => (
            <span key={item} className="flex items-center gap-x-4">
              <span className="section-label">{item}</span>
              {i < 3 && <span className="text-[var(--border-color)]">·</span>}
            </span>
          ))}
        </motion.div>

        {/* Main heading */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-display text-[var(--text-primary)] max-w-2xl"
        >
          {personalInfo.headline}
        </motion.h1>

        {/* Supporting copy */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-body text-[var(--text-secondary)] max-w-xl"
        >
          {personalInfo.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          <a href="#work" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary">
            View selected work
            <ArrowDown size={14} />
          </a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            GitHub
          </a>
        </motion.div>

        {/* System visualization */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="pt-8"
        >
          <SystemViz />
          <SystemVizMobile />
        </motion.div>
      </div>
    </section>
  );
}
