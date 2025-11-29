import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { trackCTAClick, trackWhatsAppClick } from '../utils/analytics';

const MobileCTABar: React.FC = () => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  // Only show on mobile and not on contact page
  if (isContactPage) return null;

  const handleCTAClick = () => {
    trackCTAClick('Start Nu - €150/maand', 'mobile-bar');
    window.location.href = '/#/pricing';
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('mobile-bar');
    window.open('https://wa.me/31645998932?text=Hoi%20Hope!%20Ik%20wil%20graag%20praten%20over%20een%20website.', '_blank');
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-darkCard border-t border-slate-200 dark:border-white/10 shadow-2xl">
      <div className="flex items-center gap-2 p-3">
        <button
          onClick={handleCTAClick}
          className="flex-1 bg-primary hover:bg-primaryDark text-white px-4 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/30"
        >
          Start Nu - €150/mnd
          <ArrowRight size={18} />
        </button>
        <a
          href="https://wa.me/31645998932?text=Hoi%20Hope!%20Ik%20wil%20graag%20praten%20over%20een%20website."
          onClick={handleWhatsAppClick}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors"
        >
          <MessageCircle size={20} />
        </a>
      </div>
    </div>
  );
};

export default MobileCTABar;






