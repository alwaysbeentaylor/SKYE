
import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

const Unsubscribe: React.FC = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const { t } = useApp();
    const [status, setStatus] = useState<'confirm' | 'unsubscribed' | 'stayed'>('confirm');

    const handleStay = () => {
        setStatus('stayed');
    };

    const handleUnsubscribe = async () => {
        if (!email) {
            setStatus('unsubscribed');
            return;
        }

        try {
            await fetch('/api/unsubscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
        } catch (error) {
            console.error('Failed to notify unsubscribe:', error);
            // We still show the success state to the user
        }

        setStatus('unsubscribed');
    };

    if (status === 'stayed') {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-darkBg relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>
                <div className="max-w-lg w-full text-center relative z-10 animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={48} className="text-green-500" />
                    </div>
                    <h1 className="font-display font-black text-4xl sm:text-5xl text-navy dark:text-white mb-4 uppercase tracking-tight">
                        {t.unsubscribe?.stay_title || "TOP KEUZE."}
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
                        {t.unsubscribe?.stay_message || "Je blijft op de hoogte van de beste tips voor je business."}
                    </p>
                    <Button to="/" variant="primary" className="mx-auto">
                        Terug naar Home
                    </Button>
                </div>
            </div>
        );
    }

    if (status === 'unsubscribed') {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-darkBg relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>
                <div className="max-w-lg w-full text-center relative z-10 animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <XCircle size={48} className="text-red-500" />
                    </div>
                    <h1 className="font-display font-black text-4xl sm:text-5xl text-navy dark:text-white mb-4 uppercase tracking-tight">
                        {t.unsubscribe?.success_title || "JAMMER."}
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
                        {t.unsubscribe?.success_message || "Je bent uitgeschreven. Je mist nu wel waardevolle tips."}
                    </p>
                    <Button to="/" variant="secondary" className="mx-auto">
                        <ArrowLeft size={16} className="mr-2" /> Terug naar Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-darkBg relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-xl w-full relative z-10">
                <div className="glass-panel-strong p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl text-center">

                    <h1 className="font-display font-black text-5xl sm:text-6xl text-navy dark:text-white mb-6 uppercase tracking-tighter leading-none">
                        {t.unsubscribe?.title || "WACHT EIGENLIJK EVEN."}
                    </h1>

                    <p className="text-xl font-medium text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto leading-relaxed">
                        {t.unsubscribe?.subtitle || "Weet je zeker dat je geen waardevolle tips meer wilt?"}
                        {email && <span className="block mt-2 text-sm text-slate-400 font-normal">({email})</span>}
                    </p>

                    <div className="flex flex-col gap-4">
                        {/* Primary Action (Stay) */}
                        <button
                            onClick={handleStay}
                            className="w-full bg-primary hover:bg-primaryDark text-white font-bold text-xl py-5 px-8 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] transform hover:scale-105 transition-all uppercase tracking-wide"
                        >
                            {t.unsubscribe?.button_stay || "NEE! IK WIL BLIJVEN GROEIEN"}
                        </button>

                        {/* Secondary Action (Leave) */}
                        <button
                            onClick={handleUnsubscribe}
                            className="w-full bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 hover:text-red-500 font-bold text-sm py-4 px-8 rounded-xl transition-all uppercase tracking-widest mt-2"
                        >
                            {t.unsubscribe?.button_leave || "JA, SCHRIJF ME UIT"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Unsubscribe;
