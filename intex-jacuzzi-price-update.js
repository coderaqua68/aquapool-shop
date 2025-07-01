import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { products } from './shared/schema.ts';
import { eq } from 'drizzle-orm';
import ws from 'ws';

// Настройка WebSocket для работы с Neon
neonConfig.webSocketConstructor = ws;

// Данные для обновления цен джакузи INTEX
const intexJacuzziUpdates = [
  {
    name: "Джакузи INTEX 28426, внешний размер: 196 x 71 см - 4 места",
    originalPrice: 52500,
    price: 37500
  },
  {
    name: "Джакузи INTEX 28472, внешний размер: 196 x 71 см - 6 мест",
    originalPrice: 82500,
    price: 45000
  },
  {
    name: "Джакузи INTEX 28446, внешний размер: 175 x 71 см - 4 места",
    originalPrice: 75000,
    price: 45000
  },
  {
    name: "Джакузи INTEX 28450, внешний размер: 175 x 71 см - 4 места",
    originalPrice: 67500,
    price: 45000
  },
  {
    name: "Джакузи INTEX 28428, внешний размер: 216 x 71 см - 6 мест",
    originalPrice: 56250,
    price: 45000
  },
  {
    name: "Джакузи INTEX 28452, внешний размер: 196 x 71 см - 6 мест",
    originalPrice: 71250,
    price: 52500
  },
  {
    name: "Джакузи INTEX 28458, внешний размер: 180 x 71 см - 4 места",
    originalPrice: 105000,
    price: 67500
  },
  {
    name: "Джакузи INTEX 28462, внешний размер: 211 x 71 см - 6 мест",
    originalPrice: 105000,
    price: 78750
  },
  {
    name: "Джакузи INTEX 28476, внешний размер: 196 x 71 см - 4 места",
    originalPrice: 52500,
    price: 42000
  },
  {
    name: "Джакузи INTEX 28440, внешний размер: 196 x 71 см - 4 места",
    originalPrice: 60000,
    price: 45000
  },
  {
    name: "Джакузи INTEX 28442, внешний размер: 216 x 71 см - 6 мест",
    originalPrice: 60000,
    price: 52500
  }
];

async function updateIntexJacuzziPrices() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log('🚀 Начинаем обновление цен джакузи INTEX...');
  
  let updatedCount = 0;
  let notFoundCount = 0;
  let errors = [];

  for (const update of intexJacuzziUpdates) {
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

  console.log('\n📊 Результаты обновления цен джакузи INTEX:');
  console.log(`✅ Обновлено товаров: ${updatedCount}`);
  console.log(`❌ Товаров не найдено: ${notFoundCount}`);
  console.log(`📝 Всего обработано: ${intexJacuzziUpdates.length}`);
  
  if (errors.length > 0) {
    console.log(`⚠️ Ошибок: ${errors.length}`);
  }

  await pool.end();
}

// Запускаем обновление
updateIntexJacuzziPrices()
  .then(() => {
    console.log('🎉 Обновление цен джакузи INTEX завершено успешно!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Ошибка при обновлении цен джакузи INTEX:', error);
    process.exit(1);
  });