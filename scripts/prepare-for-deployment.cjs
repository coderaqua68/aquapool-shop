/**
 * Скрипт подготовки проекта для развертывания на Beget.com
 * Создает все необходимые файлы и структуры
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Подготовка проекта для развертывания на Beget.com...\n');

// 1. Создание .env файла для production
const envContent = `# Production Environment Variables for Beget.com
NODE_ENV=production
PORT=3000

# Database Configuration
# ВАЖНО: Замените эти значения на реальные данные из панели Beget
DATABASE_URL=postgresql://username:password@localhost:5432/aquapool_db

# Telegram Bot Configuration  
TELEGRAM_BOT_TOKEN=7550930591:AAHZHqOnklv8EFkID5XaTkgzCrGwhY3Ex7M

# ВАЖНО: Добавьте Telegram ID всех администраторов через запятую
TELEGRAM_ADMIN_CHAT_IDS=5696137293

# Site Configuration
DOMAIN=aquapool-shop.ru
`;

fs.writeFileSync('.env.production', envContent);
console.log('✅ Создан файл .env.production');

// 2. Создание конфигурации для PM2
const pm2Config = {
  apps: [{
    name: 'aquapool',
    script: 'server/index.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};

fs.writeFileSync('ecosystem.config.js', `module.exports = ${JSON.stringify(pm2Config, null, 2)};`);
console.log('✅ Создан файл ecosystem.config.js для PM2');

// 3. Создание .htaccess для Apache
const htaccessContent = `# AquaPool Apache Configuration for Beget.com
RewriteEngine On

# Безопасность - скрыть файлы конфигурации
<Files ~ "^\\.(env|htaccess|htpasswd)">
    Require all denied
</Files>

# Перенаправление на HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# API запросы перенаправляем на Node.js сервер
RewriteRule ^api/(.*)$ http://localhost:3000/api/$1 [P,L]

# Обслуживание статических файлов React
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /dist/index.html [L]

# Настройка кэширования
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
</IfModule>

# Сжатие файлов
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
`;

fs.writeFileSync('.htaccess', htaccessContent);
console.log('✅ Создан файл .htaccess для Apache');

// 4. Создание start.sh скрипта для запуска
const startScript = `#!/bin/bash
# Скрипт запуска AquaPool на Beget.com

echo "🚀 Запуск AquaPool..."

# Проверяем Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен!"
    exit 1
fi

# Проверяем npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm не установлен!"
    exit 1
fi

# Устанавливаем зависимости если нужно
if [ ! -d "node_modules" ]; then
    echo "📦 Установка зависимостей..."
    npm install --production
fi

# Проверяем переменные окружения
if [ ! -f ".env" ]; then
    echo "⚠️  Файл .env не найден, используем .env.production"
    cp .env.production .env
fi

# Создаем папку для логов
mkdir -p logs

# Применяем миграции базы данных
echo "🗄️  Применение миграций базы данных..."
npm run db:push

# Запускаем приложение
echo "🎯 Запуск сервера..."
if command -v pm2 &> /dev/null; then
    echo "Использую PM2 для запуска..."
    pm2 start ecosystem.config.js
    pm2 save
else
    echo "PM2 не найден, запуск через node..."
    node server/index.js
fi

echo "✅ AquaPool запущен!"
`;

fs.writeFileSync('start.sh', startScript);
fs.chmodSync('start.sh', 0o755);
console.log('✅ Создан скрипт start.sh');

// 5. Создание инструкции по развертыванию
const deployInstructions = `# 🚀 Инструкция по развертыванию AquaPool на Beget.com

## Шаг 1: Подготовка файлов

1. Выполните сборку проекта:
   \`\`\`bash
   npm run build
   \`\`\`

2. Создайте архив со следующими файлами/папками:
   - \`dist/\` (собранный фронтенд)
   - \`server/\` (бэкенд код)
   - \`package.json\`
   - \`package-lock.json\`
   - \`.env.production\` (переименуйте в \`.env\`)
   - \`.htaccess\`
   - \`start.sh\`
   - \`ecosystem.config.js\`

## Шаг 2: Настройка базы данных PostgreSQL

1. В панели Beget создайте PostgreSQL базу данных
2. Запишите данные подключения:
   - Хост
   - Порт (обычно 5432)
   - Имя базы данных
   - Пользователь
   - Пароль

3. Отредактируйте файл \`.env\` и замените DATABASE_URL:
   \`\`\`
   DATABASE_URL=postgresql://ваш_пользователь:ваш_пароль@ваш_хост:5432/ваша_база
   \`\`\`

## Шаг 3: Загрузка на сервер

1. Подключитесь к FTP/SFTP
2. Загрузите все файлы в папку \`public_html/\`
3. Убедитесь, что структура следующая:
   \`\`\`
   public_html/
   ├── dist/
   ├── server/
   ├── package.json
   ├── .env
   ├── .htaccess
   └── start.sh
   \`\`\`

## Шаг 4: Установка и запуск

1. Подключитесь по SSH к серверу
2. Перейдите в папку сайта:
   \`\`\`bash
   cd ~/public_html/
   \`\`\`

3. Дайте права на выполнение скрипту:
   \`\`\`bash
   chmod +x start.sh
   \`\`\`

4. Запустите установку и настройку:
   \`\`\`bash
   ./start.sh
   \`\`\`

## Шаг 5: Проверка работы

1. Откройте ваш домен в браузере
2. Проверьте основные функции:
   - Главная страница
   - Каталог товаров
   - Поиск
   - Корзина
   - Админ-панель (/admin)

## Возможные проблемы

### Node.js не установлен
- Обратитесь в поддержку Beget для установки Node.js
- Или используйте shared хостинг с Node.js

### База данных не подключается
- Проверьте правильность DATABASE_URL в .env
- Убедитесь, что PostgreSQL включен в вашем тарифе

### Статические файлы не загружаются
- Проверьте настройки .htaccess
- Убедитесь, что папка dist/ загружена правильно

## Контакты

При проблемах обращайтесь в техподдержку Beget.com
`;

fs.writeFileSync('DEPLOY-INSTRUCTIONS.md', deployInstructions);
console.log('✅ Создана инструкция DEPLOY-INSTRUCTIONS.md');

// 6. Создание SQL дампа для создания таблиц
const sqlDump = `-- AquaPool Database Schema for PostgreSQL
-- Создание таблиц для развертывания на Beget.com

-- Таблица продуктов
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    category VARCHAR(200) NOT NULL,
    subcategory VARCHAR(200),
    brand VARCHAR(100),
    image_url TEXT,
    additional_images TEXT[],
    specifications JSONB,
    in_stock BOOLEAN DEFAULT true,
    is_popular BOOLEAN DEFAULT false,
    rating DECIMAL(2,1) DEFAULT 4.5,
    review_count INTEGER DEFAULT 0,
    country_origin VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица категорий
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    product_count INTEGER DEFAULT 0,
    parent_id INTEGER REFERENCES categories(id),
    level INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0
);

-- Таблица заказов
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(200) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(200),
    delivery_method VARCHAR(100) NOT NULL,
    delivery_address TEXT NOT NULL,
    payment_method VARCHAR(100) NOT NULL,
    items JSONB NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица консультаций
CREATE TABLE IF NOT EXISTS consultations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица настроек сайта
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    type VARCHAR(50) DEFAULT 'text',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица администраторов Telegram
CREATE TABLE IF NOT EXISTS telegram_admins (
    id SERIAL PRIMARY KEY,
    chat_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_notified TIMESTAMP
);

-- Таблица сессий
CREATE TABLE IF NOT EXISTS sessions (
    sid VARCHAR(255) PRIMARY KEY,
    sess JSONB NOT NULL,
    expire TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS IDX_session_expire ON sessions(expire);

-- Вставка начальных данных
INSERT INTO telegram_admins (chat_id, name, username, is_active) 
VALUES ('5696137293', 'Основной администратор', 'admin', true) 
ON CONFLICT (chat_id) DO NOTHING;

-- Создание индексов для оптимизации
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_is_popular ON products(is_popular);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at);
`;

fs.writeFileSync('database-schema.sql', sqlDump);
console.log('✅ Создан файл database-schema.sql');

// 7. Обновление package.json для production
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Добавляем production скрипты
packageJson.scripts = {
  ...packageJson.scripts,
  "start": "NODE_ENV=production node server/index.js",
  "deploy": "npm run build && node scripts/prepare-for-deployment.js",
  "db:setup": "psql $DATABASE_URL -f database-schema.sql"
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✅ Обновлен package.json');

console.log('\n🎉 Подготовка завершена!\n');
console.log('📋 Следующие шаги:');
console.log('1. Выполните: npm run build');
console.log('2. Прочитайте DEPLOY-INSTRUCTIONS.md');
console.log('3. Настройте базу данных PostgreSQL на Beget');
console.log('4. Отредактируйте .env.production с реальными данными');
console.log('5. Загрузите файлы на сервер Beget');
console.log('6. Запустите ./start.sh на сервере\n');
console.log('📄 Все файлы готовы для развертывания!');