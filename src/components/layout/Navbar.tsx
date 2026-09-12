import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Code, Cpu, Shield, Network, Wrench, Terminal, FileText, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { navLinks, personalInfo } from '@/config/siteData';

// Skill icons for creative navigation - showcasing full tech stack
const skillIcons: Record<string, any> = {
  'Work': Code,           // Development & coding skills
  'Engineering': Cpu,     // Systems & infrastructure
  'About': Network,       // Networking & security expertise
  'Contact': Shield,      // Security & reliability focus
};

// Skill descriptions for tooltips
const skillDescriptions: Record<string, string> = {
  'Work': 'Full-Stack Development · React · Node.js · Python',
  'Engineering': 'Systems Architecture · Docker · Microservices · AI',
  'About': 'Networking · Cisco · Huawei · Cybersecurity · Infrastructure',
  'Contact': 'Secure Communications · Professional Services',
};

// Terminal modal component
function TerminalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    { type: 'info', text: 'Warren Chris Portfolio CLI v1.0.0' },
    { type: 'info', text: 'Type "help" to view available commands.' },
  ]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    let response = '';
    switch (cmd) {
      case 'help':
        response = 'Available commands: help, projects, skills, contact, clear';
        break;
      case 'projects':
        response = 'Projects: ISP Billing System, Zena POS, GroupDeal, Artemis Tracker, Road Accident Analyzer';
        break;
      case 'skills':
        response = 'Skills: React, Node.js, Python, Docker, MySQL, Redis, Networking, Security';
        break;
      case 'contact':
        response = `Contact: ${personalInfo.email} | GitHub: ${personalInfo.github}`;
        break;
      case 'clear':
        setOutput([]);
        setInput('');
        return;
      default:
        response = `Command not found: ${cmd}. Type "help" for available commands.`;
    }

    setOutput([...output, { type: 'command', text: `$ ${input}` }, { type: 'response', text: response }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] w-full max-w-3xl h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono text-xs" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-[var(--bg-secondary)] px-4 py-3 border-b border-[var(--border-color)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]"></span>
            </div>
            <span className="text-xs font-bold text-[var(--text-secondary)] ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              warrenchris@portfolio:~$
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors border border-[var(--border-color)]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Output */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-[var(--bg-primary)]">
          {output.map((line, i) => (
            <div key={i} className={line.type === 'command' ? 'text-[var(--text-primary)] font-semibold' : line.type === 'info' ? 'text-[var(--color-accent)]' : 'text-[var(--text-secondary)]'}>
              {line.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleCommand} className="bg-[var(--bg-secondary)] p-3 border-t border-[var(--border-color)] flex items-center gap-2">
          <span className="text-[var(--text-muted)] text-xs font-bold">warrenchris@portfolio:~$</span>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type 'help', 'projects', 'skills'..."
            className="flex-1 bg-transparent text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none font-mono"
          />
        </form>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Work');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Scroll spy logic
      const sections = navLinks.map(link => link.href.replace('#', ''));
      const scrollPosition = window.scrollY + 100;
      
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(navLinks.find(link => link.href === `#${sectionId}`)?.label || 'Work');
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) setIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, isOpen]);

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsOpen(false);
  };

  return (
    <>
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--bg-primary)] focus:border focus:border-[var(--color-accent)] focus:text-[var(--text-primary)] focus:rounded-md focus:shadow-md font-mono text-small"
      >
        Skip to main content
      </a>

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--nav-border)] shadow-sm'
            : 'bg-transparent border-b border-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-[15px] font-semibold tracking-tight text-[var(--text-primary)] hover:opacity-70 transition-opacity"
            >
              Warren Chris
            </a>

            {/* Desktop Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-[var(--bg-secondary)] p-1.5 rounded-full border border-[var(--border-color)] backdrop-blur-sm" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const Icon = skillIcons[link.label] || Wrench;
                const isActive = activeSection === link.label;
                const description = skillDescriptions[link.label] || '';
                
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className={`relative group flex items-center gap-2 px-3.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded-full transition-all duration-150 ${
                      isActive
                        ? 'bg-[var(--bg-primary)] text-[var(--color-accent)] border border-[var(--border-color)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    title={description}
                  >
                    <Icon size={12} className={isActive ? 'text-[var(--color-accent)]' : ''} />
                    <span className="font-medium">{link.label}</span>
                    
                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        layoutId="activeDot"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--color-accent)] rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    {/* Skill tooltip */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-md shadow-lg text-[11px] font-medium text-[var(--text-secondary)] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                      {description}
                    </div>
                  </motion.a>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Terminal Button */}
              <button
                onClick={() => setTerminalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-tertiary)] transition-all duration-150"
                title="Open CLI Terminal"
              >
                <Terminal className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span>CLI</span>
              </button>

              <a
                href={personalInfo.resumeRequestUrl}
                className="hidden sm:inline-flex text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                title="Request Warren's resume PDF via email"
              >
                Resume
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                GitHub
              </a>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              {/* Mobile toggle */}
              <div className="flex items-center gap-2 lg:hidden">
                <button
                  onClick={() => setTerminalOpen(true)}
                  aria-label="Open CLI"
                  className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]"
                >
                  <Terminal className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isOpen}
                >
                  {isOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu — full screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] bg-[var(--bg-primary)] flex flex-col pt-20 px-8"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const Icon = skillIcons[link.label] || Wrench;
                const isActive = activeSection === link.label;
                const description = skillDescriptions[link.label] || '';
                
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`py-4 flex flex-col items-start gap-2 text-2xl font-semibold tracking-tight transition-colors border-b border-[var(--border-color)] ${
                      isActive 
                        ? 'text-[var(--color-accent)] bg-[var(--bg-secondary)]' 
                        : 'text-[var(--text-primary)] hover:text-[var(--color-accent)]'
                    }`}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <Icon size={24} className={isActive ? 'text-[var(--color-accent)]' : ''} />
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="mobileActiveDot"
                          className="ml-auto w-2 h-2 bg-[var(--color-accent)] rounded-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </div>
                    <span className="text-sm font-normal text-[var(--text-muted)] ml-8">
                      {description}
                    </span>
                  </motion.a>
                );
              })}
            </nav>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setTerminalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-mono uppercase tracking-wider hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <Terminal className="w-4 h-4 text-[var(--text-muted)]" />
                Launch CLI Terminal
              </button>

              <a
                href={personalInfo.resumeRequestUrl}
                className="text-sm font-medium text-[var(--text-primary)]"
                onClick={() => setIsOpen(false)}
              >
                Request Resume (PDF) ↗
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--text-secondary)]"
              >
                GitHub ↗
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-sm font-medium text-[var(--text-secondary)]"
              >
                {personalInfo.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Modal */}
      <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}
