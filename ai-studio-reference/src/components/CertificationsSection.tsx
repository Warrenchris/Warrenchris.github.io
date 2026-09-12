import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Network, 
  Cpu, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Network': return <Network className="w-5 h-5 text-white/70" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-white/70" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-white/70" />;
      default: return <Award className="w-5 h-5 text-white/70" />;
    }
  };

  return (
    <section 
      id="certifications" 
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      aria-label="Industry Certifications & Credentials"
    >
      {/* Section Heading */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono-code uppercase tracking-widest text-white/60 mb-3">
          <Award className="w-3.5 h-3.5 text-white/50" />
          <span>CREDENTIALS & KNOWLEDGE DOMAINS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
          Verified Industry Certifications
        </h2>
        <p className="text-white/60 text-sm sm:text-base max-w-2xl mt-2 font-normal">
          Formal engineering accreditations spanning routing protocols, network automation APIs, and enterprise human-centered design frameworks.
        </p>
      </motion.div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CERTIFICATIONS_DATA.map((cert, index) => (
          <motion.div
            key={cert.id}
            id={`cert-card-${cert.id}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1, 
              ease: [0.21, 0.47, 0.32, 0.98] 
            }}
            className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-6 sm:p-7 hover:border-white/15 transition-all duration-200 flex flex-col justify-between space-y-6 backdrop-blur-sm group"
          >
            <div className="space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="p-2.5 rounded-xl bg-black/60 border border-white/5 group-hover:border-white/15 transition-colors">
                  {getIcon(cert.iconName)}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono-code bg-white/[0.06] text-white px-2 py-0.5 rounded border border-white/10">
                    {cert.badgeCode}
                  </span>
                  <div className="text-[10px] font-mono-code text-white/40 mt-1">
                    {cert.issuer}
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-white/90 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Core Skills Matrix */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-white/40 font-semibold block">
                  Key Skills Validated:
                </span>
                <div className="space-y-1">
                  {cert.skillsCovered.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono-code text-white/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white/50 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Status */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono-code">
              <span className="text-white/40">STATUS:</span>
              <span className="text-white/80 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                ACTIVE & VERIFIED
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
