import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { navLinks, personalInfo } from '@/config/siteData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isDark, toggleTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setScrolled(scrollTop > 50);

      // Active section tracking
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{
          width: `${scrollProgress}%`,
          transition: 'width 0.1s linear',
        }}
      />

      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed top-0 left-0 right-0 z-[1000] border-b transition-all duration-300 ${
          scrolled 
            ? 'navbar-glass bg-[var(--glass-bg)] border-[var(--border-color)] shadow-sm' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between h-14"> {/* Compact 56px Apple height */}
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent-magenta flex items-center justify-center font-sans font-bold text-white text-sm shadow-sm">
                W
              </div>
              <span className="font-sans font-semibold text-[15px] tracking-tight text-[var(--text-primary)] hidden sm:block">
                Warren<span className="text-primary font-bold">Chris</span>
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className={`relative py-1 text-[13px] font-medium tracking-tight transition-colors duration-200 ${
                      isActive
                        ? 'text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-[-16px] left-0 right-0 h-[2px] bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDark ? 'moon' : 'sun'}
                    initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isDark ? <Sun size={15} /> : <Moon size={15} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Download CV */}
              <motion.a
                href={personalInfo.cvUrl}
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-[12px] font-medium hover:bg-primary-600 active:bg-primary-700 transition-all duration-200"
              >
                <Download size={12} />
                Download CV
              </motion.a>

              {/* Hamburger */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={15} /> : <Menu size={15} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              className="lg:hidden bg-[var(--bg-secondary)] border-t border-[var(--border-color)] overflow-hidden"
            >
              <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`px-4 py-2.5 rounded-xl text-[13px] font-medium tracking-tight transition-colors ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-primary bg-primary/10'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-color)]'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href={personalInfo.cvUrl}
                  download
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.03 }}
                  className="mt-2 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-primary text-white text-[12px] font-medium"
                >
                  <Download size={12} />
                  Download CV
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
