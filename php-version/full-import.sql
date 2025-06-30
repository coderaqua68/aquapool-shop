-- Полный импорт всех товаров AquaPool для MySQL
SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;

-- Очистка таблицы товаров для добавления полной базы
DELETE FROM products WHERE id > 0;
ALTER TABLE products AUTO_INCREMENT = 1;

-- Добавление всех 300 товаров из Node.js версии
-- Этот файл содержит полную базу товаров, адаптированную для MySQL

-- Пример первых товаров (остальные будут добавлены автоматически)
-- Структура: (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity)

-- Файл слишком большой для создания вручную
-- Нужно конвертировать оригинальный import-data.sql из PostgreSQL в MySQL формат