import React, { useState, useMemo } from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Code2, 
  Terminal, 
  Copy, 
  Check, 
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Server,
  Network,
  Clock,
  BookOpen
} from 'lucide-react';
import { ProjectCaseStudy } from '../types';

interface ProjectModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onOpenArchitectureDemo?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenArchitectureDemo
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'engineering' | 'security' | 'code'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);

  // Calculate reading time based on word count of the project description & case study content
  const { totalWords, readingMinutes } = useMemo(() => {
    if (!project) return { totalWords: 0, readingMinutes: 1 };

    // Aggregate all descriptive narrative sections that make up the project case study
    const descriptiveSections: string[] = [
      project.title || '',
      project.subtitle || '',
      project.brief || '',
      project.problem?.overview || '',
      ...(project.problem?.keyChallenges || []),
      project.solution?.overview || '',
      ...(project.solution?.coreCapabilities || []),
      project.architecture?.description || '',
      ...(project.architecture?.flowSteps?.map((step) => `${step.title}: ${step.description}`) || []),
      ...(project.engineeringDecisions?.map((d) => `${d.decision} ${d.rationale} ${d.impact}`) || []),
      ...(project.securityAndReliability || []),
      ...(project.outcomes || []),
      ...(project.snippets?.map((s) => `${s.title} ${s.explanation}`) || [])
    ];

    const aggregatedText = descriptiveSections.join(' ').trim();
    const words = aggregatedText ? aggregatedText.split(/\s+/).filter(Boolean) : [];
    const count = words.length;

    // Standard reading speed for technical documentation is ~200 words per minute
    const wordsPerMinute = 200;
    const minutes = Math.max(1, Math.ceil(count / wordsPerMinute));

    return {
      totalWords: count,
      readingMinutes: minutes
    };
  }, [project]);

  if (!project) return null;

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div 
        className="bg-[#0c0c0c] border border-white/10 w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-[#090909] border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-white/80 font-mono-code text-[11px] font-semibold">
              CASE STUDY
            </span>
            <span className="text-xs font-mono-code text-white/40 hidden sm:inline">
              {project.period}
            </span>
            <span className="text-white/20 hidden sm:inline">·</span>
            <span 
              id="case-study-header-reading-time"
              className="inline-flex items-center gap-1.5 text-xs font-mono-code text-white/60"
              title={`Estimated reading time: ${readingMinutes} min based on ${totalWords.toLocaleString()} words`}
            >
              <Clock className="w-3.5 h-3.5 text-white/40" />
              <span>{readingMinutes} min read</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white transition-colors border border-white/5"
                title="View Source on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={onClose}
              id="case-study-close-btn"
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white transition-colors border border-white/5"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title & Metadata Hero */}
        <div className="px-6 pt-6 pb-4 bg-[#0d0d0d] border-b border-white/5">
          <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
            {project.isFlagship && (
              <span className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/15 text-white font-mono-code text-[10px] font-semibold tracking-wider">
                ★ FLAGSHIP ARCHITECTURE
              </span>
            )}
            <span className="text-xs text-white/40 font-mono-code">Role: {project.role}</span>
            <span className="text-white/20">·</span>
            <div 
              id="case-study-reading-badge"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono-code text-white/70"
            >
              <Clock className="w-3.5 h-3.5 text-white/40" />
              <span className="text-white/90 font-medium">{readingMinutes} min read</span>
              <span className="text-white/20">·</span>
              <span className="text-white/40">{totalWords.toLocaleString()} words</span>
            </div>
          </div>
          
          <h2 id="case-study-title" className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-3xl leading-relaxed font-normal">
            {project.subtitle}
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 pt-6 overflow-x-auto no-scrollbar" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg font-mono-code transition-all shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-white text-black shadow-sm'
                  : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.06] hover:text-white border border-white/5'
              }`}
            >
              Overview & Solution
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'architecture'}
              onClick={() => setActiveTab('architecture')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg font-mono-code transition-all shrink-0 ${
                activeTab === 'architecture'
                  ? 'bg-white text-black shadow-sm'
                  : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.06] hover:text-white border border-white/5'
              }`}
            >
              Architecture & Data Flow
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'engineering'}
              onClick={() => setActiveTab('engineering')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg font-mono-code transition-all shrink-0 ${
                activeTab === 'engineering'
                  ? 'bg-white text-black shadow-sm'
                  : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.06] hover:text-white border border-white/5'
              }`}
            >
              Engineering Decisions
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'security'}
              onClick={() => setActiveTab('security')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg font-mono-code transition-all shrink-0 ${
                activeTab === 'security'
                  ? 'bg-white text-black shadow-sm'
                  : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.06] hover:text-white border border-white/5'
              }`}
            >
              Security & Hardening
            </button>
            {project.snippets && project.snippets.length > 0 && (
              <button
                role="tab"
                aria-selected={activeTab === 'code'}
                onClick={() => setActiveTab('code')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg font-mono-code transition-all shrink-0 ${
                  activeTab === 'code'
                    ? 'bg-white text-black shadow-sm'
                    : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.06] hover:text-white border border-white/5'
                }`}
              >
                Code Snippets ({project.snippets.length})
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 max-h-[calc(92vh-220px)]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Executive Brief / Project Description */}
              <div id="case-study-description-card" className="bg-[#090909] border border-white/5 rounded-xl p-5 relative">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-white/5">
                  <div className="flex items-center gap-2 text-white font-mono-code text-xs font-bold uppercase">
                    <BookOpen className="w-4 h-4 text-white/60" />
                    <span>Project Description & Brief</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono-code text-white/60 bg-white/[0.03] px-2.5 py-1 rounded border border-white/5">
                    <Clock className="w-3.5 h-3.5 text-white/40" />
                    <span>Est. reading time: ~{readingMinutes} min ({totalWords.toLocaleString()} words)</span>
                  </div>
                </div>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal">
                  {project.brief}
                </p>
              </div>

              {/* Problem Section */}
              <div className="bg-[#090909] border border-white/5 rounded-xl p-5">
                <div className="flex items-center gap-2 text-white/70 font-mono-code text-xs font-bold uppercase mb-2">
                  <AlertTriangle className="w-4 h-4 text-white/50" />
                  <span>The Real-World Problem</span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-4 font-normal">
                  {project.problem.overview}
                </p>
                <div className="space-y-2">
                  <span className="text-xs font-mono-code text-white/40 uppercase tracking-wider block">Key Engineering Challenges:</span>
                  <ul className="space-y-1.5">
                    {project.problem.keyChallenges.map((challenge, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-white/70">
                        <span className="text-white/40 font-mono-code font-bold">✕</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Solution Section */}
              <div className="bg-[#090909] border border-white/5 rounded-xl p-5">
                <div className="flex items-center gap-2 text-white font-mono-code text-xs font-bold uppercase mb-2">
                  <Sparkles className="w-4 h-4 text-white/60" />
                  <span>The Engineered Solution</span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-4 font-normal">
                  {project.solution.overview}
                </p>
                <div className="space-y-2">
                  <span className="text-xs font-mono-code text-white/40 uppercase tracking-wider block">Core Capabilities Delivered:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.solution.coreCapabilities.map((capability, idx) => (
                      <div key={idx} className="bg-[#111] p-3 rounded-lg border border-white/5 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-white/70 shrink-0 mt-0.5" />
                        <span className="text-xs text-white/80 leading-normal">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Outcomes Section */}
              <div className="bg-[#090909] border border-white/5 rounded-xl p-5">
                <div className="text-white font-mono-code text-xs font-bold uppercase mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Measurable Engineering Outcomes</span>
                </div>
                <ul className="space-y-2">
                  {project.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2"></div>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Breakdown */}
              <div className="bg-[#090909] border border-white/5 rounded-xl p-5">
                <span className="text-xs font-mono-code text-white/40 uppercase tracking-wider block mb-3">Complete Stack & Tools:</span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-white/[0.04] border border-white/10 rounded-md text-xs font-mono-code text-white/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ARCHITECTURE & DATA FLOW */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              
              <div className="bg-[#090909] border border-white/5 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-white font-mono-code text-xs font-bold uppercase">
                    <Layers className="w-4 h-4 text-white/60" />
                    <span>System Architecture Overview</span>
                  </div>
                  {project.hasInteractiveDemo && onOpenArchitectureDemo && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenArchitectureDemo();
                      }}
                      className="text-xs font-mono-code text-white/70 hover:text-white flex items-center gap-1 underline underline-offset-4"
                    >
                      Launch Live Flow Simulator →
                    </button>
                  )}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 font-normal">
                  {project.architecture.description}
                </p>

                {/* Step Flow Pipeline */}
                <div className="space-y-3 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10">
                  {project.architecture.flowSteps.map((step) => (
                    <div key={step.step} className="flex items-start gap-4 relative pl-1">
                      <div className="w-7 h-7 rounded-full bg-black border border-white/30 flex items-center justify-center text-xs font-mono-code font-bold text-white shrink-0 z-10">
                        {step.step}
                      </div>
                      <div className="bg-[#111] border border-white/5 p-3.5 rounded-xl flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs sm:text-sm font-semibold text-white font-display">
                            {step.title}
                          </span>
                          <span className="text-[10px] font-mono-code bg-white/[0.04] text-white/70 px-2 py-0.5 rounded border border-white/10">
                            {step.tech}
                          </span>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed font-normal">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Domain Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.coreTech.backend && (
                  <div className="bg-[#090909] p-4 rounded-xl border border-white/5">
                    <div className="text-xs font-mono-code text-white/80 mb-2 flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-white/50" />
                      <span>Backend & Compute</span>
                    </div>
                    <ul className="text-xs text-white/60 space-y-1 font-mono-code">
                      {project.coreTech.backend.map(item => <li key={item}>• {item}</li>)}
                    </ul>
                  </div>
                )}
                {project.coreTech.data && (
                  <div className="bg-[#090909] p-4 rounded-xl border border-white/5">
                    <div className="text-xs font-mono-code text-white/80 mb-2 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-white/50" />
                      <span>Data & Queues</span>
                    </div>
                    <ul className="text-xs text-white/60 space-y-1 font-mono-code">
                      {project.coreTech.data.map(item => <li key={item}>• {item}</li>)}
                    </ul>
                  </div>
                )}
                {project.coreTech.infra && (
                  <div className="bg-[#090909] p-4 rounded-xl border border-white/5">
                    <div className="text-xs font-mono-code text-white/80 mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-white/50" />
                      <span>Infrastructure & Containers</span>
                    </div>
                    <ul className="text-xs text-white/60 space-y-1 font-mono-code">
                      {project.coreTech.infra.map(item => <li key={item}>• {item}</li>)}
                    </ul>
                  </div>
                )}
                {project.coreTech.protocols && (
                  <div className="bg-[#090909] p-4 rounded-xl border border-white/5">
                    <div className="text-xs font-mono-code text-white/80 mb-2 flex items-center gap-1.5">
                      <Network className="w-3.5 h-3.5 text-white/50" />
                      <span>Protocols & Network</span>
                    </div>
                    <ul className="text-xs text-white/60 space-y-1 font-mono-code">
                      {project.coreTech.protocols.map(item => <li key={item}>• {item}</li>)}
                    </ul>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: ENGINEERING DECISIONS */}
          {activeTab === 'engineering' && (
            <div className="space-y-4">
              <p className="text-xs font-mono-code text-white/40 uppercase tracking-wider mb-2">
                Tradeoffs & Architectural Rationale:
              </p>
              {project.engineeringDecisions.map((dec, idx) => (
                <div key={idx} className="bg-[#090909] border border-white/5 rounded-xl p-5 space-y-3">
                  <div className="text-sm font-semibold text-white font-display flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-white/[0.06] text-white text-xs font-mono-code flex items-center justify-center border border-white/10">
                      {idx + 1}
                    </span>
                    <span>{dec.decision}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#111] p-3 rounded-lg border border-white/5">
                      <span className="font-mono-code text-white/40 block mb-1">WHY THIS CHOICE (RATIONALE):</span>
                      <p className="text-white/70 leading-relaxed font-normal">{dec.rationale}</p>
                    </div>
                    <div className="bg-[#111] p-3 rounded-lg border border-white/5">
                      <span className="font-mono-code text-white/70 block mb-1">SYSTEM IMPACT & OUTCOME:</span>
                      <p className="text-white/70 leading-relaxed font-normal">{dec.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: SECURITY & RELIABILITY */}
          {activeTab === 'security' && (
            <div className="space-y-5">
              <div className="bg-[#090909] border border-white/5 rounded-xl p-5">
                <div className="flex items-center gap-2 text-white font-mono-code text-xs font-bold uppercase mb-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Production Hardening & Defensive Engineering</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4 font-normal">
                  Every layer was designed following the principle of least privilege, defensive input boundaries, and resilience against sudden infrastructure failures.
                </p>
                <div className="space-y-2.5">
                  {project.securityAndReliability.map((item, idx) => (
                    <div key={idx} className="bg-[#111] p-3.5 rounded-lg border border-white/5 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CODE SNIPPETS */}
          {activeTab === 'code' && project.snippets && (
            <div className="space-y-5">
              {project.snippets.map((snippet, idx) => (
                <div key={idx} className="bg-[#090909] border border-white/5 rounded-xl overflow-hidden">
                  <div className="bg-[#111] px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-white/60" />
                      <span className="text-xs font-mono-code font-semibold text-white/90">{snippet.title}</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(snippet.code)}
                      className="flex items-center gap-1 text-[11px] font-mono-code text-white/50 hover:text-white px-2 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono-code text-white/80 overflow-x-auto bg-black leading-relaxed">
                    <code>{snippet.code}</code>
                  </pre>
                  <div className="p-3 bg-[#111] border-t border-white/5 text-xs text-white/60">
                    <strong className="text-white/80">Technical Context:</strong> {snippet.explanation}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-[#090909] px-6 py-3.5 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs font-mono-code text-white/40">
            Warren Chris Portfolio · Systems Case Study
          </span>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/80 text-xs font-mono-code flex items-center gap-1.5 transition-colors border border-white/5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View on GitHub</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white text-black hover:bg-white/90 text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
