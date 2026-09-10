import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import CredibilityStrip from '@/components/sections/CredibilityStrip';
import Projects from '@/components/sections/Projects';
import Engineering from '@/components/sections/Engineering';

import GitHubRepos from '@/components/sections/GitHubRepos';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

// Page loader
const Loader = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = setTimeout(onDone, prefersReducedMotion ? 0 : 500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="page-loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="loader-logo">Warren Chris</div>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" />
      </div>
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <SmoothScroll>
        <AnimatePresence mode="wait">
          {loading ? (
            <Loader key="loader" onDone={() => setLoading(false)} />
          ) : (
            <motion.div
              key="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]"
            >
              {/* Navigation */}
              <Navbar />

              {/* Main content in recruiter-first sequence */}
              <main id="main-content">
                <Hero />
                <CredibilityStrip />
                <Projects />
                <Engineering />
                <GitHubRepos />
                <About />
                <Contact />
              </main>

              {/* Footer */}
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </SmoothScroll>
    </ThemeProvider>
  );
}

export default App;
