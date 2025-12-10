
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, Zap, ShieldCheck, CreditCard, MousePointer, MessageCircle, Sliders, Palette, Monitor } from 'lucide-react';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import InteractiveHero from '../components/InteractiveHero';
import Testimonials from '../components/Testimonials';
import TrustBadges from '../components/TrustBadges';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';

import LeadMagnet from '../components/LeadMagnet';
import ProcessSteps from '../components/ProcessSteps';

import { trackWhatsAppClick } from '../utils/analytics';

const Home: React.FC = () => {
  const { t } = useApp();
  const [activeTheme, setActiveTheme] = React.useState<'modern' | 'playful' | 'cyber'>('modern');

  const heroTestimonials = t.home.testimonials;

  return (
    <div className="flex flex-col relative">
      <SEOHead
        title="SKYE | Design & Automation - Websites vanaf €150/maand"
        description="Design & Automation. SKYE bouwt digitale systemen voor ondernemers vanaf €150/maand. Geen €5k vooraf. Direct online."
        keywords="design automation, website laten maken, systeem bouw, professionele website ondernemer, webdesign voor bedrijven"
      />
      <StructuredData type="WebSite" />
      <StructuredData type="LocalBusiness" />
      <StructuredData type="Organization" />

      {/* THE DIGITAL THREAD */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-px h-full z-0 hidden md:block pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-primary to-transparent animate-[float_3s_ease-in-out_infinite] opacity-75 blur-[2px]"></div>
      </div>



      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden transition-all duration-700">
        {/* Interactive Background */}
        <InteractiveHero theme={activeTheme} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

          <h1 className="font-display font-black text-5xl md:text-8xl tracking-tighter text-navy dark:text-white mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 drop-shadow-2xl">
            {t.home.hero.title.split(' - ')[0]}<span className="hidden sm:inline"> - </span><br className="sm:hidden" />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-700 ${activeTheme === 'playful' ? 'from-orange-400 via-purple-500 to-indigo-500' :
              activeTheme === 'cyber' ? 'from-green-400 via-teal-400 to-blue-500' :
                'from-primary via-blue-400 to-accent'
              }`}>
              {t.home.hero.title.split(' - ')[1]}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 mb-8 font-light max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {t.home.hero.subtitle_line1} <span className="text-primary font-semibold">{t.home.hero.subtitle_line2}</span>. <br />
            <span className="text-lg opacity-80">{t.home.hero.subtitle_line3}</span>
          </p>



          {/* Experience Controller */}
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-250 relative z-20">
            <div className="inline-flex flex-col items-center gap-3 p-2 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20 shadow-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Kies je vibe</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTheme('modern')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTheme === 'modern' ? 'bg-white shadow-md text-primary scale-105' : 'hover:bg-white/50 text-slate-600 dark:text-slate-300'}`}
                >
                  <Monitor size={16} /> Modern
                </button>
                <button
                  onClick={() => setActiveTheme('playful')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTheme === 'playful' ? 'bg-gradient-to-r from-orange-400 to-purple-500 text-white shadow-md scale-105' : 'hover:bg-white/50 text-slate-600 dark:text-slate-300'}`}
                >
                  <Palette size={16} /> Speels
                </button>
                <button
                  onClick={() => setActiveTheme('cyber')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTheme === 'cyber' ? 'bg-slate-900 border border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)] scale-105' : 'hover:bg-white/50 text-slate-600 dark:text-slate-300'}`}
                >
                  <Sliders size={16} /> Cyber
                </button>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 opacity-80 animate-pulse">
              👇 Klik om de site te transformeren
            </p>
          </div>




          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button
              to="/pricing"
              variant="primary"
              className="px-8 py-4 text-lg shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transform hover:scale-105 transition-all"
              ctaLabel={t.home.hero.cta_start}
            >
              {t.home.hero.cta_start} <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button
              to="/contact"
              variant="secondary"
              className="px-8 py-4 text-lg dark:bg-black/40 dark:hover:bg-black/60 border border-slate-200 dark:border-white/10 backdrop-blur-md"
              ctaLabel={t.home.hero.cta_consultation}
            >
              {t.home.hero.cta_consultation}
            </Button>

          </div>



          {/* Testimonials Carousel */}
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 mt-12">
            <Testimonials testimonials={heroTestimonials} variant="carousel" maxItems={3} />
          </div>
        </div>
      </section>

      {/* Problem Section - Focused on Stability & Ease */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 relative">
            <div className="hidden md:block absolute -top-32 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary/50 rounded-full border border-primary"></div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-navy dark:text-white">{t.home.why_rent.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
              {t.home.why_rent.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </section >

      <ProcessSteps />

      {/* Pricing Teasers */}
      <section className="py-16 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-4xl text-navy dark:text-white mb-4">{t.home.pricing_teaser.title}</h2>
            <p className="text-slate-600 dark:text-slate-400">{t.home.pricing_teaser.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Basic Teaser */}
            <div className="glass-panel-strong p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all flex flex-col text-center shadow-lg hover:shadow-xl dark:shadow-none">
              <h3 className="text-2xl font-bold text-navy dark:text-white mb-2">{t.home.pricing_teaser.basic.title}</h3>
              <div className="text-4xl font-black text-primary mb-2">{t.home.pricing_teaser.basic.price}<span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.home.pricing_teaser.basic.period}</span></div>
              <div className="text-lg text-slate-600 dark:text-slate-300 mb-4">{t.home.pricing_teaser.basic.buyout}</div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{t.home.pricing_teaser.basic.desc}</p>
              <Button to="/pricing" variant="outline" className="mt-auto">{t.home.pricing_teaser.basic.more_info}</Button>
            </div>

            {/* Custom Teaser */}
            <div className="glass-panel-strong p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-accent/50 transition-all flex flex-col text-center shadow-lg hover:shadow-xl dark:shadow-none">
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
      <section className="py-16">
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
      <section className="py-16">
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
      <section className="py-24 text-center relative overflow-hidden">
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
    </div >
  );
};

export default Home;
