
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, Zap, ShieldCheck, CreditCard, MousePointer, MessageCircle } from 'lucide-react';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';

const Home: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="flex flex-col relative">
      
      {/* THE DIGITAL THREAD */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-px h-full z-0 hidden md:block pointer-events-none">
         <div className="w-full h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
         <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-primary to-transparent animate-[float_3s_ease-in-out_infinite] opacity-75 blur-[2px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse shadow-[0_0_10px_#0ea5e9]"></span>
            Website-as-a-Service
          </div>

          <h1 className="font-display font-black text-6xl md:text-8xl tracking-tighter text-navy dark:text-white mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 drop-shadow-xl">
            SKYE IS <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">UNLIMITED</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 font-light max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Professionele websites en systemen <span className="text-primary font-semibold">vanaf €150 per maand</span>. <br/>
            Geen grote investering vooraf, wel direct professioneel online.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button to="/pricing" variant="primary" className="px-8 py-4 text-lg shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
              Ontdek het €150 Pakket <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button to="/contact" variant="secondary" className="px-8 py-4 text-lg dark:bg-white/5 dark:hover:bg-white/10 border border-white/10">
              Plan een gesprek
            </Button>
            <a 
              href="https://wa.me/31645998932" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section - Focused on Stability & Ease */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 relative">
             <div className="hidden md:block absolute -top-32 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary/50 rounded-full border border-primary"></div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-navy dark:text-white">Waarom huren slimmer is.</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
              Je wilt gewoon dat je online klopt en werkt. Zonder gedoe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="glass-panel p-8 rounded-2xl hover:border-accent/50 transition-all duration-500 group">
               <Clock size={40} className="text-accent mb-6 group-hover:scale-110 transition-transform" />
               <h3 className="font-display font-bold text-xl mb-3 text-white">Geen tijdverspilling</h3>
               <p className="text-slate-400 text-sm leading-relaxed">Jij focust op je bedrijf. Ik regel de updates, de beveiliging en de techniek. Het werkt gewoon.</p>
             </div>
             <div className="glass-panel p-8 rounded-2xl hover:border-primary/50 transition-all duration-500 group">
               <CreditCard size={40} className="text-primary mb-6 group-hover:scale-110 transition-transform" />
               <h3 className="font-display font-bold text-xl mb-3 text-white">Geen €5k vooraf</h3>
               <p className="text-slate-400 text-sm leading-relaxed">Hou je cashflow gezond. Voor een vast, laag maandbedrag sta je professioneel online.</p>
             </div>
             <div className="glass-panel p-8 rounded-2xl hover:border-green-500/50 transition-all duration-500 group">
               <ShieldCheck size={40} className="text-green-500 mb-6 group-hover:scale-110 transition-transform" />
               <h3 className="font-display font-bold text-xl mb-3 text-white">Altijd Up-to-Date</h3>
               <p className="text-slate-400 text-sm leading-relaxed">Het web verandert snel. Jouw huursite groeit mee met nieuwe techniek en security standaarden.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Pricing Teasers */}
      <section className="py-24 relative">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
         
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-4xl text-white mb-4">Kies jouw fundament</h2>
              <p className="text-slate-400">Flexibel opzegbaar, later afkopen altijd mogelijk.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Basic Teaser */}
               <div className="glass-panel-strong p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all flex flex-col text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Basis</h3>
                  <div className="text-4xl font-black text-primary mb-4">€150<span className="text-sm font-medium text-slate-400">/mnd</span></div>
                  <p className="text-slate-400 text-sm mb-6">Voor de serieuze starter. Een professionele site zonder hoofdpijn.</p>
                  <Button to="/pricing" variant="outline" className="mt-auto">Meer info</Button>
               </div>

               {/* Growth Teaser */}
               <div className="glass-panel-strong p-8 rounded-2xl border-2 border-primary/50 shadow-[0_0_30px_rgba(14,165,233,0.15)] transform md:-translate-y-4 flex flex-col text-center relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Meest Gekozen</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Groei</h3>
                  <div className="text-4xl font-black text-primary mb-4">€500<span className="text-sm font-medium text-slate-400">/mnd</span></div>
                  <p className="text-slate-400 text-sm mb-6">Meer power. Integraties, automations en extra pagina's.</p>
                  <Button to="/pricing" variant="primary" className="mt-auto">Meer info</Button>
               </div>

               {/* Custom Teaser */}
               <div className="glass-panel-strong p-8 rounded-2xl border border-white/10 hover:border-accent/50 transition-all flex flex-col text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Maatwerk</h3>
                  <div className="text-4xl font-black text-accent mb-4">Custom</div>
                  <p className="text-slate-400 text-sm mb-6">Complexe platformen of specifieke web-applicaties.</p>
                  <Button to="/contact" variant="outline" className="mt-auto border-accent text-accent hover:bg-accent/10">Plan gesprek</Button>
               </div>
            </div>
         </div>
      </section>

      {/* Hope Teaser */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <div className="glass-panel p-10 rounded-3xl border border-slate-700/50 bg-navy/40">
              <h2 className="font-display font-bold text-2xl text-white mb-4">Ik ben Hope.</h2>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                 Geen accountmanagers, geen lagen, geen vaagheid. 
                 Jij spreekt direct met degene die jouw site bouwt. 
                 Eerlijk advies, heldere prijzen.
              </p>
              <Button to="/about" variant="secondary" className="text-sm">Leer me kennen</Button>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="relative z-10 max-w-2xl mx-auto px-4">
            <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-6">Klaar om te starten?</h2>
            <p className="text-slate-400 mb-10 text-lg">Kies je pakket, we bespreken je wensen, en binnen no-time sta jij strak online.</p>
            <Button to="/pricing" variant="primary" className="px-10 py-4 text-xl">Bekijk Prijzen</Button>
         </div>
      </section>
    </div>
  );
};

export default Home;
