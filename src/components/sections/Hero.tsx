import { useEffect, useRef, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, Sparkles, ChevronDown, Shield, Globe, Terminal } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import HeroCanvas from '@/components/three/HeroCanvas';
import { personalInfo, stats } from '@/config/siteData';

const Hero = () => {
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' });
  };

  const typeSequence = personalInfo.roles.flatMap(role => [role, 2000]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Three.js Background */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* Gradient Overlays (Vercel & Apple style top radial light source) */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black via-black/85 to-black pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top,rgba(0,113,227,0.12),transparent_70%)] pointer-events-none" />

      {/* Animated subtle background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-[1] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-magenta/3 blur-[120px] rounded-full pointer-events-none z-[1] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Parallax floating geometric icons (subtle wireframes instead of emojis) */}
      <motion.div
        className="absolute top-1/3 right-[12%] hidden lg:block z-[2]"
        animate={{
          x: mousePos.x * 0.4,
          y: mousePos.y * 0.4 + Math.sin(Date.now() * 0.001) * 8,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
      >
        <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex items-center justify-center text-primary/70 shadow-sm animate-float">
          <Shield size={20} strokeWidth={1.5} />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-[20%] hidden xl:block z-[2]"
        animate={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
        transition={{ type: 'spring', stiffness: 45, damping: 15 }}
      >
        <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex items-center justify-center text-accent-purple/70 shadow-sm animate-float" style={{ animationDelay: '1s' }}>
          <Globe size={18} strokeWidth={1.5} />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-[10%] hidden lg:block z-[2]"
        animate={{ x: mousePos.x * 0.3, y: mousePos.y * 0.3 }}
        transition={{ type: 'spring', stiffness: 35, damping: 15 }}
      >
        <div className="w-11 h-11 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex items-center justify-center text-accent-magenta/70 shadow-sm animate-float" style={{ animationDelay: '2s' }}>
          <Terminal size={18} strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl pt-28 pb-12 flex flex-col justify-between min-h-screen">
        {/* Empty top block to push content down and keep layout centered */}
        <div className="hidden lg:block h-8"></div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center my-auto"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-md text-[var(--text-secondary)] text-[12px] font-medium shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] animate-pulse" />
              <Sparkles size={12} className="text-primary" />
              <span>Available for opportunities</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-sans text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] mb-2 text-white"
          >
            Warren <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#007AFF] to-accent-magenta">Chris</span>
          </motion.h1>

          {/* Headline Value Proposition */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-white mb-6 max-w-2xl mx-auto leading-snug"
          >
            Engineered to scale. <span className="text-[var(--text-secondary)]">Secured by design.</span>
          </motion.p>

          {/* Typewriter */}
          <motion.div
            variants={itemVariants}
            className="text-[15px] sm:text-base font-medium tracking-tight text-[var(--text-secondary)] mb-6 h-8 flex items-center justify-center gap-1.5"
          >
            <span>Focused on</span>
            <TypeAnimation
              sequence={typeSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#007AFF] font-semibold"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          >
            Passionate about building secure, resilient network infrastructures and writing highly efficient, scalable code to drive business innovation. Based in <span className="text-[var(--text-primary)] font-medium">Nairobi, Kenya 🇰🇪</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4.5 mb-14">
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-full bg-primary text-white font-medium text-[15px] hover:bg-primary-600 transition-all duration-200 w-full sm:w-auto shadow-sm"
            >
              View My Work
            </motion.button>

            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-primary)] font-medium text-[15px] hover:bg-[var(--border-color)] transition-all duration-200 flex items-center justify-center gap-1.5 w-full sm:w-auto"
            >
              <Mail size={15} />
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3.5 mb-14">
            {[
              { icon: <Github size={18} />, href: personalInfo.github, label: 'GitHub' },
              { icon: <Linkedin size={18} />, href: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: <Mail size={18} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-all duration-200"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            ref={statsRef}
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="bg-white/[0.01] border border-white/[0.04] backdrop-blur-md rounded-2xl p-4.5 text-center shadow-sm"
              >
                <div className="font-sans text-3xl font-bold tracking-tight mb-1 text-white">
                  {statsInView ? (
                    <CountUp end={stat.value} duration={1.8} delay={i * 0.08} suffix={stat.suffix} />
                  ) : (
                    '0'
                  )}
                </div>
                <div className="text-[10px] text-[var(--text-secondary)] font-semibold uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="flex flex-col items-center gap-1 cursor-pointer mt-4 text-[var(--text-secondary)] hover:text-white transition-colors duration-200"
          onClick={scrollToAbout}
        >
          <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-[var(--text-muted)]">Scroll</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
