import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { credibilityItems } from '@/config/siteData';

export default function CredibilityStrip() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section ref={ref} className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)]">
      <div className="container-main py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {credibilityItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex flex-col gap-1"
            >
              <span className="text-caption font-mono font-medium text-[var(--text-muted)] tracking-wider uppercase">
                {item.label}
              </span>
              <span className="text-small font-medium text-[var(--text-primary)]">
                {item.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
