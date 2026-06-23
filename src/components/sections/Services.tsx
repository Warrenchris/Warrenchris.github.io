import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { services } from '@/config/siteData';
import { ArrowRight, Layers } from 'lucide-react';

const Services = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="services" className="section-wrapper relative bg-dark-50/20">
      <div className="blob blob-purple absolute top-0 right-0 w-80 h-80 opacity-5" />

      <div className="container mx-auto px-6 max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="section-tag"><Layers size={12} /> Services</span>
          <h2 className="section-title mt-3">
            What I <span className="gradient-text">Offer</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4 text-slate-400">
            Comprehensive technology solutions tailored to your business needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group glass border border-white/06 rounded-2xl p-6 cursor-default transition-all duration-300 hover:border-opacity-30 relative overflow-hidden"
              style={{ '--service-color': service.color } as React.CSSProperties}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at top left, ${service.color}08 0%, transparent 70%)` }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${service.color}15`, border: `1px solid ${service.color}25` }}
              >
                {service.icon}
              </div>

              <h3 className="font-display font-bold text-white text-lg mb-3 group-hover:gradient-text transition-all">
                {service.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-5">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-5">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-center gap-2 text-xs text-slate-500">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: service.color }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div
                className="flex items-center gap-1 text-xs font-semibold transition-all duration-300 group-hover:gap-2"
                style={{ color: service.color }}
              >
                Learn More <ArrowRight size={12} />
              </div>

              {/* Bottom border accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
