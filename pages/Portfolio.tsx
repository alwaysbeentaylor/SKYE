
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const portfolioData = [
  {
    id: '1',
    title: 'Financieel Adviesbureau',
    category: 'Zakelijk',
    image: 'https://picsum.photos/seed/finance/600/400',
    challenge: 'Oude website was traag en straalde geen vertrouwen uit.',
    result: 'Een strakke, snelle corporate site die professionaliteit ademt. Klanten nemen nu serieus contact op.',
    tech: ['Basis Pakket', 'Next.js']
  },
  {
    id: '2',
    title: 'Lokale Retailer',
    category: 'E-commerce',
    image: 'https://picsum.photos/seed/retail/600/400',
    challenge: 'Wilde producten online tonen maar geen ingewikkelde shop beheren.',
    result: 'Hybride site met etalage-functie. Klanten komen nu voorbereid naar de winkel.',
    tech: ['Groei Pakket', 'CMS Integratie']
  },
  {
    id: '3',
    title: 'Coaching Praktijk',
    category: 'Dienstverlening',
    image: 'https://picsum.photos/seed/coach/600/400',
    challenge: 'Veel tijd kwijt aan afspraken inplannen via de mail.',
    result: 'Website met geïntegreerde booking tool. Bespaart 5 uur administratie per week.',
    tech: ['Groei Pakket', 'Automation']
  }
];

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('Alles');
  const categories = ['Alles', 'Zakelijk', 'E-commerce', 'Dienstverlening'];

  const filteredItems = filter === 'Alles' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg pb-20 transition-colors duration-300">
      <section className="bg-navy dark:bg-black py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">Echte resultaten</h1>
          <p className="text-xl text-slate-300">
            Geen abstracte kunst, maar websites die werken voor ondernemers.
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
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
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
            <div key={item.id} className="glass-panel bg-white dark:bg-darkCard rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-slate-100 dark:border-white/10">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-navy/90 backdrop-blur text-white text-xs px-3 py-1 rounded-full">
                  {item.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-4">
                  {item.title}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Probleem</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider">Resultaat</p>
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
      </div>
    </div>
  );
};

export default Portfolio;
