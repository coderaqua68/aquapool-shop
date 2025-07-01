import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { products } from './shared/schema.ts';
import { eq } from 'drizzle-orm';
import ws from 'ws';

// Настройка WebSocket для работы с Neon
neonConfig.webSocketConstructor = ws;

// Данные для обновления цен джакузи Bestway
const bestwayJacuzziUpdates = [
  {
    name: "Джакузи Bestway 60059, внешний размер: 196 x 66 см - 6 мест",
    originalPrice: 56250,
    price: 42000
  },
  {
    name: "Джакузи Bestway 60085, внешний размер: 180 x 66 см - 4 места",
    originalPrice: 48750,
    price: 36750
  }
];

async function updateBestwayJacuzziPrices() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log('🚀 Начинаем обновление цен джакузи Bestway...');
  
  let updatedCount = 0;
  let notFoundCount = 0;
  let errors = [];

  for (const update of bestwayJacuzziUpdates) {
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
        console.log(`   Старая цена до скидки: ${product.originalPrice || 'null'} → Новая цена до скидки: ${update.originalPrice}`);
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

  console.log('\n📊 Результаты обновления цен джакузи Bestway:');
  console.log(`✅ Обновлено товаров: ${updatedCount}`);
  console.log(`❌ Товаров не найдено: ${notFoundCount}`);
  console.log(`📝 Всего обработано: ${bestwayJacuzziUpdates.length}`);
  
  if (errors.length > 0) {
    console.log(`⚠️ Ошибок: ${errors.length}`);
  }

  await pool.end();
}

// Запускаем обновление
updateBestwayJacuzziPrices()
  .then(() => {
    console.log('🎉 Обновление цен джакузи Bestway завершено успешно!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Ошибка при обновлении цен джакузи Bestway:', error);
    process.exit(1);
  });