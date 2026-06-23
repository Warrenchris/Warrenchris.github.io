import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award } from 'lucide-react';
import { certifications } from '@/config/siteData';

const Certifications = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="certifications" className="section-wrapper relative">
      <div className="blob blob-cyan absolute bottom-10 left-10 w-72 h-72 opacity-5" />

      <div className="container mx-auto px-6 max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="section-tag"><Award size={12} /> Certifications</span>
          <h2 className="section-title mt-3">
            Verified <span className="gradient-text">Credentials</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4 text-slate-400">
            Industry-recognized certifications validating expertise across networking, security, and technology.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="cert-card group"
              style={{ height: '260px' }}
            >
              <div className="cert-card-inner w-full h-full relative">
                {/* Front */}
                <div className="cert-front absolute inset-0">
                  <div
                    className="w-full h-full rounded-2xl glass border transition-all duration-300 p-5 flex flex-col items-center justify-center text-center"
                    style={{ borderColor: `${cert.color}20` }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 overflow-hidden"
                      style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}25` }}
                    >
                      <img
                        src={cert.logo}
                        alt={cert.issuer}
                        className="w-10 h-10 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent) parent.innerHTML = `<span style="font-size: 1.5rem">🏆</span>`;
                        }}
                      />
                    </div>
                    <h3 className="font-display font-bold text-white text-sm leading-tight mb-2">{cert.title}</h3>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: `${cert.color}15`, color: cert.color }}
                    >
                      {cert.issuer}
                    </span>
                    <div className="mt-3 text-xs text-slate-500">{cert.year}</div>
                    <div className="mt-3 text-xs text-slate-600">Hover to flip ↻</div>
                  </div>
                </div>

                {/* Back */}
                <div className="cert-back absolute inset-0">
                  <div
                    className="w-full h-full rounded-2xl flex flex-col items-center justify-center text-center p-5"
                    style={{
                      background: `linear-gradient(135deg, ${cert.color}15, ${cert.color}08)`,
                      border: `1px solid ${cert.color}30`,
                    }}
                  >
                    <Award size={28} style={{ color: cert.color }} className="mb-3" />
                    <h3 className="font-display font-bold text-white text-sm mb-2">{cert.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{cert.description}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs font-semibold" style={{ color: cert.color }}>{cert.issuer}</span>
                      <span className="text-xs text-slate-500">· {cert.year}</span>
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
