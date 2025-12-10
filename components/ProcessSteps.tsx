import React from 'react';
import { Phone, Hammer, TrendingUp, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProcessSteps: React.FC = () => {
    const { t } = useApp();

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-display font-bold text-3xl md:text-5xl text-navy dark:text-white mb-6">
                        {t.home.process_steps.title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0"></div>

                    {/* Step 1 */}
                    <div className="relative z-10 bg-white/50 dark:bg-navy/50 backdrop-blur-sm p-8 rounded-3xl border border-white/20 dark:border-white/10 shadow-lg group hover:transform hover:-translate-y-2 transition-all duration-300">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-white dark:from-blue-900 dark:to-navy rounded-2xl flex items-center justify-center text-primary mb-6 shadow-inner border border-white/50">
                            <Phone size={32} />
                        </div>
                        <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
                            {t.home.process_steps.step1.duration}
                        </div>
                        <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-3">
                            1. {t.home.process_steps.step1.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            {t.home.process_steps.step1.desc}
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative z-10 bg-white/50 dark:bg-navy/50 backdrop-blur-sm p-8 rounded-3xl border border-white/20 dark:border-white/10 shadow-lg group hover:transform hover:-translate-y-2 transition-all duration-300 delay-100">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-100 to-white dark:from-purple-900 dark:to-navy rounded-2xl flex items-center justify-center text-purple-600 mb-6 shadow-inner border border-white/50">
                            <Hammer size={32} />
                        </div>
                        <div className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
                            {t.home.process_steps.step2.duration}
                        </div>
                        <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-3">
                            2. {t.home.process_steps.step2.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            {t.home.process_steps.step2.desc}
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative z-10 bg-white/50 dark:bg-navy/50 backdrop-blur-sm p-8 rounded-3xl border border-green-500/20 dark:border-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.1)] group hover:transform hover:-translate-y-2 transition-all duration-300 delay-200">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-100 to-white dark:from-green-900 dark:to-navy rounded-2xl flex items-center justify-center text-green-600 mb-6 shadow-inner border border-white/50">
                            <TrendingUp size={32} />
                        </div>
                        <div className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300 text-xs font-bold uppercase tracking-wider mb-4">
                            {t.home.process_steps.step3.duration}
                        </div>
                        <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-3">
                            3. {t.home.process_steps.step3.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            {t.home.process_steps.step3.desc}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSteps;
