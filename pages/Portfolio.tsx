
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, MessageCircle } from 'lucide-react';
import Button from '../components/Button';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { useApp } from '../context/AppContext';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  challenge: string;
  result: string;
  tech: string[];
  slides?: string[]; // Multiple screenshots for slideshow
}

const Portfolio: React.FC = () => {
  const { t } = useApp();
  // Map titles to actual file names
  const titleToFile: Record<string, string> = {
    'Hope Connects': 'hopeconnects',
    'LuxeEstate': 'luxestate',
    'VSB Sint-Maarten': 'vsb-sint-maarten',
    'El Churasco': 'elchurasco'
  };

  const portfolioData: PortfolioItem[] = t.portfolio.items.map((item, index) => {
    const fileName = titleToFile[item.title] || item.title.toLowerCase().replace(/\s+/g, '');
    return {
      id: String(index + 1),
      ...item,
      thumbnail: `/projects/${fileName}.png`,
      slides: [`/projects/${fileName}.png`]
    };
  });

  const [filter, setFilter] = useState(t.portfolio.categories.all);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const categories = [
    t.portfolio.categories.all,
    t.portfolio.categories.business,
    t.portfolio.categories.ecommerce,
    t.portfolio.categories.service
  ];

  const filteredItems = filter === t.portfolio.categories.all
    ? portfolioData
    : portfolioData.filter(item => item.category === filter);

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    setCurrentSlide(0);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    if (selectedItem?.slides) {
      setCurrentSlide((prev) => (prev + 1) % selectedItem.slides.length);
    }
  };

  const prevSlide = () => {
    if (selectedItem?.slides) {
      setCurrentSlide((prev) => (prev - 1 + selectedItem.slides.length) % selectedItem.slides.length);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg pb-20 transition-colors duration-300">
      <SEOHead
        title="Showcase & Cases | Projecten & Referenties - SKYE"
        description="Bekijk onze Design & Automation portfolio. Echte resultaten voor ondernemers: restaurants, vastgoed, scholen en meer."
        keywords="design automation portfolio, website referenties, systeem voorbeelden, portfolio developer"
        canonical="https://skye.be/#/portfolio"
      />
      <section className="bg-navy dark:bg-black py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">{t.portfolio.title}</h1>
          <p className="text-xl text-slate-300">
            {t.portfolio.subtitle}
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white dark:bg-darkCard text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-panel bg-white dark:bg-darkCard rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-slate-100 dark:border-white/10 cursor-pointer"
              onClick={() => item.slides && openModal(item)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to placeholder if screenshot fails
                    (e.target as HTMLImageElement).src = 'https://picsum.photos/600/400';
                  }}
                />
                <div className="absolute top-4 right-4 bg-navy/90 backdrop-blur text-white text-xs px-3 py-1 rounded-full">
                  {item.category}
                </div>
                {item.slides && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 dark:bg-darkCard/90 backdrop-blur rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform">
                      <Maximize2 className="text-navy dark:text-white" size={24} />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-4">
                  {item.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.portfolio.labels.problem}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider">{t.portfolio.labels.result}</p>
                    <p className="text-sm text-navy dark:text-white font-medium leading-relaxed">{item.result}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 border-t border-slate-100 dark:border-white/10 pt-4">
                  {item.tech.map((t, i) => (
                    <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-16 text-center">
          <div className="glass-panel bg-white dark:bg-darkCard/50 rounded-2xl p-8 border border-slate-100 dark:border-white/10 max-w-2xl mx-auto">
            <h3 className="font-display font-bold text-2xl text-navy dark:text-white mb-4">{t.portfolio.cta.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">{t.portfolio.cta.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button to="/contact" variant="primary">{t.portfolio.cta.contact}</Button>
              <a
                href="https://wa.me/31645998932"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
              >
                <MessageCircle size={18} />
                {t.portfolio.cta.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Slideshow */}
      {selectedItem && selectedItem.slides && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] bg-white dark:bg-darkCard rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur text-white p-2 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            {/* Slideshow */}
            <div className="relative h-[70vh] bg-slate-900 flex items-center justify-center">
              <img
                src={selectedItem.slides[currentSlide]}
                alt={`${selectedItem.title} - Slide ${currentSlide + 1}`}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = selectedItem.thumbnail;
                }}
              />

              {/* Navigation Arrows */}
              {selectedItem.slides.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 bg-white/10 hover:bg-white/20 backdrop-blur text-white p-3 rounded-full transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 bg-white/10 hover:bg-white/20 backdrop-blur text-white p-3 rounded-full transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Slide Indicators */}
              {selectedItem.slides.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {selectedItem.slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                          ? 'bg-primary w-8'
                          : 'bg-white/30 hover:bg-white/50'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="p-6 border-t border-slate-200 dark:border-white/10">
              <h3 className="font-display font-bold text-2xl text-navy dark:text-white mb-2">
                {selectedItem.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {t.portfolio.labels.slide.replace('{current}', String(currentSlide + 1)).replace('{total}', String(selectedItem.slides?.length || 1))}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
