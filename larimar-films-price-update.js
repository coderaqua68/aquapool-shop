import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { products } from './shared/schema.ts';
import { eq } from 'drizzle-orm';
import ws from 'ws';

// Настройка WebSocket для работы с Neon
neonConfig.webSocketConstructor = ws;

// Данные для обновления цен пленок Larimar
const larimarFilmsUpdates = [
  {
    name: "Запасная пленка к бассейну Larimar 3,66 х 2,44 х 1.4 м (голубая мозаика 0.4 мм), артикул 5187788",
    price: 9750
  },
  {
    name: "Запасная пленка к бассейну Larimar 7.32 x 3.66 x 1.4 м (голубая 0.4 мм), артикул 5187789",
    price: 24000
  },
  {
    name: "Запасная пленка к бассейну Larimar 2.44 x 1.4 м, артикул 5187776",
    price: 8625
  },
  {
    name: "Запасная пленка к бассейну Larimar 3.05 x 1.4 м, артикул 5187777",
    price: 10875
  },
  {
    name: "Запасная пленка к бассейну Larimar 3.66 x 1.4 м, артикул 5187778",
    price: 11250
  },
  {
    name: "Запасная пленка к бассейну Larimar 4.57 x 1.4 м, артикул 5187779",
    price: 14625
  },
  {
    name: "Запасная пленка к бассейну Larimar 4.88 x 1.4 м, артикул 5187709",
    price: 24750
  },
  {
    name: "Запасная пленка к бассейну Larimar 5.49 x 1.4 м, артикул 5187780",
    price: 20250
  }
];

async function updateLarimarFilmsPrices() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log('🚀 Начинаем обновление цен пленок Larimar...');
  
  let updatedCount = 0;
  let notFoundCount = 0;
  let errors = [];

  for (const update of larimarFilmsUpdates) {
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

  console.log('\n📊 Результаты обновления цен пленок Larimar:');
  console.log(`✅ Обновлено товаров: ${updatedCount}`);
  console.log(`❌ Товаров не найдено: ${notFoundCount}`);
  console.log(`📝 Всего обработано: ${larimarFilmsUpdates.length}`);
  
  if (errors.length > 0) {
    console.log(`⚠️ Ошибок: ${errors.length}`);
  }

  await pool.end();
}

// Запускаем обновление
updateLarimarFilmsPrices()
  .then(() => {
    console.log('🎉 Обновление цен пленок Larimar завершено успешно!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Ошибка при обновлении цен пленок Larimar:', error);
    process.exit(1);
  });