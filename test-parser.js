/**
 * Тест нового парсера для проверки извлечения описаний
 */

import RealParser from './scripts/real-parser.js';

async function testParser() {
  const parser = new RealParser();
  
  // URL товара, который вы показали
  const testUrl = 'https://intex-bassein.ru/catalog/bestway-karkasnye-basseyny/karkasnyy-basseyn-bestway-power-steel-3-05-x-2-x-0-84-m-artikul-5614a/';
  
  console.log('🧪 Тестируем парсер на товаре:', testUrl);
  
  try {
    await parser.parseProductPage(testUrl);
    
    if (parser.results.length > 0) {
      const product = parser.results[0];
      console.log('\n✅ Товар успешно спарсен:');
      console.log(`📛 Название: ${product.name}`);
      console.log(`🆔 SKU: ${product.sku}`);
      console.log(`💰 Цена: ${product.price}`);
      console.log(`🏷️ Бренд: ${product.brand}`);
      console.log(`📂 Категория: ${product.category}`);
      console.log('\n📝 Описание:');
      console.log(product.description);
      console.log('\n📋 Характеристики:');
      console.log(product.specifications);
    } else {
      console.log('❌ Не удалось спарсить товар');
    }
    
    if (parser.errors.length > 0) {
      console.log('\n⚠️ Ошибки:');
      parser.errors.forEach(error => {
        console.log(`URL: ${error.url || 'неизвестен'}`);
        console.log(`Ошибка: ${error.error || error}`);
      });
    }
    
  } catch (error) {
    console.error('💥 Ошибка тестирования:', error.message);
  }
}

testParser();