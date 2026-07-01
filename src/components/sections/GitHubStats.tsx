import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Star, GitFork, Users, BookOpen } from 'lucide-react';
import CountUp from 'react-countup';
import { personalInfo } from '@/config/siteData';

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

const GitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [repos, setRepos] = useState<{ name: string; stargazers_count: number; language: string; html_url: string }[]>([]);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const username = 'Warrenchris';
    fetch(`https://api.github.com/users/${username}`)
      .then(r => r.json())
      .then(setStats)
      .catch(() => {});

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setRepos(data);
      })
      .catch(() => {});
  }, []);

  const langColors: Record<string, string> = {
    Python: '#3776ab',
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Java: '#ed8b00',
    HTML: '#e34c26',
    CSS: '#563d7c',
  };

  return (
    <section className="section-wrapper relative bg-black border-b border-[var(--border-color)]" ref={ref}>
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="section-tag"><Github size={12} className="text-primary" /> GitHub Activity</span>
          <h2 className="section-title mt-3 font-display">Open Source Presence</h2>
        </motion.div>

        {/* Stats Grid */}
        {stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {[
              { label: 'Public Repos', value: stats.public_repos, icon: <BookOpen size={16} strokeWidth={1.5} /> },
              { label: 'Followers', value: stats.followers, icon: <Users size={16} strokeWidth={1.5} /> },
              { label: 'Following', value: stats.following, icon: <Github size={16} strokeWidth={1.5} /> },
              { label: 'Gists', value: stats.public_gists, icon: <Star size={16} strokeWidth={1.5} /> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="bg-white/[0.01] border border-white/[0.04] backdrop-blur-md rounded-2xl p-5 text-center shadow-sm"
              >
                <div className="flex justify-center mb-2 text-primary">{stat.icon}</div>
                <div className="font-sans text-2xl font-bold text-white">
                  <CountUp end={stat.value} duration={1.8} delay={0.2} />
                </div>
                <div className="text-[10px] text-[var(--text-secondary)] font-semibold uppercase tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Recent Repos */}
        {repos.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.04 }}
                whileHover={{ y: -2, borderColor: 'rgba(0, 113, 227, 0.15)' }}
                className="bg-white/[0.01] border border-white/[0.04] backdrop-blur-md rounded-2xl p-4 flex items-center justify-between group transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Github size={16} className="text-[var(--text-secondary)] flex-shrink-0" />
                  <span className="text-xs text-white font-medium truncate group-hover:text-primary transition-colors">
                    {repo.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: langColors[repo.language] || '#64748b' }}
                      />
                      <span className="text-[10px] text-[var(--text-secondary)] font-medium">{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-[10px] text-[var(--text-secondary)] font-medium">
                    <Star size={11} className="text-primary" />
                    {repo.stargazers_count}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Link to GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--text-secondary)] text-[12px] font-semibold transition-all duration-200 shadow-sm"
          >
            <Github size={14} />
            <span>View Full GitHub Profile</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
