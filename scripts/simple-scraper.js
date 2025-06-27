// Простой скрипт для парсинга товаров с intex-bassein.ru
// Запускать в консоли браузера на странице каталога

(function() {
  const results = {
    products: [],
    timestamp: new Date().toISOString(),
    url: window.location.href
  };

  // Функция для извлечения товаров со страницы
  function extractProducts() {
    const productElements = document.querySelectorAll('.catalog-item, .product-item, .item');
    
    productElements.forEach((element, index) => {
      try {
        const nameElement = element.querySelector('.item-title a, .product-name a, h3 a, .name a');
        const priceElement = element.querySelector('.price-current, .price, .cost');
        const oldPriceElement = element.querySelector('.price-old, .old-price');
        const imageElement = element.querySelector('img');
        const linkElement = element.querySelector('a');
        
        if (!nameElement || !priceElement) return;
        
        const name = nameElement.textContent.trim();
        const price = priceElement.textContent.replace(/[^\d]/g, '');
        const oldPrice = oldPriceElement ? oldPriceElement.textContent.replace(/[^\d]/g, '') : null;
        const imageUrl = imageElement ? (imageElement.src || imageElement.dataset.src) : '';
        const productUrl = linkElement ? linkElement.href : '';
        
        // Определяем бренд
        let brand = 'Неизвестный';
        if (name.toLowerCase().includes('intex')) brand = 'Intex';
        else if (name.toLowerCase().includes('bestway')) brand = 'Bestway';
        else if (name.toLowerCase().includes('laguna')) brand = 'Laguna';
        
        // Определяем категорию из URL
        const category = window.location.pathname.split('/catalog/')[1]?.split('/')[0] || 'unknown';
        
        const product = {
          id: index + 1,
          name: name,
          price: price,
          originalPrice: oldPrice,
          brand: brand,
          category: category,
          imageUrl: imageUrl,
          productUrl: productUrl,
          inStock: true,
          discount: oldPrice ? Math.round((1 - parseInt(price) / parseInt(oldPrice)) * 100) : 0
        };
        
        results.products.push(product);
      } catch (e) {
        console.log('Ошибка при обработке товара:', e);
      }
    });
  }

  // Извлекаем товары
  extractProducts();
  
  // Выводим результат
  console.log('=== РЕЗУЛЬТАТЫ ПАРСИНГА ===');
  console.log(`Найдено товаров: ${results.products.length}`);
  console.log('Данные для копирования:');
  console.log(JSON.stringify(results, null, 2));
  
  // Создаем ссылку для скачивания
  const dataStr = JSON.stringify(results, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `intex-catalog-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  console.log('Файл скачан!');
  
  return results;
})();