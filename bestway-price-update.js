import fetch from 'node-fetch';

const bestwayPriceUpdates = {
  "5614A": { price: 18750, originalPrice: 22500 },
  "5611Z": { price: 69000, originalPrice: 75000 },
  "56462": { price: 39750, originalPrice: 45000 },
  "5612X": { price: 27750, originalPrice: 37500 },
  "5612Z": { price: 32250, originalPrice: 45000 },
  "15427": { price: 23250, originalPrice: 30000 },
  "56438": { price: 25500, originalPrice: 33750 },
  "56442": { price: 30000, originalPrice: 37500 },
  "56629": { price: 18750, originalPrice: 22500 },
  "561JZ": { price: 66000, originalPrice: 97500 },
  "561KE": { price: 61500, originalPrice: 90000 },
  "56722": { price: 31500, originalPrice: 41250 },
  "561KJ": { price: 112500, originalPrice: 150000 },
  "56466": { price: 52500, originalPrice: 67500 },
  "5612B": { price: 67500, originalPrice: 90000 },
  "56721": { price: 27000, originalPrice: 37500 },
  "56620": { price: 28500, originalPrice: 37500 },
  "56709": { price: 15000, originalPrice: 22500 },
  "56457": { price: 33750, originalPrice: 45000 },
  "56671": { price: 42000, originalPrice: 52500 },
  "56670": { price: 37500, originalPrice: 52500 },
  "56418": { price: 14250, originalPrice: 18750 },
  "56456": { price: 31500, originalPrice: 37500 },
  "56420": { price: 19500, originalPrice: 26250 }
};

async function bestwayPriceUpdate() {
  console.log('\n🔥 === ОБНОВЛЕНИЕ ЦЕН BESTWAY ===\n');
  
  // Получаем текущие товары из базы
  const productsResponse = await fetch('http://localhost:5000/api/products');
  const products = await productsResponse.json();
  
  const existingSkus = products.map(p => p.sku);
  console.log(`📊 Всего товаров в базе: ${existingSkus.length}`);
  console.log(`🏷 Товаров Bestway в прайс-листе: ${Object.keys(bestwayPriceUpdates).length}`);
  
  // Данные для авторизации
  const authToken = 'Basic ' + Buffer.from('admin:aquapool2025').toString('base64');
  
  let foundInDB = 0;
  let notFoundInDB = 0;
  let successfulUpdates = 0;
  let failedUpdates = 0;
  
  const foundProducts = [];
  const notFoundProducts = [];
  const updateErrors = [];
  
  console.log('\n🔍 === АНАЛИЗ ТОВАРОВ BESTWAY ===\n');
  
  for (const [sku, priceData] of Object.entries(bestwayPriceUpdates)) {
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
  
  console.log('\n💰 === ОБНОВЛЕНИЕ ЦЕН BESTWAY ===\n');
  
  for (const sku of foundProducts) {
    const priceData = bestwayPriceUpdates[sku];
    
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
  
  console.log('\n📊 === ПОЛНЫЙ ОТЧЕТ BESTWAY ===\n');
  console.log(`🏷 Товаров Bestway в прайс-листе: ${Object.keys(bestwayPriceUpdates).length}`);
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
  
  console.log('\n🎯 === ИТОГ BESTWAY ===');
  console.log(`Обработка завершена: ${successfulUpdates}/${foundInDB} найденных товаров обновлено`);
  if (successfulUpdates === foundInDB && notFoundInDB === 0) {
    console.log('🎉 ВСЕ ТОВАРЫ BESTWAY УСПЕШНО НАЙДЕНЫ И ОБНОВЛЕНЫ!');
  } else if (successfulUpdates === foundInDB) {
    console.log('⚠️ Все найденные товары Bestway обновлены, но некоторые не найдены в базе');
  } else {
    console.log('❌ Есть проблемы с обновлением некоторых товаров Bestway');
  }
}

bestwayPriceUpdate().catch(console.error);