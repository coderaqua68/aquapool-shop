import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { products } from './shared/schema.ts';
import { eq } from 'drizzle-orm';
import ws from 'ws';

// Настройка WebSocket для работы с Neon
neonConfig.webSocketConstructor = ws;

// Данные для обновления цен пленок Atlantic Pool
const atlanticPoolFilmsUpdates = [
  {
    name: "Запасная пленка к бассейну Atlantic Pool 3.6 x 1.35 м (0.4 мм) голубая, артикул LI124820",
    price: 20250
  },
  {
    name: "Запасная пленка к бассейну Atlantic Pool 4.6 x 1.32 м (0.4 мм) голубая, артикул LI154820",
    price: 24000
  },
  {
    name: "Запасная пленка к бассейну Atlantic Pool 5.5 x 1.35 м (0.4 мм) голубая, артикул LI184820",
    price: 27000
  },
  {
    name: "Запасная пленка к бассейну Atlantic Pool 5.5 x 3.7 x 1.35 м (0.4 мм) голубая, артикул LI121820",
    price: 30750
  },
  {
    name: "Запасная пленка к бассейну Atlantic Pool 7.3 x 3.7 x 1.35 м (0.4 мм) голубая, артикул LI122420",
    price: 33750
  },
  {
    name: "Запасная пленка к бассейну Atlantic Pool 7.3 x 1.35 м (0.4 мм) голубая, артикул LI244820",
    price: 36000
  },
  {
    name: "Запасная пленка к бассейну Atlantic Pool 10 x 5.5 x 1.35 м (0.4 мм) голубая, артикул LI183320",
    price: 40500
  }
];

async function updateAtlanticPoolFilmsPrices() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log('🚀 Начинаем обновление цен пленок Atlantic Pool...');
  
  let updatedCount = 0;
  let notFoundCount = 0;
  let errors = [];

  for (const update of atlanticPoolFilmsUpdates) {
    try {
      // Ищем товар по точному названию
      const existingProducts = await db
        .select()
        .from(products)
        .where(eq(products.name, update.name));
      
      if (existingProducts.length > 0) {
        const product = existingProducts[0];
        
        // Обновляем только цену (без originalPrice, так как в списке указано "—")
        await db
          .update(products)
          .set({
            price: update.price.toString()
          })
          .where(eq(products.id, product.id));
        
        console.log(`✅ Обновлен товар: ${product.name}`);
        console.log(`   Старая цена: ${product.price} → Новая цена: ${update.price}`);
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

  console.log('\n📊 Результаты обновления цен пленок Atlantic Pool:');
  console.log(`✅ Обновлено товаров: ${updatedCount}`);
  console.log(`❌ Товаров не найдено: ${notFoundCount}`);
  console.log(`📝 Всего обработано: ${atlanticPoolFilmsUpdates.length}`);
  
  if (errors.length > 0) {
    console.log(`⚠️ Ошибок: ${errors.length}`);
  }

  await pool.end();
}

// Запускаем обновление
updateAtlanticPoolFilmsPrices()
  .then(() => {
    console.log('🎉 Обновление цен пленок Atlantic Pool завершено успешно!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Ошибка при обновлении цен пленок Atlantic Pool:', error);
    process.exit(1);
  });