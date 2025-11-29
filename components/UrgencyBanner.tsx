import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface UrgencyBannerProps {
  message?: string;
  showCountdown?: boolean;
  availableSpots?: number;
  deadline?: string;
  variant?: 'warning' | 'info' | 'success';
}

const UrgencyBanner: React.FC<UrgencyBannerProps> = ({
  message = "Laatste 3 plekken beschikbaar deze maand - Start binnen 2 weken",
  showCountdown = false,
  availableSpots = 3,
  deadline,
  variant = 'warning'
}) => {
  const variants = {
    warning: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
  };

  return (
    <div className={`${variants[variant]} border-2 rounded-lg p-4 mb-8 animate-in fade-in slide-in-from-top-4 duration-500`}>
      <div className="flex items-start gap-3">
        <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-bold text-sm mb-1">
            {message}
          </p>
          {availableSpots > 0 && (
            <p className="text-xs opacity-90">
              Nog {availableSpots} plek{availableSpots !== 1 ? 'ken' : ''} beschikbaar
            </p>
          )}
          {deadline && (
            <div className="flex items-center gap-2 mt-2 text-xs">
              <Clock size={14} />
              <span>Deadline: {deadline}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UrgencyBanner;

