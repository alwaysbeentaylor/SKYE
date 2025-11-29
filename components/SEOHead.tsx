import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

// Base URL - moet worden aangepast naar jouw productie domain
const BASE_URL = 'https://skye.be'; // VERVANG DIT MET JE ECHTE DOMAIN
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`; // Voeg later OG image toe

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'SKYE | Professioneel Webdesign Brugge - Websites vanaf €150/maand',
  description = 'Professionele website laten maken in Brugge? SKYE biedt webdesign voor ondernemers vanaf €150/maand. Geen €5k vooraf. Direct online. Webdesigner België.',
  keywords = 'webdesign Brugge, website laten maken Brugge, webdesigner België, professionele website ondernemer, webdesign België, website Brugge',
  ogImage = DEFAULT_OG_IMAGE,
  canonical,
  type = 'website',
  noindex = false,
}) => {
  const location = useLocation();
  
  // Generate canonical URL
  const path = location.pathname === '/' ? '' : location.pathname;
  const canonicalUrl = canonical || `${BASE_URL}${path}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Get or create meta tags
    const getOrCreateMeta = (name: string, attribute: 'name' | 'property' = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      return meta;
    };

    // Get or create link tags
    const getOrCreateLink = (rel: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      return link;
    };

    // Basic Meta Tags
    getOrCreateMeta('description').content = description;
    getOrCreateMeta('keywords').content = keywords;
    getOrCreateMeta('author').content = 'SKYE - Hope';
    getOrCreateMeta('robots').content = noindex ? 'noindex, nofollow' : 'index, follow';
    getOrCreateMeta('googlebot').content = noindex ? 'noindex, nofollow' : 'index, follow';
    getOrCreateMeta('language').content = 'nl';
    getOrCreateMeta('geo.region').content = 'BE-WVL';
    getOrCreateMeta('geo.placename').content = 'Brugge';
    getOrCreateMeta('geo.position').content = '51.2093;3.2247'; // Brugge coordinates
    getOrCreateMeta('ICBM').content = '51.2093, 3.2247';

    // Open Graph Tags
    getOrCreateMeta('og:title', 'property').content = title;
    getOrCreateMeta('og:description', 'property').content = description;
    getOrCreateMeta('og:image', 'property').content = ogImage;
    getOrCreateMeta('og:url', 'property').content = canonicalUrl;
    getOrCreateMeta('og:type', 'property').content = type;
    getOrCreateMeta('og:locale', 'property').content = 'nl_BE';
    getOrCreateMeta('og:site_name', 'property').content = 'SKYE';

    // Twitter Card Tags
    getOrCreateMeta('twitter:card').content = 'summary_large_image';
    getOrCreateMeta('twitter:title').content = title;
    getOrCreateMeta('twitter:description').content = description;
    getOrCreateMeta('twitter:image').content = ogImage;

    // Canonical URL
    const canonicalLink = getOrCreateLink('canonical');
    canonicalLink.setAttribute('href', canonicalUrl);

    // Alternate languages (if you have multiple languages)
    // const alternateLink = getOrCreateLink('alternate');
    // alternateLink.setAttribute('hreflang', 'nl');
    // alternateLink.setAttribute('href', canonicalUrl);

  }, [title, description, keywords, ogImage, canonicalUrl, type, noindex]);

  return null;
};

export default SEOHead;
