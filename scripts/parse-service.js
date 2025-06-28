/**
 * Сервис парсинга товаров для использования в API
 */

import { JSDOM } from 'jsdom';

export async function parseProducts(urls) {
  const results = [];
  const errors = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    
    try {
      const productData = await parseProductPage(url);
      results.push(productData);
    } catch (error) {
      errors.push({
        url,
        error: error.message
      });
    }
    
    // Пауза между запросами
    await delay(1500);
  }

  return {
    success: true,
    products: results,
    errors
  };
}

async function parseProductPage(url) {
  const html = await fetchPage(url);
  return extractProductData(html, url);
}

async function fetchPage(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ru-RU,ru;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.text();
  } catch (error) {
    throw new Error(`Не удалось загрузить: ${error.message}`);
  }
}

function extractProductData(html, url) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // 1. Название товара
  const titleElement = document.querySelector('#pagetitle.navigation-title');
  const fullTitle = titleElement ? titleElement.textContent.trim() : 'Товар без названия';
  
  // 2. Извлекаем артикул из названия
  const skuMatch = fullTitle.match(/артикул\s+(\w+)/i);
  const sku = skuMatch ? skuMatch[1] : generateSKU();
  
  // 3. Короткие характеристики
  const shortSpecs = extractShortSpecs(document);
  const shortDescription = buildShortDescription(shortSpecs);
  
  // 4. Полные характеристики
  const fullSpecs = extractFullSpecs(document);
  
  // 5. Подробное описание
  const description = extractDescription(document);
  
  // 6. Определяем основные параметры
  const brand = getSpecValue(fullSpecs, 'Бренд') || determineBrand(fullTitle);
  const category = determineCategory(url, fullSpecs);
  
  return {
    name: fullTitle,
    sku: sku,
    description: description,
    shortDescription: shortDescription,
    price: "0",
    originalPrice: null,
    category: category,
    brand: brand,
    
    // Извлекаем специфичные поля из характеристик
    volume: getSpecValue(fullSpecs, 'Объем (л)'),
    weight: getSpecValue(fullSpecs, 'Вес (кг)'),
    dimensions: getSpecValue(fullSpecs, 'Размеры (см)'),
    material: getSpecValue(fullSpecs, 'Материал чаши'),
    color: getSpecValue(fullSpecs, 'Цвет чаши'),
    frameType: getSpecValue(fullSpecs, 'Каркас'),
    pumpType: getSpecValue(fullSpecs, 'Насос-фильтр'),
    shape: getSpecValue(fullSpecs, 'Форма бассейна'),
    installationType: getSpecValue(fullSpecs, 'Тип установки'),
    countryOrigin: getSpecValue(fullSpecs, 'Страна-производитель'),
    
    imageUrl: "/api/placeholder/400/400",
    images: [],
    specifications: JSON.stringify(fullSpecs),
    inStock: true,
    isPopular: false,
    isNew: false,
    discount: 0,
    rating: "4.5",
    reviewCount: Math.floor(Math.random() * 50) + 10
  };
}

function extractShortSpecs(document) {
  const specs = {};
  const container = document.querySelector('.product-item-detail-main-properties-container');
  
  if (container) {
    const properties = container.querySelectorAll('.product-item-detail-properties');
    properties.forEach(prop => {
      const nameEl = prop.querySelector('.product-item-detail-properties-name');
      const valEl = prop.querySelector('.product-item-detail-properties-val');
      
      if (nameEl && valEl) {
        const name = nameEl.textContent.trim();
        const value = valEl.textContent.trim();
        specs[name] = value;
      }
    });
  }
  
  return specs;
}

function extractFullSpecs(document) {
  const specs = {};
  
  const containers = document.querySelectorAll('.toggle_content .product-item-detail-properties-block');
  
  containers.forEach(container => {
    const properties = container.querySelectorAll('.product-item-detail-properties-group-property');
    
    properties.forEach(prop => {
      const nameEl = prop.querySelector('.product-item-detail-properties-group-property-name');
      const valEl = prop.querySelector('.product-item-detail-properties-group-property-val');
      
      if (nameEl && valEl) {
        const name = nameEl.textContent.trim();
        let value = valEl.textContent.trim();
        
        const linkEl = valEl.querySelector('a');
        if (linkEl) {
          value = linkEl.textContent.trim();
        }
        
        specs[name] = value;
      }
    });
  });
  
  return specs;
}

function extractDescription(document) {
  const descContainer = document.querySelector('.toggle_content');
  
  if (descContainer) {
    const clone = descContainer.cloneNode(true);
    const propsBlocks = clone.querySelectorAll('.product-item-detail-properties-block');
    propsBlocks.forEach(block => block.remove());
    
    let description = clone.innerHTML;
    
    description = description
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
    
    return description;
  }
  
  return 'Описание товара';
}

function buildShortDescription(specs) {
  const important = ['Диаметр (м)', 'Высота (м)', 'Объем (л)', 'Материал чаши'];
  const parts = [];
  
  important.forEach(key => {
    if (specs[key]) {
      const shortKey = key.replace(/\s*\([^)]*\)/, '');
      parts.push(`${shortKey}: ${specs[key]}`);
    }
  });
  
  return parts.join(' • ');
}

function getSpecValue(specs, key) {
  return specs[key] || null;
}

function determineCategory(url, specs) {
  const urlLower = url.toLowerCase();
  const poolType = specs['Тип бассейна'];
  
  if (urlLower.includes('karkasnye') || poolType === 'Каркасный') {
    return 'frame-pools';
  }
  if (urlLower.includes('naduvnye') || poolType === 'Надувной') {
    return 'inflatable-pools';
  }
  if (urlLower.includes('detskie')) {
    return 'inflatable-pools';
  }
  if (urlLower.includes('nasos') || urlLower.includes('filter')) {
    return 'pumps-filters';
  }
  if (urlLower.includes('himiya') || urlLower.includes('chemical')) {
    return 'chemicals';
  }
  
  return 'frame-pools';
}

function determineBrand(title) {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('bestway')) return 'Bestway';
  if (titleLower.includes('intex')) return 'Intex';
  if (titleLower.includes('summer waves')) return 'Summer Waves';
  if (titleLower.includes('jilong')) return 'Jilong';
  
  return null;
}

function generateSKU() {
  return `AUTO-${Date.now().toString().slice(-6)}`;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}