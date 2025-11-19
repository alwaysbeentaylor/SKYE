
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Button from '../components/Button';

const faqData = [
  {
    question: "Waarom zou ik huren in plaats van kopen?",
    answer: "Huren verlaagt de drempel. Je hoeft geen duizenden euro's in één keer te investeren. Daarnaast zit bij de huurprijs het technische onderhoud, hosting en beveiliging inbegrepen. Je hebt er dus geen omkijken naar."
  },
  {
    question: "Ben ik eigenaar van de website?",
    answer: "Bij het huurmodel (€150/€500) blijft Skye eigenaar van de techniek en het ontwerp, jij bent natuurlijk eigenaar van je eigen content (tekst/foto's). Wil je volledig eigenaar worden van de code? Dan kun je gebruikmaken van de afkoopoptie."
  },
  {
    question: "Kan ik later alsnog afkopen?",
    answer: "Ja, absoluut. Als je na een tijdje besluit dat je de site in eigen beheer wilt nemen, betaal je het afkoopbedrag (vanaf €1.500 voor Basis) en is de site van jou. Je kunt dan zelf de hosting regelen of een los onderhoudspakket afnemen."
  },
  {
    question: "Zit ik vast aan een langdurig contract?",
    answer: "Nee. We gaan een samenwerking aan van minimaal 6 maanden om de opstartkosten te dekken. Daarna is het maandelijks opzegbaar. Geen wurgcontracten."
  },
  {
    question: "Wat is het verschil tussen Basis (€150) en Groei (€500)?",
    answer: "Basis is perfect voor een solide, professionele aanwezigheid (homepage, dienstenpagina, contact). Groei is voor als je meer functionaliteit nodig hebt: integraties met andere software, webshop-elementen, sales funnels of complexere formulieren."
  },
  {
    question: "Wat als ik wil doorgroeien naar een groter systeem?",
    answer: "Dat is het mooie van mijn werkwijze. Ik bouw met code (Next.js), niet met beperkte 'page builders'. We kunnen jouw basis-site later uitbouwen tot een volledige web-applicatie zonder dat we opnieuw moeten beginnen."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg pb-20 transition-colors duration-300">
      <section className="bg-navy dark:bg-black py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-4">
            <HelpCircle size={48} className="text-primary" />
          </div>
          <h1 className="font-display font-bold text-4xl mb-6">Veelgestelde Vragen</h1>
          <p className="text-xl text-slate-300">
            Duidelijkheid vooraf. Geen verrassingen.
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
          <p className="text-slate-600 dark:text-slate-400 mb-4">Staat je vraag er niet tussen?</p>
          <Button to="/contact" variant="secondary">Stuur Hope een bericht</Button>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
