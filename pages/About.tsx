
import React from 'react';
import { Code2, Zap, Target, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import Button from '../components/Button';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { useApp } from '../context/AppContext';

const About: React.FC = () => {
  const { t } = useApp();
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg transition-colors duration-300">
      <SEOHead
        title="Over Hope | Design & Automation - Direct Contact, Geen Bullshit - SKYE"
        description="Ik ben Hope, specialist in Design & Automation. Direct contact, eerlijke prijzen, geen accountmanagers. Professionele systemen voor ondernemers."
        keywords="over Hope, design en automation, website ontwikkelaar, freelance developer"
        canonical="https://skye.be/#/about"
      />
      {/* Hero Section with Abstract Visual */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Interactive Visual Identity */}
            <div className="relative perspective-1000 group">
              <div
                className="relative aspect-video w-full transition-transform duration-100 ease-out transform-style-3d hover:scale-110"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = ((y - centerY) / centerY) * -15; // Rotate X based on Y position
                  const rotateY = ((x - centerX) / centerX) * 15;  // Rotate Y based on X position
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                }}
                style={{ transform: 'perspective(1000px) rotateX(0) rotateY(0) scale(1)' }}
              >
                {/* Profile Image */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden glass-panel border border-white/20 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 mix-blend-overlay z-10 pointer-events-none"></div>
                  <img
                    src="/images/about-hope.png"
                    alt="Hope - Design & Automation Machine"
                    className="w-full h-full object-cover"
                  />

                  {/* Glitch/Tech Overlays */}
                  <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-white/30 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-scan"></div>
                </div>

                {/* Floating Elements popping out of frame */}
                <div className="absolute -right-12 top-1/4glass-panel-strong p-4 rounded-xl shadow-[0_0_30px_rgba(14,165,233,0.3)] animate-float transform translate-z-20 hidden lg:block">
                  <Code2 className="text-primary w-8 h-8" />
                </div>
                <div className="absolute -left-8 bottom-1/4 glass-panel-strong p-3 rounded-xl shadow-[0_0_30px_rgba(249,115,22,0.3)] animate-float delay-700 transform translate-z-30 hidden lg:block">
                  <Target className="text-accent w-6 h-6" />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-10 right-10 glass-panel-strong p-4 rounded-xl shadow-xl animate-float delay-300 transform translate-z-50 z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                    <span className="text-white font-bold text-sm tracking-wide">SYSTEM ONLINE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="text-primary font-mono text-sm tracking-widest uppercase">{t.about.hero.label}</span>
              </div>

              <h1 className="font-display font-black text-5xl lg:text-6xl text-navy dark:text-white leading-tight">
                {t.about.hero.title_line1}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {t.about.hero.title_line2}
                </span>
              </h1>

              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="text-xl">
                  {t.about.hero.text1}
                </p>

                <p>
                  {t.about.hero.text2}
                </p>

                <p>
                  {t.about.hero.text3}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button to="/pricing" variant="primary">
                  {t.about.hero.cta_pricing}
                  <ArrowRight size={18} className="ml-2" />
                </Button>
                <Button to="/contact" variant="outline">
                  {t.about.hero.cta_contact}
                </Button>
                <a
                  href="https://wa.me/31645998932"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                >
                  <MessageCircle size={18} />
                  {t.about.hero.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Modern Grid */}
      <section className="bg-navy dark:bg-black py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl text-white mb-4">{t.about.values.title}</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {t.about.values.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative glass-panel-strong p-8 rounded-2xl border border-primary/20 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primaryDark rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                  <Zap className="text-white" size={32} />
                </div>
                <h3 className="font-bold text-xl text-white mb-4">{t.about.values.direct_contact.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {t.about.values.direct_contact.desc}
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center text-primary text-sm font-medium">
                    <span>{t.about.values.direct_contact.label}</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Value 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative glass-panel-strong p-8 rounded-2xl border border-accent/20 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-orange-600 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                  <Target className="text-white" size={32} />
                </div>
                <h3 className="font-bold text-xl text-white mb-4">{t.about.values.honest.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {t.about.values.honest.desc}
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center text-accent text-sm font-medium">
                    <span>{t.about.values.honest.label}</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Value 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative glass-panel-strong p-8 rounded-2xl border border-primary/20 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-primary via-accent to-primary rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                  <Sparkles className="text-white" size={32} />
                </div>
                <h3 className="font-bold text-xl text-white mb-4">{t.about.values.no_bullshit.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {t.about.values.no_bullshit.desc}
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center text-primary text-sm font-medium">
                    <span>{t.about.values.no_bullshit.label}</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel bg-white dark:bg-darkCard/50 rounded-3xl p-12 md:p-16 border border-slate-100 dark:border-white/10 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="max-w-3xl mx-auto text-center space-y-8">
                <h2 className="font-display font-bold text-3xl md:text-4xl text-navy dark:text-white">
                  {t.about.philosophy.title}
                </h2>

                <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    {t.about.philosophy.text1}
                  </p>

                  <p className="text-xl font-semibold text-navy dark:text-white">
                    {t.about.philosophy.text2}
                  </p>

                  <p>
                    {t.about.philosophy.text3}
                  </p>
                </div>

                <div className="pt-8">
                  <Button to="/contact" variant="primary" className="text-lg px-8">
                    {t.about.philosophy.cta}
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
