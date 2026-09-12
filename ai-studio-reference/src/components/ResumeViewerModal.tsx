import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  ExternalLink, 
  Mail, 
  Github, 
  CheckCircle2, 
  FileText,
  Briefcase,
  GraduationCap,
  Award
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, CERTIFICATIONS_DATA, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `
WARREN CHRIS
Software Engineer & Systems Builder
Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.github}
Location: ${PERSONAL_INFO.location}

SUMMARY:
Software Engineer and Systems Builder specializing in distributed backend services, asynchronous queues (BullMQ/Redis), network automation (FreeRADIUS AAA), relational databases (MySQL, PostgreSQL), and full-stack web platforms.

FLAGSHIP PROJECTS:
1. ISP Billing & Subscriber Management Engine: Node.js, Express, Redis, BullMQ, MySQL, FreeRADIUS, M-Pesa Daraja, Docker.
2. Supplier Intelligence & Procurement Platform: React, TypeScript, Node.js, PostgreSQL, Redis, Docker.
3. POS & Business Management System: React, TypeScript, Node.js, MySQL.
4. SigmaHRM Enterprise Workflow System: React, TypeScript, Node.js, RBAC, MySQL.

CERTIFICATIONS:
- Huawei Certified ICT Associate — Datacom (HCIA-Datacom)
- Cisco DevNet Associate
- IBM Enterprise Design Thinking Practitioner
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-[#0c0c0c] border border-white/10 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Action Bar */}
        <div className="bg-[#090909] px-6 py-4 border-b border-white/5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-white/60" />
            <span className="text-xs font-mono-code font-bold text-white uppercase tracking-wider">
              CURRICULUM VITAE · WARREN CHRIS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono-code text-white/80 flex items-center gap-1.5 transition-colors border border-white/5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Text' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-white/90 text-xs font-mono-code text-black font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white transition-colors border border-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Printable Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-[#0c0c0c] text-white/80 text-sm">
          
          {/* Header Contact */}
          <div className="border-b border-white/5 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-white/60 font-mono-code text-sm font-semibold mt-0.5">
                  {PERSONAL_INFO.role}
                </p>
              </div>
              <div className="text-xs font-mono-code text-white/50 sm:text-right space-y-0.5">
                <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white underline">{PERSONAL_INFO.email}</a></div>
                <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-white underline">{PERSONAL_INFO.github}</a></div>
                <div>Location: {PERSONAL_INFO.location}</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/70 mt-4 leading-relaxed max-w-3xl font-normal">
              Software Engineer with deep competence in designing and shipping production-grade distributed backend services, asynchronous queues (BullMQ/Redis), network AAA daemons (FreeRADIUS), and business data systems.
            </p>
          </div>

          {/* Section: Technical Competencies */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono-code text-white/60 font-bold uppercase tracking-wider flex items-center gap-2 pb-1 border-b border-white/5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>CORE TECHNICAL COMPETENCIES</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-code">
              {SKILL_CATEGORIES.map(c => (
                <div key={c.title} className="bg-[#090909] p-3 rounded-lg border border-white/5">
                  <span className="text-white font-bold block mb-1">{c.title}:</span>
                  <span className="text-white/60 leading-relaxed">{c.skills.map(s => s.name).join(' · ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Flagship Engineering Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono-code text-white/60 font-bold uppercase tracking-wider flex items-center gap-2 pb-1 border-b border-white/5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>PRODUCTION SYSTEMS & CASE STUDIES</span>
            </h2>

            {PROJECTS_DATA.map(p => (
              <div key={p.id} className="bg-[#090909] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-white font-bold text-sm font-display">
                    {p.title}
                  </span>
                  <span className="text-[11px] font-mono-code text-white/60">
                    {p.period}
                  </span>
                </div>
                <div className="text-xs text-white/70 font-normal">
                  {p.brief}
                </div>
                <div className="space-y-1 pt-1">
                  {p.outcomes.slice(0, 2).map((out, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-white/60">
                      <span className="text-emerald-400">✓</span>
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] font-mono-code text-white/50 pt-1">
                  <strong className="text-white/80">Stack:</strong> {p.tags.join(' · ')}
                </div>
              </div>
            ))}
          </div>

          {/* Section: Certifications */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono-code text-white/60 font-bold uppercase tracking-wider flex items-center gap-2 pb-1 border-b border-white/5">
              <Award className="w-3.5 h-3.5" />
              <span>INDUSTRY CERTIFICATIONS</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {CERTIFICATIONS_DATA.map(c => (
                <div key={c.id} className="bg-[#090909] p-3 rounded-lg border border-white/5 font-mono-code space-y-1">
                  <div className="text-white font-bold">{c.title}</div>
                  <div className="text-white/60 text-[11px]">{c.issuer} · {c.badgeCode}</div>
                  <div className="text-[10px] text-white/40">{c.skillsCovered.slice(0, 3).join(', ')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono-code text-white/60 font-bold uppercase tracking-wider flex items-center gap-2 pb-1 border-b border-white/5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>ACADEMIC FOUNDATION</span>
            </h2>
            <div className="bg-[#090909] p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
              <div>
                <div className="text-white font-bold text-sm font-display">Bachelor of Science in Information Technology</div>
                <div className="text-white/60 mt-0.5">Focus on Network Architectures, Systems Programming, Database Systems & Security</div>
              </div>
              <span className="text-white/50 font-mono-code">Final Year</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
