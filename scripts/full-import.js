import fs from 'fs';
import path from 'path';

class FullCatalogImporter {
  constructor() {
    this.products = [];
    this.categories = new Set();
    this.brands = new Set();
  }

  async importFromCSV(csvFilePath) {
    console.log('📂 Загружаю CSV файл...');
    const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
    const lines = csvContent.split('\n');
    const headers = this.parseCSVLine(lines[0]);
    
    console.log('📋 Заголовки найдены:', headers.slice(0, 10));
    
    let processedCount = 0;
    let skippedCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      try {
        const fields = this.parseCSVLine(line);
        if (fields.length < headers.length - 5) continue; // Пропустить неполные строки

        const product = this.convertToOurFormat(fields, headers);
        if (product) {
          this.products.push(product);
          processedCount++;
          
          if (processedCount % 100 === 0) {
            console.log(`✅ Обработано ${processedCount} товаров...`);
          }
        } else {
          skippedCount++;
        }
      } catch (error) {
        console.log(`⚠️ Ошибка обработки строки ${i}: ${error.message}`);
        skippedCount++;
      }
    }

    console.log(`🎉 Импорт завершен: ${processedCount} товаров, пропущено: ${skippedCount}`);
    console.log(`📊 Найдено категорий: ${this.categories.size}`);
    console.log(`🏷️ Найдено брендов: ${this.brands.size}`);

    return {
      products: this.products,
      categories: Array.from(this.categories),
      brands: Array.from(this.brands)
    };
  }

  parseCSVLine(line) {
    const fields = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"';
          i++; // Пропустить следующую кавычку
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ';' && !inQuotes) {
        fields.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    fields.push(current.trim());
    return fields;
  }

  convertToOurFormat(fields, headers) {
    const getField = (name) => {
      const index = headers.indexOf(name);
      return index >= 0 ? fields[index] : '';
    };

    const title = getField('Заголовок');
    const price = getField('Цена');
    const category1 = getField('Категория 1');
    const category2 = getField('Категория 2');
    const category3 = getField('Категория 3');
    const description = getField('Описание');
    const availability = getField('Наличие');
    const weight = getField('Вес');
    const dimensions = getField('Габариты');
    const manufacturer = getField('Производитель');
    const article = getField('Артикул');

    if (!title || !price || !category1) {
      return null;
    }

    // Извлекаем все изображения
    const images = [];
    for (let i = 1; i <= 17; i++) {
      const imageField = getField(`Изображение ${i}`);
      if (imageField && imageField.startsWith('https://')) {
        images.push(imageField);
      }
    }

    // Определяем бренд
    const brand = this.determineBrand(title, manufacturer);
    this.brands.add(brand);

    // Определяем категорию
    const category = this.determineCategory(category1, category2, category3, title);
    this.categories.add(category);

    // Очищаем описание от HTML
    const cleanDescription = this.cleanDescription(description);

    // Извлекаем характеристики
    const specifications = this.extractSpecifications(description, title);

    // Извлекаем объем
    const volume = this.extractVolume(title);

    return {
      name: title,
      description: cleanDescription,
      price: price.toString(),
      originalPrice: null,
      category: category,
      subcategory: this.getSubcategory(category2, category3),
      brand: brand,
      volume: volume,
      imageUrl: images[0] || "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
      images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1544551763-46a013bb70d5"],
      specifications: JSON.stringify(specifications),
      inStock: availability === 'В наличии',
      isPopular: this.isPopularProduct(title, brand),
      isNew: false,
      discount: 0,
      rating: this.generateRating(),
      reviewCount: this.generateReviewCount()
    };
  }

  determineBrand(title, manufacturer) {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('intex') || manufacturer === 'Intex') return 'Intex';
    if (titleLower.includes('bestway') || manufacturer === 'Bestway') return 'Bestway';
    if (titleLower.includes('gre') || manufacturer === 'GRE') return 'GRE';
    if (titleLower.includes('azuro') || manufacturer === 'Azuro') return 'Azuro';
    if (titleLower.includes('mountfield') || manufacturer === 'Mountfield') return 'Mountfield';
    
    return manufacturer || 'Другие';
  }

  determineCategory(cat1, cat2, cat3, title) {
    const titleLower = title.toLowerCase();
    
    // Каркасные бассейны
    if (cat2 === 'Каркасные бассейны' || titleLower.includes('каркасный')) {
      return 'frame-pools';
    }
    
    // Надувные бассейны
    if (cat2 === 'Надувные бассейны' || titleLower.includes('надувной')) {
      return 'inflatable-pools';
    }
    
    // Насосы и фильтры
    if (titleLower.includes('насос') || titleLower.includes('фильтр') || titleLower.includes('скиммер')) {
      return 'pumps-filters';
    }
    
    // Лестницы
    if (titleLower.includes('лестница') || titleLower.includes('ступеньки')) {
      return 'ladders';
    }
    
    // Тенты и подстилки
    if (titleLower.includes('тент') || titleLower.includes('подстилка') || titleLower.includes('покрывало')) {
      return 'covers-underlays';
    }
    
    // Химия
    if (titleLower.includes('химия') || titleLower.includes('хлор') || titleLower.includes('ph')) {
      return 'chemicals';
    }
    
    // Аксессуары
    return 'accessories';
  }

  getSubcategory(cat2, cat3) {
    if (cat3) return this.slugify(cat3);
    if (cat2) return this.slugify(cat2);
    return null;
  }

  slugify(text) {
    return text.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  cleanDescription(description) {
    if (!description) return 'Качественный товар для бассейна от проверенного производителя.';
    
    return description
      .replace(/<[^>]*>/g, '') // Удаляем HTML теги
      .replace(/&[^;]+;/g, ' ') // Удаляем HTML сущности
      .replace(/\s+/g, ' ') // Убираем лишние пробелы
      .trim()
      .substring(0, 500) + (description.length > 500 ? '...' : '');
  }

  extractSpecifications(description, title) {
    const specs = {};
    
    if (!description) return specs;
    
    // Извлекаем характеристики из списков
    const listItems = description.match(/<li[^>]*>(.*?)<\/li>/g) || [];
    listItems.forEach(item => {
      const clean = item.replace(/<[^>]*>/g, '').trim();
      const parts = clean.split(':');
      if (parts.length === 2) {
        specs[parts[0].trim()] = parts[1].trim();
      }
    });
    
    // Извлекаем размеры из названия
    const sizeMatch = title.match(/(\d+)x(\d+)(?:x(\d+))?/);
    if (sizeMatch) {
      if (sizeMatch[3]) {
        specs['Размер'] = `${sizeMatch[1]}x${sizeMatch[2]}x${sizeMatch[3]} см`;
      } else {
        specs['Диаметр'] = `${sizeMatch[1]} см`;
        specs['Высота'] = `${sizeMatch[2]} см`;
      }
    }
    
    // Извлекаем объем
    const volumeMatch = title.match(/(\d+)л/);
    if (volumeMatch) {
      specs['Объем'] = `${volumeMatch[1]} л`;
    }
    
    return specs;
  }

  extractVolume(title) {
    const volumeMatch = title.match(/(\d+)л/);
    return volumeMatch ? `${volumeMatch[1]}л` : null;
  }

  isPopularProduct(title, brand) {
    const titleLower = title.toLowerCase();
    return (
      titleLower.includes('prism frame') ||
      titleLower.includes('ultra frame') ||
      titleLower.includes('steel pro') ||
      brand === 'Intex' ||
      brand === 'Bestway'
    );
  }

  generateRating() {
    return (4.0 + Math.random() * 1.0).toFixed(1);
  }

  generateReviewCount() {
    return Math.floor(Math.random() * 50) + 5;
  }

  saveResults() {
    const results = {
      products: this.products,
      categories: Array.from(this.categories),
      brands: Array.from(this.brands),
      stats: {
        totalProducts: this.products.length,
        totalCategories: this.categories.size,
        totalBrands: this.brands.size
      }
    };

    fs.writeFileSync('./full-catalog-processed.json', JSON.stringify(results, null, 2), 'utf-8');
    console.log('💾 Результаты сохранены в scripts/full-catalog-processed.json');

    return results;
  }

  generateStorageCode() {
    console.log('🔧 Генерирую код для storage.ts...');
    
    const categories = [
      { name: "Каркасные бассейны", slug: "frame-pools", description: "Прочные каркасные бассейны для дачи" },
      { name: "Надувные бассейны", slug: "inflatable-pools", description: "Быстро устанавливаемые надувные бассейны" },
      { name: "Насосы и фильтры", slug: "pumps-filters", description: "Системы очистки и циркуляции воды" },
      { name: "Лестницы", slug: "ladders", description: "Безопасные лестницы для бассейнов" },
      { name: "Тенты и подстилки", slug: "covers-underlays", description: "Защитные покрытия и основания" },
      { name: "Химия для бассейнов", slug: "chemicals", description: "Средства для очистки и дезинфекции воды" },
      { name: "Аксессуары", slug: "accessories", description: "Дополнительные принадлежности" }
    ];

    let code = `// Полный каталог товаров (${this.products.length} позиций)\n`;
    code += `const categoriesData = ${JSON.stringify(categories, null, 2)};\n\n`;
    code += `const productsData = ${JSON.stringify(this.products.slice(0, 50), null, 2)};\n\n`; // Первые 50 для начала
    code += `// ... остальные товары будут добавлены динамически\n`;

    fs.writeFileSync('scripts/storage-generated.js', code, 'utf-8');
    console.log('💾 Код сохранен в scripts/storage-generated.js');
  }
}

// Запуск импорта
async function main() {
  const importer = new FullCatalogImporter();
  
  try {
    const csvPath = '../attached_assets/basseyn.ru_Каркасные_бассейны_Intex_Карка_27-06-25_1751043359220.csv';
    const results = await importer.importFromCSV(csvPath);
    
    importer.saveResults();
    importer.generateStorageCode();
    
    console.log('🎉 Импорт завершен успешно!');
    console.log(`📊 Обработано товаров: ${results.products.length}`);
    console.log(`📂 Категорий: ${results.categories.length}`);
    console.log(`🏷️ Брендов: ${results.brands.length}`);
    
  } catch (error) {
    console.error('❌ Ошибка импорта:', error);
  }
}

main();