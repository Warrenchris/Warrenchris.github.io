import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';
import { credibilityItems } from '@/config/siteData';
import { 
  Github, 
  Layers, 
  Award, 
  MapPin, 
  Clock, 
  Target, 
  Cpu, 
  Briefcase,
  LucideIcon 
} from 'lucide-react';

// Icon mapping from string names to lucide components
const iconMap: Record<string, LucideIcon> = {
  GitHub: Github,
  Layers,
  Award,
  MapPin,
  Clock,
  Target,
  Cpu,
  Briefcase,
};

export default function CredibilityStrip() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const controls = useAnimation();

  // Auto-scroll animation
  useEffect(() => {
    if (inView && scrollRef.current) {
      const scroll = () => {
        if (scrollRef.current) {
          const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
          if (scrollRef.current.scrollLeft >= maxScroll) {
            scrollRef.current.scrollLeft = 0;
          } else {
            scrollRef.current.scrollLeft += 0.5;
          }
        }
      };
      
      const interval = setInterval(scroll, 30);
      return () => clearInterval(interval);
    }
  }, [inView]);

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  return (
    <section ref={ref} className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden">
      <div className="container-main py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Scroll indicator */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent z-10 pointer-events-none" />
          
          {/* Horizontal scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-4 px-4 scrollbar-hide cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {credibilityItems.map((item, i) => {
              const Icon = iconMap[item.icon] || iconMap.GitHub;
              
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex-shrink-0 w-64 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--color-accent)] transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-[var(--color-accent)]">
                      <Icon size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-caption font-mono font-medium text-[var(--text-muted)] tracking-wider uppercase block mb-1">
                        {item.label}
                      </span>
                      <span className="text-small font-medium text-[var(--text-primary)] block">
                        {item.value}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-center mt-2"
          >
            <span className="text-caption text-[var(--text-muted)]">
              ← Scroll or drag to explore →
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
