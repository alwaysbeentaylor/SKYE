import React from 'react';
import { Phone, Hammer, TrendingUp, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProcessSteps: React.FC = () => {
    const { t } = useApp();

    return (
        <section className="py-12 md:py-20 relative overflow-hidden">
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
                {/* Header - Links uitgelijnd */}
                <div className="mb-8 md:mb-12">
                    <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-navy dark:text-white">
                        {t.home.process_steps.title}
                    </h2>
                </div>

                {/* Stappen - Horizontaal scroll op mobile, grid op desktop */}
                <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative snap-x snap-mandatory">

                    {/* Step 1 */}
                    <div className="flex-shrink-0 w-[85vw] sm:w-auto snap-start relative z-10 bg-white/50 dark:bg-navy/50 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-white/20 dark:border-white/10 shadow-lg group hover:transform hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-blue-100 to-white dark:from-blue-900 dark:to-navy rounded-xl flex items-center justify-center text-primary shadow-inner border border-white/50">
                                <Phone size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="inline-block px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
                                    {t.home.process_steps.step1.duration}
                                </div>
                                <h3 className="font-display font-bold text-lg text-navy dark:text-white mb-2">
                                    1. {t.home.process_steps.step1.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    {t.home.process_steps.step1.desc}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex-shrink-0 w-[85vw] sm:w-auto snap-start relative z-10 bg-white/50 dark:bg-navy/50 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-white/20 dark:border-white/10 shadow-lg group hover:transform hover:-translate-y-1 transition-all duration-300 lg:translate-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-purple-100 to-white dark:from-purple-900 dark:to-navy rounded-xl flex items-center justify-center text-purple-600 shadow-inner border border-white/50">
                                <Hammer size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="inline-block px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
                                    {t.home.process_steps.step2.duration}
                                </div>
                                <h3 className="font-display font-bold text-lg text-navy dark:text-white mb-2">
                                    2. {t.home.process_steps.step2.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    {t.home.process_steps.step2.desc}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex-shrink-0 w-[85vw] sm:w-auto snap-start relative z-10 bg-white/50 dark:bg-navy/50 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-green-500/20 dark:border-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.1)] group hover:transform hover:-translate-y-1 transition-all duration-300 sm:col-span-2 lg:col-span-1 lg:-translate-y-2">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-green-100 to-white dark:from-green-900 dark:to-navy rounded-xl flex items-center justify-center text-green-600 shadow-inner border border-white/50">
                                <TrendingUp size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="inline-block px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300 text-xs font-bold uppercase tracking-wider mb-2">
                                    {t.home.process_steps.step3.duration}
                                </div>
                                <h3 className="font-display font-bold text-lg text-navy dark:text-white mb-2">
                                    3. {t.home.process_steps.step3.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    {t.home.process_steps.step3.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSteps;
