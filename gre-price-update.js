import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { products } from './shared/schema.ts';
import { eq } from 'drizzle-orm';
import ws from 'ws';

// Настройка WebSocket для работы с Neon
neonConfig.webSocketConstructor = ws;

// Данные для обновления цен GRE
const greUpdates = [
  {
    name: "Каркасный бассейн GRE 3.5 x 1.32 (полная комплектация), артикул KITPR358MAGIN",
    originalPrice: 135000,
    price: 108750
  },
  {
    name: "Каркасный бассейн GRE 4.6 x 1.32 (полная комплектация), артикул KITPR458MAGIN",
    originalPrice: 157500,
    price: 127500
  },
  {
    name: "Каркасный бассейн GRE 4.6 x 1.32 (полная комплектация) артикул KITPR458WOMAGIN",
    originalPrice: 172500,
    price: 144750
  },
  {
    name: "Каркасный бассейн GRE 5.5 x 1.32 (полная комплектация) артикул KITPR558WOMAGIN",
    originalPrice: 217500,
    price: 177750
  },
  {
    name: "Каркасный бассейн GRE 5.5 x 1.32 (полная комплектация), артикул KITPR558MAGIN",
    originalPrice: 187500,
    price: 157500
  },
  {
    name: "Каркасный бассейн GRE 3.5 x 1.32 (полная комплектация) артикул KITPR358WOMAGIN",
    originalPrice: 150000,
    price: 116250
  }
];

async function updateGrePrices() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log('🚀 Начинаем обновление цен товаров GRE...');
  
  let updatedCount = 0;
  let notFoundCount = 0;
  let errors = [];

  for (const update of greUpdates) {
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

  console.log('\n📊 Результаты обновления цен GRE:');
  console.log(`✅ Обновлено товаров: ${updatedCount}`);
  console.log(`❌ Товаров не найдено: ${notFoundCount}`);
  console.log(`📝 Всего обработано: ${greUpdates.length}`);
  
  if (errors.length > 0) {
    console.log(`⚠️ Ошибок: ${errors.length}`);
  }

  await pool.end();
}

// Запускаем обновление
updateGrePrices()
  .then(() => {
    console.log('🎉 Обновление цен GRE завершено успешно!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Ошибка при обновлении цен GRE:', error);
    process.exit(1);
  });