import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Terminal, 
  ShieldCheck, 
  Server, 
  Cpu, 
  CheckCircle2, 
  Network, 
  Layers, 
  ArrowUpRight 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenResume: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  return (
    <section 
      id="about" 
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      aria-label="About Warren Chris"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Narrative */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono-code uppercase tracking-widest text-white/60">
            <User className="w-3.5 h-3.5 text-white/50" />
            <span>BACKGROUND & MINDSET</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight leading-tight">
            Systems Builder with a Focus on Resilient Infrastructure
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-white/70 leading-relaxed font-normal">
            <p>
              I am a <strong className="text-white font-semibold">Software Engineer and Systems Builder</strong> based in Nairobi, Kenya. While completing my Information Technology degree, my primary focus has always been engineering production-grade software: distributed backend services, asynchronous lifecycle queues, network authentication daemons, and business applications.
            </p>
            <p>
              My background bridges the gap between software engineering and network infrastructure. Rather than treating networks or databases as black boxes, I build software with deep visibility into socket lifecycles, TCP/IP state machines, FreeRADIUS AAA protocols, and relational ACID transactions.
            </p>
            <p>
              When I design an application, I prioritize <span className="text-white font-medium">security by default</span>, <span className="text-white font-medium">resilience to network interruptions</span>, and <span className="text-white font-medium">straightforward operational simplicity</span>. Whether automating ISP subscriber provisioning with M-Pesa webhooks or structuring a double-entry inventory ledger, my focus is delivering deterministic, reliable software that scales with the business.
            </p>
          </div>

          {/* Core Focus Areas */}
          <div className="pt-2">
            <span className="text-xs font-mono-code text-white/40 uppercase tracking-widest block mb-3 font-semibold">
              Current Technical Explorations & Deep Dives:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="bg-[#0d0d0d] border border-white/5 p-3.5 rounded-xl flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0"></div>
                <div>
                  <div className="text-xs font-semibold text-white">Distributed Job Architecture</div>
                  <div className="text-[11px] text-white/50 font-mono-code">BullMQ, Redis Streams & dead-letter strategies</div>
                </div>
              </div>

              <div className="bg-[#0d0d0d] border border-white/5 p-3.5 rounded-xl flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0"></div>
                <div>
                  <div className="text-xs font-semibold text-white">Network Telemetry & AAA</div>
                  <div className="text-[11px] text-white/50 font-mono-code">FreeRADIUS 3.x, CoA & high-concurrency PPPoE</div>
                </div>
              </div>

              <div className="bg-[#0d0d0d] border border-white/5 p-3.5 rounded-xl flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0"></div>
                <div>
                  <div className="text-xs font-semibold text-white">Microservice Isolation</div>
                  <div className="text-[11px] text-white/50 font-mono-code">Docker Compose networks & stateless containers</div>
                </div>
              </div>

              <div className="bg-[#0d0d0d] border border-white/5 p-3.5 rounded-xl flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0"></div>
                <div>
                  <div className="text-xs font-semibold text-white">Data Modeling & Performance</div>
                  <div className="text-[11px] text-white/50 font-mono-code">Normalized relational schemas & query tuning</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={onOpenResume}
              id="about-view-cv-btn"
              className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 hover:border-white/30 text-xs font-mono-code font-semibold flex items-center gap-2 transition-all"
            >
              <span>View Full Credentials & CV</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>

        </motion.div>

        {/* Right Column: Key Metrics & Technical DNA */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-5"
        >
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-6 shadow-2xl space-y-6 backdrop-blur-sm">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <span className="text-xs font-mono-code text-white/70 font-bold uppercase tracking-wider">
                ENGINEERING PROFILE
              </span>
              <span className="text-xs font-mono-code text-white/40">
                Nairobi, Kenya
              </span>
            </div>

            <div className="space-y-4 font-mono-code text-xs">
              
              <div className="bg-black/60 p-4 rounded-xl border border-white/5 space-y-1">
                <span className="text-white/40 text-[10px] uppercase tracking-wider">CORE ARCHITECTURE PHILOSOPHY</span>
                <div className="text-white font-bold text-sm">
                  Zero-Trust · Decoupled Queues · Relational Integrity
                </div>
              </div>

              <div className="bg-black/60 p-4 rounded-xl border border-white/5 space-y-2">
                <span className="text-white/40 text-[10px] uppercase tracking-wider">VERIFIED CAPABILITIES</span>
                <div className="grid grid-cols-2 gap-2 text-white/70 text-[11px]">
                  <div>✓ Node.js & TypeScript</div>
                  <div>✓ FreeRADIUS 3.x AAA</div>
                  <div>✓ Redis & BullMQ Queues</div>
                  <div>✓ MySQL & PostgreSQL</div>
                  <div>✓ Docker Containerization</div>
                  <div>✓ M-Pesa Daraja APIs</div>
                </div>
              </div>

              <div className="bg-black/60 p-4 rounded-xl border border-white/5 space-y-1">
                <span className="text-white/40 text-[10px] uppercase tracking-wider">COMMUNICATION & AVAILABILITY</span>
                <div className="text-white/80">
                  Fluent English · Available for Full-Time, Remote & Contract Engagements
                </div>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
