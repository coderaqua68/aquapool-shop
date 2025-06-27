// Скрипт для импорта спарсенных товаров в нашу систему
const fs = require('fs');
const path = require('path');
const https = require('https');

class ProductImporter {
  constructor() {
    this.importedProducts = [];
    this.categoriesMap = new Map();
    this.imageCounter = 1;
  }

  // Загрузка и сохранение изображения
  async downloadImage(url, productName, index = 0) {
    return new Promise((resolve, reject) => {
      if (!url || !url.startsWith('http')) {
        resolve(null);
        return;
      }

      const safeName = productName.replace(/[^a-zA-Zа-яё0-9]/g, '_').substring(0, 30);
      const extension = url.split('.').pop()?.split('?')[0] || 'jpg';
      const filename = `product_${this.imageCounter++}_${safeName}.${extension}`;
      const imagePath = path.join(__dirname, '../public/images/products');
      
      // Создаем директорию если не существует
      if (!fs.existsSync(imagePath)) {
        fs.mkdirSync(imagePath, { recursive: true });
      }
      
      const filepath = path.join(imagePath, filename);
      const file = fs.createWriteStream(filepath);
      
      https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(`/images/products/${filename}`);
        });
      }).on('error', (err) => {
        fs.unlink(filepath, () => {}); // Удаляем неполный файл
        console.log(`Ошибка загрузки изображения ${url}:`, err.message);
        resolve(null);
      });
    });
  }

  // Маппинг категорий с intex-bassein.ru на наши
  mapCategory(originalCategory) {
    const categoryMap = {
      'karkasnye-basseyny': 'frame-pools',
      'intex-karkasnye-basseyny': 'intex-frame',
      'bestway-karkasnye-basseyny': 'bestway-frame',
      'naduvnye-basseyny': 'inflatable-pools',
      'morozoustoychivye-basseyny': 'winter-pools',
      'oborudovanie': 'equipment',
      'nasosy-filtry': 'pumps-filters',
      'pavilony': 'pavilions',
      'khimiya': 'chemicals',
      'pokrytiya-tenty': 'covers-underlays',
      'lestnicy': 'ladders',
      'aksessuary': 'accessories',
      'otdykh-na-vode': 'recreation'
    };
    
    return categoryMap[originalCategory] || 'accessories';
  }

  // Определение подкатегории
  getSubcategory(name, brand) {
    const nameLower = name.toLowerCase();
    
    if (brand === 'Intex') {
      if (nameLower.includes('ultra frame') || nameLower.includes('xtr')) return 'ultra-frame-xtr';
      if (nameLower.includes('prism frame')) return 'prism-frame';
      if (nameLower.includes('metal frame')) return 'metal-frame';
      if (nameLower.includes('easy set')) return 'easy-set';
    }
    
    if (brand === 'Bestway') {
      if (nameLower.includes('steel pro max')) return 'steel-pro-max';
      if (nameLower.includes('power steel')) return 'power-steel';
      if (nameLower.includes('fast set')) return 'fast-set';
    }
    
    return null;
  }

  // Создание спецификаций из названия и описания
  generateSpecifications(product) {
    const specs = {};
    const text = `${product.name} ${product.description || ''}`.toLowerCase();
    
    // Извлекаем размеры
    const sizeMatch = text.match(/(\d+)х(\d+)/);
    if (sizeMatch) {
      specs['Размер'] = `${sizeMatch[1]}x${sizeMatch[2]} см`;
    }
    
    // Извлекаем объем
    const volumeMatch = text.match(/(\d+)\s*л/);
    if (volumeMatch) {
      specs['Объем'] = `${volumeMatch[1]} л`;
    }
    
    // Добавляем базовые характеристики по бренду
    if (product.brand === 'Intex') {
      specs['Материал чаши'] = 'ПВХ Super-Tough';
      specs['Гарантия'] = '1 год';
    } else if (product.brand === 'Bestway') {
      specs['Материал чаши'] = 'TriTech 3-слоя';
      specs['Гарантия'] = '2 года';
    }
    
    return specs;
  }

  // Процесс импорта из JSON файла
  async importFromJson(jsonFilePath) {
    console.log('Начинаем импорт товаров...');
    
    // Читаем JSON файл
    const rawData = fs.readFileSync(jsonFilePath, 'utf8');
    const data = JSON.parse(rawData);
    
    console.log(`Найдено товаров для импорта: ${data.products.length}`);
    
    let imported = 0;
    
    for (const product of data.products) {
      try {
        console.log(`Импорт: ${product.name}`);
        
        // Загружаем изображение
        const localImageUrl = await this.downloadImage(product.imageUrl, product.name);
        
        // Создаем объект товара для нашей системы
        const importedProduct = {
          name: product.name,
          description: product.description || `${product.brand} - качественный товар для бассейна`,
          price: product.price.toString(),
          originalPrice: product.originalPrice ? product.originalPrice.toString() : null,
          category: this.mapCategory(product.category),
          subcategory: this.getSubcategory(product.name, product.brand),
          brand: product.brand,
          volume: this.extractVolume(product.name),
          imageUrl: localImageUrl || `https://images.unsplash.com/photo-1544551763-46a013bb70d5`,
          images: [localImageUrl].filter(Boolean),
          specifications: JSON.stringify(this.generateSpecifications(product)),
          inStock: true,
          isPopular: imported < 5, // Первые 5 товаров делаем популярными
          isNew: imported < 3, // Первые 3 товара делаем новыми
          discount: product.discount || 0,
          rating: (4.0 + Math.random()).toFixed(1),
          reviewCount: Math.floor(Math.random() * 100) + 5
        };
        
        this.importedProducts.push(importedProduct);
        imported++;
        
        // Небольшая задержка между загрузками изображений
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.log(`Ошибка импорта товара ${product.name}:`, error.message);
      }
    }
    
    console.log(`Успешно импортировано: ${imported} товаров`);
    this.saveToStorage();
  }

  extractVolume(name) {
    const volumeMatch = name.match(/(\d+)\s*л/);
    return volumeMatch ? `${volumeMatch[1]}л` : null;
  }

  // Сохранение в файл для использования в нашей системе
  saveToStorage() {
    const outputData = {
      importedAt: new Date().toISOString(),
      totalProducts: this.importedProducts.length,
      products: this.importedProducts
    };
    
    const outputPath = path.join(__dirname, 'imported_products.json');
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
    
    console.log(`\nДанные сохранены в: ${outputPath}`);
    console.log('Для добавления в систему используйте файл imported_products.json');
    
    // Создаем код для вставки в storage.ts
    this.generateStorageCode();
  }

  // Генерация кода для storage.ts
  generateStorageCode() {
    const codeLines = [];
    
    this.importedProducts.forEach((product, index) => {
      codeLines.push(`      {`);
      codeLines.push(`        name: "${product.name}",`);
      codeLines.push(`        description: "${product.description}",`);
      codeLines.push(`        price: "${product.price}",`);
      codeLines.push(`        originalPrice: ${product.originalPrice ? `"${product.originalPrice}"` : 'null'},`);
      codeLines.push(`        category: "${product.category}",`);
      codeLines.push(`        subcategory: ${product.subcategory ? `"${product.subcategory}"` : 'null'},`);
      codeLines.push(`        brand: "${product.brand}",`);
      codeLines.push(`        volume: ${product.volume ? `"${product.volume}"` : 'null'},`);
      codeLines.push(`        imageUrl: "${product.imageUrl}",`);
      codeLines.push(`        images: ${JSON.stringify(product.images)},`);
      codeLines.push(`        specifications: JSON.stringify(${JSON.stringify(JSON.parse(product.specifications))}),`);
      codeLines.push(`        inStock: ${product.inStock},`);
      codeLines.push(`        isPopular: ${product.isPopular},`);
      codeLines.push(`        isNew: ${product.isNew},`);
      codeLines.push(`        discount: ${product.discount},`);
      codeLines.push(`        rating: "${product.rating}",`);
      codeLines.push(`        reviewCount: ${product.reviewCount}`);
      codeLines.push(`      }${index < this.importedProducts.length - 1 ? ',' : ''}`);
    });
    
    const fullCode = `// Импортированные товары из intex-bassein.ru\nconst importedProducts = [\n${codeLines.join('\n')}\n];`;
    
    fs.writeFileSync(path.join(__dirname, 'storage_code.js'), fullCode);
    console.log('Код для storage.ts сохранен в storage_code.js');
  }
}

// Использование
if (require.main === module) {
  if (process.argv.length < 3) {
    console.log('Использование: node import-products.js <путь-к-json-файлу>');
    console.log('Пример: node import-products.js scraped-data.json');
    process.exit(1);
  }
  
  const jsonFile = process.argv[2];
  
  if (!fs.existsSync(jsonFile)) {
    console.log(`Файл ${jsonFile} не найден!`);
    process.exit(1);
  }
  
  const importer = new ProductImporter();
  importer.importFromJson(jsonFile).catch(console.error);
}

module.exports = ProductImporter;