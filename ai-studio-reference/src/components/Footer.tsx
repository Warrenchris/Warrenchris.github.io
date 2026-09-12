import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUp, 
  Github, 
  Mail, 
  Terminal, 
  FileText, 
  ShieldCheck,
  Heart
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal, onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="border-t border-white/5 bg-[#090909] py-14 text-white/50 font-mono-code text-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/5">
          
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 text-white font-bold flex items-center justify-center text-xs">
                WC
              </div>
              <span className="font-display font-bold text-white text-base">
                Warren Chris
              </span>
            </div>
            <p className="text-white/60 text-xs leading-relaxed max-w-md font-sans">
              Software Engineer and Systems Builder specializing in distributed backend services, asynchronous queues, network automation, and production-hardened web platforms.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-white/80 pt-1">
              <span className="w-2 h-2 rounded-full bg-white inline-block animate-pulse"></span>
              <span>Available for Full-Time Roles & High-Impact Contracts</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <span className="text-white font-bold uppercase tracking-wider block text-[11px]">
              SECTIONS
            </span>
            <ul className="space-y-1.5 text-xs text-white/60">
              <li><a href="#projects" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Architecture Flow</a></li>
              <li><a href="#principles" className="hover:text-white transition-colors">Engineering Principles</a></li>
              <li><a href="#skills" className="hover:text-white transition-colors">Technical Matrix</a></li>
              <li><a href="#certifications" className="hover:text-white transition-colors">Certifications</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About & Mindset</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Get in Touch</a></li>
            </ul>
          </div>

          {/* Col 3: Engineering Utilities */}
          <div className="space-y-2">
            <span className="text-white font-bold uppercase tracking-wider block text-[11px]">
              DEVELOPER UTILITIES
            </span>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <button
                  onClick={onOpenTerminal}
                  className="text-left hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5 text-white/50" />
                  <span>Launch CLI Terminal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenResume}
                  className="text-left hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-white/50" />
                  <span>View / Print Resume</span>
                </button>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-white/50" />
                  <span>GitHub (@warrenchris)</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-white/50" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & system stamp */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-white/40">
          <div>
            © {new Date().getFullYear()} Warren Chris. Engineered with strict typography, zero-trust security & clean architecture.
          </div>

          <div className="flex items-center gap-4">
            <span>Built with React · TypeScript · Tailwind CSS</span>
            <button
              onClick={scrollToTop}
              id="footer-scroll-top-btn"
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white transition-colors flex items-center gap-1 border border-white/5"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>

      </div>
    </motion.footer>
  );
};
