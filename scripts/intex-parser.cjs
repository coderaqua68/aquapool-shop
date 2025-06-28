/**
 * Парсер для сайта intex-bassein.ru
 * Извлекает данные товаров по точным селекторам
 */

const fs = require('fs');
const path = require('path');

class IntexParser {
  constructor() {
    this.results = [];
    this.errors = [];
    this.baseUrl = 'https://intex-bassein.ru';
  }

  /**
   * Парсинг списка URL товаров
   */
  async parseProducts(urls) {
    console.log(`🚀 Начинаю парсинг ${urls.length} товаров с intex-bassein.ru`);
    
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      console.log(`\n📦 Товар ${i + 1}/${urls.length}`);
      console.log(`🔗 ${url}`);
      
      try {
        const productData = await this.parseProductPage(url);
        this.results.push(productData);
        console.log(`✅ "${productData.name}" - обработан`);
      } catch (error) {
        console.error(`❌ Ошибка: ${error.message}`);
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
    const html = await this.fetchPage(url);
    return this.extractProductData(html, url);
  }

  /**
   * Загрузка HTML страницы
   */
  async fetchPage(url) {
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

  /**
   * Извлечение данных товара из HTML
   */
  extractProductData(html, url) {
    // Для Node.js нужно установить jsdom: npm install jsdom
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // 1. Название товара
    const titleElement = document.querySelector('#pagetitle.navigation-title');
    const fullTitle = titleElement ? titleElement.textContent.trim() : 'Товар без названия';
    
    // 2. Извлекаем артикул из названия
    const skuMatch = fullTitle.match(/артикул\s+(\w+)/i);
    const sku = skuMatch ? skuMatch[1] : this.generateSKU();
    
    // 3. Короткие характеристики (для shortDescription)
    const shortSpecs = this.extractShortSpecs(document);
    const shortDescription = this.buildShortDescription(shortSpecs);
    
    // 4. Полные характеристики
    const fullSpecs = this.extractFullSpecs(document);
    
    // 5. Подробное описание
    const description = this.extractDescription(document);
    
    // 6. Определяем основные параметры из характеристик
    const brand = this.getSpecValue(fullSpecs, 'Бренд') || this.determineBrand(fullTitle);
    const category = this.determineCategory(url, fullSpecs);
    
    // Создаем объект товара
    const product = {
      name: fullTitle,
      sku: sku,
      description: description,
      shortDescription: shortDescription,
      price: "0", // Цена отдельно не указана в примере
      originalPrice: null,
      category: category,
      brand: brand,
      
      // Извлекаем специфичные поля из характеристик
      volume: this.getSpecValue(fullSpecs, 'Объем (л)'),
      weight: this.getSpecValue(fullSpecs, 'Вес (кг)'),
      dimensions: this.getSpecValue(fullSpecs, 'Размеры (см)'),
      material: this.getSpecValue(fullSpecs, 'Материал чаши'),
      color: this.getSpecValue(fullSpecs, 'Цвет чаши'),
      frameType: this.getSpecValue(fullSpecs, 'Каркас'),
      pumpType: this.getSpecValue(fullSpecs, 'Насос-фильтр'),
      shape: this.getSpecValue(fullSpecs, 'Форма бассейна'),
      installationType: this.getSpecValue(fullSpecs, 'Тип установки'),
      countryOrigin: this.getSpecValue(fullSpecs, 'Страна-производитель'),
      
      // Дополнительные поля
      diameter: this.getSpecValue(fullSpecs, 'Диаметр (м)'),
      height: this.getSpecValue(fullSpecs, 'Высота (м)'),
      poolType: this.getSpecValue(fullSpecs, 'Тип бассейна'),
      pumpCapacity: this.getSpecValue(fullSpecs, 'Насос-фильтр (л/ч)'),
      packageSize: this.getSpecValue(fullSpecs, 'Размер упаковки (см)'),
      
      imageUrl: "/api/placeholder/400/400", // Заглушка для изображений
      images: [],
      specifications: JSON.stringify(fullSpecs),
      inStock: true,
      isPopular: false,
      isNew: false,
      discount: 0,
      rating: "4.5",
      reviewCount: Math.floor(Math.random() * 50) + 10,
      
      // Метаданные
      sourceUrl: url,
      parsedAt: new Date().toISOString()
    };

    return product;
  }

  /**
   * Извлечение коротких характеристик (для карточки товара)
   */
  extractShortSpecs(document) {
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

  /**
   * Извлечение полных характеристик
   */
  extractFullSpecs(document) {
    const specs = {};
    
    // Ищем контейнер с полными характеристиками
    const containers = document.querySelectorAll('.toggle_content .product-item-detail-properties-block');
    
    containers.forEach(container => {
      const properties = container.querySelectorAll('.product-item-detail-properties-group-property');
      
      properties.forEach(prop => {
        const nameEl = prop.querySelector('.product-item-detail-properties-group-property-name');
        const valEl = prop.querySelector('.product-item-detail-properties-group-property-val');
        
        if (nameEl && valEl) {
          const name = nameEl.textContent.trim();
          let value = valEl.textContent.trim();
          
          // Убираем ссылки из значений
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

  /**
   * Извлечение подробного описания
   */
  extractDescription(document) {
    const descContainer = document.querySelector('.toggle_content');
    
    if (descContainer) {
      // Убираем характеристики из описания
      const clone = descContainer.cloneNode(true);
      const propsBlocks = clone.querySelectorAll('.product-item-detail-properties-block');
      propsBlocks.forEach(block => block.remove());
      
      // Получаем чистый HTML описания
      let description = clone.innerHTML;
      
      // Очищаем от лишних пробелов и переносов
      description = description
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .trim();
      
      return description;
    }
    
    return 'Описание товара';
  }

  /**
   * Построение краткого описания из основных характеристик
   */
  buildShortDescription(specs) {
    const important = ['Диаметр (м)', 'Высота (м)', 'Объем (л)', 'Материал чаши'];
    const parts = [];
    
    important.forEach(key => {
      if (specs[key]) {
        const shortKey = key.replace(/\s*\([^)]*\)/, ''); // Убираем единицы измерения
        parts.push(`${shortKey}: ${specs[key]}`);
      }
    });
    
    return parts.join(' • ');
  }

  /**
   * Получение значения характеристики
   */
  getSpecValue(specs, key) {
    return specs[key] || null;
  }

  /**
   * Определение категории
   */
  determineCategory(url, specs) {
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

  /**
   * Определение бренда из названия
   */
  determineBrand(title) {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('bestway')) return 'Bestway';
    if (titleLower.includes('intex')) return 'Intex';
    if (titleLower.includes('summer waves')) return 'Summer Waves';
    if (titleLower.includes('jilong')) return 'Jilong';
    
    return null;
  }

  /**
   * Генерация SKU
   */
  generateSKU() {
    return `AUTO-${Date.now().toString().slice(-6)}`;
  }

  /**
   * Пауза между запросами
   */
  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Сохранение результатов
   */
  async saveResults(filename = 'intex-parsed-products.json') {
    const outputPath = path.join(__dirname, filename);
    
    const output = {
      site: 'intex-bassein.ru',
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
    console.log(`\n💾 Результаты сохранены: ${outputPath}`);
    
    return outputPath;
  }

  /**
   * Генерация кода для добавления в storage.ts
   */
  generateStorageCode() {
    if (this.results.length === 0) {
      return "// Нет товаров для генерации";
    }

    let code = "// Товары, импортированные с intex-bassein.ru\n";
    code += "const importedProducts = [\n";
    
    this.results.forEach((product, index) => {
      code += "  {\n";
      Object.entries(product).forEach(([key, value]) => {
        if (['sourceUrl', 'parsedAt'].includes(key)) return; // Пропускаем служебные поля
        
        if (typeof value === 'string') {
          // Экранируем кавычки и переносы строк
          const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
          code += `    ${key}: "${escaped}",\n`;
        } else if (value === null) {
          code += `    ${key}: null,\n`;
        } else {
          code += `    ${key}: ${JSON.stringify(value)},\n`;
        }
      });
      code += `  }${index < this.results.length - 1 ? ',' : ''}\n`;
    });
    
    code += "];\n\n";
    code += "// Добавьте в конструктор MemStorage после существующих товаров:\n";
    code += "importedProducts.forEach(prod => {\n";
    code += "  const product: Product = { id: this.currentProductId++, ...prod };\n";
    code += "  this.products.set(product.id, product);\n";
    code += "});\n";
    
    return code;
  }
}

// Функция для запуска парсинга
async function parseIntexProducts() {
  const parser = new IntexParser();
  
  // ВСТАВЬТЕ СЮДА ВАШИ URL ТОВАРОВ
  const urls = [
    "https://intex-bassein.ru/catalog/bestway-karkasnye-basseyny/karkasnyy-basseyn-bestway-round-steel-pro-max-krug-3-66-x-1-22-m-artikul-56420/",
    // Добавьте сюда другие URL товаров
  ];
  
  try {
    console.log('🚀 Запуск парсера intex-bassein.ru\n');
    
    await parser.parseProducts(urls);
    
    await parser.saveResults();
    
    const storageCode = parser.generateStorageCode();
    fs.writeFileSync(path.join(__dirname, 'generated-storage-code.js'), storageCode, 'utf8');
    
    console.log('\n🎉 Парсинг завершен!');
    console.log(`✅ Успешно: ${parser.results.length} товаров`);
    console.log(`❌ Ошибок: ${parser.errors.length}`);
    console.log(`📁 Файлы: intex-parsed-products.json, generated-storage-code.js`);
    
    if (parser.errors.length > 0) {
      console.log('\n❌ Ошибки:');
      parser.errors.forEach(error => {
        console.log(`  ${error.url}: ${error.error}`);
      });
    }
    
  } catch (error) {
    console.error('💥 Критическая ошибка:', error);
  }
}

module.exports = IntexParser;

// Запуск если файл вызван напрямую
if (require.main === module) {
  parseIntexProducts();
}