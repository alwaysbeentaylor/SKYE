import React from 'react';
import { Search, PenTool, Hammer, Rocket } from 'lucide-react';
import Button from '../components/Button';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { useApp } from '../context/AppContext';

const Approach: React.FC = () => {
  const { t } = useApp();
  const icons = [
    <Search size={28} />,
    <PenTool size={28} />,
    <Hammer size={28} />,
    <Rocket size={28} />
  ];
  const animations = [
    "group-hover:scale-110 transition-transform duration-300",
    "group-hover:-rotate-12 transition-transform duration-300",
    "group-hover:rotate-12 transition-transform duration-300",
    "group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300"
  ];
  
  const steps = t.approach.steps.map((step, index) => ({
    id: index + 1,
    ...step,
    icon: icons[index],
    animation: animations[index]
  }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg transition-colors duration-300">
      <SEOHead 
        title="Onze Aanpak | Webdesign Proces Brugge - SKYE"
        description="Hoe wij te werk gaan: van strategie tot lancering. Transparant webdesign proces voor ondernemers in Brugge. Predictable, transparent, efficient."
        keywords="webdesign proces, website ontwikkelproces, website aanpak, webdesign methodiek Brugge"
        canonical="https://skye.be/#/approach"
      />
      <StructuredData 
        type="Service" 
        data={{
          serviceType: "Web Design Process",
          description: "Transparant en gestructureerd webdesign proces: van strategie tot lancering voor ondernemers in Brugge."
        }}
      />
       <section className="bg-navy dark:bg-black py-24 text-white text-center relative overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/20 blur-[100px] rounded-full opacity-50 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="font-display font-black text-5xl md:text-6xl mb-6 tracking-tight">{t.approach.title}</h1>
          <p className="text-xl text-slate-300">
            {t.approach.subtitle_line1} <br/>
            {t.approach.subtitle_line2}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative">
          {/* Vertical Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-primary opacity-30"></div>

          {steps.map((step, index) => (
            <div key={step.id} className={`flex flex-col md:flex-row items-center mb-20 relative ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} group`}>
              
              {/* Content Card */}
              <div className="w-full md:w-5/12 bg-white dark:bg-darkCard p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 z-10 relative transition-transform duration-500 hover:scale-105 hover:border-primary/50">
                <div className="absolute top-0 right-0 bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase">
                  {step.week}
                </div>
                <h3 className="font-display font-bold text-2xl text-navy dark:text-white mb-2">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">{step.desc}</p>
                
                <div className="mb-6">
                   <h4 className="font-semibold text-xs text-primary uppercase mb-2 tracking-wider">{t.approach.labels.key_actions}</h4>
                   <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                     {step.actions.map((act, i) => <li key={i}>• {act}</li>)}
                   </ul>
                </div>

                <div className="bg-blue-50 dark:bg-primary/10 p-3 rounded border border-blue-100 dark:border-primary/20 text-xs font-medium text-blue-800 dark:text-primary flex items-center">
                   <span className="font-bold mr-1">{t.approach.labels.deliverable}</span> {step.output}
                </div>
              </div>

              {/* Icon Circle Center */}
              <div className="w-full md:w-2/12 flex justify-center my-6 md:my-0 z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.5)] border-4 border-white dark:border-darkBg relative">
                  <div className={step.animation}>
                    {step.icon}
                  </div>
                </div>
              </div>

              {/* Empty Space for alternate side */}
              <div className="w-full md:w-5/12"></div>
            </div>
          ))}
        </div>

        {/* Summary Box */}
        <div className="mt-20 bg-gradient-to-r from-navy to-black dark:from-navy dark:to-black rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="relative z-10">
            <h3 className="font-display font-bold text-3xl mb-4">{t.approach.summary.title}</h3>
            <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-lg">
              {t.approach.summary.text}
            </p>
            <Button to="/contact" variant="accent" className="text-lg px-8 py-3">{t.approach.summary.cta}</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Approach;
