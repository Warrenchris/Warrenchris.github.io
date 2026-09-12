import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Terminal, 
  FileText, 
  ShieldCheck, 
  Server, 
  Cpu, 
  Network, 
  Github, 
  Linkedin, 
  Mail, 
  CheckCircle2, 
  Layers,
  Activity,
  Zap
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onSelectProject: (projectId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenTerminal,
  onOpenResume,
  onSelectProject
}) => {
  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
      aria-label="Hero Introduction"
    >
      {/* Subtle architectural background grid & radial light */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Availability Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono-code text-white/70 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{PERSONAL_INFO.availabilityStatus}</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-xs font-mono-code text-white/40">
            <span className="text-white/80">Nairobi, KE</span>
            <span className="text-white/20">·</span>
            <span>Remote Worldwide</span>
          </div>
        </motion.div>

        {/* Main Headline & Positioning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="space-y-2"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-[1.12]">
                I build <span className="font-editorial-serif italic font-normal text-white/90">software systems</span> that solve complex engineering problems.
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed font-normal"
            >
              Software engineer with deep focus on <strong className="text-white font-medium">distributed backend services</strong>, <strong className="text-white font-medium">asynchronous queues (BullMQ / Redis)</strong>, <strong className="text-white font-medium">network automation (FreeRADIUS AAA)</strong>, and <strong className="text-white font-medium">high-integrity business platforms</strong>.
            </motion.p>

            {/* Core Competency Pillars */}
            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2"
            >
              <div className="bg-[#0d0d0d] border border-white/5 rounded-xl p-3.5 hover:border-white/15 transition-colors">
                <div className="text-white/80 mb-1 flex items-center justify-between">
                  <Server className="w-4 h-4 text-white/70" />
                  <span className="text-[10px] font-mono-code text-white/40 tracking-wider">BACKEND</span>
                </div>
                <div className="text-xs font-semibold text-white/90">Distributed APIs</div>
                <div className="text-[11px] text-white/40 font-mono-code">Node · BullMQ · Queues</div>
              </div>

              <div className="bg-[#0d0d0d] border border-white/5 rounded-xl p-3.5 hover:border-white/15 transition-colors">
                <div className="text-white/80 mb-1 flex items-center justify-between">
                  <Network className="w-4 h-4 text-white/70" />
                  <span className="text-[10px] font-mono-code text-white/40 tracking-wider">NETWORKS</span>
                </div>
                <div className="text-xs font-semibold text-white/90">AAA & RADIUS</div>
                <div className="text-[11px] text-white/40 font-mono-code">FreeRADIUS · MikroTik</div>
              </div>

              <div className="bg-[#0d0d0d] border border-white/5 rounded-xl p-3.5 hover:border-white/15 transition-colors">
                <div className="text-white/80 mb-1 flex items-center justify-between">
                  <Cpu className="w-4 h-4 text-white/70" />
                  <span className="text-[10px] font-mono-code text-white/40 tracking-wider">FRONTEND</span>
                </div>
                <div className="text-xs font-semibold text-white/90">React & TypeScript</div>
                <div className="text-[11px] text-white/40 font-mono-code">Modern UI · Tailored UX</div>
              </div>

              <div className="bg-[#0d0d0d] border border-white/5 rounded-xl p-3.5 hover:border-white/15 transition-colors">
                <div className="text-white/80 mb-1 flex items-center justify-between">
                  <ShieldCheck className="w-4 h-4 text-white/70" />
                  <span className="text-[10px] font-mono-code text-white/40 tracking-wider">DEVSECOPS</span>
                </div>
                <div className="text-xs font-semibold text-white/90">Zero-Trust & Docker</div>
                <div className="text-[11px] text-white/40 font-mono-code">RBAC · Rate Limiting</div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-wrap items-center gap-3.5 pt-4"
            >
              <a
                href="#projects"
                id="hero-view-work-btn"
                className="px-5 py-2.5 rounded-lg bg-white hover:bg-white/90 text-black text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shadow-sm transition-all duration-150"
              >
                <span>View Case Studies</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#architecture"
                id="hero-architecture-btn"
                className="px-4 py-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-white/90 border border-white/10 hover:border-white/20 text-xs font-mono-code flex items-center gap-2 transition-all duration-150"
              >
                <Layers className="w-4 h-4 text-white/60" />
                <span>Interactive Simulator</span>
              </a>

              <button
                onClick={onOpenResume}
                id="hero-cv-btn"
                className="px-4 py-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-white/80 border border-white/10 hover:border-white/20 text-xs font-mono-code flex items-center gap-2 transition-all duration-150"
              >
                <FileText className="w-4 h-4 text-white/50" />
                <span>Dossier (CV)</span>
              </button>

              <button
                onClick={onOpenTerminal}
                id="hero-terminal-btn"
                className="px-3.5 py-2.5 rounded-lg bg-black hover:bg-white/[0.04] text-white/70 border border-white/10 hover:border-white/25 text-xs font-mono-code flex items-center gap-1.5 transition-all duration-150"
                title="Launch CLI Terminal"
              >
                <Terminal className="w-4 h-4 text-white/50" />
                <span>CLI</span>
              </button>
            </motion.div>

            {/* Quick Links & Social Proof */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex items-center gap-5 pt-3 text-xs text-white/40 font-mono-code"
            >
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-1.5 transition-colors"
                id="hero-github-link"
              >
                <Github className="w-4 h-4" />
                <span>github/warrenchris</span>
              </a>
              <span className="text-white/10">|</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:text-white flex items-center gap-1.5 transition-colors"
                id="hero-email-link"
              >
                <Mail className="w-4 h-4" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </motion.div>

          </div>

          {/* Right Column: Live System Telemetry / Architecture Snapshot */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-4"
          >
            <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="text-[11px] font-mono-code uppercase tracking-wider text-white/70">SYSTEM PROFILE</span>
                </div>
                <span className="text-[10px] font-mono-code text-white/60 bg-white/[0.05] px-2 py-0.5 rounded border border-white/10">
                  PRODUCTION READY
                </span>
              </div>

              {/* Metrics & Architecture Snapshot */}
              <div className="space-y-3 font-mono-code text-xs">
                
                {/* Metric Item 1 */}
                <div className="bg-black/60 p-3.5 rounded-xl border border-white/5">
                  <div className="text-white/40 text-[10px] flex items-center justify-between mb-1 uppercase tracking-wider">
                    <span>FLAGSHIP SYSTEM</span>
                    <span className="text-emerald-400 font-medium">99.9% Uptime Target</span>
                  </div>
                  <div className="text-white font-semibold text-sm">
                    ISP Billing & AAA Automation
                  </div>
                  <div className="text-[11px] text-white/50 mt-1">
                    FreeRADIUS · M-Pesa · BullMQ · Redis
                  </div>
                </div>

                {/* Metric Item 2 */}
                <div className="bg-black/60 p-3.5 rounded-xl border border-white/5">
                  <div className="text-white/40 text-[10px] flex items-center justify-between mb-1 uppercase tracking-wider">
                    <span>VERIFIED CREDENTIALS</span>
                    <span className="text-white/60">3 Active</span>
                  </div>
                  <div className="text-white/80 font-medium text-[11px] space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white/40 shrink-0" />
                      <span>Huawei HCIA-Datacom (Routing & Switching)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white/40 shrink-0" />
                      <span>Cisco DevNet Associate (Automation)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white/40 shrink-0" />
                      <span>IBM Enterprise Design Thinking</span>
                    </div>
                  </div>
                </div>

                {/* Metric Item 3 */}
                <div className="bg-black/60 p-3.5 rounded-xl border border-white/5">
                  <div className="text-white/40 text-[10px] uppercase tracking-wider mb-1">
                    <span>ENGINEERING DOMAINS</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 bg-white/[0.04] border border-white/5 rounded text-[10px] text-white/70">Asynchronous Workers</span>
                    <span className="px-2 py-0.5 bg-white/[0.04] border border-white/5 rounded text-[10px] text-white/70">Idempotent Webhooks</span>
                    <span className="px-2 py-0.5 bg-white/[0.04] border border-white/5 rounded text-[10px] text-white/70">Dockerized Services</span>
                    <span className="px-2 py-0.5 bg-white/[0.04] border border-white/5 rounded text-[10px] text-white/70">Relational DBs</span>
                  </div>
                </div>

                {/* Quick inspect button */}
                <button
                  onClick={() => onSelectProject('isp-billing-engine')}
                  className="w-full py-2 bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono-code rounded-lg border border-white/10 hover:border-white/25 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Activity className="w-3.5 h-3.5 text-white/50" />
                  <span>Inspect Flagship Architecture</span>
                </button>

              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
