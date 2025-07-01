#!/usr/bin/env node

/**
 * Скрипт для экспорта данных из Node.js версии в PHP версию
 * Экспортирует товары и категории в формате SQL
 */

import { db } from '../server/db.js';
import { products, categories } from '../shared/schema.js';
import { eq } from 'drizzle-orm';
import { writeFileSync } from 'fs';

async function exportToSQL() {
    console.log('🔄 Экспорт данных из Node.js версии в SQL...');
    
    try {
        // Получаем данные
        const categoriesData = await db.select().from(categories);
        const productsData = await db.select().from(products);
        
        console.log(`📊 Найдено категорий: ${categoriesData.length}`);
        console.log(`📦 Найдено товаров: ${productsData.length}`);
        
        let sql = '';
        
        // Экспорт категорий
        sql += "-- Очистка и вставка категорий\n";
        sql += "DELETE FROM categories WHERE id > 0;\n";
        sql += "ALTER SEQUENCE categories_id_seq RESTART WITH 1;\n\n";
        
        categoriesData.forEach(category => {
            const values = [
                category.id,
                escapeSQL(category.name),
                escapeSQL(category.slug),
                escapeSQL(category.description || ''),
                category.parentId || 'NULL',
                category.sortOrder || 0,
                escapeSQL(category.imageUrl || '')
            ];
            
            sql += `INSERT INTO categories (id, name, slug, description, parent_id, sort_order, image_url) VALUES `;
            sql += `(${values.join(', ')});\n`;
        });
        
        sql += "\n-- Обновление последовательности категорий\n";
        sql += `SELECT setval('categories_id_seq', ${Math.max(...categoriesData.map(c => c.id))});\n\n`;
        
        // Экспорт товаров
        sql += "-- Очистка и вставка товаров\n";
        sql += "DELETE FROM products WHERE id > 0;\n";
        sql += "ALTER SEQUENCE products_id_seq RESTART WITH 1;\n\n";
        
        productsData.forEach(product => {
            const values = [
                product.id,
                escapeSQL(product.name),
                escapeSQL(product.slug),
                escapeSQL(product.sku),
                escapeSQL(product.description || ''),
                escapeSQL(product.shortDescription || ''),
                product.price,
                product.originalPrice || 'NULL',
                product.categoryId || 'NULL',
                escapeSQL(product.brand || ''),
                escapeSQL(JSON.stringify(product.images || [])),
                escapeSQL(JSON.stringify(product.specifications || {})),
                product.rating || 0,
                product.reviewCount || 0,
                product.isPopular ? 'true' : 'false',
                product.isActive ? 'true' : 'false',
                product.stockQuantity || 0
            ];
            
            sql += `INSERT INTO products (id, name, slug, sku, description, short_description, price, original_price, category_id, brand, images, specifications, rating, review_count, is_popular, is_active, stock_quantity) VALUES `;
            sql += `(${values.join(', ')});\n`;
        });
        
        sql += "\n-- Обновление последовательности товаров\n";
        sql += `SELECT setval('products_id_seq', ${Math.max(...productsData.map(p => p.id))});\n\n`;
        
        // Сохраняем в файл
        writeFileSync('php-version/import-data.sql', sql);
        
        console.log('✅ Данные экспортированы в php-version/import-data.sql');
        console.log('📝 Для импорта выполните этот SQL файл в вашей PostgreSQL базе данных');
        
        // Создаем также CSV файлы для удобства
        await exportToCSV(categoriesData, productsData);
        
    } catch (error) {
        console.error('❌ Ошибка экспорта:', error);
    }
}

async function exportToCSV(categoriesData, productsData) {
    console.log('📄 Создание CSV файлов...');
    
    // CSV для категорий
    let categoriesCSV = 'id,name,slug,description,parent_id,sort_order,image_url\n';
    categoriesData.forEach(category => {
        categoriesCSV += [
            category.id,
            `"${(category.name || '').replace(/"/g, '""')}"`,
            `"${(category.slug || '').replace(/"/g, '""')}"`,
            `"${(category.description || '').replace(/"/g, '""')}"`,
            category.parentId || '',
            category.sortOrder || 0,
            `"${(category.imageUrl || '').replace(/"/g, '""')}"`
        ].join(',') + '\n';
    });
    writeFileSync('php-version/categories.csv', categoriesCSV);
    
    // CSV для товаров
    let productsCSV = 'id,name,slug,sku,description,short_description,price,original_price,category_id,brand,images,specifications,rating,review_count,is_popular,is_active,stock_quantity\n';
    productsData.forEach(product => {
        productsCSV += [
            product.id,
            `"${(product.name || '').replace(/"/g, '""')}"`,
            `"${(product.slug || '').replace(/"/g, '""')}"`,
            `"${(product.sku || '').replace(/"/g, '""')}"`,
            `"${(product.description || '').replace(/"/g, '""')}"`,
            `"${(product.shortDescription || '').replace(/"/g, '""')}"`,
            product.price,
            product.originalPrice || '',
            product.categoryId || '',
            `"${(product.brand || '').replace(/"/g, '""')}"`,
            `"${JSON.stringify(product.images || []).replace(/"/g, '""')}"`,
            `"${JSON.stringify(product.specifications || {}).replace(/"/g, '""')}"`,
            product.rating || 0,
            product.reviewCount || 0,
            product.isPopular ? 1 : 0,
            product.isActive ? 1 : 0,
            product.stockQuantity || 0
        ].join(',') + '\n';
    });
    writeFileSync('php-version/products.csv', productsCSV);
    
    console.log('✅ CSV файлы созданы: categories.csv, products.csv');
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

// Запуск экспорта
exportToSQL().then(() => {
    console.log('🎉 Экспорт завершен!');
    console.log('');
    console.log('📋 Следующие шаги:');
    console.log('1. Скопируйте файлы из php-version/ на ваш хостинг');
    console.log('2. Создайте PostgreSQL базу данных');
    console.log('3. Выполните database.sql для создания структуры');
    console.log('4. Выполните import-data.sql для импорта данных');
    console.log('5. Настройте config.php с данными подключения');
    console.log('6. Откройте сайт в браузере');
    process.exit(0);
}).catch(error => {
    console.error('❌ Критическая ошибка:', error);
    process.exit(1);
});