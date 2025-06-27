// Простой скрипт для консоли браузера (работает без расширения)
// Запустите на любой странице intex-bassein.ru с товарами

(function() {
  console.log('🏊‍♂️ Запуск простого парсера товаров...');
  
  const results = {
    products: [],
    timestamp: new Date().toISOString(),
    url: window.location.href
  };

  function extractProducts() {
    // Поиск товаров с расширенным списком селекторов
    const productSelectors = [
      '.product-item',
      '.catalog-item', 
      '.item-block',
      '.product-card',
      '.catalog-element-item',
      '.bx-catalog-item',
      '[data-entity="item"]',
      '.product',
      '.item',
      '.goods-item',
      '.catalog-item-card'
    ];

    let productElements = [];
    let usedSelector = '';

    // Пробуем найти товары
    for (const selector of productSelectors) {
      productElements = document.querySelectorAll(selector);
      if (productElements.length > 0) {
        usedSelector = selector;
        console.log(`✅ Найдено ${productElements.length} элементов с селектором: ${selector}`);
        break;
      }
    }

    if (productElements.length === 0) {
      console.error('❌ Товары не найдены. Попробуйте на другой странице.');
      console.log('🔍 Диагностика: проверим что есть на странице...');
      
      // Диагностика
      const allDivs = document.querySelectorAll('div[class*="product"], div[class*="item"], div[class*="catalog"]');
      console.log(`Найдено потенциальных элементов: ${allDivs.length}`);
      allDivs.slice(0, 5).forEach((el, i) => {
        console.log(`${i + 1}. ${el.className}`);
      });
      
      return [];
    }

    console.log(`🔄 Обработка ${productElements.length} товаров...`);

    productElements.forEach((element, index) => {
      try {
        const product = extractProductData(element, index);
        if (product) {
          results.products.push(product);
          console.log(`${index + 1}. ${product.name.substring(0, 50)}... - ${product.price} ₽`);
        }
      } catch (error) {
        console.warn(`⚠️ Ошибка обработки товара ${index + 1}:`, error.message);
      }
    });

    return results.products;
  }

  function extractProductData(element, index) {
    // Извлечение названия
    const nameSelectors = [
      '.item-title a',
      '.product-name a',
      '.catalog-item-title a',
      '.name a',
      'h3 a',
      '.title a',
      '[data-entity="name"] a',
      'a[href*="/catalog/"]',
      '.product-title',
      '.item-name'
    ];

    let name = '';
    let productUrl = '';

    for (const selector of nameSelectors) {
      const nameEl = element.querySelector(selector);
      if (nameEl) {
        name = nameEl.textContent.trim();
        productUrl = nameEl.href || window.location.href;
        break;
      }
    }

    // Если не нашли ссылку, пробуем просто текст
    if (!name) {
      const textSelectors = ['.item-title', '.product-name', '.name', 'h3', '.title'];
      for (const selector of textSelectors) {
        const nameEl = element.querySelector(selector);
        if (nameEl) {
          name = nameEl.textContent.trim();
          break;
        }
      }
    }

    if (!name) {
      throw new Error('Название не найдено');
    }

    // Извлечение цен
    const allText = element.textContent;
    const priceRegex = /(\d[\d\s]*(?:\d))\s*₽/g;
    const priceMatches = [...allText.matchAll(priceRegex)];
    
    let currentPrice = '';
    let originalPrice = null;

    if (priceMatches.length >= 2) {
      // Несколько цен - вероятно скидка
      const prices = priceMatches.map(m => parseInt(m[1].replace(/\s/g, '')))
                                  .sort((a, b) => b - a);
      originalPrice = prices[0].toString();
      currentPrice = prices[1].toString();
    } else if (priceMatches.length === 1) {
      currentPrice = priceMatches[0][1].replace(/\s/g, '');
    }

    if (!currentPrice) {
      throw new Error('Цена не найдена');
    }

    // Изображение
    const img = element.querySelector('img');
    let imageUrl = '';
    if (img) {
      imageUrl = img.src || img.dataset.src || img.dataset.original || '';
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = new URL(imageUrl, window.location.origin).href;
      }
    }

    // Определение бренда
    const nameLower = name.toLowerCase();
    let brand = 'Неизвестный';
    if (nameLower.includes('intex')) brand = 'Intex';
    else if (nameLower.includes('bestway')) brand = 'Bestway';
    else if (nameLower.includes('jilong')) brand = 'Jilong';
    else if (nameLower.includes('laguna')) brand = 'Laguna';

    // Определение категории
    let category = 'accessories';
    if (nameLower.includes('каркасный') || nameLower.includes('frame')) {
      category = 'frame-pools';
    } else if (nameLower.includes('надувной') || nameLower.includes('easy set')) {
      category = 'inflatable-pools';
    } else if (nameLower.includes('насос') || nameLower.includes('фильтр')) {
      category = 'pumps-filters';
    } else if (nameLower.includes('лестниц')) {
      category = 'ladders';
    } else if (nameLower.includes('тент') || nameLower.includes('покрыт')) {
      category = 'covers-underlays';
    } else if (nameLower.includes('химия') || nameLower.includes('хлор')) {
      category = 'chemicals';
    }

    // Артикул
    const articleMatch = name.match(/(\d{5,})/);
    const article = articleMatch ? articleMatch[1] : '';

    // Скидка
    const discount = originalPrice && currentPrice ? 
      Math.round((1 - parseInt(currentPrice) / parseInt(originalPrice)) * 100) : 0;

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
      inStock: true,
      discount: discount,
      scrapedAt: new Date().toISOString(),
      source: window.location.href
    };
  }

  // Запуск парсинга
  const products = extractProducts();
  
  // Результаты
  console.log('\n🎯 РЕЗУЛЬТАТЫ ПАРСИНГА:');
  console.log(`📄 Страница: ${window.location.href}`);
  console.log(`📦 Найдено товаров: ${products.length}`);
  
  if (products.length === 0) {
    console.log('❌ Товары не найдены. Рекомендации:');
    console.log('1. Убедитесь что находитесь на странице с товарами');
    console.log('2. Попробуйте другую категорию товаров');
    console.log('3. Проверьте что страница полностью загрузилась');
    return null;
  }

  // Показываем примеры
  console.log('\n📋 Примеры найденных товаров:');
  products.slice(0, 3).forEach((product, i) => {
    console.log(`${i + 1}. ${product.name} - ${product.price} ₽ (${product.brand})`);
  });

  // Группировка по брендам
  const brands = {};
  products.forEach(p => {
    brands[p.brand] = (brands[p.brand] || 0) + 1;
  });
  
  console.log('\n🏷️ По брендам:');
  Object.entries(brands).forEach(([brand, count]) => {
    console.log(`${brand}: ${count} товаров`);
  });

  // Скачивание файла
  const dataStr = JSON.stringify(results, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `intex-products-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  console.log('\n💾 Файл JSON скачан!');
  console.log('\n📨 Отправьте скачанный файл разработчику для добавления товаров в каталог.');
  
  return results;
})();