import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Github, Mail, Layers, Server, Network, Cpu, ShieldCheck, Activity, CheckCircle2 } from 'lucide-react';
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

      {/* Active Node Inspection Card with System Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Active Node Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="lg:col-span-2 p-4 rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-small"
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

        {/* System Profile Sidebar */}
        <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-2xl p-5 shadow-sm relative overflow-hidden">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)]">SYSTEM PROFILE</span>
            </div>
            <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded border border-[var(--border-color)]">
              PRODUCTION READY
            </span>
          </div>

          {/* Metrics & Architecture Snapshot */}
          <div className="space-y-3 font-mono text-xs">
            
            {/* Metric Item 1 */}
            <div className="bg-[var(--bg-primary)] p-3.5 rounded-xl border border-[var(--border-color)]">
              <div className="text-[var(--text-muted)] text-[10px] flex items-center justify-between mb-1 uppercase tracking-wider">
                <span>FLAGSHIP SYSTEM</span>
                <span className="text-[var(--color-accent)] font-medium">99.9% Uptime Target</span>
              </div>
              <div className="text-[var(--text-primary)] font-semibold text-sm">
                ISP Billing & AAA Automation
              </div>
              <div className="text-[11px] text-[var(--text-muted)] mt-1">
                FreeRADIUS · M-Pesa · BullMQ · Redis
              </div>
            </div>

            {/* Metric Item 2 */}
            <div className="bg-[var(--bg-primary)] p-3.5 rounded-xl border border-[var(--border-color)]">
              <div className="text-[var(--text-muted)] text-[10px] flex items-center justify-between mb-1 uppercase tracking-wider">
                <span>VERIFIED CREDENTIALS</span>
                <span className="text-[var(--text-secondary)]">3 Active</span>
              </div>
              <div className="text-[var(--text-secondary)] font-medium text-[11px] space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                  <span>Huawei HCIA-Datacom (Routing & Switching)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                  <span>Cisco DevNet Associate (Automation)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                  <span>IBM Enterprise Design Thinking</span>
                </div>
              </div>
            </div>

            {/* Metric Item 3 */}
            <div className="bg-[var(--bg-primary)] p-3.5 rounded-xl border border-[var(--border-color)]">
              <div className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1">
                <span>ENGINEERING DOMAINS</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded text-[10px] text-[var(--text-secondary)]">Asynchronous Workers</span>
                <span className="px-2 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded text-[10px] text-[var(--text-secondary)]">Idempotent Webhooks</span>
                <span className="px-2 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded text-[10px] text-[var(--text-secondary)]">Dockerized Services</span>
                <span className="px-2 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded text-[10px] text-[var(--text-secondary)]">Relational DBs</span>
              </div>
            </div>

            {/* Quick inspect button */}
            <button
              onClick={() => {
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-2 bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-xs font-mono rounded-lg border border-[var(--border-color)] hover:border-[var(--border-hover)] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Activity className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <span>Inspect Flagship Architecture</span>
            </button>

          </div>
        </div>
      </div>
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

const typewriterSpecializations = [
  'full-stack platforms.',
  'distributed systems.',
  'intelligent AI services.',
  'resilient backend architecture.',
];

function useTypewriter(words: string[], typingSpeed = 70, deletingSpeed = 35, pauseDuration = 2200) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0]);
      return;
    }

    const currentWord = words[wordIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (text.length < currentWord.length) {
        // Subtle human variation in keystroke cadence
        const cadenceVariance = Math.random() * 20 - 10;
        timer = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, Math.max(30, typingSpeed + cadenceVariance));
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}

export default function Hero() {
  const typedSpecialization = useTypewriter(typewriterSpecializations);

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(var(--text-primary)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)]"></div>
      
      <div className="container-main flex flex-col gap-6 max-w-4xl relative z-10">
        {/* Availability Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
            </span>
            <span>Available for full-time & high-impact roles</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-muted)]">
            <span className="text-[var(--text-secondary)]">Nairobi, KE</span>
            <span className="text-[var(--border-color)]">·</span>
            <span>Remote Worldwide</span>
          </div>
        </motion.div>

        {/* Identity & Metadata Kicker */}
        <motion.div
          custom={1}
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

        {/* Main Heading with Human Typewriter Animation */}
        <motion.h1
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-display text-[var(--text-primary)] max-w-3xl font-semibold tracking-tight min-h-[2.8em] sm:min-h-[2.2em]"
        >
          <span className="sr-only">
            {personalInfo.headline}
          </span>
          <span aria-hidden="true">
            Software Engineer specializing in{' '}
            <span className="text-[var(--color-accent)]">{typedSpecialization}</span>
            <span className="typing-cursor" />
          </span>
        </motion.h1>

        {/* Supporting Narrative */}
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-body text-[var(--text-secondary)] max-w-2xl text-large leading-relaxed"
        >
          {personalInfo.subheadline}
        </motion.p>

        {/* Core Competency Pillars */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2"
        >
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-3.5 hover:border-[var(--border-hover)] transition-colors">
            <div className="text-[var(--text-secondary)] mb-1 flex items-center justify-between">
              <Server className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider">BACKEND</span>
            </div>
            <div className="text-xs font-semibold text-[var(--text-primary)]">Distributed APIs</div>
            <div className="text-[11px] text-[var(--text-muted)] font-mono">Node · BullMQ · Queues</div>
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-3.5 hover:border-[var(--border-hover)] transition-colors">
            <div className="text-[var(--text-secondary)] mb-1 flex items-center justify-between">
              <Network className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider">NETWORKS</span>
            </div>
            <div className="text-xs font-semibold text-[var(--text-primary)]">AAA & RADIUS</div>
            <div className="text-[11px] text-[var(--text-muted)] font-mono">FreeRADIUS · MikroTik</div>
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-3.5 hover:border-[var(--border-hover)] transition-colors">
            <div className="text-[var(--text-secondary)] mb-1 flex items-center justify-between">
              <Cpu className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider">FRONTEND</span>
            </div>
            <div className="text-xs font-semibold text-[var(--text-primary)]">React & TypeScript</div>
            <div className="text-[11px] text-[var(--text-muted)] font-mono">Modern UI · Tailored UX</div>
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-3.5 hover:border-[var(--border-hover)] transition-colors">
            <div className="text-[var(--text-secondary)] mb-1 flex items-center justify-between">
              <ShieldCheck className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider">DEVSECOPS</span>
            </div>
            <div className="text-xs font-semibold text-[var(--text-primary)]">Zero-Trust & Docker</div>
            <div className="text-[11px] text-[var(--text-muted)] font-mono">RBAC · Rate Limiting</div>
          </div>
        </motion.div>

        {/* Primary CTAs */}
        <motion.div
          custom={5}
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
          custom={6}
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
