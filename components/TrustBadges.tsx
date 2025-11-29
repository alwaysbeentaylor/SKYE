import React from 'react';
import { ShieldCheck, Lock, CheckCircle, Award, Clock, Users } from 'lucide-react';

interface TrustBadge {
  icon: React.ReactNode;
  text: string;
  highlight?: boolean;
}

interface TrustBadgesProps {
  variant?: 'default' | 'compact' | 'banner';
  badges?: TrustBadge[];
}

const defaultBadges: TrustBadge[] = [
  {
    icon: <ShieldCheck size={20} />,
    text: 'SSL Beveiligd',
    highlight: false
  },
  {
    icon: <Lock size={20} />,
    text: 'GDPR Compliant',
    highlight: false
  },
  {
    icon: <CheckCircle size={20} />,
    text: '30-dagen Garantie',
    highlight: true
  },
  {
    icon: <Award size={20} />,
    text: 'Gratis Consultatie',
    highlight: true
  },
  {
    icon: <Clock size={20} />,
    text: 'Start binnen 2 weken',
    highlight: false
  },
  {
    icon: <Users size={20} />,
    text: '50+ Tevreden Klanten',
    highlight: false
  }
];

const TrustBadges: React.FC<TrustBadgesProps> = ({ 
  variant = 'default',
  badges = defaultBadges
}) => {
  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-y border-primary/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 ${
                  badge.highlight
                    ? 'text-primary font-bold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className={badge.highlight ? 'text-primary' : 'text-slate-400'}>
                  {badge.icon}
                </div>
                <span className="text-sm font-medium whitespace-nowrap">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center gap-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              badge.highlight
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300'
            }`}
          >
            <div className={badge.highlight ? 'text-primary' : 'text-slate-400'}>
              {badge.icon}
            </div>
            <span className="text-xs font-medium">
              {badge.text}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {badges.map((badge, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 p-4 rounded-xl ${
            badge.highlight
              ? 'bg-primary/10 border-2 border-primary/30 text-primary'
              : 'bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
          }`}
        >
          <div className={badge.highlight ? 'text-primary' : 'text-slate-400'}>
            {badge.icon}
          </div>
          <span className="text-sm font-medium">
            {badge.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;







