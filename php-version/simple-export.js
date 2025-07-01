#!/usr/bin/env node

/**
 * Упрощенный экспорт данных с использованием готовых API endpoints
 */

import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

const BASE_URL = 'http://localhost:5000';

async function exportData() {
    console.log('🔄 Экспорт данных через API...');
    
    try {
        // Получаем категории
        console.log('📂 Загружаем категории...');
        const categoriesResponse = await fetch(`${BASE_URL}/api/categories`);
        const categories = await categoriesResponse.json();
        
        // Получаем товары
        console.log('📦 Загружаем товары...');
        const productsResponse = await fetch(`${BASE_URL}/api/products`);
        const products = await productsResponse.json();
        
        console.log(`✅ Загружено категорий: ${categories.length}`);
        console.log(`✅ Загружено товаров: ${products.length}`);
        
        // Создаем SQL для импорта
        let sql = '';
        
        // Экспорт категорий
        sql += "-- Импорт категорий AquaPool\n";
        sql += "DELETE FROM categories WHERE id > 0;\n";
        sql += "ALTER SEQUENCE categories_id_seq RESTART WITH 1;\n\n";
        
        categories.forEach(category => {
            sql += `INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES `;
            sql += `(${category.id}, ${escapeSQL(category.name)}, ${escapeSQL(category.slug)}, `;
            sql += `${escapeSQL(category.description || '')}, ${category.parentId || 'NULL'}, `;
            sql += `${category.sortOrder || 0}, ${escapeSQL(category.imageUrl || '')});\n`;
        });
        
        sql += `\nSELECT setval('categories_id_seq', ${Math.max(...categories.map(c => c.id))});\n\n`;
        
        // Экспорт товаров
        sql += "-- Импорт товаров AquaPool\n";
        sql += "DELETE FROM products WHERE id > 0;\n";
        sql += "ALTER SEQUENCE products_id_seq RESTART WITH 1;\n\n";
        
        products.forEach(product => {
            sql += `INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES `;
            sql += `(${product.id}, ${escapeSQL(product.name)}, ${escapeSQL(product.slug)}, `;
            sql += `${escapeSQL(product.sku)}, ${escapeSQL(product.description || '')}, `;
            sql += `${escapeSQL(product.shortDescription || '')}, ${product.price}, `;
            sql += `${product.originalPrice || 'NULL'}, ${product.categoryId || 'NULL'}, `;
            sql += `${escapeSQL(product.brand || '')}, ${escapeSQL(JSON.stringify(product.images || []))}, `;
            sql += `${escapeSQL(JSON.stringify(product.specifications || {}))}, `;
            sql += `${product.rating || 0}, ${product.reviewCount || 0}, `;
            sql += `${product.isPopular ? 'true' : 'false'}, ${product.isActive !== false ? 'true' : 'false'}, `;
            sql += `${product.stockQuantity || 0});\n`;
        });
        
        sql += `\nSELECT setval('products_id_seq', ${Math.max(...products.map(p => p.id))});\n\n`;
        
        // Обновляем timestamp'ы
        sql += "-- Обновление временных меток\n";
        sql += "UPDATE categories SET created_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP;\n";
        sql += "UPDATE products SET created_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP;\n";
        
        // Сохраняем SQL
        writeFileSync('import-data.sql', sql);
        
        // Создаем JSON для удобства
        const exportData = {
            categories: categories,
            products: products,
            exportDate: new Date().toISOString(),
            totalCategories: categories.length,
            totalProducts: products.length
        };
        
        writeFileSync('export-data.json', JSON.stringify(exportData, null, 2));
        
        console.log('✅ Данные экспортированы:');
        console.log('   📄 import-data.sql - SQL файл для импорта');
        console.log('   📄 export-data.json - JSON данные');
        
        // Создаем инструкцию по установке
        const instructions = `# Инструкция по установке PHP версии AquaPool

## 📦 Что экспортировано
- Категорий: ${categories.length}
- Товаров: ${products.length}
- Дата экспорта: ${new Date().toLocaleString('ru-RU')}

## 🚀 Шаги установки

1. **Загрузите файлы на хостинг**
   - Скопируйте все файлы из папки php-version/ в корень домена
   - Убедитесь, что .htaccess загружен

2. **Создайте базу данных**
   - Создайте PostgreSQL базу данных на Beget
   - Запомните данные подключения

3. **Импортируйте структуру**
   \`\`\`sql
   -- Выполните сначала database.sql для создания таблиц
   \`\`\`

4. **Импортируйте данные**
   \`\`\`sql
   -- Затем выполните import-data.sql для загрузки товаров
   \`\`\`

5. **Настройте config.php**
   \`\`\`php
   define('DB_HOST', 'ваш_хост');
   define('DB_NAME', 'aquapool_db');  
   define('DB_USER', 'ваш_пользователь');
   define('DB_PASS', 'ваш_пароль');
   \`\`\`

6. **Проверьте работу**
   - Откройте сайт в браузере
   - Проверьте каталог товаров
   - Протестируйте корзину и заказ

## ✨ Готово!
Ваш интернет-магазин AquaPool готов к работе на PHP хостинге.
`;
        
        writeFileSync('INSTALL-INSTRUCTIONS.md', instructions);
        
        console.log('   📄 INSTALL-INSTRUCTIONS.md - инструкция по установке');
        console.log('');
        console.log('🎉 Экспорт завершен! Теперь вы можете развернуть PHP версию на любом хостинге.');
        
    } catch (error) {
        console.error('❌ Ошибка экспорта:', error.message);
        
        if (error.message.includes('ECONNREFUSED')) {
            console.log('💡 Убедитесь, что Node.js сервер запущен на порту 5000');
        }
    }
}

function escapeSQL(value) {
    if (value === null || value === undefined) {
        return 'NULL';
    }
    if (typeof value === 'string') {
        return `'${value.replace(/'/g, "''")}'`;
    }
    return value;
}

exportData();