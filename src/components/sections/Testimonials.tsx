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
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-wrapper relative">
      <div className="blob blob-magenta absolute top-1/2 left-1/2 w-96 h-96 opacity-5 -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="section-tag"><MessageSquare size={12} /> Testimonials</span>
          <h2 className="section-title mt-3">
            What Clients <span className="gradient-text">Say</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
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
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div
                className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
                style={{ border: `1px solid ${t.color}20` }}
              >
                {/* Glow */}
                <div
                  className="absolute top-0 left-0 w-48 h-48 rounded-full opacity-10 blur-3xl -translate-x-1/4 -translate-y-1/4"
                  style={{ background: t.color }}
                />

                <Quote size={48} className="mb-6 opacity-20" style={{ color: t.color }} />

                <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-8 relative z-10 italic">
                  "{t.content}"
                </p>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-xl border-2"
                      style={{ borderColor: t.color }}
                    />
                    <div>
                      <div className="font-display font-bold text-white">{t.name}</div>
                      <div className="text-sm text-slate-400">{t.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} fill={t.color} style={{ color: t.color }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 h-2' : 'w-2 h-2'
                  }`}
                  style={{ background: i === current ? t.color : 'rgba(255,255,255,0.2)' }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => navigate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
