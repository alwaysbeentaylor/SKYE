import { useEffect } from 'react';

interface StructuredDataProps {
  type: 'LocalBusiness' | 'Organization' | 'Service' | 'BreadcrumbList' | 'WebSite';
  data?: any;
}

// Base business information
const BUSINESS_INFO = {
  name: 'SKYE',
  description: 'Professioneel webdesign en website ontwikkeling in Brugge. Websites voor ondernemers vanaf €150 per maand.',
  url: 'https://skye.be',
  logo: 'https://skye.be/logo.png', // Update met jouw logo URL
  image: 'https://skye.be/og-image.jpg', // Update met jouw OG image URL
  email: 'info@hope-connects.nl',
  telephone: '+31645998932',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '', // Voeg je adres toe indien beschikbaar
    addressLocality: 'Brugge',
    postalCode: '8000',
    addressRegion: 'West-Vlaanderen',
    addressCountry: 'BE'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.2093,
    longitude: 3.2247
  },
  priceRange: '€€',
  openingHours: 'Mo-Fr 09:00-18:00'
};

// Helper function to generate JSON-LD
const generateJsonLd = (type: string, data?: any) => {
  let jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'LocalBusiness':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': BUSINESS_INFO.url,
        name: BUSINESS_INFO.name,
        description: BUSINESS_INFO.description,
        url: BUSINESS_INFO.url,
        logo: BUSINESS_INFO.logo,
        image: BUSINESS_INFO.image,
        email: BUSINESS_INFO.email,
        telephone: BUSINESS_INFO.telephone,
        address: BUSINESS_INFO.address,
        geo: BUSINESS_INFO.geo,
        priceRange: BUSINESS_INFO.priceRange,
        openingHours: BUSINESS_INFO.openingHours,
        areaServed: {
          '@type': 'City',
          name: 'Brugge'
        },
        ...data
      };
      break;

    case 'Organization':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': BUSINESS_INFO.url,
        name: BUSINESS_INFO.name,
        description: BUSINESS_INFO.description,
        url: BUSINESS_INFO.url,
        logo: BUSINESS_INFO.logo,
        image: BUSINESS_INFO.image,
        email: BUSINESS_INFO.email,
        telephone: BUSINESS_INFO.telephone,
        address: BUSINESS_INFO.address,
        sameAs: [
          // Voeg je social media links toe
          // 'https://www.linkedin.com/company/skye',
          // 'https://www.instagram.com/skye',
        ],
        ...data
      };
      break;

    case 'Service':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: data?.serviceType || 'Web Design Service',
        provider: {
          '@type': 'LocalBusiness',
          name: BUSINESS_INFO.name,
          address: BUSINESS_INFO.address
        },
        areaServed: {
          '@type': 'City',
          name: 'Brugge'
        },
        description: data?.description || BUSINESS_INFO.description,
        ...data
      };
      break;

    case 'WebSite':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: BUSINESS_INFO.name,
        url: BUSINESS_INFO.url,
        description: BUSINESS_INFO.description,
        publisher: {
          '@type': 'Organization',
          name: BUSINESS_INFO.name,
          logo: {
            '@type': 'ImageObject',
            url: BUSINESS_INFO.logo
          }
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BUSINESS_INFO.url}/?s={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        },
        ...data
      };
      break;

    case 'BreadcrumbList':
      if (data?.items) {
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.items.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url || `${BUSINESS_INFO.url}${item.path}`
          }))
        };
      }
      break;
  }

  // Remove undefined values
  Object.keys(jsonLd).forEach(key => {
    if (jsonLd[key] === undefined) {
      delete jsonLd[key];
    }
  });

  return jsonLd;
};

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  // Inject structured data IMMEDIATELY (synchronously) when component is called
  // This ensures Google's crawler can see it even if JavaScript execution is delayed
  if (typeof window !== 'undefined') {
    const scriptId = `structured-data-${type.toLowerCase()}`;
    
    // Only inject if it doesn't already exist (prevent duplicates)
    if (!document.getElementById(scriptId)) {
      const jsonLd = generateJsonLd(type, data);
      
      // Create and append script tag IMMEDIATELY
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd, null, 2);
      document.head.appendChild(script);
    }
  }

  // useEffect as fallback for dynamic updates (if data changes)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const scriptId = `structured-data-${type.toLowerCase()}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    const jsonLd = generateJsonLd(type, data);
    script.textContent = JSON.stringify(jsonLd, null, 2);
  }, [type, data]);

  return null;
};

export default StructuredData;