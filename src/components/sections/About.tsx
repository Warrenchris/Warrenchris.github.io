import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { MapPin, Mail, Phone, Github, Linkedin, GraduationCap, Heart } from 'lucide-react';
import { personalInfo } from '@/config/siteData';

const skillBars = [
  { name: 'Network Security', level: 95, color: '#00d4ff' },
  { name: 'Python', level: 90, color: '#9333ea' },
  { name: 'Cybersecurity', level: 88, color: '#ec4899' },
  { name: 'React / TypeScript', level: 85, color: '#10b981' },
  { name: 'Cloud Computing', level: 82, color: '#f59e0b' },
];

const whatIDo = [
  { icon: '🔒', title: 'Cybersecurity', desc: 'Network security, threat analysis, and compliance implementation' },
  { icon: '🌐', title: 'Networking', desc: 'Cisco & Huawei infrastructure, VPN, and SD-WAN solutions' },
  { icon: '💻', title: 'Development', desc: 'Full-stack web applications using modern frameworks' },
  { icon: '☁️', title: 'Cloud', desc: 'Cloud architecture and deployment strategies' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const About = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="section-wrapper relative">
      {/* Background */}
      <div className="blob blob-purple absolute top-0 right-0 w-80 h-80 opacity-8" />
      <div className="blob blob-cyan absolute bottom-0 left-0 w-60 h-60 opacity-6" />

      <div className="container mx-auto px-6 max-w-7xl" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left — Profile Card */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              scale={1.02}
              transitionSpeed={600}
              className="w-full max-w-sm"
            >
              <div className="glass-card p-1 relative overflow-hidden">
                {/* Gradient border glow */}
                <div className="absolute inset-0 rounded-3xl opacity-30" style={{
                  background: 'linear-gradient(135deg, #00d4ff, #9333ea, #ec4899)',
                  padding: '1px',
                }} />

                <div className="relative bg-dark-50 rounded-[calc(1.5rem-1px)] overflow-hidden">
                  {/* Header with image */}
                  <div className="relative h-36 bg-gradient-to-br from-primary-500/20 via-accent-purple/20 to-accent-magenta/10">
                    <div className="absolute inset-0 noise" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-dark-50 shadow-neon-cyan">
                        <img
                          src={personalInfo.avatar}
                          alt={personalInfo.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${personalInfo.name}&background=00d4ff&color=020817&size=200`;
                          }}
                        />
                        <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-dark-50 shadow-lg" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-14 pb-6 px-6 text-center">
                    <h3 className="font-display text-xl font-bold text-white mb-1">{personalInfo.name}</h3>
                    <p className="text-sm text-primary-400 font-medium mb-4">
                      Developer · Network Engineer · Cybersecurity Specialist
                    </p>

                    {/* Contact info */}
                    <div className="space-y-2 text-left mb-5">
                      {[
                        { icon: <Mail size={14} />, text: personalInfo.email },
                        { icon: <Phone size={14} />, text: personalInfo.phone },
                        { icon: <MapPin size={14} />, text: personalInfo.location },
                        { icon: <GraduationCap size={14} />, text: 'BSc IT – JKUAT' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-400 text-xs">
                          <span className="text-primary-400 flex-shrink-0">{item.icon}</span>
                          <span className="truncate">{item.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Skill bars */}
                    <div className="space-y-3 mb-5">
                      {skillBars.map(skill => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>{skill.name}</span>
                            <span style={{ color: skill.color }}>{skill.level}%</span>
                          </div>
                          <div className="skill-progress-track">
                            <motion.div
                              className="skill-progress-fill"
                              initial={{ scaleX: 0 }}
                              animate={inView ? { scaleX: skill.level / 100 } : { scaleX: 0 }}
                              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                              style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Social links */}
                    <div className="flex justify-center gap-3">
                      <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/30 transition-colors">
                        <Github size={16} />
                      </a>
                      <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-colors">
                        <Linkedin size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Right — Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <span className="section-tag">
                <Heart size={12} /> About Me
              </span>
              <h2 className="section-title mt-3">
                Passionate about <br />
                <span className="gradient-text">Technology & Security</span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 text-slate-400 leading-relaxed">
              <p>{personalInfo.bio}</p>
              <p>{personalInfo.bioExtended}</p>
            </motion.div>

            {/* What I Do Grid */}
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">What I Do</h3>
              <div className="grid grid-cols-2 gap-3">
                {whatIDo.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.03, borderColor: 'rgba(0, 212, 255, 0.3)' }}
                    className="glass border border-white/05 rounded-2xl p-4 transition-all duration-200 cursor-default"
                  >
                    <span className="text-2xl block mb-2">{item.icon}</span>
                    <h4 className="font-semibold text-white text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              variants={itemVariants}
              className="glass border border-white/08 rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-purple/20 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={22} className="text-primary-400" />
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-0.5">Currently Studying</div>
                <div className="font-semibold text-white text-sm">{personalInfo.degree}</div>
                <div className="text-xs text-slate-400">{personalInfo.university}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
