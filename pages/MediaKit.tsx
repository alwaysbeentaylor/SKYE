
import React from 'react';
import { Check } from 'lucide-react';

const MediaKit: React.FC = () => {
  return (
    <div className="min-h-screen bg-black p-8 font-display">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">SKYE Social Media Kit</h1>
          <p className="text-slate-400">Maak screenshots van deze designs om te delen.</p>
        </div>

        <div className="space-y-32">
          
          {/* 1. STORY FORMAT (9:16) */}
          <div className="flex flex-col items-center py-16">
            <h3 className="text-white mb-6 text-sm font-bold uppercase tracking-wider">Instagram / TikTok Story</h3>
            <div className="w-[375px] h-[667px] bg-gradient-to-br from-slate-900 to-black border-4 border-white/10 rounded-[40px] relative overflow-hidden shadow-2xl flex flex-col">
               {/* Content */}
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/30 rounded-full blur-[80px]"></div>
               
               <div className="relative z-10 p-8 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-12">
                    <span className="font-black text-2xl text-white italic">SKYE.</span>
                    <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-white uppercase border border-white/10">Launch Offer</div>
                  </div>

                  <div className="mt-auto mb-12">
                    <h2 className="text-5xl font-black text-white leading-[0.9] mb-6">
                      STOP<br/>
                      MET<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">BETALEN</span>
                    </h2>
                    <p className="text-xl text-slate-300 font-light leading-tight mb-8">
                      Geen €5.000 voor een website.<br/> 
                      Gewoon <strong>€150 per maand</strong>.
                    </p>
                    
                    <div className="bg-white/5 backdrop-blur border border-white/10 p-4 rounded-xl mb-8">
                       <div className="flex items-center text-white mb-2"><Check size={16} className="text-primary mr-2"/> Custom Design</div>
                       <div className="flex items-center text-white mb-2"><Check size={16} className="text-primary mr-2"/> Hosting & Updates</div>
                       <div className="flex items-center text-white"><Check size={16} className="text-primary mr-2"/> Maandelijks opzegbaar</div>
                    </div>

                    <div className="bg-primary text-white text-center py-4 rounded-xl font-bold text-xl shadow-[0_0_20px_rgba(14,165,233,0.5)]">
                      Skye-unlimited.be
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* 2. FEED FORMAT (1:1) */}
          <div className="flex flex-col items-center py-16">
            <h3 className="text-white mb-6 text-sm font-bold uppercase tracking-wider">Instagram Feed (Square)</h3>
            <div className="w-[500px] h-[500px] bg-white relative overflow-hidden shadow-2xl flex flex-col justify-center items-center text-center p-12">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary"></div>
               
               <h2 className="font-black text-6xl text-slate-900 mb-2 tracking-tighter">SKYE</h2>
               <p className="text-primary font-bold text-xl tracking-widest uppercase mb-8">Is The Limit</p>
               
               <div className="w-full h-px bg-slate-200 mb-8 max-w-[200px]"></div>

               <p className="text-3xl font-bold text-slate-800 mb-2">Website-as-a-Service</p>
               <p className="text-slate-500 mb-8">Professioneel online voor de prijs van een etentje.</p>

               <div className="flex items-baseline gap-2">
                 <span className="text-6xl font-black text-slate-900">€150</span>
                 <span className="text-xl text-slate-500 font-medium">/mnd</span>
               </div>

               <div className="absolute bottom-6 text-xs font-bold text-slate-300 uppercase tracking-widest">Skye-unlimited.be</div>
            </div>
          </div>

          {/* 3. LINKEDIN/FB HEADER */}
          <div className="flex flex-col items-center w-full py-16">
            <h3 className="text-white mb-6 text-sm font-bold uppercase tracking-wider">LinkedIn / Facebook Cover</h3>
            <div className="w-full aspect-[1.91/1] bg-slate-900 relative overflow-hidden shadow-2xl flex items-center px-16 border border-white/10 rounded-xl">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-slate-900 to-black"></div>
               
               <div className="relative z-10 w-2/3">
                 <div className="inline-block px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded text-xs font-bold uppercase tracking-wider mb-4">New Business Model</div>
                 <h2 className="text-5xl font-black text-white mb-4 leading-tight">
                   Je bedrijf online.<br/>
                   Zonder grote investering.
                 </h2>
                 <p className="text-xl text-slate-400 max-w-lg">
                   Wij bouwen, beheren en updaten jouw website voor een vast bedrag per maand. Focus jij je maar op ondernemen.
                 </p>
               </div>

               <div className="relative z-10 w-1/3 flex justify-end">
                 <div className="bg-white/5 backdrop-blur border border-white/10 p-8 rounded-2xl text-center min-w-[200px]">
                    <div className="text-sm text-slate-400 uppercase font-bold mb-2">Start Vanaf</div>
                    <div className="text-5xl font-black text-white mb-1">€150</div>
                    <div className="text-xs text-primary font-bold uppercase tracking-widest">Per Maand</div>
                 </div>
               </div>
            </div>
          </div>

        </div>
        
        <div className="mt-32 mb-16 text-center">
          <p className="text-slate-500 text-sm">Scroll omhoog om alle designs te zien</p>
        </div>
      </div>
    </div>
  );
};

export default MediaKit;

