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
    <section className="section-wrapper relative bg-dark-50/20" ref={ref}>
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="section-tag"><Github size={12} /> GitHub Activity</span>
          <h2 className="section-title mt-3">
            Open Source <span className="gradient-text">Presence</span>
          </h2>
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
              { label: 'Public Repos', value: stats.public_repos, icon: <BookOpen size={18} />, color: '#00d4ff' },
              { label: 'Followers', value: stats.followers, icon: <Users size={18} />, color: '#9333ea' },
              { label: 'Following', value: stats.following, icon: <Github size={18} />, color: '#ec4899' },
              { label: 'Gists', value: stats.public_gists, icon: <Star size={18} />, color: '#10b981' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="glass border border-white/06 rounded-2xl p-5 text-center"
              >
                <div className="flex justify-center mb-2" style={{ color: stat.color }}>{stat.icon}</div>
                <div className="font-display text-2xl font-bold text-white">
                  <CountUp end={stat.value} duration={2} delay={0.3} />
                </div>
                <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
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
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.06 }}
                whileHover={{ y: -4, borderColor: 'rgba(0, 212, 255, 0.2)' }}
                className="glass border border-white/06 rounded-2xl p-4 flex items-center justify-between group transition-all duration-200"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Github size={18} className="text-slate-500 flex-shrink-0" />
                  <span className="text-sm text-white font-medium truncate group-hover:text-primary-400 transition-colors">
                    {repo.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                  {repo.language && (
                    <div className="flex items-center gap-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: langColors[repo.language] || '#64748b' }}
                      />
                      <span className="text-xs text-slate-500">{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Star size={12} />
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
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass border border-white/10 text-slate-400 hover:text-white hover:border-primary-500/30 transition-all duration-200 text-sm font-medium"
          >
            <Github size={16} />
            View Full GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
