// Адаптивный скрипт для intex-bassein.ru
// Сначала исследует структуру, затем извлекает данные

(function() {
  console.log('🔍 Исследуем структуру сайта...');
  
  // Сначала найдем товары
  const productElements = document.querySelectorAll('.product-item');
  console.log(`Найдено элементов товаров: ${productElements.length}`);
  
  if (productElements.length === 0) {
    console.error('Товары не найдены');
    return;
  }
  
  // Исследуем структуру первого товара
  const firstProduct = productElements[0];
  console.log('📋 Структура первого товара:');
  console.log(firstProduct);
  
  // Ищем все ссылки в товаре
  const links = firstProduct.querySelectorAll('a');
  console.log(`Найдено ссылок: ${links.length}`);
  links.forEach((link, i) => {
    console.log(`Ссылка ${i + 1}:`, link.textContent.trim(), '→', link.href);
  });
  
  // Ищем все элементы с текстом, похожим на цену
  const allTextElements = firstProduct.querySelectorAll('*');
  const priceElements = [];
  allTextElements.forEach(el => {
    const text = el.textContent.trim();
    if (text.match(/\d+.*₽|\d+.*руб|\d+\s*р/)) {
      priceElements.push({
        element: el,
        text: text,
        tagName: el.tagName,
        className: el.className
      });
    }
  });
  
  console.log('💰 Найденные элементы с ценами:');
  priceElements.forEach((item, i) => {
    console.log(`Цена ${i + 1}:`, item.text, `(${item.tagName}.${item.className})`);
  });
  
  // Теперь попробуем извлечь данные
  const results = {
    products: [],
    timestamp: new Date().toISOString(),
    url: window.location.href
  };
  
  productElements.forEach((element, index) => {
    try {
      // Извлекаем все текстовые элементы
      const allText = element.textContent;
      
      // Ищем название - обычно это самый длинный текст в ссылке
      const links = element.querySelectorAll('a');
      let productName = '';
      let productUrl = '';
      
      for (const link of links) {
        const text = link.textContent.trim();
        if (text.length > productName.length && text.length > 10) {
          productName = text;
          productUrl = link.href;
        }
      }
      
      // Ищем цены в тексте
      const priceMatches = allText.match(/(\d[\d\s]*(?:\d))\s*₽/g);
      let currentPrice = '';
      let oldPrice = '';
      
      if (priceMatches) {
        // Сортируем цены по убыванию
        const prices = priceMatches.map(p => parseInt(p.replace(/[^\d]/g, '')))
                                   .sort((a, b) => b - a);
        
        if (prices.length >= 2) {
          oldPrice = prices[0].toString();
          currentPrice = prices[1].toString();
        } else if (prices.length === 1) {
          currentPrice = prices[0].toString();
        }
      }
      
      // Ищем изображение
      const img = element.querySelector('img');
      const imageUrl = img ? (img.src || img.dataset.src || img.dataset.original) : '';
      
      // Определяем бренд
      let brand = 'Неизвестный';
      if (productName.toLowerCase().includes('intex')) brand = 'Intex';
      else if (productName.toLowerCase().includes('bestway')) brand = 'Bestway';
      
      if (productName && currentPrice) {
        const product = {
          id: index + 1,
          name: productName,
          price: currentPrice,
          originalPrice: oldPrice || null,
          brand: brand,
          imageUrl: imageUrl,
          productUrl: productUrl,
          category: 'frame-pools',
          inStock: true,
          discount: oldPrice ? Math.round((1 - parseInt(currentPrice) / parseInt(oldPrice)) * 100) : 0
        };
        
        results.products.push(product);
        console.log(`✅ Товар ${index + 1}: ${productName.substring(0, 40)}... - ${currentPrice} ₽`);
      } else {
        console.log(`❌ Товар ${index + 1}: не удалось извлечь данные`);
        console.log(`  Название: "${productName}"`);
        console.log(`  Цена: "${currentPrice}"`);
        console.log(`  Весь текст:`, allText.substring(0, 100));
      }
      
    } catch (error) {
      console.error(`Ошибка обработки товара ${index + 1}:`, error);
    }
  });
  
  console.log(`\n🎯 Результат: ${results.products.length} товаров извлечено`);
  
  if (results.products.length > 0) {
    // Скачиваем файл
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
    
    console.log('📁 Файл скачан!');
    
    // Показываем первые несколько товаров
    console.log('\n📦 Примеры товаров:');
    results.products.slice(0, 3).forEach(product => {
      console.log(`- ${product.name} | ${product.price} ₽ | ${product.brand}`);
    });
  }
  
  return results;
})();