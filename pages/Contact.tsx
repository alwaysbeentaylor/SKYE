
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, CheckCircle, Loader2, AlertCircle, MessageCircle, Info, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Button from '../components/Button';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { trackFormStart, trackFormSubmit, trackFormAbandonment } from '../utils/analytics';

const Contact: React.FC = () => {
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
      throw new Error('Email service is niet geconfigureerd. Neem contact op met de beheerder.');
    }

    // Format project type labels
    const projectTypeLabels: Record<string, string> = {
      'basis-website': 'Basis Website (€150/mnd)',
      'maatwerk': 'Maatwerk Project',
      'webshop': 'Webshop / E-commerce',
      'web-app': 'Web Applicatie / SaaS',
      'redesign': 'Redesign Bestaande Site',
      'anders': 'Anders / Vraag',
    };

    const budgetLabels: Record<string, string> = {
      '150-500': '€150 - €500/maand',
      '500-1000': '€500 - €1.000/maand',
      '1000-5000': '€1.000 - €5.000 eenmalig',
      '5000+': '€5.000+ eenmalig',
      'bespreken': 'Laten we bespreken',
    };

    const timelineLabels: Record<string, string> = {
      'direct': 'Zo snel mogelijk',
      '2-weken': 'Binnen 2 weken',
      '1-maand': 'Binnen 1 maand',
      '2-3-maanden': 'Binnen 2-3 maanden',
      'later': 'Later dit jaar',
      'verkennen': 'Nog aan het verkennen',
    };

    // Prepare template parameters
    const templateParams = {
      to_email: 'table.23@icloud.com',
      from_name: data.name,
      from_email: data.email,
      reply_to: data.email,
      company: data.company || 'Niet opgegeven',
      project_type: data.projectType ? (projectTypeLabels[data.projectType] || data.projectType) : 'Niet opgegeven',
      budget: data.budget ? (budgetLabels[data.budget] || data.budget) : 'Niet opgegeven',
      timeline: data.timeline ? (timelineLabels[data.timeline] || data.timeline) : 'Niet opgegeven',
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
        throw new Error(`Kon email niet verzenden: ${err.message}`);
      }
      throw new Error('Onbekende fout bij het verzenden van de email');
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
      setError(err instanceof Error ? err.message : 'Er is een fout opgetreden. Probeer het later opnieuw.');
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
          <h2 className="font-display font-bold text-3xl text-navy dark:text-white mb-4">Bericht Ontvangen</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Bedankt {formState.name}. Ik heb je bericht binnen. <br/>
            Ik kom er zo snel mogelijk bij je op terug.
          </p>
          <Button onClick={() => setSubmitted(false)} to="/">Terug naar Home</Button>
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

        <h1 className="font-display font-bold text-4xl md:text-5xl mb-6 relative z-10">Laten we even praten.</h1>
        <p className="text-xl text-slate-300 mb-8 max-w-md relative z-10">
          Geen zware sales-calls. Vertel gewoon kort wat je doet en wat je zoekt, dan denk ik met je mee.
        </p>
        
        {/* Response Time Indicator */}
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg relative z-10">
          <div className="flex items-center gap-2">
            <Clock className="text-green-400" size={18} />
            <p className="text-sm text-green-300">
              <span className="font-bold">Gemiddelde reactietijd: 2 uur</span> | Gratis consultatie binnen 24 uur
            </p>
          </div>
        </div>
        
        <div className="mb-12 p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur relative z-10">
          <div className="flex items-start gap-3">
            <Info className="text-primary mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-bold text-white mb-2">Wat gebeurt er na verzending?</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>✓ Ik ontvang je bericht direct</li>
                <li>✓ Binnen 24 uur krijg je een reactie</li>
                <li>✓ We plannen een gratis consultatie (15-30 min)</li>
                <li>✓ Geen verplichtingen, gewoon praten</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8 relative z-10">
          <div className="flex items-start">
            <Mail className="text-primary mt-1 mr-4" size={24} />
            <div>
              <h3 className="font-bold text-lg">Email</h3>
              <a href="mailto:info@hope-connects.nl" className="text-slate-400 hover:text-primary transition-colors">
                info@hope-connects.nl
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <MessageCircle className="text-primary mt-1 mr-4" size={24} />
            <div>
              <h3 className="font-bold text-lg">WhatsApp</h3>
              <a 
                href="https://wa.me/31645998932" 
                onClick={() => trackWhatsAppClick('contact-page')}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-primary transition-colors inline-flex items-center gap-2 group"
              >
                +31 6 45 99 89 32
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full group-hover:bg-primary/30 transition-colors">
                  Direct chatten
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur relative z-10">
          <p className="italic text-slate-300">"De beste investering is een systeem dat voor jou werkt, niet andersom."</p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="p-8 lg:p-24 flex flex-col justify-center bg-slate-50 dark:bg-darkBg transition-colors">
        <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto space-y-6">
          {/* Required Fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy dark:text-white mb-2">
              Naam <span className="text-red-500">*</span>
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
              placeholder="Je naam"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy dark:text-white mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formState.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-darkCard border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
              placeholder="je@email.nl"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-navy dark:text-white mb-2">
              Waar kan ik je mee helpen? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formState.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-darkCard border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
              placeholder="Vertel me over je project, je doelen, of waar je tegenaan loopt..."
            ></textarea>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Hoe meer details je geeft, hoe beter ik je kan helpen.
            </p>
          </div>

          {/* Expandable More Details Section */}
          <div className="border-t border-slate-200 dark:border-white/10 pt-6">
            <button
              type="button"
              onClick={() => setShowMoreDetails(!showMoreDetails)}
              className="flex items-center justify-between w-full text-left text-sm font-medium text-navy dark:text-white hover:text-primary transition-colors"
            >
              <span>Meer details (optioneel)</span>
              {showMoreDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {showMoreDetails && (
              <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-navy dark:text-white mb-2">
                    Bedrijf
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-darkCard border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                    placeholder="Je bedrijfsnaam"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-navy dark:text-white mb-2">
                    Type Project
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formState.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-darkCard border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                  >
                    <option value="">Selecteer type project</option>
                    <option value="basis-website">Basis Website (€150/mnd)</option>
                    <option value="maatwerk">Maatwerk Project</option>
                    <option value="webshop">Webshop / E-commerce</option>
                    <option value="web-app">Web Applicatie / SaaS</option>
                    <option value="redesign">Redesign Bestaande Site</option>
                    <option value="anders">Anders / Vraag</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-navy dark:text-white mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-darkCard border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                    >
                      <option value="">Selecteer budget</option>
                      <option value="150-500">€150 - €500/maand</option>
                      <option value="500-1000">€500 - €1.000/maand</option>
                      <option value="1000-5000">€1.000 - €5.000 eenmalig</option>
                      <option value="5000+">€5.000+ eenmalig</option>
                      <option value="bespreken">Laten we bespreken</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-navy dark:text-white mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formState.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-darkCard border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                    >
                      <option value="">Selecteer timeline</option>
                      <option value="direct">Zo snel mogelijk</option>
                      <option value="2-weken">Binnen 2 weken</option>
                      <option value="1-maand">Binnen 1 maand</option>
                      <option value="2-3-maanden">Binnen 2-3 maanden</option>
                      <option value="later">Later dit jaar</option>
                      <option value="verkennen">Nog aan het verkennen</option>
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
                Verzenden...
              </>
            ) : (
              <>
                Verstuur Bericht <Send size={18} className="ml-2" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
