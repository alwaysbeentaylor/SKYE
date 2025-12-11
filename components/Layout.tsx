
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Linkedin, Github, Instagram, Moon, Sun, Globe, MessageCircle } from 'lucide-react';
import Button from './Button';
import { useApp } from '../context/AppContext';
import CookieConsent from './CookieConsent';
import Analytics from './Analytics';
import ExitIntentPopup from './ExitIntentPopup';
import MobileCTABar from './MobileCTABar';
import LanguagePrompt from './LanguagePrompt';
import { trackWhatsAppClick } from '../utils/analytics';
import { trackVisitor, resetTracking } from '../utils/visitorTracking';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme, language, setLanguage, t } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setLangMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Prevent scrolling on iOS
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.services, path: '/services' },
    { name: t.nav.pricing, path: '/pricing' },
    { name: t.nav.portfolio, path: '/portfolio' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.faq, path: '/faq' },
  ];

  const languages = [
    { code: 'nl', label: 'NL' },
    { code: 'en', label: 'EN' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${scrolled
      ? 'bg-white/90 dark:bg-black/50 backdrop-blur-md border-slate-200 dark:border-white/10 py-3'
      : 'bg-transparent border-transparent py-5'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <span className="font-display font-black text-3xl tracking-tighter text-navy dark:text-white transition-colors">
              SKYE
              <span className="text-primary inline-block w-2 h-2 bg-primary rounded-full ml-1 animate-pulse shadow-[0_0_10px_#0ea5e9]"></span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all hover:text-primary hover:scale-105 ${location.pathname === link.path
                  ? 'text-primary'
                  : 'text-slate-600 dark:text-slate-300'
                  }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Settings Group */}
            <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-white/10 pl-6">

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center p-2 rounded-full text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors uppercase font-bold text-xs"
                >
                  <Globe size={20} className="mr-1" />
                  {language}
                </button>

                {langMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-24 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 ${language === lang.code
                          ? 'text-primary'
                          : 'text-slate-600 dark:text-slate-300'
                          }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button to="/contact" variant="accent" className="px-4 py-2 text-sm shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                {t.nav.cta}
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu (Animated) */}
      <div
        className={`lg:hidden fixed inset-0 w-full h-[100dvh] bg-slate-50 dark:bg-black/95 backdrop-blur-xl z-[60] flex flex-col p-8 overflow-y-auto overscroll-contain transition-all duration-500 ease-in-out ${isOpen
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-full invisible pointer-events-none'
          }`}
      >
        <div className="flex justify-between items-center mb-12 shrink-0">
          <span className="font-display font-black text-3xl text-navy dark:text-white">SKYE.</span>
          <button onClick={() => setIsOpen(false)} className="p-2"><X size={32} className="text-slate-500" /></button>
        </div>

        <div className="flex flex-col space-y-6 shrink-0">
          {navLinks.map((link, idx) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: `${idx * 50}ms` }}
              className={`text-2xl font-display font-bold transition-all duration-300 transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                } ${location.pathname === link.path ? 'text-primary' : 'text-slate-600 dark:text-slate-300'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className={`mt-auto space-y-6 pt-12 shrink-0 transition-all duration-500 delay-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code as any); setIsOpen(false); }}
                className={`text-lg font-bold ${language === lang.code ? 'text-primary' : 'text-slate-500'}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-lg font-bold text-slate-500"
            >
              {theme === 'light' ? <><Moon size={24} /> Dark Mode</> : <><Sun size={24} /> Light Mode</>}
            </button>
          </div>
          <Button to="/contact" variant="accent" className="w-full justify-center py-4">
            {t.nav.cta}
          </Button>
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
  const { t } = useApp();
  return (
    <footer className="relative pt-24 pb-10 border-t border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-black/20 backdrop-blur-sm mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-6">
            <h3 className="font-display font-black text-3xl tracking-tighter text-navy dark:text-white">
              SKYE
              <span className="text-primary">.</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
              {t.hero.subtitle}
            </p>
            <div className="space-y-4">
              <div className="flex space-x-4">
                {[Linkedin, Github, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="bg-slate-200/80 dark:bg-white/5 hover:bg-primary hover:text-white text-slate-600 dark:text-slate-400 p-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_#0ea5e9]">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
              <a
                href="https://wa.me/31645998932"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-600 dark:text-green-400 px-4 py-2 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] border border-green-500/30"
              >
                <MessageCircle size={20} />
                <span className="text-sm font-medium">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-bold text-xl mb-6 text-navy dark:text-white">{t.footer.direct_to_title}</h3>
            <ul className="space-y-3">
              {[
                { name: t.nav.home, path: '/' },
                { name: t.nav.pricing, path: '/pricing' },
                { name: t.nav.services, path: '/services' },
                { name: t.nav.contact, path: '/contact' }
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-slate-600 dark:text-slate-400 hover:text-primary hover:translate-x-2 transition-all flex items-center group w-fit">
                    <ChevronRight size={14} className="mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-bold text-xl mb-6 text-navy dark:text-white">{t.footer.resources_title}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/media-kit" className="text-slate-600 dark:text-slate-400 hover:text-primary hover:translate-x-2 transition-all flex items-center group w-fit">
                  <ChevronRight size={14} className="mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Media Kit
                </Link>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-500/10 dark:bg-green-400/10 w-fit px-3 py-1 rounded-full text-sm font-medium border border-green-500/30 dark:border-green-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 dark:bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 dark:bg-green-400"></span>
              </span>
              {t.footer.available}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600 dark:text-slate-500">
          <p>&copy; 2025 SKYE. {t.footer.rights} {t.footer.built}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-primary transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { t } = useApp();

  useEffect(() => {
    // Track visitor on page load and route changes
    resetTracking();
    trackVisitor(location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden text-slate-800 dark:text-slate-200 font-sans">
      {/* GLOBAL SEAMLESS BACKGROUND */}
      <div className="fixed inset-0 z-[-1] bg-slate-50 dark:bg-darkBg transition-colors duration-500">
        {/* Dark Mode Deep Gradient */}
        <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-blue-900/20 dark:via-darkBg dark:to-black"></div>

        {/* Circuit/Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]"></div>

        {/* Ambient Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-pulse-slow"></div>
      </div>

      {/* Analytics */}
      <Analytics />

      {/* Sticky WhatsApp Button */}
      <a
        href="https://wa.me/31645998932?text=Hoi%20Hope!%20Ik%20wil%20graag%20praten%20over%20een%20website."
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('sticky-button')}
        className="fixed bottom-6 right-6 z-50 group lg:block hidden"
        aria-label="Chat via WhatsApp"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]">
            <MessageCircle size={28} />
          </div>
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-navy dark:bg-navy/90 backdrop-blur text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          {t.common.whatsapp_tooltip}
        </span>
      </a>

      <Navbar />
      <main className="flex-grow pt-24 relative z-10 pb-20 lg:pb-0">
        {children}
      </main>
      <Footer />
      <CookieConsent />
      <ExitIntentPopup />
      <MobileCTABar />
      <LanguagePrompt />
    </div>
  );
};

export default Layout;
