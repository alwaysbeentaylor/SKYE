import React from 'react';
import { Check, Info, MessageCircle, Clock, Shield, Zap } from 'lucide-react';
import Button from '../components/Button';
import Testimonials from '../components/Testimonials';
import TrustBadges from '../components/TrustBadges';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import UrgencyBanner from '../components/UrgencyBanner';
import { trackWhatsAppClick } from '../utils/analytics';
import { useApp } from '../context/AppContext';

const Pricing: React.FC = () => {
  const { t } = useApp();
  const testimonials = t.pricing.testimonials.items;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg pb-20 transition-colors duration-300">
      <SEOHead
        title="Prijzen & Pakketten | Starter vanaf €297/maand - SKYE"
        description="Transparante prijzen voor Design & Automation. Starter pakket vanaf €297/maand. Business pakket met strategie en groei. Bekijk onze Value Stacks."
        keywords="prijzen design automation, website kosten, website vanaf 297 euro, business website, skye pricing"
        canonical="https://skye.be/#/pricing"
      />
      <StructuredData
        type="Service"
        data={{
          serviceType: "Website Development & Automation",
          description: "Website en systeem pakketten vanaf €297 per maand. Inclusief hosting, support en strategie.",
          offers: {
            '@type': 'Offer',
            price: '297',
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
            <span className="text-sm font-bold text-primary">{t.pricing.start_badge}</span>
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">{t.pricing.title}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </div>
      </section>

      {/* Trust Badges Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <TrustBadges variant="banner" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10">
        {/* Urgency Banner */}
        <div className="max-w-4xl mx-auto mb-12">
          <UrgencyBanner
            message={t.pricing.urgency_banner}
            availableSpots={2}
            variant="warning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start max-w-7xl mx-auto">

          {/* STARTER */}
          <div className="glass-panel bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border-2 border-slate-100 dark:border-white/5 flex flex-col hover:border-primary/30 transition-all duration-300 relative h-full">
            <div className="mb-6 text-center border-b border-slate-100 dark:border-slate-800 pb-6">
              <h3 className="text-2xl font-bold text-navy dark:text-white uppercase tracking-wider mb-2">{t.pricing.starter.title}</h3>
              <div className="text-slate-400 line-through text-md font-bold mb-1">
                Totale waarde: {t.pricing.starter.total_value}
              </div>
              <div className="flex items-baseline justify-center text-navy dark:text-white mt-2">
                <span className="text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100">{t.pricing.starter.price}</span>
                <span className="ml-1 text-base text-slate-500">{t.pricing.starter.period}</span>
              </div>
              <p className="mt-2 text-xs text-slate-400">{t.pricing.starter.vat_note}</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 py-1 px-3 rounded-full mx-auto w-fit">
                <Shield size={14} />
                <span className="font-semibold">{t.pricing.starter.guarantee}</span>
              </div>
            </div>

            <div className="flex-1 mb-8">
              <ul className="space-y-4">
                {t.pricing.starter.features.map((item, i) => (
                  <li key={i} className="flex items-start text-slate-600 dark:text-slate-300 text-sm">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button to="/contact" variant="outline" className="w-full justify-center mb-4 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 py-4">
              {t.pricing.starter.cta}
            </Button>
          </div>

          {/* BUSINESS - HIGHLIGHTED */}
          <div className="relative transform lg:-translate-y-4 h-full">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg z-20 whitespace-nowrap">
              {t.pricing.business.badge}
            </div>
            <div className="glass-panel bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 border-2 border-primary/50 dark:border-primary/50 flex flex-col relative z-10 h-full">
              <div className="absolute inset-0 bg-primary/5 dark:bg-primary/5 pointer-events-none rounded-2xl"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 text-center border-b border-primary/10 pb-6">
                  <h3 className="text-3xl font-black text-primary uppercase tracking-wider mb-2">{t.pricing.business.title}</h3>
                  <div className="text-slate-400 line-through text-lg font-bold mb-1">
                    Totale waarde: {t.pricing.business.total_value}
                  </div>
                  <div className="flex items-baseline justify-center text-navy dark:text-white mt-2">
                    <span className="text-6xl font-black tracking-tight text-primary">{t.pricing.business.price}</span>
                    <span className="ml-1 text-xl text-slate-500">{t.pricing.business.period}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">{t.pricing.business.vat_note}</p>
                  <p className="mt-1 text-sm text-primary font-bold">{t.pricing.business.subtitle}</p>
                </div>

                <div className="flex-1 mb-8">
                  <div className="bg-white/50 dark:bg-black/20 rounded-xl p-3 mb-4 text-center border border-primary/10">
                    <p className="text-xs font-bold text-primary uppercase">Alles van Starter, PLUS:</p>
                  </div>
                  <ul className="space-y-4">
                    {t.pricing.business.features.slice(1).map((item, i) => (
                      <li key={i} className="flex items-start text-navy dark:text-white text-sm font-medium">
                        <Check size={18} className="text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <Button to="/contact" variant="primary" className="w-full justify-center mb-4 py-4 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 rounded-xl">
                    {t.pricing.business.cta} <Zap size={18} className="ml-2 fill-current" />
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-xs text-green-600 dark:text-green-400 font-bold">
                    <Shield size={14} />
                    <span>{t.pricing.business.guarantee}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CUSTOM */}
          <div className="glass-panel bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border-2 border-slate-100 dark:border-white/5 flex flex-col hover:border-accent/30 transition-all duration-300 relative h-full">
            <div className="mb-6 text-center border-b border-slate-100 dark:border-slate-800 pb-6">
              <h3 className="text-2xl font-bold text-navy dark:text-white uppercase tracking-wider mb-2">{t.pricing.custom.title}</h3>
              <p className="text-slate-500 text-sm">{t.pricing.custom.description}</p>
              <div className="flex items-baseline justify-center text-navy dark:text-white mt-6">
                <span className="text-4xl font-black tracking-tight text-accent">{t.pricing.custom.price}</span>
              </div>
              <p className="mt-2 text-xs text-slate-400">{t.pricing.custom.price_note}</p>
            </div>

            <div className="flex-1 mb-8">
              <ul className="space-y-4">
                {t.pricing.custom.features.map((item, i) => (
                  <li key={i} className="flex items-start text-slate-600 dark:text-slate-300 text-sm">
                    <Check size={18} className="text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 mt-auto">
              <Button to="/contact" variant="accent" className="w-full justify-center text-lg py-3 opacity-90 hover:opacity-100">
                {t.pricing.custom.cta}
              </Button>
              <a
                href={`https://wa.me/31645998932?text=Hoi%20Hope!%20Ik%20wil%20graag%20praten%20over%20een%20maatwerk%20project.`}
                onClick={() => trackWhatsAppClick('pricing-maatwerk')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                <MessageCircle size={18} />
                {t.pricing.custom.whatsapp}
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-navy dark:text-white mb-4">
            {t.pricing.testimonials.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            {t.pricing.testimonials.subtitle}
          </p>
        </div>
        <Testimonials testimonials={testimonials} variant="grid" />
      </section>

      {/* Comparison / Info */}
      <section className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-blue-50 dark:bg-primary/5 border border-blue-100 dark:border-primary/20 rounded-xl p-8">
          <div className="flex items-start mb-4">
            <Info className="text-primary mr-4 mt-1" />
            <h3 className="text-xl font-bold text-navy dark:text-white">{t.pricing.why_rent.title}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.pricing.why_rent.points.map((point, i) => (
              <p key={i}>
                <strong className="text-navy dark:text-white block mb-1">{point.title}</strong>
                {point.text}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-4xl mx-auto px-4 mt-20 mb-12">
        <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-2 border-primary/20 rounded-2xl p-10 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-navy dark:text-white mb-4">
            {t.pricing.final_cta.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
            {t.pricing.final_cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contact" variant="primary" className="px-8 py-4 text-lg shadow-lg shadow-primary/30">
              {t.pricing.final_cta.cta}
            </Button>
            <a
              href="https://wa.me/31645998932?text=Hoi%20Hope!%20Ik%20wil%20graag%20praten%20over%20een%20website."
              onClick={() => trackWhatsAppClick('pricing-cta')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            >
              <MessageCircle size={20} />
              {t.pricing.final_cta.whatsapp}
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            {t.pricing.final_cta.guarantees}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
