
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

  const heroTestimonials = t.home.testimonials;

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
            {t.home.hero.title.split(' - ')[0]} - <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">{t.home.hero.title.split(' - ')[1]}</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 font-light max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {t.home.hero.subtitle_line1} <span className="text-primary font-semibold">{t.home.hero.subtitle_line2}</span>. <br/>
            <span className="text-lg">{t.home.hero.subtitle_line3}</span>
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
                {t.home.hero.urgency_badge}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button 
              to="/pricing" 
              variant="primary" 
              className="px-8 py-4 text-lg shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
              ctaLabel={t.home.hero.cta_start}
            >
              {t.home.hero.cta_start} <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button 
              to="/contact" 
              variant="secondary" 
              className="px-8 py-4 text-lg dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10"
              ctaLabel={t.home.hero.cta_consultation}
            >
              {t.home.hero.cta_consultation}
            </Button>
            <a 
              href="https://wa.me/31645998932?text=Hoi%20Hope!%20Ik%20wil%20graag%20praten%20over%20een%20website." 
              onClick={() => trackWhatsAppClick('homepage-hero')}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            >
              <MessageCircle size={20} />
              {t.home.hero.whatsapp}
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
            <h2 className="font-display font-bold text-3xl md:text-4xl text-navy dark:text-white">{t.home.why_rent.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
              {t.home.why_rent.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="glass-panel p-8 rounded-2xl hover:border-accent/50 transition-all duration-500 group">
               <Clock size={40} className="text-accent mb-6 group-hover:scale-110 transition-transform" />
               <h3 className="font-display font-bold text-xl mb-3 text-navy dark:text-white">{t.home.why_rent.no_time_waste.title}</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t.home.why_rent.no_time_waste.desc}</p>
             </div>
             <div className="glass-panel p-8 rounded-2xl hover:border-primary/50 transition-all duration-500 group">
               <CreditCard size={40} className="text-primary mb-6 group-hover:scale-110 transition-transform" />
               <h3 className="font-display font-bold text-xl mb-3 text-navy dark:text-white">{t.home.why_rent.no_5k_upfront.title}</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t.home.why_rent.no_5k_upfront.desc}</p>
             </div>
             <div className="glass-panel p-8 rounded-2xl hover:border-green-500/50 transition-all duration-500 group">
               <ShieldCheck size={40} className="text-green-500 mb-6 group-hover:scale-110 transition-transform" />
               <h3 className="font-display font-bold text-xl mb-3 text-navy dark:text-white">{t.home.why_rent.always_updated.title}</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t.home.why_rent.always_updated.desc}</p>
             </div>
          </div>
        </div>
      </section>

      {/* Pricing Teasers */}
      <section className="py-24 relative">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-4xl text-navy dark:text-white mb-4">{t.home.pricing_teaser.title}</h2>
              <p className="text-slate-600 dark:text-slate-400">{t.home.pricing_teaser.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
               {/* Basic Teaser */}
               <div className="glass-panel-strong p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all flex flex-col text-center">
                  <h3 className="text-2xl font-bold text-navy dark:text-white mb-2">{t.home.pricing_teaser.basic.title}</h3>
                  <div className="text-4xl font-black text-primary mb-2">{t.home.pricing_teaser.basic.price}<span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.home.pricing_teaser.basic.period}</span></div>
                  <div className="text-lg text-slate-600 dark:text-slate-300 mb-4">{t.home.pricing_teaser.basic.buyout}</div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{t.home.pricing_teaser.basic.desc}</p>
                  <Button to="/pricing" variant="outline" className="mt-auto">{t.home.pricing_teaser.basic.more_info}</Button>
               </div>

               {/* Custom Teaser */}
               <div className="glass-panel-strong p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-accent/50 transition-all flex flex-col text-center">
                  <h3 className="text-2xl font-bold text-navy dark:text-white mb-2">{t.home.pricing_teaser.custom.title}</h3>
                  <div className="text-4xl font-black text-accent mb-2">{t.home.pricing_teaser.custom.price}</div>
                  <div className="text-lg text-slate-600 dark:text-slate-300 mb-4">{t.home.pricing_teaser.custom.buyout}</div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{t.home.pricing_teaser.custom.desc}</p>
                  <Button to="/contact" variant="outline" className="mt-auto border-accent text-accent hover:bg-accent/10">{t.home.pricing_teaser.custom.button}</Button>
               </div>
            </div>
         </div>
      </section>

      {/* Leadmagnet Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-navy dark:text-white mb-4">
              {t.home.leadmagnet.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {t.home.leadmagnet.subtitle}
            </p>
          </div>
          <LeadMagnet 
            title={t.home.leadmagnet.download_title}
            description={t.home.leadmagnet.download_desc}
            className="max-w-2xl mx-auto"
          />
        </div>
      </section>

      {/* Hope Teaser */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <div className="glass-panel p-10 rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-slate-100/50 dark:bg-navy/40">
              <h2 className="font-display font-bold text-2xl text-navy dark:text-white mb-4">{t.home.hope_teaser.title}</h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-6 leading-relaxed">
                 {t.home.hope_teaser.text}
              </p>
              <Button to="/about" variant="secondary" className="text-sm">{t.home.hope_teaser.button}</Button>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="relative z-10 max-w-2xl mx-auto px-4">
            <h2 className="font-display font-black text-4xl md:text-5xl text-navy dark:text-white mb-6">{t.home.final_cta.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">{t.home.final_cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                to="/pricing" 
                variant="primary" 
                className="px-10 py-4 text-xl"
                ctaLabel={t.home.final_cta.cta_pricing}
              >
                {t.home.final_cta.cta_pricing}
              </Button>
              <Button 
                to="/contact" 
                variant="outline" 
                className="px-10 py-4 text-xl"
                ctaLabel={t.home.final_cta.cta_consultation}
              >
                {t.home.final_cta.cta_consultation}
              </Button>
            </div>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              {t.home.final_cta.guarantees}
            </p>
         </div>
      </section>
    </div>
  );
};

export default Home;
