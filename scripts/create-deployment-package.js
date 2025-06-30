#!/usr/bin/env node

/**
 * Создание полного пакета для развертывания на aquapool-shop.ru
 */

import { execSync } from 'child_process';
import { mkdirSync, existsSync, writeFileSync, copyFileSync, readFileSync } from 'fs';
import path from 'path';

console.log('📦 Создание пакета для развертывания на aquapool-shop.ru...');

// 1. Создание директории для deployment
const deployDir = 'deployment-package';
if (!existsSync(deployDir)) {
  mkdirSync(deployDir, { recursive: true });
}

// 2. Сборка backend
console.log('🔧 Сборка backend...');
execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=deployment-package/server.js', { stdio: 'inherit' });

// 3. Создание структуры файлов для хостинга
const serverDir = path.join(deployDir, 'server');
const publicDir = path.join(deployDir, 'public');

if (!existsSync(serverDir)) mkdirSync(serverDir, { recursive: true });
if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

// 4. Создание production HTML
const productionHTML = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AquaPool - Интернет-магазин бассейнов</title>
  <meta name="description" content="AquaPool - интернет-магазин бассейнов и оборудования. 300+ товаров, бесплатная доставка до 31 июля, WhatsApp консультации.">
  <meta name="keywords" content="бассейны, каркасные бассейны, надувные бассейны, Intex, Bestway, джакузи">
  
  <!-- Open Graph -->
  <meta property="og:title" content="AquaPool - Интернет-магазин бассейнов">
  <meta property="og:description" content="300+ товаров для бассейнов. Бесплатная доставка до 31 июля.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://aquapool-shop.ru">
  
  <!-- Styles -->
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      text-align: center;
      padding: 40px;
      max-width: 600px;
    }
    .logo {
      font-size: 3em;
      margin-bottom: 20px;
    }
    h1 {
      font-size: 2.5em;
      margin-bottom: 20px;
      font-weight: 700;
    }
    p {
      font-size: 1.2em;
      margin-bottom: 15px;
      opacity: 0.9;
    }
    .whatsapp-btn {
      display: inline-block;
      background: #25D366;
      color: white;
      padding: 15px 30px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: bold;
      margin-top: 20px;
      transition: background 0.3s;
    }
    .whatsapp-btn:hover {
      background: #20b858;
    }
    .features {
      margin-top: 30px;
      text-align: left;
      display: inline-block;
    }
    .feature {
      margin: 10px 0;
      padding-left: 30px;
      position: relative;
    }
    .feature:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #4CAF50;
      font-weight: bold;
      font-size: 1.2em;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">🏊‍♂️</div>
    <h1>AquaPool</h1>
    <p>Интернет-магазин бассейнов и оборудования</p>
    
    <div class="features">
      <div class="feature">300+ товаров в каталоге</div>
      <div class="feature">Каркасные и морозоустойчивые бассейны</div>
      <div class="feature">Джакузи Intex и Bestway</div>
      <div class="feature">Бесплатная доставка до 31 июля 🎉</div>
      <div class="feature">WhatsApp консультации</div>
    </div>
    
    <a href="https://wa.me/79000000000?text=Здравствуйте! Интересует каталог бассейнов AquaPool" class="whatsapp-btn">
      📱 Связаться в WhatsApp
    </a>
    
    <p style="margin-top: 30px; font-size: 0.9em; opacity: 0.7;">
      Сайт временно в режиме технических работ. <br>
      Для заказа свяжитесь с менеджером в WhatsApp.
    </p>
  </div>
  
  <script>
    // Простая аналитика
    console.log('AquaPool landing page loaded');
  </script>
</body>
</html>`;

writeFileSync(path.join(publicDir, 'index.html'), productionHTML);

// 5. Создание .htaccess для Apache
const htaccess = `# AquaPool Apache Configuration

RewriteEngine On

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# API routing to Node.js server (если будет настроен)
# RewriteRule ^api/(.*)$ http://localhost:3000/api/$1 [P,L]

# Serve static files
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]`;

writeFileSync(path.join(deployDir, '.htaccess'), htaccess);

// 6. Создание production package.json
const productionPackage = {
  "name": "aquapool-production",
  "version": "1.0.0",
  "description": "AquaPool E-commerce Platform - Production",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "pm2:start": "pm2 start server.js --name aquapool",
    "pm2:stop": "pm2 stop aquapool",
    "pm2:restart": "pm2 restart aquapool"
  },
  "dependencies": {
    "express": "^4.18.2",
    "@neondatabase/serverless": "^0.9.0",
    "drizzle-orm": "^0.29.0",
    "node-telegram-bot-api": "^0.64.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
};

writeFileSync(path.join(deployDir, 'package.json'), JSON.stringify(productionPackage, null, 2));

// 7. Создание .env template
const envTemplate = `# Production Environment Variables for aquapool-shop.ru

NODE_ENV=production
PORT=3000

# Database (получить от Beget.com)
DATABASE_URL=postgresql://username:password@host:5432/aquapool_db

# Telegram Bot (уже настроен)
TELEGRAM_BOT_TOKEN=7550930591:AAHZHqOnklv8EFkID5XaTkgzCrGwhY3Ex7M
TELEGRAM_ADMIN_CHAT_IDS=5696137293

# Domain
DOMAIN=aquapool-shop.ru
`;

writeFileSync(path.join(deployDir, '.env.example'), envTemplate);

// 8. Инструкция по развертыванию
const deployInstructions = `# Инструкция по развертыванию на aquapool-shop.ru

## Шаг 1: Загрузка файлов
1. Загрузите содержимое папки deployment-package в корень домена aquapool-shop.ru
2. Файл index.html должен быть в public_html/
3. Файл .htaccess должен быть в public_html/

## Шаг 2: Настройка базы данных (опционально)
Если хотите полный функционал:
1. Создайте PostgreSQL базу в панели Beget
2. Скопируйте .env.example в .env и заполните DATABASE_URL
3. Установите Node.js зависимости: npm install --production
4. Запустите сервер: npm start

## Шаг 3: Проверка
Откройте https://aquapool-shop.ru
Должна загрузиться landing страница с WhatsApp кнопкой

## Текущее состояние
- Создана красивая landing страница с информацией о магазине
- Настроена WhatsApp интеграция для связи с клиентами
- Добавлены все ключевые преимущества (300+ товаров, бесплатная доставка)
- Сообщение о технических работах для объяснения упрощенной версии

## Полный функционал
Для запуска полного React-приложения потребуется:
- Настройка Node.js на хостинге Beget
- Конфигурация PostgreSQL базы данных
- Установка зависимостей и запуск backend сервера

Текущая landing страница работает без backend и показывает профессиональный вид магазина.
`;

writeFileSync(path.join(deployDir, 'DEPLOY-INSTRUCTIONS.txt'), deployInstructions);

console.log('✅ Пакет для развертывания создан в папке deployment-package/');
console.log('📁 Содержимое:');
console.log('   - index.html (landing страница)');
console.log('   - .htaccess (конфигурация Apache)');
console.log('   - server.js (backend сервер)');
console.log('   - package.json (зависимости)');
console.log('   - .env.example (переменные окружения)');
console.log('   - DEPLOY-INSTRUCTIONS.txt (инструкция)');
console.log('');
console.log('🚀 Следующие шаги:');
console.log('1. Загрузите файлы на aquapool-shop.ru');
console.log('2. Откройте сайт для проверки');
console.log('3. При необходимости настройте full stack (Node.js + PostgreSQL)');