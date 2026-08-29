import { motion } from 'framer-motion';
import { ChevronDown, Mail, Github, Linkedin, FileText, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '@/config/siteData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden pt-24 pb-16 bg-[var(--bg-primary)] text-[var(--text-primary)]"
    >
      <div className="container mx-auto px-6 z-10 w-full max-w-4xl flex flex-col items-center text-center my-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#30D158] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#30D158]" />
              </span>
              <span>Available for engineering roles & consulting</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold tracking-tight mb-4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05]"
          >
            Warren <span className="text-primary">Chris</span>
          </motion.h1>

          {/* Headline Value Proposition */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[var(--text-primary)] mb-5 max-w-2xl text-balance leading-snug"
          >
            {personalInfo.headline}
          </motion.p>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] mb-10 max-w-2xl leading-relaxed text-balance"
          >
            {personalInfo.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-primary text-white hover:bg-primary-600 active:scale-98 transition-all duration-200 shadow-sm w-full sm:w-auto"
            >
              <span>Explore My Work</span>
              <ArrowUpRight size={16} />
            </button>

            <a
              href={personalInfo.cvUrl}
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-primary)] hover:border-[var(--text-secondary)] active:scale-98 transition-all duration-200 w-full sm:w-auto"
            >
              <FileText size={16} className="text-primary" />
              <span>Download CV</span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            {[
              { icon: <Github size={18} />, href: personalInfo.github, label: 'GitHub' },
              { icon: <Linkedin size={18} />, href: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: <Mail size={18} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={() => scrollToSection('projects')}
        className="flex flex-col items-center gap-1.5 cursor-pointer mt-6 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
        aria-label="Scroll to projects"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
