import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
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
    { icon: <Mail size={20} />, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: '#00d4ff' },
    { icon: <Phone size={20} />, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}`, color: '#9333ea' },
    { icon: <MapPin size={20} />, label: 'Location', value: personalInfo.location, href: '#', color: '#10b981' },
  ];

  return (
    <section id="contact" className="section-wrapper relative">
      <div className="blob blob-cyan absolute top-10 right-10 w-80 h-80 opacity-5" />
      <div className="blob blob-purple absolute bottom-10 left-10 w-60 h-60 opacity-5" />

      <div className="container mx-auto px-6 max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="section-tag"><MessageCircle size={12} /> Contact</span>
          <h2 className="section-title mt-3">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4 text-slate-400">
            Have a project in mind or want to discuss an opportunity? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">Get in Touch</h3>
              <p className="text-slate-400 leading-relaxed">
                Whether you need a network infrastructure overhaul, a web application built from scratch, 
                or a cybersecurity assessment — I'm here to help. Let's build something great together.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-3">
              {contactCards.map((card, i) => (
                <motion.a
                  key={card.label}
                  href={card.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 glass border border-white/06 rounded-2xl p-4 group hover:border-primary-500/20 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: `${card.color}15`, color: card.color }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">{card.label}</div>
                    <div className="text-sm text-white font-medium">{card.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-4">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Find Me On</p>
              <div className="flex gap-3">
                {[
                  { icon: <Github size={20} />, href: personalInfo.github, label: 'GitHub', color: '#fff' },
                  { icon: <Linkedin size={20} />, href: personalInfo.linkedin, label: 'LinkedIn', color: '#0077b5' },
                  { icon: <Mail size={20} />, href: `mailto:${personalInfo.email}`, label: 'Email', color: '#00d4ff' },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary-500/30 transition-all duration-200"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="glass border border-white/08 rounded-3xl p-7">
              {formState === 'success' ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle size={56} className="text-green-400 mb-4" />
                  </motion.div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h3>
                  <p className="text-slate-400">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                </motion.div>
              ) : formState === 'error' ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <XCircle size={56} className="text-red-400 mb-4" />
                  <h3 className="font-display font-bold text-white text-xl mb-2">Something went wrong</h3>
                  <p className="text-slate-400">Please try again or email me directly.</p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className={`form-input ${errors.name ? 'border-red-500/50' : ''}`}
                        aria-label="Name"
                      />
                      {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className={`form-input ${errors.email ? 'border-red-500/50' : ''}`}
                        aria-label="Email"
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="form-input"
                    aria-label="Subject"
                  />

                  <div>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project..."
                      className={`form-input resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                      aria-label="Message"
                    />
                    {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={formState === 'sending'}
                    whileHover={{ scale: formState === 'sending' ? 1 : 1.02, boxShadow: '0 0 30px rgba(0,212,255,0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-purple text-white font-semibold text-base shadow-neon-cyan disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {formState === 'sending' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
