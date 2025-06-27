// Скрипт для импорта данных из JSON файла парсера в storage.ts
const fs = require('fs');
const path = require('path');

class ProductImporter {
  constructor() {
    this.processedProducts = [];
    this.categoryMapping = {
      'frame-pools': 'frame-pools',
      'inflatable-pools': 'inflatable-pools', 
      'pumps-filters': 'pumps-filters',
      'ladders': 'ladders',
      'covers-underlays': 'covers-underlays',
      'chemicals': 'chemicals',
      'accessories': 'accessories'
    };
  }

  async importFromJson(jsonFilePath) {
    console.log('🔄 Импорт товаров из JSON файла...');
    
    if (!fs.existsSync(jsonFilePath)) {
      throw new Error(`Файл ${jsonFilePath} не найден!`);
    }

    const rawData = fs.readFileSync(jsonFilePath, 'utf8');
    const data = JSON.parse(rawData);
    
    if (!data.products || !Array.isArray(data.products)) {
      throw new Error('Неверный формат JSON - отсутствует массив products');
    }

    console.log(`📦 Найдено товаров в файле: ${data.products.length}`);
    
    // Обрабатываем каждый товар
    data.products.forEach((product, index) => {
      try {
        const processedProduct = this.processProduct(product, index);
        if (processedProduct) {
          this.processedProducts.push(processedProduct);
        }
      } catch (error) {
        console.warn(`⚠️ Ошибка обработки товара ${index + 1}: ${error.message}`);
      }
    });

    console.log(`✅ Обработано товаров: ${this.processedProducts.length}`);
    
    // Генерируем код для вставки в storage.ts
    this.generateStorageCode();
    
    return this.processedProducts;
  }

  processProduct(product, index) {
    // Проверяем обязательные поля
    if (!product.name || !product.price) {
      throw new Error('Отсутствуют обязательные поля (name, price)');
    }

    // Очищаем и нормализуем данные
    const name = this.cleanText(product.name);
    const price = this.extractPrice(product.price);
    const originalPrice = product.originalPrice ? this.extractPrice(product.originalPrice) : null;
    
    if (!price || parseInt(price) <= 0) {
      throw new Error('Некорректная цена');
    }

    // Определяем бренд
    const brand = this.determineBrand(name);
    
    // Определяем категорию и подкатегорию
    const { category, subcategory } = this.determineCategory(product.category, name, brand);
    
    // Извлекаем объем
    const volume = this.extractVolume(name);
    
    // Генерируем характеристики
    const specifications = this.generateSpecifications(product, name, brand);
    
    // Обрабатываем изображение
    const imageUrl = this.processImageUrl(product.imageUrl);
    
    // Рассчитываем скидку
    const discount = originalPrice && price ? 
      Math.round((1 - parseInt(price) / parseInt(originalPrice)) * 100) : 0;

    return {
      name: name,
      description: `${brand} - ${name}. Качественное оборудование для бассейнов с гарантией производителя.`,
      price: price,
      originalPrice: originalPrice,
      category: category,
      subcategory: subcategory,
      brand: brand,
      volume: volume,
      imageUrl: imageUrl,
      images: [imageUrl].filter(Boolean),
      specifications: JSON.stringify(specifications),
      inStock: true,
      isPopular: index < 5, // Первые товары популярные
      isNew: index < 3, // Первые товары новые
      discount: discount,
      rating: (4.0 + Math.random() * 1.0).toFixed(1),
      reviewCount: Math.floor(Math.random() * 50) + 5
    };
  }

  cleanText(text) {
    return text.trim()
               .replace(/\s+/g, ' ')
               .replace(/[""«»]/g, '"')
               .replace(/'/g, "'");
  }

  extractPrice(priceText) {
    if (!priceText) return '';
    const match = priceText.toString().match(/\d+/);
    return match ? match[0] : '';
  }

  determineBrand(name) {
    const nameLower = name.toLowerCase();
    
    if (nameLower.includes('intex')) return 'Intex';
    if (nameLower.includes('bestway')) return 'Bestway';
    if (nameLower.includes('jilong')) return 'Jilong';
    if (nameLower.includes('laguna')) return 'Laguna';
    if (nameLower.includes('маркопул')) return 'Маркопул';
    if (nameLower.includes('summer fun')) return 'Summer Fun';
    
    return 'Неизвестный';
  }

  determineCategory(originalCategory, name, brand) {
    const nameLower = name.toLowerCase();
    
    // Основные категории
    let category = 'accessories';
    let subcategory = null;

    if (nameLower.includes('каркасный') || nameLower.includes('frame')) {
      category = 'frame-pools';
      
      // Подкатегории для каркасных бассейнов
      if (brand === 'Intex') {
        if (nameLower.includes('ultra') || nameLower.includes('xtr')) {
          subcategory = 'ultra-frame-xtr';
        } else if (nameLower.includes('prism')) {
          subcategory = 'prism-frame';
        } else if (nameLower.includes('metal frame')) {
          subcategory = 'metal-frame';
        }
      } else if (brand === 'Bestway') {
        if (nameLower.includes('power steel')) {
          subcategory = 'power-steel';
        } else if (nameLower.includes('steel pro')) {
          subcategory = 'steel-pro-max';
        }
      }
    } else if (nameLower.includes('надувной') || nameLower.includes('easy set') || nameLower.includes('fast set')) {
      category = 'inflatable-pools';
      
      if (nameLower.includes('easy set')) {
        subcategory = 'easy-set';
      } else if (nameLower.includes('fast set')) {
        subcategory = 'fast-set';
      }
    } else if (nameLower.includes('насос') || nameLower.includes('фильтр') || nameLower.includes('filter') || nameLower.includes('pump')) {
      category = 'pumps-filters';
      
      if (nameLower.includes('песочный') || nameLower.includes('sand')) {
        subcategory = 'sand-filters';
      } else if (nameLower.includes('картридж') || nameLower.includes('cartridge')) {
        subcategory = 'cartridge-filters';
      }
    } else if (nameLower.includes('лестниц') || nameLower.includes('ladder')) {
      category = 'ladders';
    } else if (nameLower.includes('тент') || nameLower.includes('покрыт') || nameLower.includes('подстилк') || nameLower.includes('cover')) {
      category = 'covers-underlays';
      
      if (nameLower.includes('солнеч') || nameLower.includes('solar')) {
        subcategory = 'solar-covers';
      } else if (nameLower.includes('подстилк') || nameLower.includes('ground')) {
        subcategory = 'ground-cloths';
      }
    } else if (nameLower.includes('химия') || nameLower.includes('хлор') || nameLower.includes('ph') || nameLower.includes('химич')) {
      category = 'chemicals';
      
      if (nameLower.includes('набор') || nameLower.includes('стартов')) {
        subcategory = 'starter-kits';
      } else if (nameLower.includes('хлор')) {
        subcategory = 'chlorine';
      }
    }

    return { category, subcategory };
  }

  extractVolume(name) {
    const volumeMatch = name.match(/(\d+)\s*л/i);
    return volumeMatch ? `${volumeMatch[1]}л` : null;
  }

  generateSpecifications(product, name, brand) {
    const specs = {};
    
    // Размеры
    const sizeMatch = name.match(/(\d+)х(\d+)(?:х(\d+))?/i);
    if (sizeMatch) {
      if (sizeMatch[3]) {
        specs['Размер'] = `${sizeMatch[1]}x${sizeMatch[2]}x${sizeMatch[3]} см`;
      } else {
        specs['Диаметр'] = `${sizeMatch[1]} см`;
        specs['Высота'] = `${sizeMatch[2]} см`;
      }
    }
    
    // Объем
    const volume = this.extractVolume(name);
    if (volume) {
      specs['Объем'] = volume;
    }
    
    // Артикул
    if (product.article) {
      specs['Артикул'] = product.article;
    }
    
    // Характеристики по бренду
    if (brand === 'Intex') {
      specs['Материал'] = 'ПВХ Super-Tough';
      specs['Гарантия'] = '1 год';
      specs['Производитель'] = 'Intex Corp';
    } else if (brand === 'Bestway') {
      specs['Материал'] = 'TriTech 3-слоя';
      specs['Гарантия'] = '2 года';
      specs['Производитель'] = 'Bestway Corp';
    }
    
    return specs;
  }

  processImageUrl(imageUrl) {
    if (!imageUrl) {
      return "https://images.unsplash.com/photo-1544551763-46a013bb70d5";
    }
    
    // Если относительный URL, делаем абсолютным
    if (imageUrl.startsWith('/')) {
      return `https://intex-bassein.ru${imageUrl}`;
    }
    
    return imageUrl;
  }

  generateStorageCode() {
    const codeLines = this.processedProducts.map((product, index) => {
      return `      {
        name: "${product.name}",
        description: "${product.description}",
        price: "${product.price}",
        originalPrice: ${product.originalPrice ? `"${product.originalPrice}"` : 'null'},
        category: "${product.category}",
        subcategory: ${product.subcategory ? `"${product.subcategory}"` : 'null'},
        brand: "${product.brand}",
        volume: ${product.volume ? `"${product.volume}"` : 'null'},
        imageUrl: "${product.imageUrl}",
        images: ${JSON.stringify(product.images)},
        specifications: JSON.stringify(${JSON.stringify(JSON.parse(product.specifications))}),
        inStock: ${product.inStock},
        isPopular: ${product.isPopular},
        isNew: ${product.isNew},
        discount: ${product.discount},
        rating: "${product.rating}",
        reviewCount: ${product.reviewCount}
      }${index < this.processedProducts.length - 1 ? ',' : ''}`;
    });

    const fullCode = `// Импортированные товары из парсера
// Добавьте эти товары в массив productsData в файле server/storage.ts

${codeLines.join(',\n')}

// Всего товаров: ${this.processedProducts.length}
// Дата импорта: ${new Date().toISOString()}`;

    fs.writeFileSync('scripts/imported-products.js', fullCode);
    console.log('📄 Код для вставки сохранен в scripts/imported-products.js');
  }

  // Сохранить в отдельный JSON для проверки
  saveProcessedJson() {
    const output = {
      products: this.processedProducts,
      totalCount: this.processedProducts.length,
      processedAt: new Date().toISOString()
    };
    
    fs.writeFileSync('scripts/processed-products.json', JSON.stringify(output, null, 2));
    console.log('📄 Обработанные товары сохранены в scripts/processed-products.json');
  }
}

// Запуск скрипта
const jsonFile = process.argv[2];
if (!jsonFile) {
  console.log('❌ Использование: node import-from-scraper.js <путь-к-json-файлу>');
  console.log('📝 Пример: node import-from-scraper.js intex-products-1751037623539.json');
  process.exit(1);
}

const importer = new ProductImporter();
importer.importFromJson(jsonFile)
  .then((products) => {
    console.log(`\n🎉 Импорт завершен!`);
    console.log(`📊 Обработано товаров: ${products.length}`);
    console.log(`📁 Проверьте файл: scripts/imported-products.js`);
    console.log(`\n📋 Следующие шаги:`);
    console.log(`1. Откройте scripts/imported-products.js`);
    console.log(`2. Скопируйте код товаров`);
    console.log(`3. Добавьте в server/storage.ts в массив productsData`);
    
    importer.saveProcessedJson();
  })
  .catch((error) => {
    console.error(`❌ Ошибка импорта: ${error.message}`);
    process.exit(1);
  });