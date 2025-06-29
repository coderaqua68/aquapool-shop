import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}

export default function SEOHead({
  title = "AquaPool - Каркасные бассейны INTEX и Bestway с доставкой по Москве",
  description = "Купить каркасный бассейн INTEX и Bestway в интернет-магазине AquaPool. Большой выбор, лучшие цены, быстрая доставка по Москве и области. Гарантия качества.",
  canonical,
  ogTitle,
  ogDescription,
  ogImage = "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=630&fit=crop",
  ogUrl
}: SEOHeadProps) {
  
  useEffect(() => {
    // Обновляем title
    document.title = title;
    
    // Обновляем или создаем meta теги
    const updateMetaTag = (property: string, content: string, useProperty = false) => {
      const selector = useProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (useProperty) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Основные SEO теги
    updateMetaTag('description', description);
    updateMetaTag('keywords', 'каркасный бассейн, intex, bestway, купить бассейн, бассейн для дачи, интернет магазин бассейнов');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph теги
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:image', ogImage, true);
    if (ogUrl) updateMetaTag('og:url', ogUrl, true);
    updateMetaTag('og:site_name', 'AquaPool', true);
    updateMetaTag('og:locale', 'ru_RU', true);

    // Twitter Card теги
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', ogTitle || title);
    updateMetaTag('twitter:description', ogDescription || description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    // Structured Data для интернет-магазина
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "AquaPool",
      "description": "Интернет-магазин каркасных бассейнов INTEX и Bestway",
      "url": window.location.origin,
      "logo": `${window.location.origin}/logo.png`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Химки",
        "addressCountry": "RU"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "url": `${window.location.origin}/contacts`
      },
      "sameAs": [
        "https://t.me/aquapool_manager"
      ]
    };

    let scriptTag = document.querySelector('#structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'structured-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogUrl]);

  return null;
}