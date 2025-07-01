import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { products } from './shared/schema.ts';
import { eq } from 'drizzle-orm';
import ws from 'ws';

// Настройка WebSocket для работы с Neon
neonConfig.webSocketConstructor = ws;

// Данные для обновления цен Summer Fun из прикрепленного файла
const summerFunUpdates = [
  {
    name: "Каркасный бассейн Summer Fun 4.0 x 1.5 (круг) (полный комплект) артикул 501010171KB",
    originalPrice: 225000,
    price: 209250
  },
  {
    name: "Каркасный бассейн Summer Fun 6.0 x 3.2 x 1.5 (полный комплект) артикул 501010256KB",
    originalPrice: 232500,
    price: 209250
  },
  {
    name: "Каркасный бассейн Summer Fun 6.23 x 3.6 x 1.5 (полный комплект) артикул 501010258KB",
    originalPrice: 232500,
    price: 207000
  },
  {
    name: "Каркасный бассейн Summer Fun 7.0 x 3.5 x 1.2 (полный комплект) артикул 501010243KB",
    originalPrice: 150000,
    price: 133500
  },
  {
    name: "Каркасный бассейн Summer Fun 8.0 x 4.2 x 1.2 м (полный комплект) артикул 501010244KB",
    originalPrice: 165000,
    price: 152250
  },
  {
    name: "Каркасный бассейн Summer Fun 8.0 x 4.2 x 1.5 м (полный комплект) артикул 501010249KB",
    originalPrice: 300000,
    price: 258750
  },
  {
    name: "Каркасный бассейн Summer Fun 9.16 x 4.6 x 1.2 м (полный комплект) артикул 501010247KB",
    originalPrice: 240000,
    price: 206250
  },
  {
    name: "Каркасный бассейн Summer Fun 9.16 x 4.6 x 1.5 м (полный комплект) артикул 501010261KB",
    originalPrice: 450000,
    price: 397500
  },
  {
    name: "Каркасный бассейн Summer Fun (круг) 4.2 x 1.2 м (полный комплект), артикул 501010125KB",
    originalPrice: 135000,
    price: 122250
  },
  {
    name: "Каркасный бассейн Summer Fun 5.0 x 1.5 (круг) (полный комплект) артикул 501010130KB",
    originalPrice: 270000,
    price: 240000
  },
  {
    name: "Каркасный бассейн Summer Fun 7.0 x 3.5 x 1.5 (полный комплект) артикул 501010248KB",
    originalPrice: 277500,
    price: 247500
  },
  {
    name: "Каркасный бассейн Summer Fun 7.37 x 3.6 x 1.5 м (полный комплект) артикул 501010259KB",
    originalPrice: 300000,
    price: 252750
  }
];

async function updateSummerFunPrices() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log('🚀 Начинаем обновление цен товаров Summer Fun...');
  
  let updatedCount = 0;
  let notFoundCount = 0;
  let errors = [];

  for (const update of summerFunUpdates) {
    try {
      // Ищем товар по точному названию
      const existingProducts = await db
        .select()
        .from(products)
        .where(eq(products.name, update.name));
      
      if (existingProducts.length > 0) {
        const product = existingProducts[0];
        
        // Обновляем цены
        await db
          .update(products)
          .set({
            price: update.price.toString(),
            originalPrice: update.originalPrice.toString()
          })
          .where(eq(products.id, product.id));
        
        console.log(`✅ Обновлен товар: ${product.name}`);
        console.log(`   Старая цена: ${product.price} → Новая цена: ${update.price}`);
        console.log(`   Старая цена до скидки: ${product.originalPrice} → Новая цена до скидки: ${update.originalPrice}`);
        updatedCount++;
      } else {
        console.log(`❌ Товар не найден: ${update.name}`);
        notFoundCount++;
      }
    } catch (error) {
      console.error(`❌ Ошибка при обновлении товара "${update.name}":`, error.message);
      errors.push({ name: update.name, error: error.message });
    }
  }

  console.log('\n📊 Результаты обновления цен Summer Fun:');
  console.log(`✅ Обновлено товаров: ${updatedCount}`);
  console.log(`❌ Товаров не найдено: ${notFoundCount}`);
  console.log(`📝 Всего обработано: ${summerFunUpdates.length}`);
  
  if (errors.length > 0) {
    console.log(`⚠️ Ошибок: ${errors.length}`);
  }

  await pool.end();
}

// Запускаем обновление
updateSummerFunPrices()
  .then(() => {
    console.log('🎉 Обновление цен Summer Fun завершено успешно!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Ошибка при обновлении цен Summer Fun:', error);
    process.exit(1);
  });