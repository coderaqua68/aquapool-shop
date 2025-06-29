import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { products } from './shared/schema.ts';
import { eq } from 'drizzle-orm';
import ws from 'ws';

// Настройка WebSocket для работы с Neon
neonConfig.webSocketConstructor = ws;

// Данные для обновления цен из прикрепленного файла
const lagunaUpdates = [
  {
    name: "Бассейн Лагуна 5 х 1.25 м (полная комплектация) арт. 50040 - дерево",
    originalPrice: 93750,
    price: 82125
  },
  {
    name: "Бассейн Лагуна 4.5 х 1.25 м (полная комплектация) арт. 45014 / 1 - коричневый", 
    originalPrice: 82500,
    price: 69375
  },
  {
    name: "Бассейн Лагуна 4 х 1.25 м (полная комплектация) арт. 40014 / 1 - коричневый",
    originalPrice: 75000,
    price: 61875
  },
  {
    name: "Бассейн Лагуна 3.5 х 1.25 м (полная комплектация) арт. 35014 / 1 - коричневый",
    originalPrice: 67500,
    price: 57750
  },
  {
    name: "Бассейн Лагуна 3 х 1.25 м (полная комплектация) арт. 30014 / 1 - коричневый",
    originalPrice: 60000,
    price: 51750
  },
  {
    name: "Бассейн Лагуна 5.5 х 1.25 м (полная комплектация) арт. 55040 - дерево",
    originalPrice: 105000,
    price: 89625
  },
  {
    name: "Бассейн Лагуна 4.5 х 1.25 м (полная комплектация) арт. 45040 - дерево",
    originalPrice: 86250,
    price: 74250
  },
  {
    name: "Бассейн Лагуна 4 х 1.25 м (полная комплектация) арт. 40040 - дерево",
    originalPrice: 78750,
    price: 66375
  },
  {
    name: "Бассейн Лагуна 3.5 х 1.25 м (полная комплектация) арт. 35040 - дерево",
    originalPrice: 75000,
    price: 61875
  },
  {
    name: "Бассейн Лагуна 3 х 1.25 м (полная комплектация) арт. 30040 - дерево",
    originalPrice: 67500,
    price: 55500
  },
  {
    name: "Бассейн Лагуна 2.5 х 1.25 м (полная комплектация) арт. 25040 - дерево",
    originalPrice: 60000,
    price: 48375
  },
  {
    name: "Бассейн Лагуна 5.5 х 1.25 м (полная комплектация) арт. 55012 - платина",
    originalPrice: 97500,
    price: 83250
  },
  {
    name: "Бассейн Лагуна 4.5 х 1.25 м (полная комплектация) арт. 45012 - платина",
    originalPrice: 78750,
    price: 69375
  },
  {
    name: "Бассейн Лагуна 4 х 1.25 м (полная комплектация) арт. 40012 - платина",
    originalPrice: 75000,
    price: 61875
  },
  {
    name: "Бассейн Лагуна 3.5 х 1.25 м (полная комплектация) арт. 35012 - платина",
    originalPrice: 67500,
    price: 57750
  },
  {
    name: "Бассейн Лагуна 3 х 1.25 м (полная комплектация) арт. 30012 - платина",
    originalPrice: 60000,
    price: 51750
  },
  {
    name: "Бассейн Лагуна 2.5 х 1.25 м (полная комплектация) арт. 25012 - платина",
    originalPrice: 60000,
    price: 45375
  },
  {
    name: "Бассейн Лагуна 5.5 х 1.25 м (полная комплектация) арт. 55014 - коричневый",
    originalPrice: 97500,
    price: 83250
  },
  {
    name: "Бассейн Лагуна 5 х 1.25 м (полная комплектация) арт. 50014 - коричневый",
    originalPrice: 90000,
    price: 76875
  },
  {
    name: "Бассейн Лагуна 4.5 х 1.25 м (полная комплектация) арт. 45014 - коричневый",
    originalPrice: 82500,
    price: 69375
  },
  {
    name: "Бассейн Лагуна 4 х 1.25 м (полная комплектация) арт. 40014 - коричневый",
    originalPrice: 75000,
    price: 61875
  },
  {
    name: "Бассейн Лагуна 3.5 х 1.25 м (полная комплектация) арт. 35014 - коричневый",
    originalPrice: 67500,
    price: 57750
  },
  {
    name: "Бассейн Лагуна 3 х 1.25 м (полная комплектация) арт. 30014 - коричневый",
    originalPrice: 60000,
    price: 51750
  },
  {
    name: "Бассейн Лагуна 2.5 х 1.25 м (полная комплектация) арт. 25014 - коричневый",
    originalPrice: 60000,
    price: 45375
  }
];

async function updateLagunaPrices() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log('🚀 Начинаем обновление цен для товаров Лагуна...');
  
  let updatedCount = 0;
  let notFoundCount = 0;

  for (const update of lagunaUpdates) {
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
    }
  }

  console.log('\n📊 Результаты обновления:');
  console.log(`✅ Обновлено товаров: ${updatedCount}`);
  console.log(`❌ Товаров не найдено: ${notFoundCount}`);
  console.log(`📝 Всего обработано: ${lagunaUpdates.length}`);

  await pool.end();
}

// Запускаем обновление
updateLagunaPrices()
  .then(() => {
    console.log('🎉 Обновление цен завершено успешно!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Ошибка при обновлении цен:', error);
    process.exit(1);
  });