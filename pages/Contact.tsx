
import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import Button from '../components/Button';

const TELEGRAM_BOT_TOKEN = '8547433349:AAFniIQU7rO9-nzHkgJK6F7Hv3MzLzv1Ymk';
const TELEGRAM_USER_ID = '1471110442';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const sendToTelegram = async (data: typeof formState) => {
    const message = `🔔 Nieuw contactformulier bericht\n\n` +
      `👤 Naam: ${data.name}\n` +
      `📧 Email: ${data.email}\n` +
      `${data.company ? `🏢 Bedrijf: ${data.company}\n` : ''}` +
      `\n💬 Bericht:\n${data.message}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_USER_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description || 'Failed to send message');
    }

    return await response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await sendToTelegram(formState);
      setSubmitted(true);
      // Reset form
      setFormState({
        name: '',
        email: '',
        company: '',
        message: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is een fout opgetreden. Probeer het later opnieuw.');
      console.error('Error sending to Telegram:', err);
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
      {/* Left Side: Info */}
      <div className="bg-navy dark:bg-black text-white p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
         {/* Deco */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

        <h1 className="font-display font-bold text-4xl md:text-5xl mb-6 relative z-10">Laten we even praten.</h1>
        <p className="text-xl text-slate-300 mb-12 max-w-md relative z-10">
          Geen zware sales-calls. Vertel gewoon kort wat je doet en wat je zoekt, dan denk ik met je mee.
        </p>

        <div className="space-y-8 relative z-10">
          <div className="flex items-start">
            <Mail className="text-primary mt-1 mr-4" size={24} />
            <div>
              <h3 className="font-bold text-lg">Email</h3>
              <p className="text-slate-400">hope@skyeisthelimit.com</p>
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
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy dark:text-white mb-2">Naam</label>
            <input
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
            <label htmlFor="email" className="block text-sm font-medium text-navy dark:text-white mb-2">Email</label>
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
             <label htmlFor="company" className="block text-sm font-medium text-navy dark:text-white mb-2">Bedrijf (Optioneel)</label>
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
            <label htmlFor="message" className="block text-sm font-medium text-navy dark:text-white mb-2">Waar kan ik je mee helpen?</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formState.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-darkCard border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
              placeholder="Ik zoek een website / ik wil doorgroeien / ik heb een vraag over..."
            ></textarea>
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
