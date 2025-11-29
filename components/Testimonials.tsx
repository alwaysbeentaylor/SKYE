import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  company?: string;
  role?: string;
  text: string;
  rating?: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  variant?: 'default' | 'carousel' | 'grid';
  maxItems?: number;
}

const Testimonials: React.FC<TestimonialsProps> = ({ 
  testimonials, 
  variant = 'default',
  maxItems 
}) => {
  const displayTestimonials = maxItems ? testimonials.slice(0, maxItems) : testimonials;

  if (variant === 'carousel') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayTestimonials.map((testimonial, index) => (
          <div 
            key={index}
            className="glass-panel bg-white dark:bg-darkCard/50 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-white/10 h-full"
          >
            <Quote className="text-primary mb-4" size={24} />
            <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed italic">
              "{testimonial.text}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-navy dark:text-white text-sm">
                  {testimonial.name}
                </p>
                {testimonial.company && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {testimonial.company}
                  </p>
                )}
              </div>
              {testimonial.rating && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < testimonial.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-slate-400'}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayTestimonials.map((testimonial, index) => (
          <div 
            key={index}
            className="glass-panel bg-white dark:bg-darkCard p-6 rounded-xl border border-slate-200 dark:border-white/10"
          >
            <Quote className="text-primary mb-4" size={24} />
            <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed italic">
              "{testimonial.text}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-navy dark:text-white text-sm">
                  {testimonial.name}
                </p>
                {testimonial.role && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {testimonial.role}
                    {testimonial.company && ` bij ${testimonial.company}`}
                  </p>
                )}
              </div>
              {testimonial.rating && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < testimonial.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className="space-y-6">
      {displayTestimonials.map((testimonial, index) => (
        <div 
          key={index}
          className="glass-panel bg-white dark:bg-darkCard p-6 rounded-xl border border-slate-200 dark:border-white/10"
        >
          <Quote className="text-primary mb-4" size={24} />
          <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed italic">
            "{testimonial.text}"
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-navy dark:text-white text-sm">
                {testimonial.name}
              </p>
              {testimonial.role && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {testimonial.role}
                  {testimonial.company && ` bij ${testimonial.company}`}
                </p>
              )}
            </div>
            {testimonial.rating && (
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < testimonial.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;

