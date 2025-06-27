// Импорт товаров из CSV файла basseyn.ru
import fs from 'fs';
import path from 'path';

class CSVImporter {
  constructor() {
    this.products = [];
    this.categoryMapping = new Map();
    this.brandMapping = new Map();
    this.processedCount = 0;
    this.skippedCount = 0;
  }

  async importFromCSV(csvFilePath) {
    console.log('🔄 Импорт товаров из CSV файла...');
    
    if (!fs.existsSync(csvFilePath)) {
      throw new Error(`Файл ${csvFilePath} не найден!`);
    }

    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    
    // Правильно парсим CSV с многострочными записями
    const records = this.parseComplexCSV(csvContent);
    
    console.log(`📊 Найдено записей товаров: ${records.length}`);
    
    // Парсим заголовки
    const headers = records[0];
    console.log('📋 Заголовки:', headers.slice(0, 6).join(', ') + '...');

    // Обрабатываем товары (пропускаем первую строку с заголовками)
    for (let i = 1; i < records.length; i++) {
      try {
        const product = this.parseProductFromRecord(records[i], headers);
        if (product) {
          this.products.push(product);
          this.processedCount++;
          
          if (this.processedCount % 100 === 0) {
            console.log(`⏳ Обработано ${this.processedCount} товаров...`);
          }
        } else {
          this.skippedCount++;
        }
      } catch (error) {
        console.warn(`⚠️ Ошибка в записи ${i + 1}: ${error.message}`);
        this.skippedCount++;
      }
    }

    console.log(`✅ Импорт завершен:`);
    console.log(`   📦 Обработано: ${this.processedCount} товаров`);
    console.log(`   ⏭️ Пропущено: ${this.skippedCount} товаров`);
    
    // Группируем по категориям
    this.analyzeProducts();
    
    // Генерируем код для storage.ts
    this.generateStorageCode();
    
    return this.products;
  }

  parseComplexCSV(csvContent) {
    const records = [];
    const lines = csvContent.split('\n');
    
    let currentRecord = [];
    let currentField = '';
    let inQuotes = false;
    let fieldIndex = 0;
    
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      
      // Если это начало новой записи (есть разделители в начале)
      if (!inQuotes && this.isRecordStart(line)) {
        // Сохраняем предыдущую запись
        if (currentRecord.length > 0) {
          records.push([...currentRecord]);
        }
        
        // Начинаем новую запись
        currentRecord = [];
        currentField = '';
        fieldIndex = 0;
        inQuotes = false;
      }
      
      // Парсим строку посимвольно
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ';' && !inQuotes) {
          currentRecord[fieldIndex] = currentField.trim().replace(/^"|"$/g, '');
          currentField = '';
          fieldIndex++;
        } else {
          currentField += char;
        }
      }
      
      // Добавляем перенос строки если мы внутри многострочного поля
      if (inQuotes) {
        currentField += '\n';
      } else {
        // Завершаем текущее поле
        currentRecord[fieldIndex] = currentField.trim().replace(/^"|"$/g, '');
      }
    }
    
    // Добавляем последнюю запись
    if (currentRecord.length > 0) {
      records.push(currentRecord);
    }
    
    return records;
  }

  isRecordStart(line) {
    // Проверяем, начинается ли строка как новая запись товара
    // Ищем паттерн: Категория;Категория;...;Артикул;Название
    const trimmed = line.trim();
    if (!trimmed) return false;
    
    // Простая проверка: если строка начинается с кавычки или содержит несколько разделителей
    const semicolonCount = (line.match(/;/g) || []).length;
    return semicolonCount >= 5 && (line.startsWith('"') || line.includes('Бассейны'));
  }

  parseProductFromRecord(record, headers) {
    // Создаем объект товара из CSV записи
    const csvProduct = {};
    headers.forEach((header, index) => {
      csvProduct[header] = record[index] || '';
    });

    // Пропускаем товары без названия или цены
    if (!csvProduct['Заголовок'] || !csvProduct['Цена']) {
      return null;
    }

    // Преобразуем в нашу структуру
    const product = this.convertToOurFormat(csvProduct);
    
    return product;
  }

  convertToOurFormat(csvProduct) {
    const name = csvProduct['Заголовок'].replace(/"/g, '');
    const price = this.extractPrice(csvProduct['Цена']);
    const supplierPrice = this.extractPrice(csvProduct['Цена поставщика']);
    
    // Определяем бренд
    const brand = this.determineBrand(name);
    
    // Определяем категорию
    const { category, subcategory } = this.determineCategory(
      csvProduct['Категория 1'], 
      csvProduct['Категория 2'], 
      csvProduct['Категория 3'],
      name
    );

    // Извлекаем изображения
    const images = this.extractImages(csvProduct);
    
    // Очищаем описание
    const description = this.cleanDescription(csvProduct['Описание']);
    
    // Рассчитываем скидку
    const discount = supplierPrice && price ? 
      Math.round((1 - parseInt(price) / parseInt(supplierPrice)) * 100) : 0;

    // Извлекаем характеристики из описания
    const specifications = this.extractSpecifications(csvProduct['Описание'], name);

    return {
      name: name,
      description: description,
      price: price,
      originalPrice: supplierPrice && discount > 0 ? supplierPrice : null,
      category: category,
      subcategory: subcategory,
      brand: brand,
      volume: this.extractVolume(name),
      imageUrl: images[0] || "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
      images: images,
      specifications: JSON.stringify(specifications),
      inStock: csvProduct['Наличие'] === 'В наличии',
      isPopular: false, // Установим позже на основе данных
      isNew: false,
      discount: discount,
      rating: (4.0 + Math.random() * 1.0).toFixed(1),
      reviewCount: Math.floor(Math.random() * 50) + 5,
      article: csvProduct['Артикул'] || '',
      url: csvProduct['URL'] || ''
    };
  }

  extractPrice(priceStr) {
    if (!priceStr) return '';
    const match = priceStr.toString().replace(/\s/g, '').match(/\d+/);
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
    if (nameLower.includes('azuro')) return 'Azuro';
    if (nameLower.includes('gre')) return 'GRE';
    
    return 'Другие';
  }

  determineCategory(cat1, cat2, cat3, name) {
    const nameLower = name.toLowerCase();
    
    // Основная логика категоризации
    let category = 'accessories';
    let subcategory = null;

    // Бассейны
    if (cat1?.includes('Бассейны') || nameLower.includes('бассейн')) {
      if (cat2?.includes('Каркасные') || nameLower.includes('каркасный')) {
        category = 'frame-pools';
        
        if (cat3?.includes('Intex')) {
          if (nameLower.includes('ultra') || nameLower.includes('xtr')) {
            subcategory = 'ultra-frame-xtr';
          } else if (nameLower.includes('prism')) {
            subcategory = 'prism-frame';
          } else {
            subcategory = 'metal-frame';
          }
        } else if (cat3?.includes('Bestway')) {
          if (nameLower.includes('power steel')) {
            subcategory = 'power-steel';
          } else {
            subcategory = 'steel-pro-max';
          }
        }
      } else if (cat2?.includes('Надувные') || nameLower.includes('надувной')) {
        category = 'inflatable-pools';
        
        if (nameLower.includes('easy set')) {
          subcategory = 'easy-set';
        } else if (nameLower.includes('fast set')) {
          subcategory = 'fast-set';
        }
      }
    }
    
    // Оборудование
    else if (cat1?.includes('Оборудование') || nameLower.includes('насос') || nameLower.includes('фильтр')) {
      category = 'pumps-filters';
      
      if (nameLower.includes('песочный')) {
        subcategory = 'sand-filters';
      } else if (nameLower.includes('картридж')) {
        subcategory = 'cartridge-filters';
      }
    }
    
    // Химия
    else if (cat1?.includes('Химия') || nameLower.includes('химия') || nameLower.includes('хлор')) {
      category = 'chemicals';
      
      if (nameLower.includes('набор') || nameLower.includes('стартов')) {
        subcategory = 'starter-kits';
      }
    }
    
    // Аксессуары
    else if (nameLower.includes('лестниц')) {
      category = 'ladders';
    } else if (nameLower.includes('тент') || nameLower.includes('покрыт') || nameLower.includes('подстилк')) {
      category = 'covers-underlays';
      
      if (nameLower.includes('солнеч')) {
        subcategory = 'solar-covers';
      } else if (nameLower.includes('подстилк')) {
        subcategory = 'ground-cloths';
      }
    }

    return { category, subcategory };
  }

  extractImages(csvProduct) {
    const images = [];
    
    // Извлекаем все изображения
    for (let i = 1; i <= 20; i++) {
      const imageField = `Изображение ${i}`;
      if (csvProduct[imageField] && csvProduct[imageField].trim()) {
        images.push(csvProduct[imageField].trim());
      }
    }
    
    return images;
  }

  cleanDescription(description) {
    if (!description) return '';
    
    // Удаляем HTML теги и лишние пробелы
    return description
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/&[^;]+;/g, '')
      .substring(0, 300)
      .trim() + '...';
  }

  extractSpecifications(description, name) {
    const specs = {};
    
    if (!description) return specs;
    
    // Размеры
    const sizeMatch = name.match(/(\d+)x(\d+)(?:x(\d+))?/i);
    if (sizeMatch) {
      if (sizeMatch[3]) {
        specs['Размер'] = `${sizeMatch[1]}x${sizeMatch[2]}x${sizeMatch[3]} см`;
      } else {
        specs['Диаметр'] = `${sizeMatch[1]} см`;
        specs['Высота'] = `${sizeMatch[2]} см`;
      }
    }
    
    // Объем
    const volumeMatch = description.match(/(\d+[\s,]?\d*)\s*л/i);
    if (volumeMatch) {
      specs['Объем'] = volumeMatch[1].replace(/\s/g, '') + ' л';
    }
    
    // Производительность насоса
    const pumpMatch = description.match(/(\d+)\s*л\/ч/i);
    if (pumpMatch) {
      specs['Производительность насоса'] = pumpMatch[1] + ' л/ч';
    }
    
    return specs;
  }

  extractVolume(name) {
    const volumeMatch = name.match(/(\d+)л/i);
    return volumeMatch ? `${volumeMatch[1]}л` : null;
  }

  analyzeProducts() {
    console.log('\n📊 АНАЛИЗ ТОВАРОВ:');
    
    // Группировка по категориям
    const categories = {};
    const brands = {};
    
    this.products.forEach(product => {
      categories[product.category] = (categories[product.category] || 0) + 1;
      brands[product.brand] = (brands[product.brand] || 0) + 1;
    });
    
    console.log('\n🏷️ По категориям:');
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} товаров`);
    });
    
    console.log('\n🏭 По брендам:');
    Object.entries(brands).forEach(([brand, count]) => {
      console.log(`   ${brand}: ${count} товаров`);
    });
    
    // Ценовые диапазоны
    const prices = this.products.map(p => parseInt(p.price)).filter(p => p > 0);
    console.log(`\n💰 Цены: от ${Math.min(...prices)} до ${Math.max(...prices)} ₽`);
  }

  generateStorageCode() {
    console.log('\n🔧 Генерация кода для storage.ts...');
    
    // Берем первые 50 товаров для примера (файл будет слишком большой)
    const sampleProducts = this.products.slice(0, 50);
    
    const codeLines = sampleProducts.map((product, index) => {
      return `      {
        name: ${JSON.stringify(product.name)},
        description: ${JSON.stringify(product.description)},
        price: "${product.price}",
        originalPrice: ${product.originalPrice ? `"${product.originalPrice}"` : 'null'},
        category: "${product.category}",
        subcategory: ${product.subcategory ? `"${product.subcategory}"` : 'null'},
        brand: "${product.brand}",
        volume: ${product.volume ? `"${product.volume}"` : 'null'},
        imageUrl: "${product.imageUrl}",
        images: ${JSON.stringify(product.images.slice(0, 3))},
        specifications: ${JSON.stringify(product.specifications)},
        inStock: ${product.inStock},
        isPopular: ${index < 5},
        isNew: ${index < 3},
        discount: ${product.discount},
        rating: "${product.rating}",
        reviewCount: ${product.reviewCount}
      }${index < sampleProducts.length - 1 ? ',' : ''}`;
    });

    const fullCode = `// Импортированные товары из CSV basseyn.ru
// ${sampleProducts.length} товаров из ${this.products.length} (образец)

const importedProducts = [
${codeLines.join(',\n')}
];

// Статистика импорта:
// Всего товаров в CSV: ${this.products.length}
// Обработано успешно: ${this.processedCount}
// Пропущено: ${this.skippedCount}
// Дата импорта: ${new Date().toISOString()}

export default importedProducts;`;

    fs.writeFileSync('./imported-products.js', fullCode);
    
    // Также сохраняем полную версию в JSON
    const fullData = {
      products: this.products,
      totalCount: this.products.length,
      processedCount: this.processedCount,
      skippedCount: this.skippedCount,
      importedAt: new Date().toISOString()
    };
    
    fs.writeFileSync('./full-catalog.json', JSON.stringify(fullData, null, 2));
    
    console.log('📄 Файлы созданы:');
    console.log('   • scripts/imported-products.js (50 товаров для вставки)');
    console.log('   • scripts/full-catalog.json (полный каталог)');
  }
}

// Запуск импорта
const csvFile = process.argv[2] || 'attached_assets/basseyn.ru_Каркасные_бассейны_Intex_Карка_27-06-25_1751043359220.csv';

console.log(`📁 Импорт из файла: ${csvFile}`);

const importer = new CSVImporter();
importer.importFromCSV(csvFile)
  .then((products) => {
    console.log(`\n🎉 ИМПОРТ УСПЕШНО ЗАВЕРШЕН!`);
    console.log(`📦 Обработано товаров: ${products.length}`);
    console.log(`\n📋 Следующие шаги:`);
    console.log(`1. Откройте scripts/imported-products.js`);
    console.log(`2. Скопируйте массив товаров`);
    console.log(`3. Добавьте в server/storage.ts`);
    console.log(`4. Полный каталог доступен в scripts/full-catalog.json`);
  })
  .catch((error) => {
    console.error(`❌ Ошибка импорта: ${error.message}`);
    process.exit(1);
  });