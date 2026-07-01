import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { services } from '@/config/siteData';
import { ArrowRight, Layers } from 'lucide-react';

const Services = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="services" className="section-wrapper relative bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent-purple/2 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="section-tag"><Layers size={12} className="text-primary" /> Services</span>
          <h2 className="section-title mt-3 font-display">What I Offer</h2>
          <p className="section-subtitle mx-auto mt-4 text-[var(--text-secondary)] font-light text-base">
            Comprehensive technology solutions tailored to your business needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ y: -4 }}
              className="bg-[var(--glass-bg)] border border-[var(--border-color)] backdrop-blur-md rounded-3xl p-6 transition-all duration-300 hover:border-[var(--text-secondary)]/30 shadow-sm flex flex-col justify-between group cursor-default"
            >
              <div>
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-5 border border-primary/10 transition-transform duration-300 group-hover:scale-102">
                  <span className="text-lg">{service.icon}</span>
                </div>

                <h3 className="font-sans font-bold text-[var(--text-primary)] text-base mb-2 tracking-tight group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
                      <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-primary group-hover:gap-2 transition-all duration-200">
                <span>Learn More</span>
                <ArrowRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
