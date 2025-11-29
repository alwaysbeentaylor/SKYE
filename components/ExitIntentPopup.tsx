import React from 'react';
import { X, Download, Gift, MessageCircle } from 'lucide-react';
import { useExitIntent } from '../hooks/useExitIntent';
import { trackEvent, trackLeadMagnetDownload, trackCTAClick } from '../utils/analytics';
import Button from './Button';
import { useApp } from '../context/AppContext';

const ExitIntentPopup: React.FC = () => {
  const { t } = useApp();
  const { shouldShow, dismiss } = useExitIntent({ enabled: true, threshold: 50 });

  if (!shouldShow) return null;

  const handleDownload = () => {
    trackLeadMagnetDownload('Website Huren vs Kopen Gids');
    trackCTAClick('Download Gratis Gids', 'exit-intent-popup');
    // In production, this would trigger actual download
    window.open('/leadmagnet.pdf', '_blank');
    dismiss();
  };

  const handleContact = () => {
    trackCTAClick('Plan Gratis Consultatie', 'exit-intent-popup');
    window.location.href = '/#/contact';
    dismiss();
  };

  const handleWhatsApp = () => {
    trackCTAClick('WhatsApp Direct', 'exit-intent-popup');
    window.open('https://wa.me/31645998932?text=Hoi%20Hope!%20Ik%20wil%20graag%20praten%20over%20een%20website.', '_blank');
    dismiss();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={dismiss}
    >
      <div 
        className="relative max-w-lg w-full bg-white dark:bg-darkCard rounded-2xl shadow-2xl p-8 animate-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          aria-label={t.common.close}
        >
          <X size={20} className="text-slate-600 dark:text-slate-300" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Gift className="text-primary" size={32} />
          </div>
          <h2 className="font-display font-bold text-2xl text-navy dark:text-white mb-2">
            {t.exit_intent.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            {t.exit_intent.message}
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleDownload}
            variant="primary"
            className="w-full justify-center py-4 text-lg"
          >
            <Download size={20} className="mr-2" />
            {t.exit_intent.download}
          </Button>

          <Button
            onClick={handleContact}
            variant="accent"
            className="w-full justify-center py-4 text-lg"
          >
            {t.exit_intent.consultation}
          </Button>

          <a
            href="https://wa.me/31645998932?text=Hoi%20Hope!%20Ik%20wil%20graag%20praten%20over%20een%20website."
            onClick={handleWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300"
          >
            <MessageCircle size={20} />
            {t.exit_intent.whatsapp}
          </a>
        </div>

        <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-4">
          {t.exit_intent.privacy_note}
        </p>
      </div>
    </div>
  );
};

export default ExitIntentPopup;



