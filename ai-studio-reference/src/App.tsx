import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ArchitecturePlayground } from './components/ArchitecturePlayground';
import { EngineeringPrinciples } from './components/EngineeringPrinciples';
import { SkillsSection } from './components/SkillsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ResumeViewerModal } from './components/ResumeViewerModal';
import { ProjectCaseStudy } from './types';
import { PROJECTS_DATA } from './data/portfolioData';

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Keyboard shortcut for CLI Terminal (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        if (selectedProjectId) setSelectedProjectId(null);
        if (isTerminalOpen) setIsTerminalOpen(false);
        if (isResumeOpen) setIsResumeOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectId, isTerminalOpen, isResumeOpen]);

  // Section Observer for Active Navigation Highlight
  useEffect(() => {
    const sectionIds = ['hero', 'projects', 'architecture', 'principles', 'skills', 'certifications', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectedProject = PROJECTS_DATA.find(p => p.id === selectedProjectId) || null;

  const handleOpenArchitectureDemo = () => {
    const el = document.getElementById('architecture');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-[#e5e5e5] relative selection:bg-white/10 selection:text-white">
      
      {/* Top Navigation */}
      <Navigation 
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <main id="main-content">
        {/* 1. Hero Section */}
        <Hero 
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          onSelectProject={(id) => setSelectedProjectId(id)}
        />

        {/* 2. Flagship Systems & Case Studies */}
        <ProjectsSection 
          onSelectProject={(id) => setSelectedProjectId(id)}
          onOpenArchitectureDemo={handleOpenArchitectureDemo}
        />

        {/* 3. Interactive Architecture & Lifecycle Simulator */}
        <ArchitecturePlayground />

        {/* 4. Engineering Principles & Systems Philosophy */}
        <EngineeringPrinciples />

        {/* 5. Technical Competencies Matrix */}
        <SkillsSection />

        {/* 6. Industry Certifications */}
        <CertificationsSection />

        {/* 7. About & Background */}
        <AboutSection 
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 8. Contact & Conversion */}
        <ContactSection 
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Case Study Deep-Dive Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject}
          onClose={() => setSelectedProjectId(null)}
          onOpenArchitectureDemo={handleOpenArchitectureDemo}
        />
      )}

      {/* Interactive Developer CLI Modal */}
      <InteractiveTerminal 
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onSelectProject={(id) => setSelectedProjectId(id)}
        onOpenResume={() => {
          setIsTerminalOpen(false);
          setIsResumeOpen(true);
        }}
      />

      {/* Printable & Downloadable Resume Modal */}
      <ResumeViewerModal 
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
