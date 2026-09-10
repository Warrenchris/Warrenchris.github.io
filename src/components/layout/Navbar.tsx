import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Code, Cpu, Shield, Network, Wrench } from 'lucide-react';
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Work');
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
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                const Icon = skillIcons[link.label] || Wrench;
                const isActive = activeSection === link.label;
                const description = skillDescriptions[link.label] || '';
                
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className={`relative group flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      isActive 
                        ? 'text-[var(--color-accent)] bg-[var(--bg-secondary)]' 
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={description}
                  >
                    <Icon size={14} className={isActive ? 'text-[var(--color-accent)]' : ''} />
                    <span className="text-[13px] font-medium">{link.label}</span>
                    
                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        layoutId="activeDot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--color-accent)] rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-[var(--color-accent)] opacity-0 group-hover:opacity-10 rounded-lg blur-md"
                      initial={false}
                      animate={{ opacity: isActive ? 0.1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Skill tooltip */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-md shadow-lg text-[11px] font-medium text-[var(--text-secondary)] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                      {description}
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
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
    </>
  );
}
