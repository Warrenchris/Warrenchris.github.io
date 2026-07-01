import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import {
  Mail, Phone, MapPin, Github, Linkedin, Send,
  CheckCircle, XCircle, Loader2, MessageCircle
} from 'lucide-react';
import { personalInfo } from '@/config/siteData';
import { emailjsConfig } from '@/config/emailjs';

type FormState = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const validate = (data: FormData) => {
    const errs: Record<string, string> = {};
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const message = data.get('message') as string;
    if (!name?.trim()) errs.name = 'Name is required';
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Valid email required';
    if (!message?.trim() || message.length < 10) errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const errs = validate(data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setFormState('sending');

    try {
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        emailjsConfig.publicKey,
      );
      setFormState('success');
      formRef.current.reset();
      setTimeout(() => setFormState('idle'), 5000);
    } catch {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 4000);
    }
  };

  const contactCards = [
    { icon: <Mail size={16} strokeWidth={1.5} />, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: <Phone size={16} strokeWidth={1.5} />, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s+/g, '')}` },
    { icon: <MapPin size={16} strokeWidth={1.5} />, label: 'Location', value: personalInfo.location, href: '#' },
  ];

  return (
    <section id="contact" className="section-wrapper relative bg-black">
      {/* Subtle blurs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/2 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-purple/2 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="section-tag"><MessageCircle size={12} className="text-primary" /> Contact</span>
          <h2 className="section-title mt-3 font-display">Let's Work Together</h2>
          <p className="section-subtitle mx-auto mt-4 text-[var(--text-secondary)] font-light text-base">
            Have a project in mind or want to discuss an opportunity? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="font-sans text-xl font-bold text-white tracking-tight">Connect with me</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed font-light text-sm">
                Whether you need a network infrastructure design, a web application built from scratch, 
                or a cybersecurity audit — I am here to help. Reach out using the form, or via direct channels.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-3.5">
              {contactCards.map((card, i) => (
                <motion.a
                  key={card.label}
                  href={card.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  whileHover={{ x: 2, borderColor: 'rgba(0,113,227,0.15)' }}
                  className="flex items-center gap-4 bg-white/[0.01] border border-white/[0.04] rounded-2xl p-4 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10 transition-transform group-hover:scale-102 flex-shrink-0">
                    {card.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider mb-0.5">{card.label}</div>
                    <div className="text-sm text-white font-medium truncate">{card.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-4 space-y-4">
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.25em] font-semibold">Find Me On</p>
              <div className="flex gap-3">
                {[
                  { icon: <Github size={18} />, href: personalInfo.github, label: 'GitHub' },
                  { icon: <Linkedin size={18} />, href: personalInfo.linkedin, label: 'LinkedIn' },
                  { icon: <Mail size={18} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--text-secondary)] transition-all duration-200"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="bg-white/[0.01] border border-white/[0.04] backdrop-blur-md rounded-3xl p-8 shadow-lg">
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle size={48} className="text-[#30D158] mb-4" />
                    </motion.div>
                    <h3 className="font-sans font-bold text-white text-lg mb-2">Message Sent</h3>
                    <p className="text-xs text-[var(--text-secondary)]">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : formState === 'error' ? (
                  <motion.div
                    key="error"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <XCircle size={48} className="text-[#FF3B30] mb-4" />
                    <h3 className="font-sans font-bold text-white text-lg mb-2">Something went wrong</h3>
                    <p className="text-xs text-[var(--text-secondary)]">Please try again or email me directly.</p>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          className={`form-input bg-white/[0.01] border-white/[0.04] rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:border-primary focus:ring-0 w-full ${errors.name ? 'border-[#FF3B30]/50' : ''}`}
                          aria-label="Name"
                        />
                        {errors.name && <p className="text-[10px] text-[#FF3B30] font-semibold mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          className={`form-input bg-white/[0.01] border-white/[0.04] rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:border-primary focus:ring-0 w-full ${errors.email ? 'border-[#FF3B30]/50' : ''}`}
                          aria-label="Email"
                        />
                        {errors.email && <p className="text-[10px] text-[#FF3B30] font-semibold mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      className="form-input bg-white/[0.01] border-white/[0.04] rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:border-primary focus:ring-0 w-full"
                      aria-label="Subject"
                    />

                    <div>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Tell me about your project..."
                        className={`form-input bg-white/[0.01] border-white/[0.04] rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:border-primary focus:ring-0 w-full resize-none ${errors.message ? 'border-[#FF3B30]/50' : ''}`}
                        aria-label="Message"
                      />
                      {errors.message && <p className="text-[10px] text-[#FF3B30] font-semibold mt-1">{errors.message}</p>}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={formState === 'sending'}
                      whileHover={{ scale: formState === 'sending' ? 1 : 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-primary text-white font-semibold text-xs disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                    >
                      {formState === 'sending' ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
