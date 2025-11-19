
import React from 'react';
import { LayoutTemplate, Server, Database, Workflow, BarChart2, Code } from 'lucide-react';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';

const Services: React.FC = () => {
  const { t } = useApp();

  const servicesData = [
    {
      title: 'Websites & Landingspagina\'s',
      price_ref: 'Basis (€150)',
      icon: <LayoutTemplate size={32} />,
      desc: 'Een strakke, snelle website die perfect werkt op mobiel. Geen Wordpress-chaos, maar moderne, stabiele code.',
      benefit: 'Jouw visitekaartje staat als een huis. Altijd.'
    },
    {
      title: 'Hosting & Security',
      price_ref: 'Inbegrepen',
      icon: <Server size={32} />,
      desc: 'Snelle servers, SSL-certificaten en beveiligingsupdates. Ik regel de techniek op de achtergrond.',
      benefit: 'Geen zorgen over hacks of trage laadtijden.'
    },
    {
      title: 'Integraties & Koppelingen',
      price_ref: 'Groei (€500)',
      icon: <Database size={32} />,
      desc: 'Koppel je site aan je CRM, je e-mailmarketing (Mailchimp e.d.) of simpele betaalsystemen.',
      benefit: 'Je site werkt samen met je bedrijfsprocessen.'
    },
    {
      title: 'Automatisering',
      price_ref: 'Groei (€500)',
      icon: <Workflow size={32} />,
      desc: 'Formulieren die automatisch naar de juiste persoon gaan, of simpele funnels die leads opvolgen.',
      benefit: 'Minder handwerk, minder fouten.'
    },
    {
      title: 'Simpel Beheer',
      price_ref: 'Inbegrepen',
      icon: <Code size={32} />,
      desc: 'Je krijgt een simpel paneel om teksten of foto\'s aan te passen. Voor het zware werk bel je mij.',
      benefit: 'Jij de inhoud, ik de techniek.'
    },
    {
      title: 'Analytics & Inzichten',
      price_ref: 'Basis & Groei',
      icon: <BarChart2 size={32} />,
      desc: 'Privacy-vriendelijke statistieken. Zie hoeveel mensen kijken, zonder Google\'s ingewikkelde dashboards.',
      benefit: 'Weten wat er gebeurt, zonder gedoe.'
    }
  ];
  
  return (
    <div className="bg-slate-50 dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-navy dark:bg-black z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-display font-black text-5xl md:text-6xl mb-6 text-white tracking-tight">
            {t.services.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t.services.subtitle} <br/>
            Alles wat je nodig hebt in één overzichtelijk model.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div key={index} className="glass-panel bg-white dark:bg-darkCard/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl hover:border-primary/50 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-primary group-hover:scale-110 transition-transform">
                   {service.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 px-2 py-1 rounded">
                  {service.price_ref}
                </span>
              </div>
              
              <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-3">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed min-h-[60px]">
                {service.desc}
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                <p className="text-navy dark:text-white font-semibold italic text-xs">
                   <span className="text-primary font-bold mr-1">Winst:</span> {service.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 mt-24 text-center">
        <div className="bg-gradient-to-br from-white to-slate-100 dark:from-darkCard dark:to-slate-900 p-10 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10">
          <h2 className="font-display font-bold text-3xl text-navy dark:text-white mb-4">Geen technische kopzorgen meer?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">Kies het pakket dat bij je past en laat mij het regelen.</p>
          <div className="flex justify-center gap-4">
            <Button to="/pricing" variant="primary">Bekijk Prijzen</Button>
            <Button to="/contact" variant="outline">Stuur een bericht</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
