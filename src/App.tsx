import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';

// Page loader
const Loader = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = setTimeout(onDone, prefersReducedMotion ? 0 : 600);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="page-loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="loader-logo">WC</div>
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
              className="relative min-h-screen"
            >
              {/* Aurora background */}
              <div className="aurora-bg" aria-hidden="true" />

              {/* Navigation */}
              <Navbar />

              {/* Main content */}
              <main id="main-content">
                <Hero />
                <Projects />
                <About />
                <Skills />
                <Certifications />
                <Contact />
              </main>

              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </SmoothScroll>
    </ThemeProvider>
  );
}

export default App;
