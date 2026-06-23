import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { personalInfo } from '@/config/siteData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/05 py-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & copy */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center font-display font-bold text-white text-sm">
                W
              </div>
              <span className="font-display font-bold text-white">
                Warren<span className="gradient-text-cyan">Chris</span>
              </span>
            </div>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Warren Chris. All rights reserved.
            </p>
          </div>

          {/* Made with love */}
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            Designed & built with <Heart size={12} className="text-red-400 animate-pulse" fill="currentColor" /> by Warren Chris
          </p>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {[
              { icon: <Github size={16} />, href: personalInfo.github, label: 'GitHub' },
              { icon: <Linkedin size={16} />, href: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: <Mail size={16} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.15, y: -2 }}
                className="text-slate-500 hover:text-primary-400 transition-colors"
              >
                {s.icon}
              </motion.a>
            ))}

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/30 transition-all ml-2"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
