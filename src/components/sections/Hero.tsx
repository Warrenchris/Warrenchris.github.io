import { useEffect, useRef, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Github, Linkedin, Mail, Sparkles, ChevronDown } from 'lucide-react';
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
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const typeSequence = personalInfo.roles.flatMap(role => [role, 2000]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-dark"
    >
      {/* Three.js Background */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'radial-gradient(ellipse at center, rgba(2, 8, 23, 0.3) 0%, rgba(2, 8, 23, 0.7) 70%, rgba(2, 8, 23, 0.95) 100%)',
      }} />

      {/* Animated blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 blob blob-cyan opacity-10 z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 blob blob-purple opacity-8 z-[1]" />

      {/* Parallax floating elements */}
      <motion.div
        className="absolute top-1/3 right-16 hidden lg:block z-[2]"
        animate={{
          x: mousePos.x * 0.5,
          y: mousePos.y * 0.5 + Math.sin(Date.now() * 0.001) * 10,
        }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
      >
        <div className="w-14 h-14 rounded-2xl glass border border-primary-500/20 flex items-center justify-center text-2xl shadow-neon-cyan animate-float">
          🔒
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-32 hidden xl:block z-[2]"
        animate={{ x: mousePos.x * 0.3, y: mousePos.y * 0.3 }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
        style={{ animationDelay: '1s' }}
      >
        <div className="w-12 h-12 rounded-xl glass border border-accent-purple/20 flex items-center justify-center text-xl animate-float" style={{ animationDelay: '1s' }}>
          🌐
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-20 hidden lg:block z-[2]"
        animate={{ x: mousePos.x * 0.2, y: mousePos.y * 0.4 }}
        transition={{ type: 'spring', stiffness: 30, damping: 15 }}
      >
        <div className="w-12 h-12 rounded-xl glass border border-accent-magenta/20 flex items-center justify-center text-xl animate-float" style={{ animationDelay: '2s' }}>
          💻
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl pt-24 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-yellow-400/20 text-yellow-400 text-sm font-medium" style={{borderColor:'rgba(253,233,0,0.2)',color:'#FDE900'}}>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <Sparkles size={14} />
              Available for opportunities
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-4"
          >
            <span className="text-white">Warren</span>{' '}
            <span className="gradient-text-yellow">Chris</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            variants={itemVariants}
            className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-300 mb-6 h-10 flex items-center justify-center gap-2"
          >
            <span className="text-slate-500">I'm a</span>
            <TypeAnimation
              sequence={typeSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="gradient-text-yellow font-semibold"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Passionate about building{' '}
            <span className="text-yellow-400 font-medium" style={{color:'#FDE900'}}>secure, scalable solutions</span>{' '}
            that drive business innovation. Based in{' '}
            <span className="text-white font-medium">Nairobi, Kenya</span> 🇰🇪
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(253, 233, 0, 0.6)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-2xl btn-yellow text-dark font-bold text-base shadow-neon-yellow transition-all duration-300 w-full sm:w-auto"
            >
              View My Work
            </motion.button>

            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-2xl glass border border-white/10 text-white font-semibold text-base hover:border-yellow-400/40 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto" style={{borderColor:'rgba(253,233,0,0.15)'}}>
              <Mail size={18} />
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-16">
            {[
              { icon: <Github size={20} />, href: personalInfo.github, label: 'GitHub' },
              { icon: <Linkedin size={20} />, href: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: <Mail size={20} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-yellow-400 hover:border-yellow-500/30 transition-colors duration-200"
                style={{'--hover-color': '#FDE900'} as React.CSSProperties}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
                className="glass-card p-4 text-center"
              >
                <div className="font-display text-3xl font-bold mb-1" style={{color:'#FDE900'}}>
                  {statsInView ? (
                    <CountUp end={stat.value} duration={2} delay={i * 0.1} suffix={stat.suffix} />
                  ) : (
                    '0'
                  )}
                </div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center gap-2 cursor-pointer" style={{color:'#FDE900'}}
          onClick={scrollToAbout}
        >
          <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} style={{color:'#FDE900'}} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
