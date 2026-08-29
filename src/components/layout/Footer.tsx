import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '@/config/siteData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[var(--border-color)] bg-[var(--bg-primary)] py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Identity */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center font-sans font-bold text-white text-xs shadow-sm">
                W
              </div>
              <span className="font-sans font-semibold text-sm tracking-tight text-[var(--text-primary)]">
                Warren<span className="text-primary font-bold">Chris</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              &copy; {new Date().getFullYear()} Warren Chris. Software Engineer &amp; Systems Builder.
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-3">
            {[
              { icon: <Github size={16} />, href: personalInfo.github, label: 'GitHub' },
              { icon: <Linkedin size={16} />, href: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: <Mail size={16} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-all"
              >
                {social.icon}
              </a>
            ))}

            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-all ml-2"
              aria-label="Back to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
