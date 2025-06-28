/**
 * Пример использования парсера intex-bassein.ru
 * Запустите этот файл после настройки списка товаров
 */

const IntexParser = require('./intex-parser');
const fs = require('fs');
const path = require('path');

async function runParser() {
  console.log('🚀 Запуск парсера товаров intex-bassein.ru\n');
  
  const parser = new IntexParser();
  
  // ЗАМЕНИТЕ НА ВАШИ URL ТОВАРОВ
  const productUrls = [
    "https://intex-bassein.ru/catalog/bestway-karkasnye-basseyny/karkasnyy-basseyn-bestway-round-steel-pro-max-krug-3-66-x-1-22-m-artikul-56420/",
    // Добавьте больше URL здесь...
    // "https://intex-bassein.ru/catalog/another-product/",
    // "https://intex-bassein.ru/catalog/yet-another-product/",
  ];
  
  if (productUrls.length === 1 && productUrls[0].includes('56420')) {
    console.log('⚠️  ВНИМАНИЕ: Вы используете тестовый URL!');
    console.log('📝 Откройте файл example-usage.js и замените URL на ваши товары\n');
  }
  
  try {
    console.log(`📋 Будет обработано товаров: ${productUrls.length}`);
    console.log('⏱️  Время парсинга: ~${productUrls.length * 2} секунд\n');
    
    // Запускаем парсинг
    const products = await parser.parseProducts(productUrls);
    
    // Сохраняем результаты
    const resultsFile = await parser.saveResults('parsed-products.json');
    
    // Генерируем код для storage.ts
    const storageCode = parser.generateStorageCode();
    const codeFile = path.join(__dirname, 'storage-import-code.js');
    fs.writeFileSync(codeFile, storageCode, 'utf8');
    
    // Генерируем JSON для прямого импорта через API
    const importJson = products.map(p => {
      const { sourceUrl, parsedAt, ...productData } = p;
      return productData;
    });
    const importFile = path.join(__dirname, 'products-for-import.json');
    fs.writeFileSync(importFile, JSON.stringify(importJson, null, 2), 'utf8');
    
    // Выводим результаты
    console.log('\n🎉 Парсинг завершен успешно!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Успешно обработано: ${products.length} товаров`);
    console.log(`❌ Ошибок: ${parser.errors.length}`);
    console.log('\n📁 Созданные файлы:');
    console.log(`  • ${resultsFile} - Подробные результаты`);
    console.log(`  • ${codeFile} - Код для storage.ts`);
    console.log(`  • ${importFile} - JSON для импорта`);
    
    if (parser.errors.length > 0) {
      console.log('\n❌ Ошибки при обработке:');
      parser.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error.url}`);
        console.log(`     ${error.error}`);
      });
    }
    
    console.log('\n📋 Что делать дальше:');
    console.log('  1. Проверьте файл parsed-products.json');
    console.log('  2. Скопируйте содержимое storage-import-code.js');
    console.log('  3. Добавьте код в server/storage.ts метод initializeData()');
    console.log('  4. Перезапустите сервер');
    console.log('  5. Добавьте изображения и цены через админ-панель');
    
  } catch (error) {
    console.error('\n💥 Критическая ошибка:', error.message);
    console.error('\n🔧 Проверьте:');
    console.error('  • Подключение к интернету');
    console.error('  • Правильность URL товаров');
    console.error('  • Доступность сайта intex-bassein.ru');
  }
}

// Запуск если файл вызван напрямую
if (require.main === module) {
  runParser();
}

module.exports = runParser;