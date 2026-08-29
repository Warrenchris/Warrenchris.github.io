'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Mail, Github, Linkedin, Download, FileText } from 'lucide-react';
import { personalInfo } from '@/config/siteData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Hero() {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Subtle radial gradient background */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, var(--border-color) 0%, transparent 60%)',
        }}
      />

      <div className="container mx-auto px-4 z-10 w-full max-w-3xl flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border"
              style={{
                backgroundColor: 'var(--glass-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for opportunities
            </div>
          </motion.div>

          {/* Name & Headline */}
          <motion.h1 
            variants={itemVariants} 
            className="font-bold tracking-tight mb-4 text-balance"
            style={{ fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)' }}
          >
            {personalInfo.name}
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="font-medium text-balance mb-6"
            style={{ 
              fontSize: 'clamp(1.25rem, 2vw + 1rem, 2rem)',
              color: 'var(--text-primary)'
            }}
          >
            {personalInfo.headline}
          </motion.p>

          <motion.p 
            variants={itemVariants} 
            className="text-balance mb-10 max-w-2xl"
            style={{ 
              fontSize: 'clamp(1rem, 1vw + 0.8rem, 1.25rem)',
              color: 'var(--text-secondary)'
            }}
          >
            {personalInfo.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full justify-center">
            <a 
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto"
              style={{
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-primary)',
              }}
            >
              View My Work
            </a>
            <a 
              href={personalInfo.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium border transition-colors hover:bg-opacity-10 w-full sm:w-auto"
              style={{
                backgroundColor: 'transparent',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              <FileText size={18} />
              Download CV
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <a 
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-full border transition-transform hover:scale-110"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--glass-bg)',
                color: 'var(--text-primary)',
              }}
            >
              <Github size={20} />
            </a>
            <a 
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-full border transition-transform hover:scale-110"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--glass-bg)',
                color: 'var(--text-primary)',
              }}
            >
              <Linkedin size={20} />
            </a>
            <a 
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className="p-3 rounded-full border transition-transform hover:scale-110"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--glass-bg)',
                color: 'var(--text-primary)',
              }}
            >
              <Mail size={20} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        <span className="text-sm font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
