// Content script for scraping Intex Pool products
class IntexScraper {
  constructor() {
    this.products = [];
    this.categories = [];
    this.processedUrls = new Set();
    
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      this.handleMessage(request, sendResponse);
      return true; // Keep message channel open for async response
    });
  }

  async handleMessage(request, sendResponse) {
    try {
      switch (request.action) {
        case 'scrapePage':
          const pageProducts = await this.scrapeCurrentPage();
          sendResponse({ success: true, products: pageProducts });
          break;
          
        case 'scrapeCategory':
          const categoryProducts = await this.scrapeCategoryPages();
          sendResponse({ success: true, products: categoryProducts });
          break;
          
        case 'scrapeAll':
          const allProducts = await this.scrapeAllCategories();
          sendResponse({ success: true, products: allProducts });
          break;
          
        default:
          sendResponse({ success: false, error: 'Unknown action' });
      }
    } catch (error) {
      console.error('Scraping error:', error);
      sendResponse({ success: false, error: error.message });
    }
  }

  async scrapeCurrentPage() {
    console.log('Scraping current page:', window.location.href);
    
    // Detect page type and scrape accordingly
    if (this.isProductListPage()) {
      return this.extractProductsFromList();
    } else if (this.isProductPage()) {
      return [this.extractSingleProduct()];
    } else {
      throw new Error('Эта страница не содержит товары для парсинга');
    }
  }

  isProductListPage() {
    return document.querySelectorAll('.product-item, .catalog-item, .item-block').length > 0;
  }

  isProductPage() {
    return window.location.href.includes('/catalog/') && 
           document.querySelector('.product-detail, .item-detail, .product-card-detail');
  }

  extractProductsFromList() {
    const products = [];
    
    // Multiple selectors for different page layouts
    const selectors = [
      '.product-item',
      '.catalog-item', 
      '.item-block',
      '.product-card',
      '.catalog-element-item',
      '.bx-catalog-item',
      '[data-entity="item"]'
    ];

    let productElements = [];
    for (const selector of selectors) {
      productElements = document.querySelectorAll(selector);
      if (productElements.length > 0) {
        console.log(`Found ${productElements.length} products with selector: ${selector}`);
        break;
      }
    }

    if (productElements.length === 0) {
      throw new Error('Товары не найдены на странице');
    }

    productElements.forEach((element, index) => {
      try {
        const product = this.extractProductFromElement(element, index);
        if (product) {
          products.push(product);
        }
      } catch (error) {
        console.warn(`Error extracting product ${index + 1}:`, error);
      }
    });

    return products;
  }

  extractProductFromElement(element, index) {
    // Extract name - try multiple selectors
    const nameSelectors = [
      '.item-title a',
      '.product-name a',
      '.catalog-item-title a',
      '.name a',
      'h3 a',
      '.title a',
      '[data-entity="name"] a',
      'a[href*="/catalog/"]'
    ];

    let nameElement = null;
    let productUrl = '';
    for (const selector of nameSelectors) {
      nameElement = element.querySelector(selector);
      if (nameElement) {
        productUrl = nameElement.href;
        break;
      }
    }

    if (!nameElement) {
      throw new Error('Product name not found');
    }

    const name = nameElement.textContent.trim();

    // Extract prices
    const allText = element.textContent;
    const pricePattern = /(\d[\d\s]*(?:\d))\s*₽/g;
    const priceMatches = [...allText.matchAll(pricePattern)];
    
    let currentPrice = '';
    let originalPrice = null;

    if (priceMatches.length >= 2) {
      // Multiple prices found - likely discount
      const prices = priceMatches.map(match => parseInt(match[1].replace(/\s/g, '')))
                                 .sort((a, b) => b - a);
      originalPrice = prices[0].toString();
      currentPrice = prices[1].toString();
    } else if (priceMatches.length === 1) {
      currentPrice = priceMatches[0][1].replace(/\s/g, '');
    }

    // Extract image
    const img = element.querySelector('img');
    let imageUrl = '';
    if (img) {
      imageUrl = img.src || img.dataset.src || img.dataset.original || 
                 img.getAttribute('data-lazy-src') || '';
      
      // Convert relative URLs to absolute
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = new URL(imageUrl, window.location.origin).href;
      }
    }

    // Determine brand
    const nameLower = name.toLowerCase();
    let brand = 'Неизвестный';
    if (nameLower.includes('intex')) brand = 'Intex';
    else if (nameLower.includes('bestway')) brand = 'Bestway';
    else if (nameLower.includes('jilong')) brand = 'Jilong';
    else if (nameLower.includes('laguna')) brand = 'Laguna';

    // Determine category from URL or product name
    const category = this.determineCategory(productUrl, name);

    // Extract article/model number
    const articleMatch = name.match(/(\d{5,})/);
    const article = articleMatch ? articleMatch[1] : '';

    // Calculate discount
    const discount = originalPrice && currentPrice ? 
      Math.round((1 - parseInt(currentPrice) / parseInt(originalPrice)) * 100) : 0;

    if (!name || !currentPrice) {
      throw new Error('Missing required product data');
    }

    return {
      name: name,
      description: `${brand} - ${name}`,
      price: currentPrice,
      originalPrice: originalPrice,
      brand: brand,
      category: category,
      article: article,
      imageUrl: imageUrl,
      url: productUrl,
      source: window.location.href,
      inStock: true,
      discount: discount,
      scrapedAt: new Date().toISOString()
    };
  }

  determineCategory(url, name) {
    const urlLower = url.toLowerCase();
    const nameLower = name.toLowerCase();

    if (urlLower.includes('karkasnye') || nameLower.includes('каркасный')) {
      return 'frame-pools';
    }
    if (urlLower.includes('naduvnye') || nameLower.includes('надувной')) {
      return 'inflatable-pools';
    }
    if (urlLower.includes('nasos') || urlLower.includes('filtr') || 
        nameLower.includes('насос') || nameLower.includes('фильтр')) {
      return 'pumps-filters';
    }
    if (urlLower.includes('lestnic') || nameLower.includes('лестниц')) {
      return 'ladders';
    }
    if (urlLower.includes('tent') || urlLower.includes('pokryt') ||
        nameLower.includes('тент') || nameLower.includes('покрыт')) {
      return 'covers-underlays';
    }
    if (urlLower.includes('himiya') || urlLower.includes('chlor') ||
        nameLower.includes('химия') || nameLower.includes('хлор')) {
      return 'chemicals';
    }
    
    return 'accessories';
  }

  extractSingleProduct() {
    // Extract detailed product information from product page
    const nameElement = document.querySelector('h1, .product-title, .item-title');
    if (!nameElement) {
      throw new Error('Product name not found on product page');
    }

    const name = nameElement.textContent.trim();
    
    // More detailed extraction for single product page
    const priceElement = document.querySelector('.price-current, .price, .cost');
    const price = priceElement ? priceElement.textContent.replace(/[^\d]/g, '') : '';

    const oldPriceElement = document.querySelector('.price-old, .old-price');
    const originalPrice = oldPriceElement ? oldPriceElement.textContent.replace(/[^\d]/g, '') : null;

    const img = document.querySelector('.product-image img, .item-image img, img[src*="product"]');
    const imageUrl = img ? (img.src || img.dataset.src || '') : '';

    const brand = this.determineBrand(name);
    const category = this.determineCategory(window.location.href, name);

    return {
      name: name,
      description: name,
      price: price,
      originalPrice: originalPrice,
      brand: brand,
      category: category,
      imageUrl: imageUrl,
      url: window.location.href,
      source: window.location.href,
      inStock: true,
      discount: originalPrice ? Math.round((1 - parseInt(price) / parseInt(originalPrice)) * 100) : 0,
      scrapedAt: new Date().toISOString()
    };
  }

  determineBrand(name) {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('intex')) return 'Intex';
    if (nameLower.includes('bestway')) return 'Bestway';
    if (nameLower.includes('jilong')) return 'Jilong';
    if (nameLower.includes('laguna')) return 'Laguna';
    return 'Неизвестный';
  }

  async scrapeCategoryPages() {
    const products = [];
    
    // First scrape current page
    if (this.isProductListPage()) {
      products.push(...this.extractProductsFromList());
    }

    // Find pagination and scrape other pages
    const paginationLinks = this.findPaginationLinks();
    
    for (const link of paginationLinks) {
      if (this.processedUrls.has(link)) continue;
      
      try {
        console.log(`Scraping page: ${link}`);
        const pageProducts = await this.scrapeUrl(link);
        products.push(...pageProducts);
        this.processedUrls.add(link);
        
        // Small delay to avoid overwhelming the server
        await this.delay(1000);
      } catch (error) {
        console.warn(`Failed to scrape ${link}:`, error);
      }
    }

    return products;
  }

  findPaginationLinks() {
    const links = [];
    const paginationSelectors = [
      '.pagination a',
      '.pager a',
      '.page-navigation a',
      'a[href*="PAGEN"]'
    ];

    for (const selector of paginationSelectors) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        const href = el.href;
        if (href && href !== window.location.href && !href.includes('#')) {
          links.push(href);
        }
      });
      
      if (links.length > 0) break;
    }

    return [...new Set(links)]; // Remove duplicates
  }

  async scrapeAllCategories() {
    const products = [];
    
    // Find all category links
    const categoryLinks = this.findCategoryLinks();
    
    for (const categoryUrl of categoryLinks) {
      if (this.processedUrls.has(categoryUrl)) continue;
      
      try {
        console.log(`Scraping category: ${categoryUrl}`);
        const categoryProducts = await this.scrapeUrl(categoryUrl);
        products.push(...categoryProducts);
        this.processedUrls.add(categoryUrl);
        
        // Delay between categories
        await this.delay(2000);
      } catch (error) {
        console.warn(`Failed to scrape category ${categoryUrl}:`, error);
      }
    }

    return products;
  }

  findCategoryLinks() {
    const links = [];
    const categorySelectors = [
      '.catalog-menu a',
      '.category-menu a',
      '.main-menu a[href*="/catalog/"]',
      'a[href*="/catalog/"]:not([href*="/catalog/filter/"])'
    ];

    for (const selector of categorySelectors) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        const href = el.href;
        if (href && href.includes('/catalog/') && !href.includes('#')) {
          links.push(href);
        }
      });
    }

    return [...new Set(links)]; // Remove duplicates
  }

  async scrapeUrl(url) {
    // This would require background script to fetch other pages
    // For now, return empty array as we're limited to current page content
    console.log(`Would scrape URL: ${url}`);
    return [];
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize scraper when content script loads
new IntexScraper();