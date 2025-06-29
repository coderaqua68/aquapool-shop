import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { products } from './shared/schema.ts';
import { eq } from 'drizzle-orm';
import ws from 'ws';

// Настройка WebSocket для работы с Neon
neonConfig.webSocketConstructor = ws;

// Данные для обновления цен пленок GRE
const greFilmsUpdates = [
  {
    name: "Запасная пленка к бассейну GRE 5.5 x 1.32, артикул FPR558",
    price: 42000
  },
  {
    name: "Запасная пленка к бассейну GRE 4.6 x 1.32, артикул FPR458",
    price: 28500
  },
  {
    name: "Запасная пленка к бассейну GRE 3.5 x 1.32, артикул FPR358",
    price: 21000
  },
  {
    name: "Запасная пленка к бассейну GRE 7.3 x 3.75 x 1.32, артикул FPROV738",
    price: 33750
  },
  {
    name: "Запасная пленка к бассейну GRE 5.0 x 3.0 x 1.32, артикул FPROV518",
    price: 20250
  },
  {
    name: "Запасная пленка к бассейну GRE 6.1 x 3.75 x 1.32, артикул FPROV618",
    price: 30750
  }
];

async function updateGreFilmsPrices() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log('🚀 Начинаем обновление цен пленок GRE...');
  
  let updatedCount = 0;
  let notFoundCount = 0;
  let errors = [];

  for (const update of greFilmsUpdates) {
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

  console.log('\n📊 Результаты обновления цен пленок GRE:');
  console.log(`✅ Обновлено товаров: ${updatedCount}`);
  console.log(`❌ Товаров не найдено: ${notFoundCount}`);
  console.log(`📝 Всего обработано: ${greFilmsUpdates.length}`);
  
  if (errors.length > 0) {
    console.log(`⚠️ Ошибок: ${errors.length}`);
  }

  await pool.end();
}

// Запускаем обновление
updateGreFilmsPrices()
  .then(() => {
    console.log('🎉 Обновление цен пленок GRE завершено успешно!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Ошибка при обновлении цен пленок GRE:', error);
    process.exit(1);
  });