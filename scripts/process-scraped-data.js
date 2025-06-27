// Скрипт для обработки скачанного JSON файла и добавления товаров в наш магазин
const fs = require('fs');
const path = require('path');

function processScrapedData(jsonFilePath) {
  console.log('Обработка спарсенных данных...');
  
  // Читаем JSON файл
  if (!fs.existsSync(jsonFilePath)) {
    console.error(`Файл ${jsonFilePath} не найден!`);
    return;
  }
  
  const rawData = fs.readFileSync(jsonFilePath, 'utf8');
  const data = JSON.parse(rawData);
  
  console.log(`Найдено товаров: ${data.products?.length || 0}`);
  
  if (!data.products || data.products.length === 0) {
    console.error('В файле нет товаров для импорта');
    return;
  }
  
  // Обрабатываем каждый товар
  const processedProducts = data.products.map((product, index) => {
    // Определяем категорию
    let category = 'accessories';
    if (product.name.toLowerCase().includes('каркасный')) category = 'frame-pools';
    else if (product.name.toLowerCase().includes('надувной')) category = 'inflatable-pools';
    else if (product.name.toLowerCase().includes('насос') || product.name.toLowerCase().includes('фильтр')) category = 'pumps-filters';
    else if (product.name.toLowerCase().includes('химия') || product.name.toLowerCase().includes('хлор')) category = 'chemicals';
    else if (product.name.toLowerCase().includes('лестница')) category = 'ladders';
    else if (product.name.toLowerCase().includes('тент') || product.name.toLowerCase().includes('покрытие')) category = 'covers-underlays';
    
    // Определяем подкатегорию для Intex/Bestway
    let subcategory = null;
    const nameLower = product.name.toLowerCase();
    if (product.brand === 'Intex') {
      if (nameLower.includes('ultra frame') || nameLower.includes('xtr')) subcategory = 'ultra-frame-xtr';
      else if (nameLower.includes('prism frame')) subcategory = 'prism-frame';
      else if (nameLower.includes('metal frame')) subcategory = 'metal-frame';
      else if (nameLower.includes('easy set')) subcategory = 'easy-set';
    } else if (product.brand === 'Bestway') {
      if (nameLower.includes('steel pro')) subcategory = 'steel-pro-max';
      else if (nameLower.includes('power steel')) subcategory = 'power-steel';
      else if (nameLower.includes('fast set')) subcategory = 'fast-set';
    }
    
    // Извлекаем объем из названия
    const volumeMatch = product.name.match(/(\d+)\s*л/);
    const volume = volumeMatch ? `${volumeMatch[1]}л` : null;
    
    // Создаем базовые характеристики
    const specifications = {};
    
    // Размеры
    const sizeMatch = product.name.match(/(\d+)х(\d+)/);
    if (sizeMatch) {
      specifications['Размер'] = `${sizeMatch[1]}x${sizeMatch[2]} см`;
    }
    
    if (volume) {
      specifications['Объем'] = volume;
    }
    
    // Базовые характеристики по бренду
    if (product.brand === 'Intex') {
      specifications['Материал'] = 'ПВХ Super-Tough';
      specifications['Гарантия'] = '1 год';
      specifications['Производитель'] = 'Intex Corp';
    } else if (product.brand === 'Bestway') {
      specifications['Материал'] = 'TriTech 3-слоя';
      specifications['Гарантия'] = '2 года';
      specifications['Производитель'] = 'Bestway Corp';
    }
    
    // Добавляем характеристики в зависимости от типа товара
    if (category === 'frame-pools') {
      specifications['Тип бассейна'] = 'Каркасный';
      specifications['Материал каркаса'] = 'Оцинкованная сталь';
    } else if (category === 'inflatable-pools') {
      specifications['Тип бассейна'] = 'Надувной';
      specifications['Время установки'] = '15-30 минут';
    }
    
    return {
      name: product.name,
      description: `${product.brand} - ${product.name}. Качественное оборудование для бассейнов с гарантией производителя.`,
      price: product.price.toString(),
      originalPrice: product.originalPrice ? product.originalPrice.toString() : null,
      category: category,
      subcategory: subcategory,
      brand: product.brand,
      volume: volume,
      imageUrl: product.imageUrl || "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
      images: [product.imageUrl].filter(Boolean),
      specifications: JSON.stringify(specifications),
      inStock: true,
      isPopular: index < 5, // Первые 5 товаров популярные
      isNew: index < 3, // Первые 3 новые
      discount: product.discount || 0,
      rating: (4.0 + Math.random()).toFixed(1),
      reviewCount: Math.floor(Math.random() * 50) + 5
    };
  });
  
  // Генерируем код для вставки в storage.ts
  generateStorageCode(processedProducts);
  
  console.log(`Обработано товаров: ${processedProducts.length}`);
  console.log('Код для добавления в storage.ts сохранен в файл storage-insert.js');
}

function generateStorageCode(products) {
  const codeLines = products.map((product, index) => {
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
      }${index < products.length - 1 ? ',' : ''}`;
  });
  
  const fullCode = `// Добавьте эти товары в массив productsData в файле server/storage.ts
// После строки с последним товаром добавьте запятую и вставьте:

${codeLines.join(',\n')}`;
  
  fs.writeFileSync('storage-insert.js', fullCode);
}

// Запуск скрипта
const jsonFile = process.argv[2];
if (!jsonFile) {
  console.log('Использование: node process-scraped-data.js <путь-к-json-файлу>');
  console.log('Пример: node process-scraped-data.js intex-catalog-1234567890.json');
} else {
  processScrapedData(jsonFile);
}