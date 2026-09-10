import { ArrowUp } from 'lucide-react';
import { personalInfo } from '@/config/siteData';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
      <div className="container-main py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-caption text-[var(--text-muted)]">
          © {new Date().getFullYear()} Warren Chris
        </p>

        <div className="flex items-center gap-5 text-caption text-[var(--text-muted)]">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">
            GitHub
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">
            LinkedIn
          </a>
          <a href={`mailto:${personalInfo.email}`} className="hover:text-[var(--text-primary)] transition-colors">
            Email
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-[var(--text-primary)] transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
