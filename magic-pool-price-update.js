import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { products } from './shared/schema.ts';
import { eq } from 'drizzle-orm';
import ws from 'ws';

// Настройка WebSocket для работы с Neon
neonConfig.webSocketConstructor = ws;

// Данные для обновления цен MAGIC POOL из прикрепленного файла
const magicPoolUpdates = [
  {
    name: "Морозостойкий бассейн MAGIC POOL 5.5 x 1.32 м арт. PR5513WB - дерево",
    originalPrice: 138750,
    price: 123750
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 5.5 x 1.32 м (полная комплектация) арт. KITPR5513G - графит",
    originalPrice: 135000,
    price: 120000
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 4.6 x 1.32 м (полная комплектация) арт. KITPR4613G - графит",
    originalPrice: 112500,
    price: 101250
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 3.6 x 1.32 м (полная комплектация) арт. KITPR3613G - графит",
    originalPrice: 90000,
    price: 78750
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 3.0 x 1.32 м (полная комплектация) арт. KITPR3013G - графит",
    originalPrice: 82500,
    price: 71250
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 5.5 x 1.32 м (полная комплектация) арт. KITPR5513WB - дерево",
    originalPrice: 165000,
    price: 138750
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 4.6 x 1.32 м (полная комплектация) арт. KITPR4613WB - дерево",
    originalPrice: 135000,
    price: 120000
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 4.6 x 1.32 м арт. PR4613WB - дерево",
    originalPrice: 116250,
    price: 104250
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 3.6 x 1.32 м (полная комплектация) арт. KITPR3613WB - дерево",
    originalPrice: 105000,
    price: 93750
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 3.6 x 1.32 м арт. PR3613WB - дерево",
    originalPrice: 93750,
    price: 78750
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 3.0 x 1.32 м (полная комплектация) арт. KITPR3013WB - дерево",
    originalPrice: 93750,
    price: 82500
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 3.0 x 1.32 м арт. PR3013WB - дерево",
    originalPrice: 82500,
    price: 69375
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 5.5 x 1.32 м (полная комплектация) арт. KITPR5513R - ротанг",
    originalPrice: 165000,
    price: 138750
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 5.5 x 1.32 м арт. PR5513R - ротанг",
    originalPrice: 142500,
    price: 123750
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 4.6 x 1.32 м (полная комплектация) арт. KITPR4613R - ротанг",
    originalPrice: 135000,
    price: 120000
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 4.6 x 1.32 м арт. PR4613R - ротанг",
    originalPrice: 123750,
    price: 106500
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 3.6 x 1.32 м (полная комплектация) арт. KITPR3613R - ротанг",
    originalPrice: 105000,
    price: 93750
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 3.6 x 1.32 м арт. PR3613R - ротанг",
    originalPrice: 93750,
    price: 78750
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 3.0 x 1.32 м (полная комплектация) арт. KITPR3013R - ротанг",
    originalPrice: 93750,
    price: 82500
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 3.0 x 1.32 м арт. PR3013R - ротанг",
    originalPrice: 82500,
    price: 69375
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 5.5 x 1.32 м (полная комплектация) арт. KITPR5513 - белый",
    originalPrice: 135000,
    price: 120000
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 5.5 x 1.32 м арт. PR5513 - белый",
    originalPrice: 116250,
    price: 102000
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 4.6 x 1.32 м (полная комплектация) арт. KITPR4613 - белый",
    originalPrice: 112500,
    price: 101250
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 4.6 x 1.32 м арт. PR4613 - белый",
    originalPrice: 97500,
    price: 85875
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 3.6 x 1.32 м (полная комплектация) арт. KITPR3613 - белый",
    originalPrice: 90000,
    price: 78750
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 3.6 x 1.32 м арт. PR3613- белый",
    originalPrice: 78750,
    price: 64500
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 3.0 x 1.32 м (полная комплектация) арт. KITPR3013 - белый",
    originalPrice: 82500,
    price: 71250
  },
  {
    name: "Морозостойкий бассейн MAGIC POOL 3.0 x 1.32 м арт. PR3013 - белый",
    originalPrice: 67500,
    price: 57000
  }
];

async function updateMagicPoolPrices() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log('🚀 Начинаем обновление цен товаров MAGIC POOL...');
  
  let updatedCount = 0;
  let notFoundCount = 0;
  let errors = [];

  for (const update of magicPoolUpdates) {
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

  console.log('\n📊 Результаты обновления цен MAGIC POOL:');
  console.log(`✅ Обновлено товаров: ${updatedCount}`);
  console.log(`❌ Товаров не найдено: ${notFoundCount}`);
  console.log(`📝 Всего обработано: ${magicPoolUpdates.length}`);
  
  if (errors.length > 0) {
    console.log(`⚠️ Ошибок: ${errors.length}`);
  }

  await pool.end();
}

// Запускаем обновление
updateMagicPoolPrices()
  .then(() => {
    console.log('🎉 Обновление цен MAGIC POOL завершено успешно!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Ошибка при обновлении цен MAGIC POOL:', error);
    process.exit(1);
  });