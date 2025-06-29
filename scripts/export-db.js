/**
 * Скрипт для экспорта данных базы в SQL формат для Supabase
 */

import { db } from '../server/db.js';
import fs from 'fs';

async function exportDatabase() {
  try {
    console.log('🔄 Начинаю экспорт базы данных...');

    // Экспорт товаров
    const products = await db.query.products.findMany();
    console.log(`📦 Найдено ${products.length} товаров`);

    // Экспорт категорий
    const categories = await db.query.categories.findMany();
    console.log(`📂 Найдено ${categories.length} категорий`);

    // Экспорт настроек
    const settings = await db.query.siteSettings.findMany();
    console.log(`⚙️ Найдено ${settings.length} настроек`);

    // Создаем SQL для Supabase
    let sql = `-- AquaPool Database Export
-- Generated on ${new Date().toISOString()}

-- Создание таблиц (если не существуют)
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  description TEXT,
  image_url VARCHAR,
  product_count INTEGER,
  parent_id INTEGER,
  level INTEGER,
  sort_order INTEGER
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  sku VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  description TEXT NOT NULL,
  composition TEXT,
  short_description TEXT,
  price VARCHAR NOT NULL,
  original_price VARCHAR,
  brand VARCHAR,
  category VARCHAR NOT NULL,
  subcategory VARCHAR,
  images TEXT[],
  main_image VARCHAR,
  volume VARCHAR,
  shape VARCHAR,
  material VARCHAR,
  dimensions VARCHAR,
  capacity VARCHAR,
  pump_power VARCHAR,
  filter_type VARCHAR,
  age_group VARCHAR,
  season VARCHAR,
  installation VARCHAR,
  warranty VARCHAR,
  country_origin VARCHAR,
  weight VARCHAR,
  color VARCHAR,
  specifications JSONB,
  in_stock BOOLEAN DEFAULT true,
  is_popular BOOLEAN DEFAULT false,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  category VARCHAR NOT NULL DEFAULT 'general',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  sid VARCHAR PRIMARY KEY,
  sess JSONB NOT NULL,
  expire TIMESTAMP NOT NULL
);
CREATE INDEX IF NOT EXISTS IDX_session_expire ON sessions (expire);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  items JSONB NOT NULL,
  total_amount VARCHAR NOT NULL,
  customer_name VARCHAR NOT NULL,
  customer_phone VARCHAR NOT NULL,
  customer_email VARCHAR,
  delivery_address TEXT NOT NULL,
  delivery_method VARCHAR NOT NULL,
  payment_method VARCHAR NOT NULL,
  notes TEXT,
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS consultations (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  phone VARCHAR NOT NULL,
  message TEXT,
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Очистка существующих данных
TRUNCATE categories, products, site_settings RESTART IDENTITY CASCADE;

`;

    // Добавляем категории
    if (categories.length > 0) {
      sql += `\n-- Вставка категорий\n`;
      for (const category of categories) {
        const values = [
          category.id,
          `'${category.name.replace(/'/g, "''")}'`,
          `'${category.slug}'`,
          category.description ? `'${category.description.replace(/'/g, "''")}'` : 'NULL',
          category.imageUrl ? `'${category.imageUrl}'` : 'NULL',
          category.productCount || 'NULL',
          category.parentId || 'NULL',
          category.level || 'NULL',
          category.sortOrder || 'NULL'
        ].join(', ');
        
        sql += `INSERT INTO categories (id, name, slug, description, image_url, product_count, parent_id, level, sort_order) VALUES (${values});\n`;
      }
    }

    // Добавляем товары
    if (products.length > 0) {
      sql += `\n-- Вставка товаров\n`;
      for (const product of products) {
        const images = product.images ? `ARRAY[${product.images.map(img => `'${img}'`).join(', ')}]` : 'NULL';
        const specs = product.specifications ? `'${JSON.stringify(product.specifications).replace(/'/g, "''")}'::jsonb` : 'NULL';
        
        const values = [
          product.id,
          `'${product.sku}'`,
          `'${product.name.replace(/'/g, "''")}'`,
          `'${product.slug}'`,
          `'${product.description.replace(/'/g, "''")}'`,
          product.composition ? `'${product.composition.replace(/'/g, "''")}'` : 'NULL',
          product.shortDescription ? `'${product.shortDescription.replace(/'/g, "''")}'` : 'NULL',
          `'${product.price}'`,
          product.originalPrice ? `'${product.originalPrice}'` : 'NULL',
          product.brand ? `'${product.brand}'` : 'NULL',
          `'${product.category}'`,
          product.subcategory ? `'${product.subcategory}'` : 'NULL',
          images,
          product.mainImage ? `'${product.mainImage}'` : 'NULL',
          product.volume ? `'${product.volume}'` : 'NULL',
          product.shape ? `'${product.shape}'` : 'NULL',
          product.material ? `'${product.material}'` : 'NULL',
          product.dimensions ? `'${product.dimensions}'` : 'NULL',
          product.capacity ? `'${product.capacity}'` : 'NULL',
          product.pumpPower ? `'${product.pumpPower}'` : 'NULL',
          product.filterType ? `'${product.filterType}'` : 'NULL',
          product.ageGroup ? `'${product.ageGroup}'` : 'NULL',
          product.season ? `'${product.season}'` : 'NULL',
          product.installation ? `'${product.installation}'` : 'NULL',
          product.warranty ? `'${product.warranty}'` : 'NULL',
          product.countryOrigin ? `'${product.countryOrigin}'` : 'NULL',
          product.weight ? `'${product.weight}'` : 'NULL',
          product.color ? `'${product.color}'` : 'NULL',
          specs,
          product.inStock || 'true',
          product.isPopular || 'false',
          product.rating || '0',
          product.reviewCount || '0'
        ].join(', ');
        
        sql += `INSERT INTO products (id, sku, name, slug, description, composition, short_description, price, original_price, brand, category, subcategory, images, main_image, volume, shape, material, dimensions, capacity, pump_power, filter_type, age_group, season, installation, warranty, country_origin, weight, color, specifications, in_stock, is_popular, rating, review_count) VALUES (${values});\n`;
      }
    }

    // Добавляем настройки
    if (settings.length > 0) {
      sql += `\n-- Вставка настроек\n`;
      for (const setting of settings) {
        const values = [
          setting.id,
          `'${setting.key}'`,
          setting.value ? `'${setting.value.replace(/'/g, "''")}'` : 'NULL',
          setting.description ? `'${setting.description.replace(/'/g, "''")}'` : 'NULL',
          `'${setting.category}'`,
          setting.isActive || 'true'
        ].join(', ');
        
        sql += `INSERT INTO site_settings (id, key, value, description, category, is_active) VALUES (${values});\n`;
      }
    }

    sql += `\n-- Обновление последовательностей\nSELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));\nSELECT setval('products_id_seq', (SELECT MAX(id) FROM products));\nSELECT setval('site_settings_id_seq', (SELECT MAX(id) FROM site_settings));\n`;

    // Сохраняем в файл
    fs.writeFileSync('database-export.sql', sql);
    
    console.log('✅ Экспорт завершен!');
    console.log('📄 Файл сохранен: database-export.sql');
    console.log(`📊 Статистика:
    - Категории: ${categories.length}
    - Товары: ${products.length}  
    - Настройки: ${settings.length}`);

  } catch (error) {
    console.error('❌ Ошибка экспорта:', error);
  }
}

exportDatabase();