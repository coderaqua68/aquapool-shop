import fetch from 'node-fetch';

const newPriceUpdates = {
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
  "26334": { price: 54000, originalPrice: 75000 }
};

async function newBatchPriceUpdate() {
  console.log('\n🚀 === ЗАПУСК ОБНОВЛЕНИЯ НОВОЙ ПАРТИИ ===\n');
  
  // Получаем текущие товары из базы
  const productsResponse = await fetch('http://localhost:5000/api/products');
  const products = await productsResponse.json();
  
  const existingSkus = products.map(p => p.sku);
  console.log(`📊 Всего товаров в базе: ${existingSkus.length}`);
  console.log(`📋 Товаров в новом прайс-листе: ${Object.keys(newPriceUpdates).length}`);
  
  // Данные для авторизации
  const authToken = 'Basic ' + Buffer.from('admin:aquapool2025').toString('base64');
  
  let foundInDB = 0;
  let notFoundInDB = 0;
  let successfulUpdates = 0;
  let failedUpdates = 0;
  
  const foundProducts = [];
  const notFoundProducts = [];
  const updateErrors = [];
  
  console.log('\n🔍 === АНАЛИЗ ТОВАРОВ ===\n');
  
  for (const [sku, priceData] of Object.entries(newPriceUpdates)) {
    if (!existingSkus.includes(sku)) {
      console.log(`❌ НЕ НАЙДЕН в базе: артикул ${sku}`);
      notFoundInDB++;
      notFoundProducts.push(sku);
      continue;
    }
    
    console.log(`✅ НАЙДЕН в базе: артикул ${sku}`);
    foundInDB++;
    foundProducts.push(sku);
  }
  
  console.log('\n💰 === ОБНОВЛЕНИЕ ЦЕН ===\n');
  
  for (const sku of foundProducts) {
    const priceData = newPriceUpdates[sku];
    
    try {
      console.log(`🔄 Обновляем ${sku}: ${priceData.price}₽ (было ${priceData.originalPrice}₽)`);
      
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
        console.log(`✅ УСПЕШНО обновлен: ${sku}`);
        successfulUpdates++;
      } else {
        console.log(`❌ ОШИБКА обновления ${sku}: ${result.message}`);
        failedUpdates++;
        updateErrors.push({ sku, error: result.message });
      }
    } catch (error) {
      console.error(`💥 ОШИБКА обновления ${sku}:`, error.message);
      failedUpdates++;
      updateErrors.push({ sku, error: error.message });
    }
    
    // Пауза между запросами
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log('\n📊 === ПОЛНЫЙ ОТЧЕТ ===\n');
  console.log(`📋 Товаров в прайс-листе: ${Object.keys(newPriceUpdates).length}`);
  console.log(`🗃 Всего товаров в базе: ${existingSkus.length}`);
  console.log(`✅ НАЙДЕНО в базе: ${foundInDB} товаров`);
  console.log(`❌ НЕ НАЙДЕНО в базе: ${notFoundInDB} товаров`);
  console.log(`💰 УСПЕШНО обновлено: ${successfulUpdates} товаров`);
  console.log(`⚠️ ОШИБКИ обновления: ${failedUpdates} товаров`);
  
  if (notFoundProducts.length > 0) {
    console.log('\n❌ === НЕ НАЙДЕНЫ В БАЗЕ ===');
    notFoundProducts.forEach(sku => {
      console.log(`   - Артикул: ${sku}`);
    });
  }
  
  if (updateErrors.length > 0) {
    console.log('\n⚠️ === ОШИБКИ ОБНОВЛЕНИЯ ===');
    updateErrors.forEach(error => {
      console.log(`   - Артикул ${error.sku}: ${error.error}`);
    });
  }
  
  console.log('\n🎯 === ИТОГ ===');
  console.log(`Обработка завершена: ${successfulUpdates}/${foundInDB} найденных товаров обновлено`);
  if (successfulUpdates === foundInDB && notFoundInDB === 0) {
    console.log('🎉 ВСЕ ТОВАРЫ УСПЕШНО НАЙДЕНЫ И ОБНОВЛЕНЫ!');
  } else if (successfulUpdates === foundInDB) {
    console.log('⚠️ Все найденные товары обновлены, но некоторые не найдены в базе');
  } else {
    console.log('❌ Есть проблемы с обновлением некоторых товаров');
  }
}

newBatchPriceUpdate().catch(console.error);