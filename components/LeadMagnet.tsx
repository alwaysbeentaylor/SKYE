import React, { useState } from 'react';
import { Download, Mail, CheckCircle, Loader2 } from 'lucide-react';
import { trackLeadMagnetDownload, trackFormSubmit } from '../utils/analytics';
import emailjs from '@emailjs/browser';

interface LeadMagnetProps {
  title?: string;
  description?: string;
  pdfUrl?: string;
  className?: string;
}

const LeadMagnet: React.FC<LeadMagnetProps> = ({
  title = "Download Gratis: De Complete Gids",
  description = "Website Huren vs Kopen - Alles wat je moet weten",
  pdfUrl = "/leadmagnet.pdf",
  className = ""
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send email via EmailJS
      const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          to_email: 'table.23@icloud.com',
          from_email: email,
          reply_to: email,
          message: `Nieuwe leadmagnet download van: ${email}`,
        });
      }

      // Track conversion
      trackFormSubmit('leadmagnet', true);
      trackLeadMagnetDownload(title);

      // Store email for follow-up
      localStorage.setItem('leadmagnet-email', email);
      localStorage.setItem('leadmagnet-downloaded', Date.now().toString());

      setSubmitted(true);
      
      // Trigger download
      window.open(pdfUrl, '_blank');
    } catch (err) {
      setError('Er ging iets mis. Probeer het opnieuw.');
      trackFormSubmit('leadmagnet', false);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-6 ${className}`}>
        <div className="flex items-start gap-3">
          <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-green-800 dark:text-green-300 mb-1">
              Download gestart!
            </h3>
            <p className="text-sm text-green-700 dark:text-green-400">
              Check je email voor de link. We sturen je ook waardevolle tips toe.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-panel bg-white dark:bg-darkCard rounded-xl p-6 border-2 border-primary/20 ${className}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Download className="text-primary" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-lg text-navy dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="leadmagnet-email" className="sr-only">
            Email adres
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                id="leadmagnet-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="je@email.nl"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:text-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary hover:bg-primaryDark text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Verzenden...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Download
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Geen spam. Alleen waardevolle tips en updates. Je kunt je altijd uitschrijven.
        </p>
      </form>
    </div>
  );
};

export default LeadMagnet;

