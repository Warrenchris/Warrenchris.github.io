import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { testimonials } from '@/config/siteData';

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const navigate = (dir: number) => {
    clearInterval(intervalRef.current);
    setDirection(dir);
    setCurrent(prev => (prev + dir + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-wrapper relative bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent-purple/1 blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="section-tag"><MessageSquare size={12} className="text-primary" /> Testimonials</span>
          <h2 className="section-title mt-3 font-display">What Clients Say</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="relative"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="bg-[var(--glass-bg)] border border-[var(--border-color)] backdrop-blur-md rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-sm">
                <Quote size={32} className="mb-6 text-primary opacity-20" />

                <p className="text-base md:text-lg text-[var(--text-primary)] leading-relaxed mb-8 font-light italic">
                  "{t.content}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full border border-[var(--border-color)] object-cover"
                    />
                    <div>
                      <div className="font-sans font-bold text-[var(--text-primary)] text-xs">{t.name}</div>
                      <div className="text-[10px] text-[var(--text-secondary)] font-medium mt-0.5">{t.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={13} fill="var(--color-primary)" className="text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shadow-sm"
              aria-label="Previous"
            >
              <ChevronLeft size={14} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-5 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-[var(--border-color)]'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => navigate(1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shadow-sm"
              aria-label="Next"
            >
              <ChevronRight size={14} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
