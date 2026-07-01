import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Clock, ArrowRight, Tag } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Building Secure Network Architectures for SMBs',
    excerpt: 'A practical guide to designing cost-effective, enterprise-grade network security for small and medium businesses using Cisco and open-source tools.',
    category: 'Networking',
    readTime: '8 min read',
    date: 'June 2026',
    emoji: '🔒',
  },
  {
    id: 2,
    title: 'React + Three.js: Creating Immersive Web Experiences',
    excerpt: 'How to integrate React Three Fiber into a Vite project and build interactive 3D scenes with particles, lighting, and mouse interactions.',
    category: 'Development',
    readTime: '12 min read',
    date: 'May 2026',
    emoji: '🎮',
  },
  {
    id: 3,
    title: 'Understanding HCIA-Datacom: My Certification Journey',
    excerpt: 'My experience studying for and passing the Huawei HCIA-Datacom exam — resources, tips, and key concepts you need to know.',
    category: 'Certifications',
    readTime: '6 min read',
    date: 'April 2026',
    emoji: '🎓',
  },
];

const Blog = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="blog" className="section-wrapper relative bg-black border-b border-[var(--border-color)]" ref={ref}>
      <div className="absolute top-0 right-20 w-72 h-72 bg-primary/2 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="section-tag"><BookOpen size={12} className="text-primary" /> Blog</span>
          <h2 className="section-title mt-3 font-display">Thoughts &amp; Insights</h2>
          <p className="section-subtitle mx-auto mt-4 text-[var(--text-secondary)] font-light text-base">
            Sharing knowledge on networking, cybersecurity, development, and tech career growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ y: -4 }}
              className="bg-white/[0.01] border border-white/[0.04] backdrop-blur-md rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:border-white/[0.08] flex flex-col justify-between cursor-pointer group"
            >
              {/* Image Header Placeholder */}
              <div className="h-32 bg-[#0A0A0C] border-b border-[var(--border-color)] relative flex items-center justify-center text-4xl">
                <span>{post.emoji}</span>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* Meta */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-primary/15 bg-primary/5 text-primary">
                      <Tag size={9} />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-[var(--text-secondary)] font-medium">
                      <Clock size={9} /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-white text-sm leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-muted)] font-medium">{post.date}</span>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-primary group-hover:gap-1.5 transition-all duration-200">
                    <span>Read More</span>
                    <ArrowRight size={11} />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Coming Soon note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-xs text-[var(--text-muted)] font-medium">
            Full blog coming soon — stay tuned for in-depth articles on networking, cybersecurity, and development.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
