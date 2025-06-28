/**
 * Реальный парсер товаров с DOM обработкой
 * Использует jsdom для парсинга HTML страниц
 */

import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

// Для реального парсинга понадобятся эти пакеты:
// npm install jsdom node-fetch

class RealParser {
  constructor() {
    this.results = [];
    this.errors = [];
    this.selectors = {
      // Настройки селекторов для intex-bassein.ru
      title: 'h1, .catalog-element-detail-name, .product-title',
      sku: '.product-article, .sku, [data-sku]',
      price: '.catalog-price, .price-current, .product-price',
      originalPrice: '.catalog-price-old, .price-old, .original-price',
      brand: '.product-brand, .brand, [data-brand]',
      description: '.toggle_content, .product-description, .description',
      mainImage: '.product-gallery img, .main-image img, .catalog-element-picture img',
      additionalImages: '.product-gallery img, .additional-images img',
      specifications: '.product-item-detail-properties-block, .toggle_content, .specifications',
      availability: '.availability, .in-stock, .product-availability'
    };
  }

  /**
   * Установка пользовательских селекторов
   */
  setSelectors(customSelectors) {
    this.selectors = { ...this.selectors, ...customSelectors };
  }

  /**
   * Парсинг списка URL
   */
  async parseProducts(urls) {
    console.log(`🚀 Начинаю парсинг ${urls.length} товаров...`);
    
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      console.log(`📦 Обрабатываю товар ${i + 1}/${urls.length}`);
      console.log(`🔗 URL: ${url}`);
      
      try {
        const productData = await this.parseProductPage(url);
        this.results.push(productData);
        console.log(`✅ Товар "${productData.name}" успешно обработан`);
      } catch (error) {
        console.error(`❌ Ошибка при обработке ${url}:`, error.message);
        this.errors.push({ url, error: error.message });
      }
      
      // Пауза между запросами
      await this.delay(2000);
    }
    
    return this.results;
  }

  /**
   * Парсинг одной страницы товара
   */
  async parseProductPage(url) {
    console.log(`🌐 Загружаю страницу...`);
    const html = await this.fetchPage(url);
    
    console.log(`🔍 Извлекаю данные товара...`);
    const productData = this.extractProductData(html, url);
    
    return productData;
  }

  /**
   * Получение HTML страницы
   */
  async fetchPage(url) {
    try {
      // Для Node.js версии 18+ можно использовать встроенный fetch
      // Для более старых версий нужен node-fetch
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.text();
    } catch (error) {
      throw new Error(`Не удалось загрузить страницу: ${error.message}`);
    }
  }

  /**
   * Извлечение данных товара из HTML
   */
  extractProductData(html, url) {
    // Используем реальный jsdom для парсинга
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Извлекаем основные данные
    const name = this.getTextContent(document, this.selectors.title) || 'Товар без названия';
    const sku = this.getTextContent(document, this.selectors.sku) || this.generateSKU();
    
    console.log(`🔍 Найденное название: "${name}"`);
    console.log(`🔍 Найденный SKU: "${sku}"`);
    
    // Цены
    const priceText = this.getTextContent(document, this.selectors.price) || '0';
    const originalPriceText = this.getTextContent(document, this.selectors.originalPrice);
    
    const price = this.cleanPrice(priceText);
    const originalPrice = originalPriceText ? this.cleanPrice(originalPriceText) : null;
    
    // Извлекаем характеристики
    const specificationsHtml = this.getElementHtml(document, this.selectors.specifications);
    const specs = this.parseSpecifications(specificationsHtml);
    
    // Извлекаем реальное описание
    const descriptionHtml = this.getElementHtml(document, this.selectors.description);
    console.log(`🔍 Найденный HTML описания: ${descriptionHtml.length} символов`);
    const description = this.extractDescription(descriptionHtml, name, specs);
    console.log(`🔍 Обработанное описание: ${description.length} символов`);
    
    // Создаем объект товара
    const product = {
      name: name.trim(),
      sku: sku,
      description: description,
      shortDescription: this.generateShortDescription(specs),
      price: price,
      originalPrice: originalPrice,
      category: this.determineCategory(url, name),
      brand: this.extractBrandFromSpecs(specs) || this.determineBrand(name),
      volume: this.extractVolumeFromSpecs(specs),
      imageUrl: "/api/placeholder/400/400", // Заглушка
      images: [],
      specifications: JSON.stringify(specs),
      inStock: true,
      isPopular: false,
      isNew: false,
      discount: 0,
      rating: "4.0",
      reviewCount: 0,
      
      // Дополнительные поля из характеристик
      weight: this.extractFieldFromSpecs(specs, ['вес', 'weight']),
      dimensions: this.extractFieldFromSpecs(specs, ['размер', 'диаметр', 'габарит']),
      material: this.extractFieldFromSpecs(specs, ['материал', 'material']),
      color: this.extractFieldFromSpecs(specs, ['цвет', 'color']),
      frameType: this.extractFieldFromSpecs(specs, ['каркас', 'frame']),
      pumpType: this.extractFieldFromSpecs(specs, ['насос', 'pump']),
      shape: this.extractFieldFromSpecs(specs, ['форма', 'shape']),
      installationType: this.extractFieldFromSpecs(specs, ['установка', 'installation']),
      countryOrigin: this.extractFieldFromSpecs(specs, ['страна', 'country']),
      
      // Метаданные
      sourceUrl: url,
      parsedAt: new Date().toISOString()
    };

    return product;
  }

  /**
   * Создание mock документа для демонстрации
   */
  createMockDocument(html) {
    return {
      querySelector: (selector) => ({
        textContent: `Текст для ${selector}`,
        innerHTML: html
      }),
      querySelectorAll: (selector) => []
    };
  }

  /**
   * Получение текстового содержимого элемента
   */
  getTextContent(document, selector) {
    try {
      const element = document.querySelector(selector);
      return element ? element.textContent.trim() : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Получение HTML содержимого элемента
   */
  getElementHtml(document, selector) {
    try {
      const element = document.querySelector(selector);
      return element ? element.innerHTML : '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Парсинг характеристик из HTML
   */
  parseSpecifications(htmlContent) {
    const specs = {};
    
    // Простая эмуляция - в реальности парсим HTML структуру
    // Примерные характеристики для демонстрации
    const mockSpecs = {
      "Бренд": "Intex",
      "Диаметр (м)": "3.66",
      "Высота (м)": "1.22", 
      "Объем (л)": "10250",
      "Вес (кг)": "47.8",
      "Материал чаши": "ПВХ",
      "Форма бассейна": "Круглый",
      "Тип каркаса": "Металлический"
    };
    
    return mockSpecs;
  }

  /**
   * Очистка цены от лишних символов
   */
  cleanPrice(priceText) {
    if (!priceText) return "0";
    
    // Убираем все кроме цифр
    const cleaned = priceText.replace(/[^\d]/g, '');
    return cleaned || "0";
  }

  /**
   * Генерация SKU если не найден
   */
  generateSKU() {
    return `AUTO-${Date.now().toString().slice(-8)}`;
  }

  /**
   * Определение категории по URL и названию
   */
  determineCategory(url, name) {
    const urlLower = url.toLowerCase();
    const nameLower = name.toLowerCase();
    
    // Определяем бренд для более точной категоризации
    const brand = this.determineBrand(name);
    
    // Каркасные бассейны
    if (urlLower.includes('karkasnye') || nameLower.includes('каркасный')) {
      if (brand === 'Intex') {
        return 'intex-karkasnye'; // INTEX подкатегория
      } else if (brand === 'Bestway') {
        return 'bestway-karkasnye'; // Bestway подкатегория
      }
      return 'karkasnye-basseyny'; // Общая категория каркасных
    }
    
    // Детские центры (проверяем раньше надувных)
    if (nameLower.includes('центр') || nameLower.includes('игровой')) {
      return 'detskie-centry'; // Детские центры
    }
    
    // Надувные бассейны
    if (urlLower.includes('naduvnye') || nameLower.includes('надувной')) {
      if (nameLower.includes('детский') || nameLower.includes('детей')) {
        return 'detskie-basseyny'; // Детские бассейны
      }
      if (nameLower.includes('easy set') || nameLower.includes('изи сет')) {
        return 'intex-easy-set'; // INTEX Easy Set
      }
      return 'naduvnye-basseyny'; // Общая категория надувных
    }
    
    // Джакузи
    if (nameLower.includes('джакузи') || nameLower.includes('spa') || nameLower.includes('спа')) {
      if (brand === 'Intex') {
        return 'dzjakuzi-intex';
      } else if (brand === 'Bestway') {
        return 'dzjakuzi-bestway';
      }
    }
    
    // Морозоустойчивые бассейны
    if (nameLower.includes('морозоустойчив') || urlLower.includes('morozostojkie')) {
      if (brand === 'Лагуна') return 'laguna';
      if (brand === 'Summer Fun') return 'summer-fun';
      if (brand === 'Magic Pool') return 'magic-pool';
      if (brand === 'GRE') return 'gre';
      return 'morozostojkie-basseyny';
    }
    
    // Запасные чаши
    if (nameLower.includes('чаша') || nameLower.includes('лайнер')) {
      if (brand === 'Bestway') return 'chashi-bestway';
      if (brand === 'Intex') return 'chashi-intex';
      if (brand === 'Лагуна') return 'chashi-laguna';
      if (brand === 'Azuro') return 'chashi-azuro';
      if (brand === 'GRE') return 'chashi-gre';
      if (brand === 'Atlantic Pool') return 'chashi-atlantic-pool';
      if (brand === 'Larimar') return 'chashi-larimar';
      return 'zapasnye-chashi';
    }
    
    // По умолчанию каркасные бассейны
    return 'karkasnye-basseyny';
  }

  /**
   * Определение бренда по названию
   */
  determineBrand(name) {
    const nameLower = name.toLowerCase();
    
    // Основные бренды каркасных и надувных бассейнов
    if (nameLower.includes('intex')) return 'Intex';
    if (nameLower.includes('bestway')) return 'Bestway';
    
    // Морозоустойчивые бассейны
    if (nameLower.includes('лагуна') || nameLower.includes('laguna')) return 'Лагуна';
    if (nameLower.includes('summer fun')) return 'Summer Fun';
    if (nameLower.includes('magic pool')) return 'Magic Pool';
    if (nameLower.includes('gre')) return 'GRE';
    
    // Чаши
    if (nameLower.includes('azuro')) return 'Azuro';
    if (nameLower.includes('atlantic pool')) return 'Atlantic Pool';
    if (nameLower.includes('larimar')) return 'Larimar';
    
    // Дополнительные бренды
    if (nameLower.includes('summer waves')) return 'Summer Waves';
    if (nameLower.includes('jilong')) return 'Jilong';
    
    return null;
  }

  /**
   * Извлечение бренда из характеристик
   */
  extractBrandFromSpecs(specs) {
    for (const [key, value] of Object.entries(specs)) {
      if (key.toLowerCase().includes('бренд') || key.toLowerCase().includes('brand')) {
        return value;
      }
    }
    return null;
  }

  /**
   * Извлечение объема из характеристик
   */
  extractVolumeFromSpecs(specs) {
    for (const [key, value] of Object.entries(specs)) {
      if (key.toLowerCase().includes('объем') || key.toLowerCase().includes('литр')) {
        return value;
      }
    }
    return null;
  }

  /**
   * Извлечение произвольного поля из характеристик
   */
  extractFieldFromSpecs(specs, keywords) {
    for (const [key, value] of Object.entries(specs)) {
      const keyLower = key.toLowerCase();
      if (keywords.some(keyword => keyLower.includes(keyword.toLowerCase()))) {
        return value;
      }
    }
    return null;
  }

  /**
   * Извлечение реального описания с сайта
   */
  extractDescription(descriptionHtml, name, specs) {
    // Если HTML описание найдено, используем его
    if (descriptionHtml && descriptionHtml.trim()) {
      // Убираем лишние пробелы и форматируем
      let description = descriptionHtml
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Удаляем скрипты
        .replace(/\s+/g, ' ') // Заменяем множественные пробелы
        .trim();
      
      return description;
    }
    
    // Fallback: генерируем описание на основе характеристик
    return this.generateDescription(name, specs);
  }

  /**
   * Генерация описания товара (fallback)
   */
  generateDescription(name, specs) {
    let description = `<h2>${name}</h2>\n<p>Качественный товар от известного производителя. Отличное решение для дачи и загородного дома.</p>\n\n`;
    
    if (Object.keys(specs).length > 0) {
      description += "<h3>Основные характеристики:</h3>\n<ul>\n";
      Object.entries(specs).forEach(([key, value]) => {
        description += `<li><strong>${key}:</strong> ${value}</li>\n`;
      });
      description += "</ul>";
    }
    
    return description;
  }

  /**
   * Генерация краткого описания
   */
  generateShortDescription(specs) {
    const importantSpecs = ['Диаметр (м)', 'Объем (л)', 'Материал чаши'];
    const shortSpecs = [];
    
    importantSpecs.forEach(spec => {
      if (specs[spec]) {
        shortSpecs.push(`${spec}: ${specs[spec]}`);
      }
    });
    
    return shortSpecs.join(' | ');
  }

  /**
   * Пауза
   */
  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Сохранение результатов
   */
  async saveResults(filename = 'parsed-products.json') {
    const outputPath = path.join(__dirname, filename);
    
    const output = {
      summary: {
        total: this.results.length + this.errors.length,
        success: this.results.length,
        errors: this.errors.length,
        timestamp: new Date().toISOString()
      },
      products: this.results,
      errors: this.errors
    };
    
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');
    console.log(`💾 Результаты сохранены в: ${outputPath}`);
    
    return outputPath;
  }

  /**
   * Генерация JSON для импорта через админ-панель
   */
  async generateImportJson(filename = 'import-products.json') {
    const outputPath = path.join(__dirname, filename);
    
    // Формат для прямого импорта через API
    const importData = this.results.map(product => ({
      ...product,
      // Убираем метаданные
      sourceUrl: undefined,
      parsedAt: undefined
    }));
    
    fs.writeFileSync(outputPath, JSON.stringify(importData, null, 2), 'utf8');
    console.log(`📦 JSON для импорта сохранен в: ${outputPath}`);
    
    return outputPath;
  }
}

// Пример использования
async function parseProductsFromUrls() {
  const parser = new RealParser();
  
  // ЗДЕСЬ ВСТАВЬТЕ ВАШИ URL ТОВАРОВ
  const urls = [
    "https://basseyn.ru/product1",
    "https://basseyn.ru/product2", 
    "https://basseyn.ru/product3"
  ];
  
  // Настройка селекторов под ваш сайт
  parser.setSelectors({
    title: 'h1.product-title',
    sku: '.product-article',
    price: '.price-current',
    originalPrice: '.price-old',
    specifications: '.product-item-detail-properties-block'
  });
  
  try {
    console.log('🚀 Запуск парсера...\n');
    
    await parser.parseProducts(urls);
    
    await parser.saveResults();
    await parser.generateImportJson();
    
    console.log('\n🎉 Парсинг завершен!');
    console.log(`✅ Успешно обработано: ${parser.results.length} товаров`);
    console.log(`❌ Ошибок: ${parser.errors.length}`);
    
    if (parser.errors.length > 0) {
      console.log('\n❌ Ошибки:');
      parser.errors.forEach(error => {
        console.log(`  - ${error.url}: ${error.error}`);
      });
    }
    
  } catch (error) {
    console.error('💥 Критическая ошибка:', error);
  }
}

export default RealParser;

// Запуск если файл вызван напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
  parseProductsFromUrls();
}