// Улучшенный скрипт для парсинга товаров с intex-bassein.ru
// Запускать на страницах конкретных категорий, не на главной странице каталога

(function() {
  console.log('Начинаем парсинг товаров...');
  console.log('URL:', window.location.href);
  
  const results = {
    products: [],
    timestamp: new Date().toISOString(),
    url: window.location.href,
    category: extractCategoryFromUrl()
  };

  function extractCategoryFromUrl() {
    const path = window.location.pathname;
    const match = path.match(/\/catalog\/([^\/]+)/);
    return match ? match[1] : 'unknown';
  }

  function determineBrand(name) {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('intex')) return 'Intex';
    if (nameLower.includes('bestway')) return 'Bestway';
    if (nameLower.includes('laguna')) return 'Laguna';
    if (nameLower.includes('jilong')) return 'Jilong';
    return 'Неизвестный';
  }

  function extractPrice(priceText) {
    if (!priceText) return '';
    return priceText.replace(/[^\d]/g, '');
  }

  function extractProducts() {
    // Различные селекторы для товаров на сайте
    const selectors = [
      '.catalog-item',
      '.product-item', 
      '.item-block',
      '.product-card',
      '.catalog-element-item',
      '.bx-catalog-item'
    ];
    
    let productElements = [];
    
    // Пробуем найти товары по разным селекторам
    for (const selector of selectors) {
      productElements = document.querySelectorAll(selector);
      if (productElements.length > 0) {
        console.log(`Найдено ${productElements.length} товаров с селектором: ${selector}`);
        break;
      }
    }
    
    if (productElements.length === 0) {
      console.log('Товары не найдены. Пробуем альтернативные селекторы...');
      
      // Альтернативный поиск
      const alternativeSelectors = [
        '[data-entity="item"]',
        '.catalog-section-item',
        '.product',
        '.item'
      ];
      
      for (const selector of alternativeSelectors) {
        productElements = document.querySelectorAll(selector);
        if (productElements.length > 0) {
          console.log(`Найдено ${productElements.length} товаров с альтернативным селектором: ${selector}`);
          break;
        }
      }
    }
    
    if (productElements.length === 0) {
      console.error('Товары не найдены на странице!');
      console.log('Доступные элементы на странице:');
      console.log('- .catalog-item:', document.querySelectorAll('.catalog-item').length);
      console.log('- .product-item:', document.querySelectorAll('.product-item').length);
      console.log('- .item-block:', document.querySelectorAll('.item-block').length);
      return;
    }
    
    console.log(`Обрабатываем ${productElements.length} товаров...`);
    
    productElements.forEach((element, index) => {
      try {
        // Различные селекторы для названия товара
        const nameSelectors = [
          '.item-title a',
          '.product-name a', 
          '.catalog-item-title a',
          '.name a',
          'h3 a',
          '.title a',
          '[data-entity="name"] a'
        ];
        
        let nameElement = null;
        for (const selector of nameSelectors) {
          nameElement = element.querySelector(selector);
          if (nameElement) break;
        }
        
        // Селекторы для цены
        const priceSelectors = [
          '.price-current',
          '.price',
          '.cost',
          '.current-price',
          '.item-price',
          '[data-entity="price"]'
        ];
        
        let priceElement = null;
        for (const selector of priceSelectors) {
          priceElement = element.querySelector(selector);
          if (priceElement) break;
        }
        
        // Селекторы для старой цены
        const oldPriceSelectors = [
          '.price-old',
          '.old-price',
          '.discount-price',
          '.crossed-price'
        ];
        
        let oldPriceElement = null;
        for (const selector of oldPriceSelectors) {
          oldPriceElement = element.querySelector(selector);
          if (oldPriceElement) break;
        }
        
        // Изображение
        const imageElement = element.querySelector('img');
        
        // Ссылка на товар
        const linkElement = element.querySelector('a[href*="/catalog/"]') || 
                           element.querySelector('a') ||
                           nameElement;
        
        if (!nameElement || !priceElement) {
          console.log(`Товар ${index + 1}: не найдены обязательные элементы`);
          return;
        }
        
        const name = nameElement.textContent.trim();
        const price = extractPrice(priceElement.textContent);
        const oldPrice = oldPriceElement ? extractPrice(oldPriceElement.textContent) : null;
        const imageUrl = imageElement ? 
          (imageElement.src || 
           imageElement.dataset.src || 
           imageElement.dataset.original ||
           imageElement.getAttribute('data-lazy-src')) : '';
        const productUrl = linkElement ? linkElement.href : '';
        
        if (!name || !price) {
          console.log(`Товар ${index + 1}: пустое название или цена`);
          return;
        }
        
        const brand = determineBrand(name);
        const discount = oldPrice && parseInt(oldPrice) > parseInt(price) ? 
          Math.round((1 - parseInt(price) / parseInt(oldPrice)) * 100) : 0;
        
        const product = {
          id: index + 1,
          name: name,
          description: `${brand} - ${name}`,
          price: price,
          originalPrice: oldPrice,
          brand: brand,
          category: results.category,
          imageUrl: imageUrl,
          productUrl: productUrl,
          inStock: true,
          discount: discount,
          extractedFrom: window.location.href
        };
        
        results.products.push(product);
        console.log(`✓ Товар ${index + 1}: ${name.substring(0, 50)}...`);
        
      } catch (error) {
        console.error(`Ошибка при обработке товара ${index + 1}:`, error);
      }
    });
  }

  // Извлекаем товары
  extractProducts();
  
  // Выводим результаты
  console.log('\n=== РЕЗУЛЬТАТЫ ПАРСИНГА ===');
  console.log(`Страница: ${window.location.href}`);
  console.log(`Категория: ${results.category}`);
  console.log(`Найдено товаров: ${results.products.length}`);
  
  if (results.products.length === 0) {
    console.error('❌ Товары не найдены!');
    console.log('Проверьте:');
    console.log('1. Вы находитесь на странице с товарами (не на главной странице каталога)');
    console.log('2. Страница полностью загружена');
    console.log('3. Нет блокировки JavaScript');
    return null;
  }
  
  console.log('\n📄 Примеры найденных товаров:');
  results.products.slice(0, 3).forEach((product, i) => {
    console.log(`${i + 1}. ${product.name} - ${product.price} ₽`);
  });
  
  // Создаем ссылку для скачивания
  const dataStr = JSON.stringify(results, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `intex-${results.category}-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  console.log(`\n✅ Файл скачан: intex-${results.category}-${Date.now()}.json`);
  console.log('\n💡 Совет: Повторите процесс для других категорий товаров');
  
  return results;
})();