import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Terminal as TerminalIcon, 
  CornerDownLeft, 
  Maximize2, 
  Minimize2,
  Copy,
  Check
} from 'lucide-react';
import { PROJECTS_DATA, SKILL_CATEGORIES, CERTIFICATIONS_DATA, ENGINEERING_PRINCIPLES, PERSONAL_INFO } from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
  onOpenResume: () => void;
}

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenResume
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      command: 'sys.init --target="Warren Chris Portfolio CLI"',
      output: (
        <div className="space-y-1 text-white/70">
          <div className="text-white font-bold">Warren Chris [Software Engineer & Systems Builder] CLI v2.4.0</div>
          <div>Type <span className="text-white font-semibold">&apos;help&apos;</span> to view available system commands. Try <span className="text-white font-semibold">&apos;projects&apos;</span>, <span className="text-white font-semibold">&apos;skills&apos;</span>, or <span className="text-white font-semibold">&apos;contact&apos;</span>.</div>
        </div>
      )
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    setCommandHistory(prev => [...prev, inputVal]);
    setHistoryIndex(-1);

    let outputContent: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputContent = (
          <div className="space-y-1 text-xs text-white/70 font-mono-code">
            <div className="text-white font-semibold mb-1">AVAILABLE COMMANDS:</div>
            <div>• <span className="text-white/90">whoami</span> — Identity, title, and core domain</div>
            <div>• <span className="text-white/90">projects</span> — List all engineered systems and flagship case studies</div>
            <div>• <span className="text-white/90">skills</span> — Display technical competency matrix</div>
            <div>• <span className="text-white/90">principles</span> — Display 4 core engineering philosophies</div>
            <div>• <span className="text-white/90">certs</span> — Display verified industry certifications</div>
            <div>• <span className="text-white/90">contact</span> — Get direct contact channels & email</div>
            <div>• <span className="text-white/90">resume</span> — Open interactive resume modal</div>
            <div>• <span className="text-white/90">clear</span> — Clear terminal output history</div>
          </div>
        );
        break;

      case 'whoami':
        outputContent = (
          <div className="space-y-1 text-xs text-white/70 font-mono-code">
            <div className="text-white font-bold">{PERSONAL_INFO.name}</div>
            <div className="text-white/90">{PERSONAL_INFO.role} ({PERSONAL_INFO.location})</div>
            <div className="text-white/50 mt-1">{PERSONAL_INFO.shortBio}</div>
            <div className="text-emerald-400 mt-1 font-semibold">Status: {PERSONAL_INFO.availabilityStatus}</div>
          </div>
        );
        break;

      case 'projects':
      case 'ls projects':
        outputContent = (
          <div className="space-y-2 text-xs text-white/70 font-mono-code">
            <div className="text-white font-bold">ENGINEERED PRODUCTION SYSTEMS:</div>
            {PROJECTS_DATA.map((p, i) => (
              <div key={p.id} className="p-2.5 bg-[#111] rounded-lg border border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">{i + 1}. {p.title}</span>
                  {p.isFlagship && <span className="text-[10px] text-white/90 bg-white/10 px-1.5 py-0.5 rounded border border-white/10">FLAGSHIP</span>}
                </div>
                <div className="text-white/50 text-[11px] mt-0.5">{p.subtitle}</div>
                <div className="text-white/40 text-[10px] mt-1">Stack: {p.tags.slice(0, 5).join(' · ')}</div>
                <button
                  onClick={() => {
                    onClose();
                    onSelectProject(p.id);
                  }}
                  className="mt-1.5 text-[10px] text-white/80 underline hover:text-white"
                >
                  [Inspect Full Case Study →]
                </button>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        outputContent = (
          <div className="space-y-2 text-xs text-white/70 font-mono-code">
            <div className="text-white font-bold">TECHNICAL COMPETENCY MATRIX:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SKILL_CATEGORIES.map(c => (
                <div key={c.title} className="p-2 bg-[#111] rounded border border-white/5">
                  <div className="text-white font-semibold">{c.title}</div>
                  <div className="text-white/50 text-[11px] mt-1">
                    {c.skills.map(s => s.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'principles':
        outputContent = (
          <div className="space-y-2 text-xs text-white/70 font-mono-code">
            <div className="text-white font-bold">ENGINEERING PRINCIPLES:</div>
            {ENGINEERING_PRINCIPLES.map(p => (
              <div key={p.id} className="p-2 bg-[#111] rounded border border-white/5">
                <div className="text-white font-bold">[{p.number}] {p.title}</div>
                <div className="text-white/80 text-[11px] italic mt-0.5">&ldquo;{p.tagline}&rdquo;</div>
                <div className="text-white/50 text-[11px] mt-1">{p.description}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
        outputContent = (
          <div className="space-y-2 text-xs text-white/70 font-mono-code">
            <div className="text-white font-bold">VERIFIED CERTIFICATIONS:</div>
            {CERTIFICATIONS_DATA.map(c => (
              <div key={c.id} className="p-2 bg-[#111] rounded border border-white/5">
                <div className="text-white font-bold">{c.title} ({c.badgeCode})</div>
                <div className="text-white/50 text-[11px]">Issuer: {c.issuer} · Status: Verified Active</div>
                <div className="text-white/40 text-[10px] mt-1">Validated: {c.skillsCovered.join(' · ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputContent = (
          <div className="space-y-1 text-xs text-white/70 font-mono-code">
            <div className="text-white font-bold">DIRECT CONTACT CHANNELS:</div>
            <div>• Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white underline">{PERSONAL_INFO.email}</a></div>
            <div>• GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-white underline">{PERSONAL_INFO.github}</a></div>
            <div>• Timezone: {PERSONAL_INFO.timezone} (Nairobi, Kenya)</div>
            <div>• Response Time: &lt; 24 Hours</div>
          </div>
        );
        break;

      case 'resume':
      case 'cv':
        onClose();
        onOpenResume();
        return;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        outputContent = (
          <div className="text-rose-400 text-xs font-mono-code">
            Command not recognized: &apos;{inputVal}&apos;. Type <span className="text-white font-bold">&apos;help&apos;</span> to view valid system commands.
          </div>
        );
        break;
    }

    setHistory(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        command: inputVal,
        output: outputContent
      }
    ]);
    setInputVal('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-[#0c0c0c] border border-white/10 w-full max-w-3xl h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono-code relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#090909] px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
            </div>
            <span className="text-xs font-bold text-white/80 ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-white/60" />
              warrenchris@systems-core:~$
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/30 hidden sm:inline">ESC to exit</span>
            <button
              onClick={onClose}
              className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white transition-colors border border-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Console Log Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs bg-[#090909]">
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-white/70 font-semibold">
                <span className="text-white/40">warrenchris@systems:~$</span>
                <span className="text-white">{item.command}</span>
              </div>
              <div className="pl-4 text-white/70 border-l border-white/10">
                {item.output}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Field */}
        <form onSubmit={handleCommand} className="bg-[#0c0c0c] p-3 border-t border-white/5 flex items-center gap-2">
          <span className="text-white/60 text-xs font-bold shrink-0">warrenchris@systems:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Type 'help', 'projects', 'skills', 'contact'..."
            className="flex-1 bg-transparent text-xs text-white placeholder-white/25 focus:outline-none font-mono-code"
          />
          <button
            type="submit"
            className="p-1.5 rounded bg-white hover:bg-white/90 text-black transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
