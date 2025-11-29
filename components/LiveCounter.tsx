import React, { useState, useEffect } from 'react';

interface LiveCounterProps {
  baseCount?: number;
  prefix?: string;
  suffix?: string;
  animationDuration?: number;
}

const LiveCounter: React.FC<LiveCounterProps> = ({
  baseCount = 50,
  prefix = 'Al ',
  suffix = ' ondernemers gingen je voor',
  animationDuration = 2000
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Get stored count or use base
    const stored = localStorage.getItem('live-counter');
    const startCount = stored ? parseInt(stored) : baseCount;
    
    // Animate to target count
    const targetCount = startCount;
    const increment = targetCount / (animationDuration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    setIsVisible(true);

    return () => clearInterval(timer);
  }, [baseCount, animationDuration]);

  // Increment count when someone converts (stored in localStorage by conversion tracking)
  useEffect(() => {
    const checkNewConversions = () => {
      const conversions = localStorage.getItem('conversion-count');
      if (conversions) {
        const newCount = baseCount + parseInt(conversions);
        setCount(newCount);
        localStorage.setItem('live-counter', newCount.toString());
      }
    };

    checkNewConversions();
    const interval = setInterval(checkNewConversions, 5000);
    return () => clearInterval(interval);
  }, [baseCount]);

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex -space-x-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-8 h-8 rounded-full bg-primary border-2 border-white dark:border-slate-800"></div>
        ))}
      </div>
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {prefix}
        <span className="text-primary font-bold">{count}+</span>
        {suffix}
      </span>
    </div>
  );
};

export default LiveCounter;






