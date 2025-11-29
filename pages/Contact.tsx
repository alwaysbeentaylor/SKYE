
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, CheckCircle, Loader2, AlertCircle, MessageCircle, Info, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Button from '../components/Button';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { trackFormStart, trackFormSubmit, trackFormAbandonment } from '../utils/analytics';
import { useApp } from '../context/AppContext';

const Contact: React.FC = () => {
  const { t } = useApp();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    // Optional fields
    company: '',
    projectType: '',
    budget: '',
    timeline: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [fieldsCompleted, setFieldsCompleted] = useState(0);
  const formStartedRef = useRef(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Track form start
  useEffect(() => {
    const handleFirstFocus = () => {
      if (!formStartedRef.current) {
        formStartedRef.current = true;
        trackFormStart('contact');
      }
    };

    if (nameInputRef.current) {
      nameInputRef.current.addEventListener('focus', handleFirstFocus);
      return () => {
        nameInputRef.current?.removeEventListener('focus', handleFirstFocus);
      };
    }
  }, []);

  // Track form abandonment
  useEffect(() => {
    const completed = [formState.name, formState.email, formState.message].filter(Boolean).length;
    setFieldsCompleted(completed);

    const handleBeforeUnload = () => {
      if (completed > 0 && completed < 3 && !submitted) {
        trackFormAbandonment('contact', completed);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formState, submitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const sendEmail = async (data: typeof formState) => {
    // EmailJS configuration from environment variables
    const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Validate environment variables
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      throw new Error(t.contact.form.error_config);
    }

    // Format project type labels
    const projectTypeLabels: Record<string, string> = t.contact.form.project_type.options;
    const budgetLabels: Record<string, string> = t.contact.form.budget.options;
    const timelineLabels: Record<string, string> = t.contact.form.timeline.options;

    // Prepare template parameters
    const templateParams = {
      to_email: 'table.23@icloud.com',
      from_name: data.name,
      from_email: data.email,
      reply_to: data.email,
      company: data.company || t.contact.form.not_provided,
      project_type: data.projectType ? (projectTypeLabels[data.projectType] || data.projectType) : t.contact.form.not_provided,
      budget: data.budget ? (budgetLabels[data.budget] || data.budget) : t.contact.form.not_provided,
      timeline: data.timeline ? (timelineLabels[data.timeline] || data.timeline) : t.contact.form.not_provided,
      message: data.message,
      // Formatted message for email body
      formatted_message: `
🔔 Nieuw Contactformulier Bericht

👤 Naam: ${data.name}
📧 Email: ${data.email}
🏢 Bedrijf: ${data.company || 'Niet opgegeven'}
🎯 Project Type: ${data.projectType ? (projectTypeLabels[data.projectType] || data.projectType) : 'Niet opgegeven'}
💰 Budget: ${data.budget ? (budgetLabels[data.budget] || data.budget) : 'Niet opgegeven'}
⏰ Timeline: ${data.timeline ? (timelineLabels[data.timeline] || data.timeline) : 'Niet opgegeven'}

💬 Bericht:
${data.message}
      `.trim(),
    };

    try {
      // Initialize EmailJS with public key
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      return { success: true };
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(t.contact.form.error_send.replace('{error}', err.message));
      }
      throw new Error(t.contact.form.error_unknown);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await sendEmail(formState);
      trackFormSubmit('contact', true);
      setSubmitted(true);
      // Reset form
      setFormState({
        name: '',
        email: '',
        message: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: ''
      });
    } catch (err) {
      trackFormSubmit('contact', false);
      setError(err instanceof Error ? err.message : t.contact.form.error_generic);
      console.error('Error sending email:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-darkBg flex items-center justify-center px-4">
        <div className="bg-white dark:bg-darkCard p-12 rounded-2xl shadow-xl text-center max-w-lg w-full border border-slate-100 dark:border-white/10">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
          </div>
          <h2 className="font-display font-bold text-3xl text-navy dark:text-white mb-4">{t.contact.success.title}</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            {t.contact.success.message.replace('{name}', formState.name)}
          </p>
          <Button onClick={() => setSubmitted(false)} to="/">{t.contact.success.button}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg grid lg:grid-cols-2">
      <SEOHead 
        title="Contact | Webdesigner Brugge - Plan Gratis Gesprek - SKYE"
        description="Neem contact op voor een gratis consultatie. Plan een gesprek over jouw website project. Direct contact via WhatsApp of email. Webdesigner in Brugge."
        keywords="contact webdesigner Brugge, website consultatie Brugge, webdesigner contact België, gratis website advies"
        canonical="https://skye.be/#/contact"
      />
      <StructuredData type="LocalBusiness" />
      {/* Left Side: Info */}
      <div className="bg-navy dark:bg-black text-white p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
         {/* Deco */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

        <h1 className="font-display font-bold text-4xl md:text-5xl mb-6 relative z-10">{t.contact.title}</h1>
        <p className="text-xl text-slate-300 mb-8 max-w-md relative z-10">
          {t.contact.subtitle}
        </p>
        
        {/* Response Time Indicator */}
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg relative z-10">
          <div className="flex items-center gap-2">
            <Clock className="text-green-400" size={18} />
            <p className="text-sm text-green-300">
              <span className="font-bold">{t.contact.response_time.label}</span> | {t.contact.response_time.note}
            </p>
          </div>
        </div>
        
        <div className="mb-12 p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur relative z-10">
          <div className="flex items-start gap-3">
            <Info className="text-primary mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-bold text-white mb-2">{t.contact.what_happens.title}</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                {t.contact.what_happens.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8 relative z-10">
          <div className="flex items-start">
            <Mail className="text-primary mt-1 mr-4" size={24} />
            <div>
              <h3 className="font-bold text-lg">{t.contact.email.label}</h3>
              <a href={`mailto:${t.contact.email.address}`} className="text-slate-400 hover:text-primary transition-colors">
                {t.contact.email.address}
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <MessageCircle className="text-primary mt-1 mr-4" size={24} />
            <div>
              <h3 className="font-bold text-lg">{t.contact.whatsapp.label}</h3>
              <a 
                href="https://wa.me/31645998932" 
                onClick={() => trackWhatsAppClick('contact-page')}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-primary transition-colors inline-flex items-center gap-2 group"
              >
                {t.contact.whatsapp.number}
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full group-hover:bg-primary/30 transition-colors">
                  {t.contact.whatsapp.chat_label}
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur relative z-10">
          <p className="italic text-slate-300">"{t.contact.quote}"</p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="p-8 lg:p-24 flex flex-col justify-center bg-slate-50 dark:bg-darkBg transition-colors">
        <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto space-y-6">
          {/* Required Fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy dark:text-white mb-2">
              {t.contact.form.name.label} <span className="text-red-500">{t.common.required}</span>
            </label>
            <input
              ref={nameInputRef}
              type="text"
              id="name"
              name="name"
              required
              value={formState.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-darkCard border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
              placeholder={t.contact.form.name.placeholder}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy dark:text-white mb-2">
              {t.contact.form.email.label} <span className="text-red-500">{t.common.required}</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formState.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-darkCard border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
              placeholder={t.contact.form.email.placeholder}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-navy dark:text-white mb-2">
              {t.contact.form.message.label} <span className="text-red-500">{t.common.required}</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formState.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-darkCard border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
              placeholder={t.contact.form.message.placeholder}
            ></textarea>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {t.contact.form.message.hint}
            </p>
          </div>

          {/* Expandable More Details Section */}
          <div className="border-t border-slate-200 dark:border-white/10 pt-6">
            <button
              type="button"
              onClick={() => setShowMoreDetails(!showMoreDetails)}
              className="flex items-center justify-between w-full text-left text-sm font-medium text-navy dark:text-white hover:text-primary transition-colors"
            >
              <span>{t.contact.form.more_details}</span>
              {showMoreDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {showMoreDetails && (
              <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-navy dark:text-white mb-2">
                    {t.contact.form.company.label}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-darkCard border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                    placeholder={t.contact.form.company.placeholder}
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-navy dark:text-white mb-2">
                    {t.contact.form.project_type.label}
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formState.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-darkCard border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                  >
                    {Object.entries(t.contact.form.project_type.options).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-navy dark:text-white mb-2">
                      {t.contact.form.budget.label}
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-darkCard border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                    >
                      {Object.entries(t.contact.form.budget.options).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-navy dark:text-white mb-2">
                      {t.contact.form.timeline.label}
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formState.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-darkCard border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                    >
                      {Object.entries(t.contact.form.timeline.options).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start">
              <AlertCircle className="text-red-600 dark:text-red-400 mr-3 mt-0.5" size={20} />
              <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full justify-center text-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 animate-spin" size={18} />
                {t.contact.form.submitting}
              </>
            ) : (
              <>
                {t.contact.form.submit} <Send size={18} className="ml-2" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
