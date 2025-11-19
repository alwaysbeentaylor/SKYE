
import React from 'react';
import { Check, Info, MessageCircle } from 'lucide-react';
import Button from '../components/Button';

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg pb-20 transition-colors duration-300">
       <section className="bg-navy dark:bg-black py-24 text-white text-center relative overflow-hidden">
         {/* Glow effect */}
         <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]"></div>
         
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">Kies jouw model</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            De kern is <span className="text-primary font-bold">huren</span>: flexibiliteit en geen grote investering vooraf. 
            Liever eigendom? Afkopen kan altijd.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* BASIS - 150 */}
          <div className="glass-panel bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-white/10 flex flex-col hover:border-primary/30 transition-all duration-300">
            <div className="mb-8 text-center">
               <h3 className="text-2xl font-bold text-navy dark:text-white">Basis</h3>
               <p className="text-slate-500 text-sm mt-2">Voor de slimme starter</p>
               <div className="mt-6 flex items-baseline justify-center text-navy dark:text-white">
                 <span className="text-5xl font-black tracking-tight text-primary">€150</span>
                 <span className="ml-1 text-xl font-semibold text-slate-500">/mnd</span>
               </div>
               <p className="mt-2 text-xs text-slate-400">Excl. BTW</p>
            </div>
            
            <div className="flex-1 mb-8">
              <ul className="space-y-4">
                {[
                  'Professionele website (Homepage + secties)',
                  'Simpel Admin Paneel',
                  'Hosting & SSL Security inbegrepen',
                  'Maandelijkse technische updates',
                  'Kleine content aanpassingen incl.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-slate-600 dark:text-slate-300 text-sm">
                    <Check size={18} className="text-primary mr-3 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <Button to="/contact" variant="outline" className="w-full justify-center mb-6">Kies Basis</Button>

            <div className="pt-6 border-t border-slate-100 dark:border-white/10 text-center">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Of koop direct af</p>
              <p className="text-navy dark:text-white font-bold">Vanaf €1.500 eenmalig</p>
              <p className="text-[10px] text-slate-500 mt-1">Optioneel onderhoud: €49/mnd</p>
            </div>
          </div>

          {/* GROEI - 500 */}
          <div className="glass-panel-strong bg-slate-900 rounded-2xl shadow-2xl p-8 border-2 border-primary relative transform md:-translate-y-8 flex flex-col">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase shadow-lg tracking-wider">
              Meest Gekozen
            </div>
            <div className="mb-8 text-center">
               <h3 className="text-2xl font-bold text-white">Groei</h3>
               <p className="text-blue-200 text-sm mt-2">Meer power & integraties</p>
               <div className="mt-6 flex items-baseline justify-center text-white">
                 <span className="text-5xl font-black tracking-tight text-white">€500</span>
                 <span className="ml-1 text-xl font-semibold text-slate-400">/mnd</span>
               </div>
               <p className="mt-2 text-xs text-slate-500">Excl. BTW</p>
            </div>
            
            <div className="flex-1 mb-8">
              <ul className="space-y-4">
                {[
                  'Alles in Basis pakket',
                  'Meerdere pagina\'s & flows',
                  'Integraties (Shopify, CRM, Tools)',
                  'Extra formulieren & automation',
                  'Prioriteit support',
                  'Maandelijks strategie overleg'
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-slate-200 text-sm">
                    <Check size={18} className="text-primary mr-3 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <Button to="/contact" variant="primary" className="w-full justify-center mb-6 shadow-[0_0_20px_rgba(14,165,233,0.4)]">Kies Groei</Button>

            <div className="pt-6 border-t border-white/10 text-center">
              <p className="text-xs font-bold text-slate-500 uppercase mb-2">Of koop direct af</p>
              <p className="text-white font-bold">Vanaf €2.500 eenmalig</p>
              <p className="text-[10px] text-slate-500 mt-1">Optioneel onderhoud: €49/mnd</p>
            </div>
          </div>

          {/* MAATWERK */}
          <div className="glass-panel bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-white/10 flex flex-col hover:border-accent/50 transition-all duration-300">
            <div className="mb-8 text-center">
               <h3 className="text-2xl font-bold text-navy dark:text-white">Maatwerk</h3>
               <p className="text-slate-500 text-sm mt-2">Platformen & Complexiteit</p>
               <div className="mt-6 flex items-baseline justify-center text-navy dark:text-white">
                 <span className="text-4xl font-black tracking-tight text-accent">Custom</span>
               </div>
               <p className="mt-2 text-xs text-slate-400">Op offertebasis</p>
            </div>
            
            <div className="flex-1 mb-8">
              <ul className="space-y-4">
                {[
                  'Custom Web Applicaties',
                  'SaaS MVP ontwikkeling',
                  'Complexe database structuren',
                  'Specifieke API koppelingen',
                  'Volledig uniek design',
                  'Schaalbare architectuur'
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-slate-600 dark:text-slate-300 text-sm">
                    <Check size={18} className="text-accent mr-3 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-3 mb-6">
              <Button to="/contact" variant="accent" className="w-full justify-center">Plan Gesprek</Button>
              <a 
                href="https://wa.me/31645998932" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-white/10 text-center">
              <p className="text-xs text-slate-500">
                Voor ondernemers die een uniek digitaal product willen lanceren.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Comparison / Info */}
      <section className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-blue-50 dark:bg-primary/5 border border-blue-100 dark:border-primary/20 rounded-xl p-8">
           <div className="flex items-start mb-4">
              <Info className="text-primary mr-4 mt-1" />
              <h3 className="text-xl font-bold text-navy dark:text-white">Waarom huren meestal slimmer is</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
             <p>
               <strong className="text-navy dark:text-white block mb-1">Geen grote investering</strong>
               In plaats van duizenden euro's in één keer, spreid je de kosten. Zo houd je geld over voor marketing of andere zaken.
             </p>
             <p>
               <strong className="text-navy dark:text-white block mb-1">Altijd Up-to-Date</strong>
               Techniek veroudert snel. In het huurmodel zorg ik dat je site technisch bijblijft, zonder dat jij extra facturen krijgt voor 'groot onderhoud'.
             </p>
             <p>
               <strong className="text-navy dark:text-white block mb-1">Flexibiliteit</strong>
               Start klein met Basis. Groeit je bedrijf? Dan schaal je moeiteloos op naar Groei. Wil je er toch vanaf? Het is maandelijks opzegbaar (na 6 maanden).
             </p>
             <p>
               <strong className="text-navy dark:text-white block mb-1">Afkopen kan altijd</strong>
               Ben je zo tevreden dat je de site wilt hebben? Dan kun je op elk moment besluiten om de site alsnog af te kopen.
             </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
