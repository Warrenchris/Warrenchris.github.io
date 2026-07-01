import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { Github, Linkedin, GraduationCap, Heart, Shield, Globe, Terminal, Cloud } from 'lucide-react';
import { personalInfo } from '@/config/siteData';

const skillBars = [
  { name: 'Network Security', level: 95 },
  { name: 'Python & Scripting', level: 90 },
  { name: 'Cybersecurity Ops', level: 88 },
  { name: 'React / TypeScript', level: 85 },
  { name: 'Cloud Infrastructure', level: 82 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
};

const About = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const whatIDo = [
    { icon: <Shield size={18} strokeWidth={1.5} />, title: 'Cybersecurity', desc: 'Network security, threat analysis, and compliance implementation' },
    { icon: <Globe size={18} strokeWidth={1.5} />, title: 'Networking', desc: 'Cisco & Huawei infrastructure, VPN, and SD-WAN solutions' },
    { icon: <Terminal size={18} strokeWidth={1.5} />, title: 'Development', desc: 'Full-stack web applications using modern frameworks' },
    { icon: <Cloud size={18} strokeWidth={1.5} />, title: 'Cloud', desc: 'Cloud architecture and deployment strategies' },
  ];

  return (
    <section id="about" className="section-wrapper relative bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
      {/* Background Blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-purple/3 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <span className="section-tag">
            <Heart size={12} className="text-primary" /> About Me
          </span>
          <h2 className="section-title mt-3">Driven by curiosity. Secured by engineering.</h2>
        </motion.div>

        {/* Narrative & Timeline Block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24"
        >
          {/* Left: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-semibold tracking-tight text-white mb-2 uppercase text-[10px] tracking-[0.2em] text-primary">The Journey</h3>
            <p className="text-lg font-light text-[var(--text-secondary)] leading-relaxed">{personalInfo.bio}</p>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed font-light">{personalInfo.bioExtended}</p>
          </div>

          {/* Right: Academic/Professional Timeline */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-semibold tracking-tight text-white mb-2 uppercase text-[10px] tracking-[0.2em] text-primary">Timeline</h3>
            <div className="relative pl-6 border-l border-[var(--border-color)] space-y-8">
              <div className="relative">
                <span className="absolute -left-[30px] top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-[var(--bg-secondary)]" />
                <span className="text-[10px] uppercase font-semibold text-primary">Current Study</span>
                <h4 className="text-sm font-semibold text-white mt-1">{personalInfo.degree}</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{personalInfo.university}</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[30px] top-1 w-2.5 h-2.5 rounded-full bg-accent-purple border-2 border-[var(--bg-secondary)]" />
                <span className="text-[10px] uppercase font-semibold text-accent-purple">Active Focus</span>
                <h4 className="text-sm font-semibold text-white mt-1">Freelance IT & Security Consultant</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Designing networks, securing endpoints, and developing React applications.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What I Do capabilities grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-24"
        >
          <div className="flex flex-col mb-10">
            <span className="text-[10px] uppercase font-semibold text-primary tracking-[0.2em] mb-2">Capabilities</span>
            <h3 className="text-2xl font-bold tracking-tight text-white">Areas of expertise</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatIDo.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -4, borderColor: 'rgba(0,113,227,0.2)' }}
                className="bg-white/[0.01] border border-white/[0.04] backdrop-blur-md rounded-2xl p-6 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-4 border border-primary/10">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-white text-base mb-2">{item.title}</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Profile Card & Technical Specs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left: Spec Sheet / Profile Card */}
          <div className="lg:col-span-5 flex justify-center">
            <Tilt
              tiltMaxAngleX={6}
              tiltMaxAngleY={6}
              scale={1.01}
              transitionSpeed={600}
              className="w-full max-w-sm"
            >
              <div className="bg-white/[0.01] border border-white/[0.04] backdrop-blur-md rounded-3xl p-6 relative overflow-hidden shadow-lg">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--border-color)] mb-4">
                    <img
                      src={personalInfo.avatar}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${personalInfo.name}&background=0071E3&color=ffffff&size=200`;
                      }}
                    />
                    <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-[#30D158] border-2 border-black" />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-white mb-0.5">{personalInfo.name}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mb-6 font-medium">Developer &amp; Engineer</p>

                  <div className="w-full border-t border-[var(--border-color)] pt-5 space-y-3.5 text-left text-xs">
                    {[
                      { label: 'Primary Mail', value: personalInfo.email, link: `mailto:${personalInfo.email}` },
                      { label: 'Hotline', value: personalInfo.phone, link: `tel:${personalInfo.phone.replace(/\s+/g, '')}` },
                      { label: 'Location', value: personalInfo.location },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-0.5">{item.label}</span>
                        {item.link ? (
                          <a href={item.link} className="text-white hover:text-primary transition-colors truncate">{item.value}</a>
                        ) : (
                          <span className="text-white truncate">{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white transition-colors">
                      <Github size={14} />
                    </a>
                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white transition-colors">
                      <Linkedin size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>

          {/* Right: Technical Specs progress bars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col mb-4">
              <span className="text-[10px] uppercase font-semibold text-primary tracking-[0.2em] mb-2">Specifications</span>
              <h3 className="text-xl font-bold tracking-tight text-white">System capabilities</h3>
            </div>
            <div className="space-y-4">
              {skillBars.map(skill => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-[var(--text-secondary)]">
                    <span>{skill.name}</span>
                    <span className="text-primary">{skill.level}%</span>
                  </div>
                  <div className="skill-progress-track">
                    <motion.div
                      className="skill-progress-fill"
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: skill.level / 100 } : { scaleX: 0 }}
                      transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                      style={{ background: 'var(--color-primary)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
