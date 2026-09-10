import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight, Clock, MapPin, FileText } from 'lucide-react';
import { personalInfo } from '@/config/siteData';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="contact" className="section-gap bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
      <div className="container-main">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="max-w-2xl"
        >
          <span className="section-label">Contact</span>
          <h2 className="text-heading mt-3 text-[var(--text-primary)]">
            Let's build something serious together.
          </h2>
          <p className="text-body text-[var(--text-secondary)] mt-4 leading-relaxed">
            I'm currently considering software engineering opportunities across full-stack platforms, distributed backend systems, and applied AI. Whether you have an open role, an architectural challenge, or a consulting project, my inbox is open.
          </p>
        </motion.div>

        {/* Contact cards & actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Primary Email Card */}
          <div className="p-6 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-caption text-[var(--text-muted)] uppercase tracking-wider">DIRECT EMAIL</span>
                <span className="text-caption font-medium text-[var(--text-secondary)]">
                  Available for full-time roles
                </span>
              </div>
              <p className="mt-3 text-large font-mono font-medium text-[var(--text-primary)] break-all select-all">
                {personalInfo.email}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${personalInfo.email}?subject=Software%20Engineering%20Opportunity`}
                className="btn-primary"
              >
                <Mail size={15} />
                <span>Send Email</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="btn-secondary"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check size={15} className="text-emerald-500" />
                    <span>Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              <a
                href={personalInfo.resumeRequestUrl}
                className="btn-secondary"
                title="Request Warren's resume PDF via email"
              >
                <FileText size={15} />
                <span>Request Resume</span>
              </a>
            </div>
          </div>

          {/* Social Links & Location Card */}
          <div className="p-6 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] flex flex-col justify-between gap-6">
            <div>
              <span className="font-mono text-caption text-[var(--text-muted)]">PROFILES &amp; LOCATION</span>
              <div className="mt-4 space-y-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-md border border-[var(--border-color)] hover:border-[var(--border-hover)] bg-[var(--bg-secondary)] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Github size={16} className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]" />
                    <span className="text-small font-medium text-[var(--text-primary)]">GitHub</span>
                    <span className="text-caption text-[var(--text-muted)] font-mono">@Warrenchris</span>
                  </div>
                  <ArrowUpRight size={14} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)]" />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-md border border-[var(--border-color)] hover:border-[var(--border-hover)] bg-[var(--bg-secondary)] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin size={16} className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]" />
                    <span className="text-small font-medium text-[var(--text-primary)]">LinkedIn</span>
                    <span className="text-caption text-[var(--text-muted)]">Warren Chris</span>
                  </div>
                  <ArrowUpRight size={14} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)]" />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)] text-caption text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} />
                {personalInfo.location}
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <Clock size={13} />
                EAT (UTC+3)
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
