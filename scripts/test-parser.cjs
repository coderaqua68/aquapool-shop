/**
 * Тестовый запуск парсера на одном товаре
 */

const IntexParser = require('./intex-parser.cjs');

async function testParser() {
  console.log('🧪 Тестирование парсера на одном товаре...\n');
  
  const parser = new IntexParser();
  
  // Тестовый URL из вашего примера
  const testUrl = "https://intex-bassein.ru/catalog/bestway-karkasnye-basseyny/karkasnyy-basseyn-bestway-round-steel-pro-max-krug-3-66-x-1-22-m-artikul-56420/";
  
  try {
    console.log('📡 Парсим тестовый товар...');
    const product = await parser.parseProductPage(testUrl);
    
    console.log('\n✅ Товар успешно спарсен!');
    console.log('\n📋 Результат:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Название: ${product.name}`);
    console.log(`Артикул: ${product.sku}`);
    console.log(`Бренд: ${product.brand}`);
    console.log(`Категория: ${product.category}`);
    console.log(`Объем: ${product.volume}`);
    console.log(`Размеры: ${product.dimensions}`);
    console.log(`Краткое описание: ${product.shortDescription}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    console.log('\n🔍 Характеристики:');
    const specs = JSON.parse(product.specifications);
    Object.entries(specs).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });
    
    console.log('\n💾 Сохраняю результат...');
    parser.results = [product];
    await parser.saveResults('test-result.json');
    
    console.log('\n🎉 Тест завершен успешно!');
    console.log('📁 Результат сохранен в: test-result.json');
    
  } catch (error) {
    console.error('\n❌ Ошибка при тестировании:');
    console.error(error.message);
    console.error('\n🔧 Возможные причины:');
    console.error('  • Нет доступа к интернету');
    console.error('  • Сайт временно недоступен');
    console.error('  • Изменилась структура HTML');
    console.error('  • Блокировка по User-Agent');
  }
}

// Запуск теста
if (require.main === module) {
  testParser();
}