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
    color: '#00d4ff',
    emoji: '🔒',
  },
  {
    id: 2,
    title: 'React + Three.js: Creating Immersive Web Experiences',
    excerpt: 'How to integrate React Three Fiber into a Vite project and build interactive 3D scenes with particles, lighting, and mouse interactions.',
    category: 'Development',
    readTime: '12 min read',
    date: 'May 2026',
    color: '#9333ea',
    emoji: '🎮',
  },
  {
    id: 3,
    title: 'Understanding HCIA-Datacom: My Certification Journey',
    excerpt: 'My experience studying for and passing the Huawei HCIA-Datacom exam — resources, tips, and key concepts you need to know.',
    category: 'Certifications',
    readTime: '6 min read',
    date: 'April 2026',
    color: '#10b981',
    emoji: '🎓',
  },
];

const Blog = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="blog" className="section-wrapper relative bg-dark-50/20" ref={ref}>
      <div className="blob blob-cyan absolute top-0 right-20 w-72 h-72 opacity-5" />

      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="section-tag"><BookOpen size={12} /> Blog</span>
          <h2 className="section-title mt-3">
            Thoughts & <span className="gradient-text">Insights</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4 text-slate-400">
            Sharing knowledge on networking, cybersecurity, development, and tech career growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group glass border border-white/06 rounded-2xl overflow-hidden cursor-pointer hover:border-primary-500/20 transition-all duration-300"
            >
              {/* Header */}
              <div
                className="h-36 relative flex items-center justify-center text-5xl"
                style={{
                  background: `linear-gradient(135deg, ${post.color}15, ${post.color}05)`,
                  borderBottom: `1px solid ${post.color}15`,
                }}
              >
                <span>{post.emoji}</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at center, ${post.color}10, transparent 70%)` }} />
              </div>

              <div className="p-5">
                {/* Meta */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: `${post.color}12`, color: post.color }}
                  >
                    <Tag size={10} />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-600">
                    <Clock size={10} /> {post.readTime}
                  </span>
                </div>

                <h3 className="font-display font-bold text-white text-base leading-tight mb-2 group-hover:text-primary-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">{post.date}</span>
                  <div
                    className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all duration-200"
                    style={{ color: post.color }}
                  >
                    Read More <ArrowRight size={12} />
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
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-xs text-slate-600">
            Full blog coming soon — stay tuned for in-depth articles on networking, cybersecurity, and development.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
