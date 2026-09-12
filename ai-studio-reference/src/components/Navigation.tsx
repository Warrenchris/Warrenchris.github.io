import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  FileText, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
  Award,
  User,
  Mail,
  Github
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavigationProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenTerminal,
  onOpenResume,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Architecture', href: '#architecture', id: 'architecture' },
    { name: 'Principles', href: '#principles', id: 'principles' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Certifications', href: '#certifications', id: 'certifications' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#090909]/95 backdrop-blur-md border-b border-white/5 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Identifier */}
          <a
            href="#"
            id="nav-logo-link"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded p-1"
          >
            <div className="w-8 h-8 rounded bg-white/[0.04] border border-white/10 flex items-center justify-center font-mono-code font-bold text-white text-xs tracking-wider group-hover:border-white/30 transition-colors">
              WC
            </div>
            <div>
              <div className="font-display font-medium text-white tracking-tight text-sm sm:text-base flex items-center gap-2 group-hover:text-white/90 transition-colors">
                Warren Chris
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90 inline-block"></span>
              </div>
              <div className="text-[10px] text-white/40 font-mono-code tracking-[0.2em] uppercase">
                Systems Builder
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.02] p-1.5 rounded-full border border-white/5 backdrop-blur-sm" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  id={`nav-link-${link.id}`}
                  className={`px-3.5 py-1 text-[11px] font-mono-code uppercase tracking-wider rounded-full transition-all duration-150 ${
                    isActive
                      ? 'bg-white/10 text-white border border-white/15'
                      : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Terminal Button */}
            <button
              onClick={onOpenTerminal}
              id="nav-terminal-btn"
              title="Open Interactive CLI Terminal (Press ⌘K or click)"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code rounded-lg bg-white/[0.02] border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all duration-150"
            >
              <Terminal className="w-3.5 h-3.5 text-white/50" />
              <span>CLI</span>
              <kbd className="text-[10px] bg-white/[0.05] px-1.5 py-0.5 rounded text-white/40 border border-white/10">⌘K</kbd>
            </button>

            {/* Resume / CV Button */}
            <button
              onClick={onOpenResume}
              id="nav-resume-btn"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono-code rounded-lg bg-white/[0.04] border border-white/10 text-white/80 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-150"
            >
              <FileText className="w-3.5 h-3.5 text-white/50" />
              <span>Dossier (CV)</span>
            </button>

            {/* Get in Touch CTA */}
            <a
              href="#contact"
              id="nav-contact-cta"
              className="flex items-center gap-1 px-4 py-1.5 text-xs font-medium rounded-lg bg-white text-black hover:bg-white/90 shadow-sm transition-all duration-150"
            >
              <span>Contact</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenTerminal}
              aria-label="Open CLI"
              className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-white/70 hover:bg-white/[0.08]"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="nav-mobile-toggle-btn"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-white/40"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/85 backdrop-blur-md lg:hidden flex flex-col pt-20 px-6 pb-8"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[10px] font-mono-code uppercase tracking-[0.2em] text-white/40 pb-2 border-b border-white/5">
              Navigation Menu
            </div>
            
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-mono-code uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-white/5 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs font-mono-code uppercase tracking-wider hover:bg-white/[0.08] transition-colors"
              >
                <FileText className="w-4 h-4 text-white/50" />
                View Dossier (CV)
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-black border border-white/10 text-white/70 text-xs font-mono-code uppercase tracking-wider hover:bg-white/[0.04] transition-colors"
              >
                <Terminal className="w-4 h-4" />
                Launch CLI Terminal
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-black text-xs font-medium uppercase tracking-wider hover:bg-white/90 transition-colors shadow-lg"
              >
                <Mail className="w-4 h-4" />
                Contact Warren Chris
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
