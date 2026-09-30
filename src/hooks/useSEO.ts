import { useEffect } from 'react';

interface SEOOptions {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product' | 'event';
  structuredData?: object;
}

export function useSEO({ title, description, canonical, image, type = 'website', structuredData }: SEOOptions) {
  useEffect(() => {
    document.title = `${title} | PUBG Mobile Pakistan Hub`;

    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    if (description) {
      setMeta('description', description);
      setMeta('og:description', description, 'property');
      setMeta('twitter:description', description);
    }
    setMeta('og:title', title, 'property');
    setMeta('twitter:title', title);
    setMeta('og:type', type, 'property');

    if (image) {
      setMeta('og:image', image, 'property');
      setMeta('twitter:image', image);
    }

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    if (structuredData) {
      let script = document.querySelector('script[data-structured-data]');
      if (script) script.remove();
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-structured-data', '');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, image, type, structuredData]);
}
