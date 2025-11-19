
import React from 'react';
import { User, Terminal, Shield } from 'lucide-react';
import Button from '../components/Button';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg transition-colors duration-300">
      {/* Hero / Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass-panel bg-white dark:bg-darkCard/50 rounded-2xl shadow-lg p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-slate-100 dark:border-white/10">
           <div className="md:w-1/3">
             <div className="relative">
                <div className="absolute inset-0 bg-primary transform translate-x-4 translate-y-4 rounded-xl opacity-20"></div>
                <div className="w-full aspect-[4/5] bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden">
                   {/* Placeholder for Hope's image */}
                   <User size={80} className="text-slate-400" />
                   <img 
                     src="https://picsum.photos/seed/hope/500/600" 
                     alt="Hope" 
                     className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-500 grayscale"
                   />
                </div>
             </div>
           </div>
           <div className="md:w-2/3">
             <h1 className="font-display font-bold text-4xl text-navy dark:text-white mb-6">Hoi, ik ben Hope.</h1>
             <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
               <p>
                 Ik ben geen bureau met tien lagen management, accountmanagers en dure kantoorpanden. 
                 Als we samenwerken, spreek je direct met mij: degene die jouw site bouwt.
               </p>
               <p>
                 Ik hou niet van vage beloftes, uurtje-factuurtje verrassingen of wazige facturen. 
                 Jij wilt als ondernemer gewoon weten waar je aan toe bent.
               </p>
               <p>
                 Daarom werk ik met vaste maandbedragen. Duidelijkheid vooraf. 
                 Als iets niet nodig is, zeg ik het eerlijk. Als iets beter kan, zeg ik het ook.
               </p>
               <p className="font-bold text-navy dark:text-white text-xl pt-2">
                 Geen gedoe. Wel resultaat.
               </p>
             </div>
             <div className="mt-8">
               <Button to="/pricing" variant="primary">Bekijk wat je krijgt voor €150</Button>
             </div>
           </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-navy dark:bg-black py-20 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                 <div className="text-primary mb-4 flex justify-center"><Terminal size={32} /></div>
                 <h3 className="font-bold text-lg mb-2">Direct Contact</h3>
                 <p className="text-slate-400 text-sm">Geen 'ik geef het door'. Je hebt direct lijn met de techniek.</p>
              </div>
              <div className="p-6 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                 <div className="text-primary mb-4 flex justify-center"><Shield size={32} /></div>
                 <h3 className="font-bold text-lg mb-2">Eerlijk & Transparant</h3>
                 <p className="text-slate-400 text-sm">Huren is flexibel. Kopen is een keuze. Geen kleine lettertjes.</p>
              </div>
              <div className="p-6 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                 <div className="text-primary mb-4 flex justify-center"><User size={32} /></div>
                 <h3 className="font-bold text-lg mb-2">Geen Bullshit</h3>
                 <p className="text-slate-400 text-sm">Ik verkoop geen gouden bergen. Ik bouw systemen die werken.</p>
              </div>
           </div>
         </div>
      </section>
    </div>
  );
};

export default About;
