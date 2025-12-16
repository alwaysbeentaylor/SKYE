
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
        title="SKYE | Design & Automation - Websites & Systemen"
        description="Design & Automation. SKYE bouwt digitale systemen voor ondernemers. Direct online."
        keywords="design automation, website laten maken, systeem bouw, professionele website ondernemer, webdesign voor bedrijven"
      />
      <StructuredData type="WebSite" />
      <StructuredData type="LocalBusiness" />
      <StructuredData type="Organization" />





      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden transition-all duration-700">
        {/* Interactive Background */}
        <InteractiveHero theme={activeTheme} />

        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">

          {/* Experience Controller - Linksboven op desktop, boven content op mobiel */}
          <div className="mb-8 xl:mb-0 xl:absolute xl:top-12 xl:left-12 animate-in fade-in slide-in-from-left-8 duration-1000 delay-100 relative z-30">
            <div className="inline-flex flex-col items-start gap-3 p-3 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20 shadow-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Kies je vibe</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTheme('modern')}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${activeTheme === 'modern' ? 'bg-white shadow-md text-primary scale-105' : 'hover:bg-white/50 text-slate-600 dark:text-slate-300'}`}
                >
                  <Monitor size={14} /> Modern
                </button>
                <button
                  onClick={() => setActiveTheme('playful')}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${activeTheme === 'playful' ? 'bg-gradient-to-r from-orange-400 to-purple-500 text-white shadow-md scale-105' : 'hover:bg-white/50 text-slate-600 dark:text-slate-300'}`}
                >
                  <Palette size={14} /> Speels
                </button>
                <button
                  onClick={() => setActiveTheme('cyber')}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${activeTheme === 'cyber' ? 'bg-slate-900 border border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)] scale-105' : 'hover:bg-white/50 text-slate-600 dark:text-slate-300'}`}
                >
                  <Sliders size={14} /> Cyber
                </button>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 opacity-80 animate-pulse">
              👆 Klik om te transformeren
            </p>
          </div>

          {/* Hero content - Links uitgelijnd op desktop */}
          <div className="max-w-4xl xl:pl-0 relative z-20">
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-navy dark:text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 drop-shadow-2xl text-left">
              {t.home.hero.title.split(' - ')[0]}<span className="hidden sm:inline"> - </span><br className="sm:hidden" />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-700 ${activeTheme === 'playful' ? 'from-orange-400 via-purple-500 to-indigo-500' :
                activeTheme === 'cyber' ? 'from-green-400 via-teal-400 to-blue-500' :
                  'from-primary via-blue-400 to-accent'
                }`}>
                {t.home.hero.title.split(' - ')[1]}
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-slate-200 mb-8 font-light max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 text-left">
              {t.home.hero.subtitle_line1} <span className="text-primary font-semibold">{t.home.hero.subtitle_line2}</span>. <br />
              <span className="text-base sm:text-lg opacity-80">{t.home.hero.subtitle_line3}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start mb-12 xl:mb-0 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 relative z-20">
            <Button
              to="/pricing"
              variant="primary"
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transform hover:scale-105 transition-all"
              ctaLabel={t.home.hero.cta_start}
            >
              {t.home.hero.cta_start} <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button
              to="/contact"
              variant="secondary"
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg dark:bg-black/40 dark:hover:bg-black/60 border border-slate-200 dark:border-white/10 backdrop-blur-md"
              ctaLabel={t.home.hero.cta_consultation}
            >
              {t.home.hero.cta_consultation}
            </Button>
          </div>

          {/* Testimonials - Rechts op desktop, onder op mobiel */}
          <div className="w-full xl:absolute xl:bottom-12 xl:right-12 xl:w-auto xl:max-w-md animate-in fade-in slide-in-from-right-8 duration-1000 delay-500 mt-8 xl:mt-0 relative z-20">
            <Testimonials testimonials={heroTestimonials} variant="carousel" maxItems={3} />
          </div>
        </div>
      </section>

      {/* Problem Section - Staggered Grid Layout */}
      <section className="py-12 md:py-20 relative">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="mb-8 md:mb-12">
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-navy dark:text-white text-left">{t.home.why_rent.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-base sm:text-lg max-w-xl text-left">
              {t.home.why_rent.subtitle}
            </p>
          </div>

          {/* Staggered Cards - Different sizes and positions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl hover:border-accent/50 transition-all duration-500 group sm:col-span-1">
              <Clock size={32} className="text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display font-bold text-lg sm:text-xl mb-2 text-navy dark:text-white">{t.home.why_rent.no_time_waste.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t.home.why_rent.no_time_waste.desc}</p>
            </div>
            <div className="glass-panel p-6 sm:p-8 rounded-2xl hover:border-primary/50 transition-all duration-500 group sm:col-span-1 lg:translate-y-4">
              <CreditCard size={32} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display font-bold text-lg sm:text-xl mb-2 text-navy dark:text-white">{t.home.why_rent.no_5k_upfront.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t.home.why_rent.no_5k_upfront.desc}</p>
            </div>
            <div className="glass-panel p-6 sm:p-8 rounded-2xl hover:border-green-500/50 transition-all duration-500 group sm:col-span-2 lg:col-span-1 lg:-translate-y-2">
              <ShieldCheck size={32} className="text-green-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display font-bold text-lg sm:text-xl mb-2 text-navy dark:text-white">{t.home.why_rent.always_updated.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t.home.why_rent.always_updated.desc}</p>
            </div>
          </div>
        </div>
      </section>

      <ProcessSteps />

      {/* Pricing Teasers - Side by Side Full Width */}
      <section className="py-12 md:py-20 relative">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">
            {/* Text Links */}
            <div className="lg:max-w-md">
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-navy dark:text-white mb-3">{t.home.pricing_teaser.title}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">{t.home.pricing_teaser.subtitle}</p>
            </div>

            {/* Cards Rechts */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl">
              {/* Basic Teaser */}
              <div className="glass-panel-strong p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all flex flex-col shadow-lg hover:shadow-xl dark:shadow-none">
                <h3 className="text-xl sm:text-2xl font-bold text-navy dark:text-white mb-2">{t.home.pricing_teaser.basic.title}</h3>
                <div className="text-3xl sm:text-4xl font-black text-primary mb-1">{t.home.pricing_teaser.basic.price}<span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">{t.home.pricing_teaser.basic.period}</span></div>
                <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-3">{t.home.pricing_teaser.basic.buyout}</div>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-4 flex-1">{t.home.pricing_teaser.basic.desc}</p>
                <Button to="/pricing" variant="outline" className="mt-auto text-sm">{t.home.pricing_teaser.basic.more_info}</Button>
              </div>

              {/* Custom Teaser */}
              <div className="glass-panel-strong p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-accent/50 transition-all flex flex-col shadow-lg hover:shadow-xl dark:shadow-none">
                <h3 className="text-xl sm:text-2xl font-bold text-navy dark:text-white mb-2">{t.home.pricing_teaser.custom.title}</h3>
                <div className="text-3xl sm:text-4xl font-black text-accent mb-1">{t.home.pricing_teaser.custom.price}</div>
                <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-3">{t.home.pricing_teaser.custom.buyout}</div>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-4 flex-1">{t.home.pricing_teaser.custom.desc}</p>
                <Button to="/contact" variant="outline" className="mt-auto border-accent text-accent hover:bg-accent/10 text-sm">{t.home.pricing_teaser.custom.button}</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadmagnet Section - Asymmetrisch */}
      <section className="py-12 md:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <div className="md:w-1/3">
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-navy dark:text-white mb-3">
                {t.home.leadmagnet.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                {t.home.leadmagnet.subtitle}
              </p>
            </div>
            <div className="md:w-2/3">
              <LeadMagnet
                title={t.home.leadmagnet.download_title}
                description={t.home.leadmagnet.download_desc}
                className=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hope Teaser - Volledige breedte met accent */}
      <section className="py-12 md:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-slate-100/50 dark:bg-navy/40">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
              <div className="md:max-w-2xl">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-navy dark:text-white mb-2 md:mb-3">{t.home.hope_teaser.title}</h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
                  {t.home.hope_teaser.text}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button to="/about" variant="secondary" className="text-sm whitespace-nowrap">{t.home.hope_teaser.button}</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Asymmetrisch met gradient accent */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-16">
            <div className="lg:max-w-xl">
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-navy dark:text-white mb-4">{t.home.final_cta.title}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg">{t.home.final_cta.subtitle}</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  to="/pricing"
                  variant="primary"
                  className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                  ctaLabel={t.home.final_cta.cta_pricing}
                >
                  {t.home.final_cta.cta_pricing}
                </Button>
                <Button
                  to="/contact"
                  variant="outline"
                  className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                  ctaLabel={t.home.final_cta.cta_consultation}
                >
                  {t.home.final_cta.cta_consultation}
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {t.home.final_cta.guarantees}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div >
  );
};

export default Home;
