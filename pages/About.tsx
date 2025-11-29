
import React from 'react';
import { Code2, Zap, Target, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import Button from '../components/Button';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg transition-colors duration-300">
      {/* Hero Section with Abstract Visual */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Abstract Visual Identity */}
            <div className="relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Layered Geometric Shapes */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-3xl transform rotate-6"></div>
                <div className="absolute inset-4 bg-gradient-to-tr from-primary/30 via-transparent to-transparent rounded-3xl transform -rotate-6"></div>
                
                {/* Code-like Grid Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-30 rounded-3xl"></div>
                
                {/* Central Focus Element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Pulsing Rings */}
                    <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping"></div>
                    <div className="absolute inset-4 border-2 border-primary/20 rounded-full animate-ping delay-500"></div>
                    
                    {/* Central Icon */}
                    <div className="relative w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center transform rotate-12 shadow-2xl shadow-primary/50">
                      <Code2 className="text-white" size={48} />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-primary/20 rounded-xl transform rotate-45 backdrop-blur-sm border border-primary/30"></div>
                <div className="absolute bottom-12 left-12 w-12 h-12 bg-accent/20 rounded-lg transform -rotate-12 backdrop-blur-sm border border-accent/30"></div>
                <div className="absolute top-1/2 right-4 w-8 h-8 bg-primary/30 rounded-full"></div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="text-primary font-mono text-sm tracking-widest uppercase">Over Hope</span>
              </div>
              
              <h1 className="font-display font-black text-5xl lg:text-6xl text-navy dark:text-white leading-tight">
                Geen bureau.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Wel resultaat.
                </span>
              </h1>

              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="text-xl">
                  Ik ben Hope. Als we samenwerken, spreek je direct met mij: degene die jouw site bouwt. 
                  Geen accountmanagers, geen lagen, geen doorverwijzingen.
                </p>
                
                <p>
                  Ik hou niet van vage beloftes, uurtje-factuurtje verrassingen of wazige facturen. 
                  Jij wilt als ondernemer gewoon weten waar je aan toe bent.
                </p>
                
                <p>
                  Daarom werk ik met vaste maandbedragen. Duidelijkheid vooraf. 
                  Als iets niet nodig is, zeg ik het eerlijk. Als iets beter kan, zeg ik het ook.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button to="/pricing" variant="primary">
                  Bekijk wat je krijgt voor €150
                  <ArrowRight size={18} className="ml-2" />
                </Button>
                <Button to="/contact" variant="outline">
                  Laten we praten
                </Button>
                <a 
                  href="https://wa.me/31645998932" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                >
                  <MessageCircle size={18} />
                  WhatsApp
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
            <h2 className="font-display font-bold text-4xl text-white mb-4">Waarom anders</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Drie principes die alles anders maken
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
                <h3 className="font-bold text-xl text-white mb-4">Direct Contact</h3>
                <p className="text-slate-400 leading-relaxed">
                  Geen 'ik geef het door'. Je hebt direct lijn met de techniek. 
                  Vragen? Direct antwoord. Problemen? Direct opgelost.
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center text-primary text-sm font-medium">
                    <span>Direct lijn</span>
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
                <h3 className="font-bold text-xl text-white mb-4">Eerlijk & Transparant</h3>
                <p className="text-slate-400 leading-relaxed">
                  Huren is flexibel. Kopen is een keuze. Geen kleine lettertjes, 
                  geen verborgen kosten. Je weet precies waar je aan toe bent.
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center text-accent text-sm font-medium">
                    <span>Geen verrassingen</span>
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
                <h3 className="font-bold text-xl text-white mb-4">Geen Bullshit</h3>
                <p className="text-slate-400 leading-relaxed">
                  Ik verkoop geen gouden bergen. Ik bouw systemen die werken. 
                  Eerlijk advies, realistische verwachtingen, echte resultaten.
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center text-primary text-sm font-medium">
                    <span>Echte resultaten</span>
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
                  De aanpak
                </h2>
                
                <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    Ik geloof niet in complexe structuren waar je door tien lagen moet om bij de techniek te komen. 
                    Ik geloof in directe communicatie, heldere afspraken en systemen die daadwerkelijk werken.
                  </p>
                  
                  <p className="text-xl font-semibold text-navy dark:text-white">
                    Geen gedoe. Wel resultaat. Dat is de belofte.
                  </p>
                  
                  <p>
                    Of je nu een nieuwe website nodig hebt, je bestaande site wilt verbeteren, 
                    of een compleet systeem wilt bouwen: we bespreken het, we maken het, en het werkt.
                  </p>
                </div>

                <div className="pt-8">
                  <Button to="/contact" variant="primary" className="text-lg px-8">
                    Laten we beginnen
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
