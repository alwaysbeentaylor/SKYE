
import React from 'react';
import { Check, Info, MessageCircle, Clock, Shield, Zap } from 'lucide-react';
import Button from '../components/Button';
import Testimonials from '../components/Testimonials';
import TrustBadges from '../components/TrustBadges';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';

const Pricing: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah van der Berg',
      company: 'LuxeEstate',
      role: 'Eigenaar',
      text: 'Binnen 2 weken stond ik online met een professionele site. Geen gedoe, gewoon werken. Hope regelt alles.',
      rating: 5
    },
    {
      name: 'Carlos Mendoza',
      company: 'El Churasco',
      role: 'Eigenaar',
      text: 'Onze online bestellingen zijn verdubbeld sinds de nieuwe website. Het huurmodel past perfect bij ons restaurant.',
      rating: 5
    },
    {
      name: 'Thomas van der Berg',
      company: 'Vitafer Gold',
      role: 'Eigenaar',
      text: 'Professionele uitstraling zonder grote investering. Het huurmodel is perfect voor ons supplementenbedrijf.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg pb-20 transition-colors duration-300">
      <SEOHead 
        title="Website Prijzen Brugge | €150/maand of Afkoop - SKYE"
        description="Transparante website prijzen voor Brugge. Basis pakket vanaf €150/maand of €1.500 eenmalig. Geen verborgen kosten. Bekijk alle pakketten en prijzen."
        keywords="website prijzen Brugge, website kosten Brugge, webdesign prijzen, website vanaf 150 euro, website huren of kopen"
        canonical="https://skye.be/#/pricing"
      />
      <StructuredData 
        type="Service" 
        data={{
          serviceType: "Website Development Service",
          description: "Website pakketten vanaf €150 per maand. Flexibel huren of eenmalig afkopen. Transparante prijzen voor ondernemers in Brugge.",
          offers: {
            '@type': 'Offer',
            price: '150',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock'
          }
        }}
      />
       <section className="bg-navy dark:bg-black py-24 text-white text-center relative overflow-hidden">
         {/* Glow effect */}
         <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]"></div>
         
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
            <Clock size={16} className="text-primary" />
            <span className="text-sm font-bold text-primary">Start binnen 2 weken online</span>
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">Kies jouw model</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            De kern is <span className="text-primary font-bold">huren</span>: flexibiliteit en geen grote investering vooraf. 
            Liever eigendom? Afkopen kan altijd.
          </p>
        </div>
      </section>

      {/* Trust Badges Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <TrustBadges variant="banner" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
          
          {/* BASIS - 150 */}
          <div className="glass-panel bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border-2 border-primary/20 dark:border-white/10 flex flex-col hover:border-primary/50 hover:shadow-2xl transition-all duration-300 relative pt-12">
            {/* Popular Badge */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg z-20">
              Meest Gekozen
            </div>
            
            <div className="mb-8 text-center">
               <h3 className="text-2xl font-bold text-navy dark:text-white">Basis</h3>
               <p className="text-slate-500 text-sm mt-2">Voor de slimme starter</p>
               <div className="mt-6 flex items-baseline justify-center text-navy dark:text-white">
                 <span className="text-5xl font-black tracking-tight text-primary">€150</span>
                 <span className="ml-1 text-xl font-semibold text-slate-500">/mnd</span>
               </div>
               <p className="mt-2 text-xs text-slate-400">Excl. BTW</p>
               <div className="mt-4 flex items-center justify-center gap-2 text-xs text-green-600 dark:text-green-400">
                 <Shield size={14} />
                 <span className="font-semibold">30-dagen tevredenheidsgarantie</span>
               </div>
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
            
            <Button to="/contact" variant="primary" className="w-full justify-center mb-4 text-lg py-4 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40">
              Start Nu - Kies Basis <Zap size={18} className="ml-2" />
            </Button>
            <p className="text-center text-xs text-slate-500 mb-6">
              ✓ Gratis consultatie inbegrepen
            </p>

            <div className="pt-6 border-t border-slate-100 dark:border-white/10 text-center">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Of koop direct af</p>
              <p className="text-navy dark:text-white font-bold">€1.500 eenmalig</p>
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
              <Button to="/contact" variant="accent" className="w-full justify-center text-lg py-4 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40">
                Plan Gratis Gesprek <MessageCircle size={18} className="ml-2" />
              </Button>
              <a 
                href="https://wa.me/31645998932?text=Hoi%20Hope!%20Ik%20wil%20graag%20praten%20over%20een%20maatwerk%20project." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
              >
                <MessageCircle size={18} />
                Direct WhatsApp
              </a>
              <p className="text-center text-xs text-slate-500">
                ✓ Geen verplichtingen, gewoon praten
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-white/10 text-center">
              <p className="text-xs text-slate-500">
                Voor ondernemers die een uniek digitaal product willen lanceren.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-navy dark:text-white mb-4">
            Wat klanten zeggen
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Echte ondernemers, echte resultaten
          </p>
        </div>
        <Testimonials testimonials={testimonials} variant="grid" />
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

      {/* Final CTA Section */}
      <section className="max-w-4xl mx-auto px-4 mt-20 mb-12">
        <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-2 border-primary/20 rounded-2xl p-10 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-navy dark:text-white mb-4">
            Klaar om te starten?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
            Kies je pakket, we bespreken je wensen, en binnen 2 weken sta jij online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contact" variant="primary" className="px-8 py-4 text-lg shadow-lg shadow-primary/30">
              Start Nu Gratis Consultatie
            </Button>
            <a 
              href="https://wa.me/31645998932?text=Hoi%20Hope!%20Ik%20wil%20graag%20praten%20over%20een%20website." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            >
              <MessageCircle size={20} />
              Direct WhatsApp
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            ✓ Geen verborgen kosten  ✓ Geen verplichtingen  ✓ Gratis consultatie
          </p>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
