import fetch from 'node-fetch';

const priceUpdates = {
  "28205": { price: 3375, originalPrice: 4500 },
  "26780": { price: 25500, originalPrice: 37500 },
  "26746": { price: 31500, originalPrice: 45000 },
  "26730": { price: 31500, originalPrice: 45000 },
  "26384": { price: 90000, originalPrice: 127500 },
  "26756": { price: 48750, originalPrice: 60000 },
  "26374": { price: 112500, originalPrice: 150000 },
  "26378": { price: 127500, originalPrice: 172500 },
  "28274": { price: 12750, originalPrice: 18750 },
  "26712": { price: 7500, originalPrice: 12000 },
  "28271": { price: 4875, originalPrice: 8250 },
  "26700": { price: 6750, originalPrice: 9000 },
  "26710": { price: 6750, originalPrice: 10500 },
  "28290": { price: 5250, originalPrice: 6000 },
  "26706": { price: 13500, originalPrice: 16500 },
  "26718": { price: 18750, originalPrice: 26250 },
  "28208": { price: 6750, originalPrice: 12000 },
  "26732": { price: 36000, originalPrice: 41250 },
  "26724": { price: 22500, originalPrice: 30000 },
  "26798": { price: 48750, originalPrice: 63750 },
  "26744": { price: 37500, originalPrice: 48750 },
  "26334": { price: 54000, originalPrice: 75000 },
  "26340": { price: 69000, originalPrice: 90000 },
  "26368": { price: 90000, originalPrice: 105000 },
  "26792": { price: 34500, originalPrice: 48750 },
  "26784": { price: 18750, originalPrice: 26250 },
  "26796": { price: 42000, originalPrice: 60000 },
  "28200": { price: 6000, originalPrice: 9000 },
  "28273": { price: 10500, originalPrice: 18750 },
  "26364": { price: 78750, originalPrice: 105000 },
  "26720": { price: 21000, originalPrice: 26250 },
  "26788": { price: 25500, originalPrice: 37500 },
  "28272": { price: 6375, originalPrice: 9000 },
  "26742": { price: 27000, originalPrice: 37500 },
  "26326": { price: 43500, originalPrice: 52500 },
  "26790": { price: 34500, originalPrice: 48750 },
  "28242": { price: 24000, originalPrice: 33750 },
  "26716": { price: 14250, originalPrice: 18750 },
  "26330": { price: 51000, originalPrice: 75000 },
  "26726": { price: 25500, originalPrice: 33750 },
  "26356": { price: 51000, originalPrice: 82500 }
};

async function smartPriceUpdate() {
  console.log('Запуск умного обновления цен...');
  
  // Получаем текущие товары из базы
  const productsResponse = await fetch('http://localhost:5000/api/products');
  const products = await productsResponse.json();
  
  const existingSkus = products.map(p => p.sku);
  console.log(`Найдено товаров в базе: ${existingSkus.length}`);
  
  // Данные для авторизации
  const authToken = 'Basic ' + Buffer.from('admin:aquapool2025').toString('base64');
  
  let updated = 0;
  let skipped = 0;
  
  for (const [sku, priceData] of Object.entries(priceUpdates)) {
    if (!existingSkus.includes(sku)) {
      console.log(`⏭ Пропускаем артикул ${sku} - нет в базе`);
      skipped++;
      continue;
    }
    
    try {
      console.log(`🔄 Обновляем артикул ${sku}: ${priceData.price}₽ (было ${priceData.originalPrice}₽)`);
      
      const response = await fetch('http://localhost:5000/api/admin/products/update-price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken
        },
        body: JSON.stringify({
          sku: sku,
          price: priceData.price,
          originalPrice: priceData.originalPrice
        })
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        console.log(`✅ Обновлен артикул ${sku}`);
        updated++;
      } else {
        console.log(`❌ Ошибка обновления ${sku}: ${result.message}`);
      }
    } catch (error) {
      console.error(`💥 Ошибка обновления артикула ${sku}:`, error.message);
    }
    
    // Пауза между запросами
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log(`\n🎯 === РЕЗУЛЬТАТЫ УМНОГО ОБНОВЛЕНИЯ ===`);
  console.log(`✅ Обновлено: ${updated} товаров`);
  console.log(`⏭ Пропущено (нет в базе): ${skipped} товаров`);
  console.log(`📊 Всего в прайс-листе: ${Object.keys(priceUpdates).length} позиций`);
  console.log(`🗃 Всего товаров в базе: ${existingSkus.length}`);
}

smartPriceUpdate().catch(console.error);