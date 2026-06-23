import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import SmoothScroll from '@/components/layout/SmoothScroll';
import CustomCursor from '@/components/layout/CustomCursor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Certifications from '@/components/sections/Certifications';
import Services from '@/components/sections/Services';
import GitHubStats from '@/components/sections/GitHubStats';
import Testimonials from '@/components/sections/Testimonials';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';

// Page loader
const Loader = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onDone, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="page-loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loader-logo">WC</div>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" />
      </div>
      <p className="text-xs text-slate-600 mt-2 tracking-widest uppercase">Loading Portfolio...</p>
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
              transition={{ duration: 0.5 }}
              className="relative min-h-screen"
            >
              {/* Aurora background */}
              <div className="aurora-bg" aria-hidden="true" />

              {/* Custom cursor (desktop only) */}
              <CustomCursor />

              {/* Navigation */}
              <Navbar />

              {/* Main content */}
              <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <GitHubStats />
                <Certifications />
                <Services />
                <Testimonials />
                <Blog />
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
