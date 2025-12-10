import React from 'react';
import { useApp } from '../context/AppContext';

const ClientTrust: React.FC = () => {
    // Hardcoded for now as per plan, but could be moved to translations
    return (
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6 text-center">
                Al 10+ ondernemers uit Brugge gingen je voor
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Text based logos to simulate brand trust */}
                <div className="text-xl font-bold font-serif text-slate-800 dark:text-slate-200">
                    Tanoshi Sushi
                </div>
                <div className="text-xl font-black font-mono tracking-tighter text-slate-800 dark:text-slate-200 border-2 border-slate-800 dark:border-slate-200 p-1">
                    MANCODE
                </div>
                <div className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <span className="bg-blue-600 text-white px-1">VSB</span> Sint-Maarten
                </div>
                <div className="text-lg font-medium italic text-slate-800 dark:text-slate-200">
                    LuxeEstate
                </div>
            </div>
        </div>
    );
};

export default ClientTrust;
