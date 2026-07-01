import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award } from 'lucide-react';
import { certifications } from '@/config/siteData';

const Certifications = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="certifications" className="section-wrapper relative bg-black border-b border-[var(--border-color)]">
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/2 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="section-tag"><Award size={12} className="text-primary" /> Certifications</span>
          <h2 className="section-title mt-3 font-display">Verified Credentials</h2>
          <p className="section-subtitle mx-auto mt-4 text-[var(--text-secondary)] font-light text-base">
            Industry-recognized certifications validating expertise across networking, security, and technology.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="cert-card group"
              style={{ height: '270px' }}
            >
              <div className="cert-card-inner w-full h-full relative">
                {/* Front */}
                <div className="cert-front absolute inset-0">
                  <div className="w-full h-full rounded-3xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-md transition-all duration-300 p-5 flex flex-col items-center justify-between text-center shadow-sm group-hover:border-white/[0.08]">
                    <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10 overflow-hidden mt-2">
                      <img
                        src={cert.logo}
                        alt={cert.issuer}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent) parent.innerHTML = `<span style="font-size: 1.25rem">🏆</span>`;
                        }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center my-3">
                      <h3 className="font-sans font-bold text-white text-xs leading-tight mb-2 tracking-tight line-clamp-2">{cert.title}</h3>
                      <span className="text-[10px] font-semibold text-primary px-2.5 py-0.5 rounded-full bg-primary/5 border border-primary/10 self-center">
                        {cert.issuer}
                      </span>
                    </div>
                    <div className="w-full border-t border-[var(--border-color)] pt-3 flex items-center justify-between">
                      <span className="text-[9px] uppercase font-semibold text-[var(--text-muted)] tracking-wider">{cert.year}</span>
                      <span className="text-[9px] uppercase font-bold text-primary/70 tracking-widest">Specs ↻</span>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div className="cert-back absolute inset-0">
                  <div className="w-full h-full rounded-3xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-md transition-all duration-300 p-5 flex flex-col items-center justify-between text-center shadow-sm group-hover:border-white/[0.08]">
                    <Award size={20} className="text-primary mt-2" />
                    <div className="flex-1 flex flex-col justify-center my-3">
                      <h3 className="font-sans font-bold text-white text-xs mb-1.5 tracking-tight line-clamp-1">{cert.title}</h3>
                      <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed line-clamp-4">{cert.description}</p>
                    </div>
                    <div className="w-full border-t border-[var(--border-color)] pt-3 flex items-center justify-between text-[9px]">
                      <span className="font-semibold text-primary">{cert.issuer}</span>
                      <span className="text-[var(--text-muted)] font-medium">{cert.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
