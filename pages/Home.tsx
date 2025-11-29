
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, Zap, ShieldCheck, CreditCard, MousePointer, MessageCircle } from 'lucide-react';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import Testimonials from '../components/Testimonials';
import TrustBadges from '../components/TrustBadges';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import LiveCounter from '../components/LiveCounter';
import LeadMagnet from '../components/LeadMagnet';
import { trackWhatsAppClick } from '../utils/analytics';

const Home: React.FC = () => {
  const { t } = useApp();

  const heroTestimonials = [
    {
      name: 'Sarah van der Berg',
      company: 'LuxeEstate',
      text: 'Binnen 2 weken stond ik online. Geen gedoe, gewoon werken.',
      rating: 5
    },
    {
      name: 'Carlos Mendoza',
      company: 'El Churasco',
      text: 'Onze online bestellingen zijn verdubbeld sinds de nieuwe website.',
      rating: 5
    },
    {
      name: 'Thomas van der Berg',
      company: 'Vitafer Gold',
      text: 'Professionele uitstraling zonder grote investering. Perfect voor ons supplementenbedrijf.',
      rating: 5
    }
  ];

  return (
    <div className="flex flex-col relative">
      <SEOHead 
        title="SKYE | Professioneel Webdesign voor Ondernemers - Websites vanaf €150/maand"
        description="Professionele website nodig? SKYE biedt webdesign voor ondernemers vanaf €150/maand. Geen €5k vooraf. Direct online. Webdesigner België."
        keywords="webdesign België, website laten maken, webdesigner België, professionele website ondernemer, webdesign voor bedrijven, website huren"
      />
      <StructuredData type="WebSite" />
      <StructuredData type="LocalBusiness" />
      <StructuredData type="Organization" />
      
      {/* THE DIGITAL THREAD */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-px h-full z-0 hidden md:block pointer-events-none">
         <div className="w-full h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
         <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-primary to-transparent animate-[float_3s_ease-in-out_infinite] opacity-75 blur-[2px]"></div>
      </div>

      {/* Trust Badges Banner */}
      <section className="relative z-10 mt-20">
        <TrustBadges variant="banner" />
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <h1 className="font-display font-black text-5xl md:text-7xl tracking-tighter text-navy dark:text-white mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 drop-shadow-xl">
            Start Binnen 2 Weken Online - <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">€150/maand</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 font-light max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Geen €5k vooraf. Geen verborgen kosten. <span className="text-primary font-semibold">Direct online</span>. <br/>
            <span className="text-lg">Alles geregeld. Jij focust op je bedrijf.</span>
          </p>

          {/* Social Proof Banner with Live Counter */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-250">
            <LiveCounter baseCount={50} />
          </div>

          {/* Urgency Badge */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-250">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
              <Clock size={16} className="text-red-500" />
              <span className="text-sm font-bold text-red-700 dark:text-red-400">
                Laatste 3 plekken deze maand beschikbaar
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button 
              to="/pricing" 
              variant="primary" 
              className="px-8 py-4 text-lg shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
              ctaLabel="Start Nu - €150/maand"
            >
              Start Nu - €150/maand <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button 
              to="/contact" 
              variant="secondary" 
              className="px-8 py-4 text-lg dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10"
              ctaLabel="Plan Gratis Consultatie"
            >
              Plan Gratis Consultatie
            </Button>
            <a 
              href="https://wa.me/31645998932?text=Hoi%20Hope!%20Ik%20wil%20graag%20praten%20over%20een%20website." 
              onClick={() => trackWhatsAppClick('homepage-hero')}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>
          </div>

          {/* Testimonials Carousel */}
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            <Testimonials testimonials={heroTestimonials} variant="carousel" maxItems={3} />
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
               <h3 className="font-display font-bold text-xl mb-3 text-navy dark:text-white">Geen tijdverspilling</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Jij focust op je bedrijf. Ik regel de updates, de beveiliging en de techniek. Het werkt gewoon.</p>
             </div>
             <div className="glass-panel p-8 rounded-2xl hover:border-primary/50 transition-all duration-500 group">
               <CreditCard size={40} className="text-primary mb-6 group-hover:scale-110 transition-transform" />
               <h3 className="font-display font-bold text-xl mb-3 text-navy dark:text-white">Geen €5k vooraf</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Hou je cashflow gezond. Voor een vast, laag maandbedrag sta je professioneel online.</p>
             </div>
             <div className="glass-panel p-8 rounded-2xl hover:border-green-500/50 transition-all duration-500 group">
               <ShieldCheck size={40} className="text-green-500 mb-6 group-hover:scale-110 transition-transform" />
               <h3 className="font-display font-bold text-xl mb-3 text-navy dark:text-white">Altijd Up-to-Date</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Het web verandert snel. Jouw huursite groeit mee met nieuwe techniek en security standaarden.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Pricing Teasers */}
      <section className="py-24 relative">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-4xl text-navy dark:text-white mb-4">Kies jouw fundament</h2>
              <p className="text-slate-600 dark:text-slate-400">Flexibel opzegbaar, later afkopen altijd mogelijk.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
               {/* Basic Teaser */}
               <div className="glass-panel-strong p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all flex flex-col text-center">
                  <h3 className="text-2xl font-bold text-navy dark:text-white mb-2">Basis</h3>
                  <div className="text-4xl font-black text-primary mb-2">€150<span className="text-sm font-medium text-slate-500 dark:text-slate-400">/mnd</span></div>
                  <div className="text-lg text-slate-600 dark:text-slate-300 mb-4">of €1.500 eenmalig afkoop</div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">Voor de serieuze starter. Een professionele site zonder hoofdpijn.</p>
                  <Button to="/pricing" variant="outline" className="mt-auto">Meer info</Button>
               </div>

               {/* Custom Teaser */}
               <div className="glass-panel-strong p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-accent/50 transition-all flex flex-col text-center">
                  <h3 className="text-2xl font-bold text-navy dark:text-white mb-2">Maatwerk</h3>
                  <div className="text-4xl font-black text-accent mb-2">Custom</div>
                  <div className="text-lg text-slate-600 dark:text-slate-300 mb-4">op offerte</div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">Complexe platformen of specifieke web-applicaties.</p>
                  <Button to="/contact" variant="outline" className="mt-auto border-accent text-accent hover:bg-accent/10">Plan gesprek</Button>
               </div>
            </div>
         </div>
      </section>

      {/* Leadmagnet Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-navy dark:text-white mb-4">
              Gratis Gids: Website Huren vs Kopen
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Alles wat je moet weten voordat je een beslissing maakt
            </p>
          </div>
          <LeadMagnet 
            title="Download Gratis: De Complete Gids"
            description="Website Huren vs Kopen - Alles wat je moet weten voordat je een beslissing maakt"
            className="max-w-2xl mx-auto"
          />
        </div>
      </section>

      {/* Hope Teaser */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <div className="glass-panel p-10 rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-slate-100/50 dark:bg-navy/40">
              <h2 className="font-display font-bold text-2xl text-navy dark:text-white mb-4">Ik ben Hope.</h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-6 leading-relaxed">
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
            <h2 className="font-display font-black text-4xl md:text-5xl text-navy dark:text-white mb-6">Klaar om te starten?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">Kies je pakket, we bespreken je wensen, en binnen 2 weken sta jij online.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                to="/pricing" 
                variant="primary" 
                className="px-10 py-4 text-xl"
                ctaLabel="Bekijk Prijzen & Start Nu"
              >
                Bekijk Prijzen & Start Nu
              </Button>
              <Button 
                to="/contact" 
                variant="outline" 
                className="px-10 py-4 text-xl"
                ctaLabel="Plan Gratis Consultatie"
              >
                Plan Gratis Consultatie
              </Button>
            </div>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              ✓ Geen verborgen kosten  ✓ Geen verplichtingen  ✓ 30-dagen garantie
            </p>
         </div>
      </section>
    </div>
  );
};

export default Home;
