import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { personalInfo } from '@/config/siteData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[var(--border-color)] bg-black py-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & copy */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent-magenta flex items-center justify-center font-sans font-bold text-white text-xs shadow-sm">
                W
              </div>
              <span className="font-sans font-semibold text-sm tracking-tight text-white">
                Warren<span className="text-primary font-bold">Chris</span>
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] font-medium">
              © {new Date().getFullYear()} Warren Chris. All rights reserved.
            </p>
          </div>

          {/* Made with love */}
          <p className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] font-medium">
            Designed &amp; built with <Heart size={10} className="text-[#FF3B30] animate-pulse" fill="currentColor" /> by Warren Chris
          </p>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {[
              { icon: <Github size={15} />, href: personalInfo.github, label: 'GitHub' },
              { icon: <Linkedin size={15} />, href: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: <Mail size={15} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.05, y: -1 }}
                className="text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                {s.icon}
              </motion.a>
            ))}

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white transition-all ml-2"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
