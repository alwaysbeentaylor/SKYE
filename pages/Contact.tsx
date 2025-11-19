
import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import Button from '../components/Button';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => setSubmitted(false), 5000);
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

          <Button type="submit" variant="primary" className="w-full justify-center text-lg">
            Verstuur Bericht <Send size={18} className="ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
