
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Linkedin, Github, Instagram, Moon, Sun, Globe } from 'lucide-react';
import Button from './Button';
import { useApp } from '../context/AppContext';

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
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${
      scrolled 
        ? 'bg-white/10 dark:bg-black/50 backdrop-blur-md border-white/10 py-3' 
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
                className={`text-sm font-medium transition-all hover:text-primary hover:scale-105 ${
                  location.pathname === link.path 
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
                        className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 ${
                          language === lang.code 
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
              className="text-slate-600 dark:text-slate-300 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-0 left-0 w-full h-screen bg-slate-50 dark:bg-black/95 backdrop-blur-xl z-50 flex flex-col p-8">
          <div className="flex justify-between items-center mb-12">
             <span className="font-display font-black text-3xl text-navy dark:text-white">SKYE.</span>
             <button onClick={() => setIsOpen(false)}><X size={32} className="text-slate-500" /></button>
          </div>
          
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-display font-bold ${
                  location.pathname === link.path ? 'text-primary' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto space-y-6">
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
            <Button to="/contact" variant="accent" className="w-full justify-center py-4">
              {t.nav.cta}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  const { t } = useApp();
  return (
    <footer className="relative pt-24 pb-10 border-t border-white/5 bg-black/20 backdrop-blur-sm mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="font-display font-black text-3xl tracking-tighter text-white">
              SKYE
              <span className="text-primary">.</span>
            </h3>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              {t.hero.subtitle}
            </p>
            <div className="flex space-x-4">
              {[Linkedin, Github, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="bg-white/5 hover:bg-primary hover:text-white text-slate-400 p-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_#0ea5e9]">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-bold text-xl mb-6 text-white">Direct naar</h3>
            <ul className="space-y-3">
              {[
                { name: t.nav.home, path: '/' },
                { name: t.nav.pricing, path: '/pricing' },
                { name: t.nav.services, path: '/services' },
                { name: t.nav.contact, path: '/contact' }
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-slate-400 hover:text-primary hover:translate-x-2 transition-all flex items-center group w-fit">
                    <ChevronRight size={14} className="mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Status */}
          <div>
            <h3 className="font-display font-bold text-xl mb-6 text-white">Status</h3>
            <div className="flex items-center gap-2 text-green-400 mb-4 bg-green-400/10 w-fit px-3 py-1 rounded-full text-sm font-medium border border-green-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Beschikbaar voor nieuwe partners
            </div>
            <p className="text-slate-500 text-sm">
              Based in Wakanda.<br/>Serving Global Clients.
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; 2025 SKYE. {t.footer.rights} {t.footer.built}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Algemene Voorwaarden</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

      <Navbar />
      <main className="flex-grow pt-24 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
