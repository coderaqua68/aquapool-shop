import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { products } from './shared/schema.ts';
import { eq } from 'drizzle-orm';
import ws from 'ws';

// Настройка WebSocket для работы с Neon
neonConfig.webSocketConstructor = ws;

// Данные для обновления цен чашковых пакетов INTEX
const intexBowlsUpdates = [
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Metal Frame 4.57 x 1.22, артикул 11413 (10098)",
    price: 21000
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Prism Frame Oval 6.1 x 3.05 x 1.22, артикул 12737",
    price: 21000
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Ultra Frame 9.75 x 4.88 x 1.32, артикул 12447A",
    price: 56250
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Ultra Frame 7.32 x 3.66 x 1.32, артикул 12446A",
    price: 52500
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Prism Frame 4.88 x 2.44 x 1.07, артикул 12228A",
    price: 15750
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Ultra Frame 4.0 x 2.0 x 1.0, артикул 12135A",
    price: 13500
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Prism Frame 7.32 x 1.32, артикул 12469A",
    price: 30000
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Ultra Frame 7.32 x 1.32, артикул 12439A",
    price: 30000
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Prism Frame 6.10 x 1.32, артикул 12756A",
    price: 27000
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Prism Frame 5.49 x 1.22, артикул 12468A",
    price: 18000
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Metal Frame 5.49 x 1.22, артикул 12133",
    price: 24375
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Ultra Frame 4.88 x 1.22, артикул 12434A",
    price: 30000
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Prism Frame 3.66 x 1.22, артикул 10087",
    price: 12750
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну GreyWood Prism Frame 4.57 x 1.22, артикул 10090G",
    price: 17250
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну GreyWood Prism Frame 5.49 x 1.22, артикул 10092G",
    price: 22500
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Prism Frame 5.49 x 1.22, артикул 10092",
    price: 21750
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Prism Frame 6.10 x 1.32, артикул 10093",
    price: 28500
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Prism Frame 4.57 x 1.07, артикул 12456A",
    price: 17250
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Prism Frame 3.66 x 0.99, артикул 12533A",
    price: 9000
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Prism Frame 4.27 x 1.07, артикул 12466A",
    price: 10500
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Prism Frame 3.66 x 1.22, артикул 11984A",
    price: 10500
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Ultra Frame 5.49 x 2.74 x 1.32, артикул 12445A",
    price: 41250
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Prism Frame Oval 5.03 x 2.74 x 1.22, артикул 12736",
    price: 18000
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Ultra Frame 5.49 x 1.32, артикул 12436A",
    price: 41250
  },
  {
    name: "Чашковый пакет INTEX к каркасному бассейну Prism Frame 4.57 x 1.22, артикул 10090 (12457A)",
    price: 21000
  }
];

async function updateIntexBowlsPrices() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log('🚀 Начинаем обновление цен чашковых пакетов INTEX...');
  
  let updatedCount = 0;
  let notFoundCount = 0;
  let errors = [];

  for (const update of intexBowlsUpdates) {
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

  console.log('\n📊 Результаты обновления цен чашковых пакетов INTEX:');
  console.log(`✅ Обновлено товаров: ${updatedCount}`);
  console.log(`❌ Товаров не найдено: ${notFoundCount}`);
  console.log(`📝 Всего обработано: ${intexBowlsUpdates.length}`);
  
  if (errors.length > 0) {
    console.log(`⚠️ Ошибок: ${errors.length}`);
  }

  await pool.end();
}

// Запускаем обновление
updateIntexBowlsPrices()
  .then(() => {
    console.log('🎉 Обновление цен чашковых пакетов INTEX завершено успешно!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Ошибка при обновлении цен чашковых пакетов INTEX:', error);
    process.exit(1);
  });