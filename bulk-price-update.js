import fetch from 'node-fetch';

const priceUpdates = [
  { sku: "28205", price: 3375, originalPrice: 4500 },
  { sku: "26780", price: 25500, originalPrice: 37500 },
  { sku: "26746", price: 31500, originalPrice: 45000 },
  { sku: "26730", price: 31500, originalPrice: 45000 },
  { sku: "26384", price: 90000, originalPrice: 127500 },
  { sku: "26756", price: 48750, originalPrice: 60000 },
  { sku: "26374", price: 112500, originalPrice: 150000 },
  { sku: "26378", price: 127500, originalPrice: 172500 },
  { sku: "28274", price: 12750, originalPrice: 18750 },
  { sku: "26712", price: 7500, originalPrice: 12000 },
  { sku: "28271", price: 4875, originalPrice: 8250 },
  { sku: "26700", price: 6750, originalPrice: 9000 },
  { sku: "26710", price: 6750, originalPrice: 10500 },
  { sku: "28290", price: 5250, originalPrice: 6000 },
  { sku: "26706", price: 13500, originalPrice: 16500 },
  { sku: "26718", price: 18750, originalPrice: 26250 },
  { sku: "28208", price: 6750, originalPrice: 12000 },
  { sku: "26732", price: 36000, originalPrice: 41250 },
  { sku: "26724", price: 22500, originalPrice: 30000 },
  { sku: "26798", price: 48750, originalPrice: 63750 },
  { sku: "26744", price: 37500, originalPrice: 48750 },
  { sku: "26334", price: 54000, originalPrice: 75000 },
  { sku: "26340", price: 69000, originalPrice: 90000 },
  { sku: "26368", price: 90000, originalPrice: 105000 },
  { sku: "26792", price: 34500, originalPrice: 48750 },
  { sku: "26784", price: 18750, originalPrice: 26250 },
  { sku: "26796", price: 42000, originalPrice: 60000 },
  { sku: "28200", price: 6000, originalPrice: 9000 },
  { sku: "28273", price: 10500, originalPrice: 18750 },
  { sku: "26364", price: 78750, originalPrice: 105000 },
  { sku: "26720", price: 21000, originalPrice: 26250 },
  { sku: "26788", price: 25500, originalPrice: 37500 },
  { sku: "28272", price: 6375, originalPrice: 9000 },
  { sku: "26742", price: 27000, originalPrice: 37500 },
  { sku: "26326", price: 43500, originalPrice: 52500 },
  { sku: "26790", price: 34500, originalPrice: 48750 },
  { sku: "28242", price: 24000, originalPrice: 33750 },
  { sku: "26716", price: 14250, originalPrice: 18750 },
  { sku: "26330", price: 51000, originalPrice: 75000 },
  { sku: "26726", price: 25500, originalPrice: 33750 },
  { sku: "26356", price: 51000, originalPrice: 82500 }
];

async function updatePrices() {
  console.log('Начинаем массовое обновление цен...');
  
  // Данные для авторизации
  const authToken = 'Basic ' + Buffer.from('admin:aquapool2025').toString('base64');
  
  let updated = 0;
  let notFound = 0;
  
  for (const update of priceUpdates) {
    try {
      console.log(`Обновляем артикул ${update.sku}: ${update.price}₽ (было ${update.originalPrice}₽)`);
      
      const response = await fetch('http://localhost:5000/api/admin/products/update-price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken
        },
        body: JSON.stringify({
          sku: update.sku,
          price: update.price,
          originalPrice: update.originalPrice
        })
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        console.log(`✓ Обновлен артикул ${update.sku}`);
        updated++;
      } else {
        console.log(`❌ Не найден артикул ${update.sku} - ${result.message}`);
        notFound++;
      }
    } catch (error) {
      console.error(`Ошибка обновления артикула ${update.sku}:`, error.message);
      notFound++;
    }
    
    // Небольшая пауза между запросами
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n=== РЕЗУЛЬТАТЫ ОБНОВЛЕНИЯ ===`);
  console.log(`✓ Обновлено: ${updated} товаров`);
  console.log(`❌ Не найдено: ${notFound} товаров`);
  console.log(`📊 Всего обработано: ${priceUpdates.length} записей`);
}

updatePrices().catch(console.error);