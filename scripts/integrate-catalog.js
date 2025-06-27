// Интеграция импортированного каталога в storage.ts
import fs from 'fs';

// Загружаем импортированные товары
const catalogData = JSON.parse(fs.readFileSync('./full-catalog.json', 'utf8'));
const products = catalogData.products;

console.log(`🔄 Интеграция ${products.length} товаров в каталог...`);

// Берем первые 100 товаров для демонстрации (можно увеличить)
const selectedProducts = products.slice(0, 100);

// Генерируем код для storage.ts
const productEntries = selectedProducts.map((product, index) => {
  const specs = JSON.parse(product.specifications || '{}');
  
  return `      {
        name: ${JSON.stringify(product.name)},
        description: ${JSON.stringify(product.description || `${product.brand} - ${product.name}. Качественное оборудование для бассейнов.`)},
        price: "${product.price}",
        originalPrice: ${product.originalPrice ? `"${product.originalPrice}"` : 'null'},
        category: "${product.category}",
        subcategory: ${product.subcategory ? `"${product.subcategory}"` : 'null'},
        brand: "${product.brand}",
        volume: ${product.volume ? `"${product.volume}"` : 'null'},
        imageUrl: "${product.imageUrl}",
        images: ${JSON.stringify(product.images.slice(0, 3))},
        specifications: ${JSON.stringify(JSON.stringify(specs))},
        inStock: ${product.inStock},
        isPopular: ${index < 10},
        isNew: ${index < 5},
        discount: ${product.discount || 0},
        rating: "${product.rating}",
        reviewCount: ${product.reviewCount}
      }${index < selectedProducts.length - 1 ? ',' : ''}`;
}).join(',\n');

const storageCode = `// Автоматически сгенерированный каталог товаров
// Импортировано ${selectedProducts.length} товаров из ${products.length}
// Дата: ${new Date().toLocaleString('ru-RU')}

const importedProductsData = [
${productEntries}
];

export default importedProductsData;`;

// Сохраняем в отдельный файл
fs.writeFileSync('./catalog-integration.js', storageCode);

console.log('✅ Создан файл catalog-integration.js');
console.log(`📊 Обработано товаров: ${selectedProducts.length}`);

// Статистика по категориям
const categoryStats = {};
const brandStats = {};

selectedProducts.forEach(product => {
  categoryStats[product.category] = (categoryStats[product.category] || 0) + 1;
  brandStats[product.brand] = (brandStats[product.brand] || 0) + 1;
});

console.log('\n📈 Статистика по категориям:');
Object.entries(categoryStats).forEach(([cat, count]) => {
  console.log(`   ${cat}: ${count} товаров`);
});

console.log('\n🏭 Статистика по брендам:');
Object.entries(brandStats).forEach(([brand, count]) => {
  console.log(`   ${brand}: ${count} товаров`);
});

console.log('\n📋 Для интеграции:');
console.log('1. Откройте файл catalog-integration.js');
console.log('2. Скопируйте массив importedProductsData');
console.log('3. Замените данные в server/storage.ts');