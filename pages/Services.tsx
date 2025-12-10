
import React from 'react';
import { LayoutTemplate, Server, Database, Workflow, BarChart2, Code, MessageCircle } from 'lucide-react';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';

const Services: React.FC = () => {
  const { t } = useApp();

  const icons = [
    <LayoutTemplate size={32} />,
    <Server size={32} />,
    <Database size={32} />,
    <Workflow size={32} />,
    <Code size={32} />,
    <BarChart2 size={32} />
  ];

  const servicesData = t.services.items.map((item, index) => ({
    ...item,
    icon: icons[index]
  }));

  return (
    <div className="bg-slate-50 dark:bg-darkBg min-h-screen pb-20 transition-colors duration-300">
      <SEOHead
        title="Design & Automation Diensten | Websites, Hosting & Integraties - SKYE"
        description="Complete Design & Automation diensten: professionele websites, hosting, security, integraties en automatisering. Alles in één pakket vanaf €150/maand."
        keywords="design automation diensten, website hosting, website integraties, website automatisering, systeem ontwikkelaar"
        canonical="https://skye.be/#/services"
      />
      <StructuredData
        type="Service"
        data={{
          serviceType: "Design & Automation Service",
          description: "Complete design & automation diensten voor ondernemers: professionele websites, hosting, security, integraties en automatisering.",
          areaServed: {
            '@type': 'Country',
            name: 'Belgium'
          }
        }}
      />
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-navy dark:bg-black z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-display font-black text-5xl md:text-6xl mb-6 text-white tracking-tight">
            {t.services.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t.services.subtitle} <br />
            {t.services.header_subtitle_extra}
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
                {service.price_ref && (
                  <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 px-2 py-1 rounded">
                    {service.price_ref}
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-3">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed min-h-[60px]">
                {service.desc}
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                <p className="text-navy dark:text-white font-semibold italic text-xs">
                  <span className="text-primary font-bold mr-1">{t.language === 'nl' ? 'Winst:' : 'Benefit:'}</span> {service.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 mt-24 text-center">
        <div className="bg-gradient-to-br from-white to-slate-100 dark:from-darkCard dark:to-slate-900 p-10 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10">
          <h2 className="font-display font-bold text-3xl text-navy dark:text-white mb-4">{t.services.cta.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">{t.services.cta.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/pricing" variant="primary">{t.services.cta.button_pricing}</Button>
            <Button to="/contact" variant="outline">{t.services.cta.button_contact}</Button>
            <a
              href="https://wa.me/31645998932"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            >
              <MessageCircle size={18} />
              {t.services.cta.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
