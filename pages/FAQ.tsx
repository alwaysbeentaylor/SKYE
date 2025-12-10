
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-react';
import Button from '../components/Button';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { useApp } from '../context/AppContext';

const FAQ: React.FC = () => {
  const { t } = useApp();
  const faqData = t.faq.items;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg pb-20 transition-colors duration-300">
      <SEOHead
        title="Veelgestelde Vragen | Design & Automation - SKYE"
        description="Antwoorden op veelgestelde vragen over website huren, afkopen, contracten en Design & Automation services."
        keywords="design automation veelgestelde vragen, website huren vragen, website afkopen, developer FAQ"
        canonical="https://skye.be/#/faq"
      />
      <section className="bg-navy dark:bg-black py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-4">
            <HelpCircle size={48} className="text-primary" />
          </div>
          <h1 className="font-display font-bold text-4xl mb-6">{t.faq.title}</h1>
          <p className="text-xl text-slate-300">
            {t.faq.subtitle}
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="glass-panel bg-white dark:bg-darkCard rounded-lg shadow-sm border border-slate-100 dark:border-white/10 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-primary' : 'text-navy dark:text-white'}`}>
                  {item.question}
                </span>
                {openIndex === index ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-slate-400" />}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="h-px bg-slate-100 dark:bg-white/10 mb-4"></div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">{t.faq.no_answer}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/contact" variant="secondary">{t.faq.cta_contact}</Button>
            <a
              href="https://wa.me/31645998932"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            >
              <MessageCircle size={18} />
              {t.faq.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
