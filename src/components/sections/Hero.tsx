import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Github, Mail, Layers } from 'lucide-react';
import { personalInfo, systemArchitectureNodes } from '@/config/siteData';

// Interactive System Architecture Visualization
function ArchitectureVisualizer() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('gateway');
  const activeNode = systemArchitectureNodes.find((n) => n.id === selectedNodeId) || systemArchitectureNodes[1];

  return (
    <div className="w-full mt-6 pt-6 border-t border-[var(--border-color)] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers size={13} className="text-[var(--color-accent)]" />
          <span className="font-mono text-caption uppercase tracking-wider text-[var(--text-muted)]">
            Verified Production Architecture
          </span>
        </div>
        <span className="text-[11px] font-mono text-[var(--text-muted)] hidden sm:inline-block">
          Select node to inspect details
        </span>
      </div>

      {/* Desktop & Tablet Nodes Flow */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 select-none"
        role="tablist"
        aria-label="System Architecture Nodes"
      >
        {systemArchitectureNodes.map((node, i) => {
          const isSelected = node.id === selectedNodeId;
          return (
            <button
              key={node.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              tabIndex={0}
              onClick={() => setSelectedNodeId(node.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedNodeId(node.id);
                }
              }}
              className={`p-3 rounded-md text-left transition-all relative border ${
                isSelected
                  ? 'border-[var(--color-accent)] bg-[var(--bg-secondary)] shadow-sm'
                  : 'border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-secondary)]'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-mono text-[10px] text-[var(--text-muted)]">
                  0{i + 1}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    isSelected ? 'bg-[var(--color-accent)]' : 'bg-[var(--border-color)]'
                  }`}
                />
              </div>
              <p className="font-mono text-[11px] font-semibold tracking-tight text-[var(--text-primary)] truncate">
                {node.label}
              </p>
              <p className="text-[10px] text-[var(--text-secondary)] truncate mt-0.5 font-mono">
                {node.sublabel.split('/')[0].trim()}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Node Inspection Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="p-4 rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-small"
        >
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-caption font-semibold text-[var(--text-primary)]">
                {activeNode.label}
              </span>
              <span className="text-[var(--border-color)]">·</span>
              <span className="font-mono text-caption text-[var(--color-accent)]">
                {activeNode.sublabel}
              </span>
            </div>
            <p className="text-caption text-[var(--text-secondary)] leading-relaxed">
              {activeNode.role}
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-1 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--border-color)]">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
              Deployed In
            </span>
            <span className="text-caption font-medium text-[var(--text-primary)]">
              {activeNode.evidence}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 1, 0.5, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col justify-center pt-24 pb-16"
    >
      <div className="container-main flex flex-col gap-6 max-w-4xl">
        {/* Identity & Metadata Kicker */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5"
        >
          <span className="font-semibold text-[15px] text-[var(--text-primary)] tracking-tight">
            {personalInfo.name}
          </span>
          <span className="text-[var(--border-hover)]">/</span>
          <span className="section-label">{personalInfo.title}</span>
          <span className="text-[var(--border-hover)] hidden sm:inline">/</span>
          <span className="section-label hidden sm:inline">{personalInfo.role}</span>
          <span className="text-[var(--border-hover)] hidden md:inline">/</span>
          <span className="section-label hidden md:inline">{personalInfo.location}</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-display text-[var(--text-primary)] max-w-3xl font-semibold tracking-tight"
        >
          {personalInfo.headline}
        </motion.h1>

        {/* Supporting Narrative */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-body text-[var(--text-secondary)] max-w-2xl text-large leading-relaxed"
        >
          {personalInfo.subheadline}
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center gap-3 pt-1"
        >
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
          >
            <span>View Selected Work</span>
            <ArrowDown size={14} />
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Github size={14} />
            <span>GitHub (@Warrenchris)</span>
          </a>

          <a
            href={personalInfo.resumeRequestUrl}
            className="btn-secondary"
            title="Request Warren's Resume via direct email"
          >
            <Mail size={14} />
            <span>Request Resume</span>
          </a>
        </motion.div>

        {/* Interactive Architecture Visualization */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <ArchitectureVisualizer />
        </motion.div>
      </div>
    </section>
  );
}
