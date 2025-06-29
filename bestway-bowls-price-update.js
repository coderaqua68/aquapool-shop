import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { products } from './shared/schema.ts';
import { eq } from 'drizzle-orm';
import ws from 'ws';

// Настройка WebSocket для работы с Neon
neonConfig.webSocketConstructor = ws;

// Данные для обновления цен чашковых пакетов Bestway
const bestwayBowlsUpdates = [
  {
    name: "Чашковый пакет Bestway к каркасному бассейну 4.12 x 2.01 x 1.22, артикул 56241ASS12",
    price: 16500
  },
  {
    name: "Чашковый пакет Bestway для каркасного бассейна 457 x 122 см, артикул P05466",
    price: 15750
  },
  {
    name: "Чашковый пакет Bestway к каркасному бассейну 4,88 х 2,44 х 1,22 м, арт. P07313",
    price: 18750
  },
  {
    name: "Чашковый пакет Bestway к каркасному бассейну 4,12 х 2,01 х 1,22 м, арт. P07311",
    price: 14250
  },
  {
    name: "Чашковый пакет Bestway для каркасного бассейна 366 x 122 см, артикул P05304",
    price: 15750
  },
  {
    name: "Чашковый пакет Bestway для каркасного бассейна 366 x 100 см, артикул P05302",
    price: 10500
  }
];

async function updateBestwayBowlsPrices() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log('🚀 Начинаем обновление цен чашковых пакетов Bestway...');
  
  let updatedCount = 0;
  let notFoundCount = 0;
  let errors = [];

  for (const update of bestwayBowlsUpdates) {
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

  console.log('\n📊 Результаты обновления цен чашковых пакетов Bestway:');
  console.log(`✅ Обновлено товаров: ${updatedCount}`);
  console.log(`❌ Товаров не найдено: ${notFoundCount}`);
  console.log(`📝 Всего обработано: ${bestwayBowlsUpdates.length}`);
  
  if (errors.length > 0) {
    console.log(`⚠️ Ошибок: ${errors.length}`);
  }

  await pool.end();
}

// Запускаем обновление
updateBestwayBowlsPrices()
  .then(() => {
    console.log('🎉 Обновление цен чашковых пакетов Bestway завершено успешно!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Ошибка при обновлении цен чашковых пакетов Bestway:', error);
    process.exit(1);
  });