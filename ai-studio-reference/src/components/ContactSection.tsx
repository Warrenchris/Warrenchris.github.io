import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  Github, 
  Linkedin, 
  FileText, 
  Send, 
  Sparkles, 
  Clock, 
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);
  const [inquiryType, setInquiryType] = useState<'fulltime' | 'contract' | 'general'>('fulltime');
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [messageBody, setMessageBody] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getSubjectLine = () => {
    switch (inquiryType) {
      case 'fulltime':
        return `Software Engineering Opportunity${senderOrg ? ` at ${senderOrg}` : ''} - Warren Chris`;
      case 'contract':
        return `Systems / Backend Architecture Project${senderOrg ? ` - ${senderOrg}` : ''}`;
      case 'general':
      default:
        return `Technical Inquiry - Warren Chris`;
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(getSubjectLine());
    const bodyText = encodeURIComponent(
      `Hello Warren,\n\n${messageBody || 'I reviewed your engineering portfolio and would like to discuss an opportunity.'}\n\nBest regards,\n${senderName || 'Recruiter / Engineering Lead'}${senderOrg ? `\n${senderOrg}` : ''}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${bodyText}`;
  };

  return (
    <section 
      id="contact" 
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      aria-label="Contact and Hire Warren Chris"
    >
      <motion.div 
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden backdrop-blur-md"
      >
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start relative z-10">
          
          {/* Left Column: Direct info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono-code uppercase tracking-widest text-white/60">
              <Mail className="w-3.5 h-3.5 text-white/50" />
              <span>LET&apos;S CONNECT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Ready to build reliable systems together?
            </h2>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed font-normal">
              I am actively considering <strong className="text-white font-semibold">full-time software engineering positions</strong>, distributed backend roles, and high-impact infrastructure contracts.
            </p>

            {/* Quick Email Box */}
            <div className="bg-black/60 p-4 rounded-xl border border-white/5 space-y-2">
              <span className="text-[10px] font-mono-code text-white/40 uppercase tracking-widest block">
                DIRECT INBOX:
              </span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-mono-code text-xs sm:text-sm text-white font-semibold hover:underline truncate"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  id="contact-copy-email-btn"
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white text-xs font-mono-code flex items-center gap-1.5 transition-colors shrink-0 border border-white/5"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Availability & Location Badges */}
            <div className="space-y-2 font-mono-code text-xs text-white/50">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-white/40 shrink-0" />
                <span>Nairobi, Kenya · Remote Worldwide (EAT / UTC+3)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-white/40 shrink-0" />
                <span>Typical response time: Under 24 hours</span>
              </div>
            </div>

            {/* Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-black/60 hover:bg-white/[0.06] border border-white/5 text-xs font-mono-code text-white/80 flex items-center gap-1.5 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Profile</span>
              </a>

              <button
                onClick={onOpenResume}
                className="px-4 py-2 rounded-xl bg-black/60 hover:bg-white/[0.06] border border-white/5 text-xs font-mono-code text-white/80 flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-white/50" />
                <span>Curriculum Vitae</span>
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Email Dispatcher */}
          <div className="lg:col-span-7 bg-black/60 border border-white/5 rounded-2xl p-6 sm:p-7 shadow-xl">
            <span className="text-xs font-mono-code text-white/70 font-bold uppercase tracking-wider block mb-4">
              DRAFT DIRECT MESSAGE
            </span>

            <form onSubmit={handleSendEmail} className="space-y-4">
              
              {/* Inquiry Type Selector */}
              <div>
                <label className="text-xs font-mono-code text-white/40 block mb-1.5">
                  Opportunity Type:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setInquiryType('fulltime')}
                    className={`py-2 px-2 text-xs font-mono-code rounded-lg border text-center transition-all ${
                      inquiryType === 'fulltime'
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'bg-[#0d0d0d] border-white/5 text-white/50 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    Full-Time Role
                  </button>

                  <button
                    type="button"
                    onClick={() => setInquiryType('contract')}
                    className={`py-2 px-2 text-xs font-mono-code rounded-lg border text-center transition-all ${
                      inquiryType === 'contract'
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'bg-[#0d0d0d] border-white/5 text-white/50 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    Contract / Project
                  </button>

                  <button
                    type="button"
                    onClick={() => setInquiryType('general')}
                    className={`py-2 px-2 text-xs font-mono-code rounded-lg border text-center transition-all ${
                      inquiryType === 'general'
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'bg-[#0d0d0d] border-white/5 text-white/50 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    Technical Inquiry
                  </button>
                </div>
              </div>

              {/* Name & Org Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono-code text-white/40 block mb-1">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={e => setSenderName(e.target.value)}
                    placeholder="e.g. Alex Miller"
                    className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 font-mono-code"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono-code text-white/40 block mb-1">
                    Company / Organization:
                  </label>
                  <input
                    type="text"
                    value={senderOrg}
                    onChange={e => setSenderOrg(e.target.value)}
                    placeholder="e.g. Acme Systems"
                    className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 font-mono-code"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-mono-code text-white/40 block mb-1">
                  Message / Context:
                </label>
                <textarea
                  rows={4}
                  value={messageBody}
                  onChange={e => setMessageBody(e.target.value)}
                  placeholder="Tell me about the engineering challenges, tech stack, or problem you're looking to solve..."
                  className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl p-3.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 font-mono-code leading-relaxed"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="contact-send-email-btn"
                className="w-full py-3 rounded-xl bg-white hover:bg-white/90 text-black font-mono-code text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open Email Client & Send</span>
              </button>

              <span className="text-[10px] font-mono-code text-white/30 block text-center">
                Launches your native email client pre-filled with Warren&apos;s address and formatted subject.
              </span>

            </form>
          </div>

        </div>

      </motion.div>
    </section>
  );
};
