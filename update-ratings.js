/**
 * Скрипт для обновления рейтингов и количества отзывов товаров
 * Устанавливает рейтинг от 4.0 до 5.0 и количество отзывов от 3 до 64
 */

import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";

neonConfig.webSocketConstructor = ws;

// Подключение к базе данных
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool });

// Функция для генерации случайного рейтинга от 4.0 до 5.0
function generateRandomRating() {
  const ratings = [4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0];
  return ratings[Math.floor(Math.random() * ratings.length)];
}

// Функция для генерации случайного количества отзывов от 3 до 64
function generateRandomReviewCount() {
  return Math.floor(Math.random() * (64 - 3 + 1)) + 3;
}

async function updateRatingsAndReviews() {
  try {
    console.log('🔄 Начинаю обновление рейтингов и отзывов...');
    
    // Получаем все товары
    const result = await db.execute(`
      SELECT id, name FROM products ORDER BY id
    `);
    
    console.log(`📦 Найдено товаров: ${result.rows.length}`);
    
    let updatedCount = 0;
    
    // Обновляем каждый товар
    for (const product of result.rows) {
      const newRating = generateRandomRating();
      const newReviewCount = generateRandomReviewCount();
      
      await pool.query(
        'UPDATE products SET rating = $1, review_count = $2 WHERE id = $3',
        [newRating, newReviewCount, product.id]
      );
      
      updatedCount++;
      console.log(`✅ ${updatedCount}/${result.rows.length}: "${product.name}" - ${newRating}⭐ (${newReviewCount} отзывов)`);
    }
    
    console.log(`🎉 Успешно обновлено ${updatedCount} товаров!`);
    console.log('📊 Статистика обновления:');
    console.log(`   • Рейтинги: от 4.0 до 5.0 звёзд`);
    console.log(`   • Отзывы: от 3 до 64 отзывов`);
    
  } catch (error) {
    console.error('❌ Ошибка при обновлении:', error);
  } finally {
    await pool.end();
  }
}

// Запуск скрипта
updateRatingsAndReviews();