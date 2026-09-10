import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Star } from 'lucide-react';
import { githubRepos, personalInfo } from '@/config/siteData';

const langColors: Record<string, string> = {
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
  Python: '#3572A5',
  C: '#555555',
  PHP: '#4F5D95',
  Java: '#B07219',
};

export default function GitHubRepos() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="section-gap bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="container-main">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <span className="section-label">Build Log</span>
          <h2 className="text-heading mt-3 text-[var(--text-primary)]">
            Open source
          </h2>
          <p className="text-body text-[var(--text-secondary)] mt-3 max-w-xl">
            Selected repositories from my GitHub profile.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
          {githubRepos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="group flex flex-col gap-3 p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-[var(--border-hover)] transition-all"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-mono text-small font-medium text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors truncate">
                  {repo.name}
                </h3>
                <ArrowUpRight size={14} className="text-[var(--text-muted)] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-caption text-[var(--text-secondary)] line-clamp-2">
                {repo.description}
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <span className="flex items-center gap-1.5 text-caption text-[var(--text-muted)]">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: langColors[repo.language] || '#666' }}
                  />
                  {repo.language}
                </span>
                {repo.stars > 0 && (
                  <span className="flex items-center gap-1 text-caption text-[var(--text-muted)]">
                    <Star size={11} />
                    {repo.stars}
                  </span>
                )}
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-6">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-small font-medium text-[var(--text-primary)] hover:text-[var(--color-accent)] transition-colors"
          >
            View all repositories
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
