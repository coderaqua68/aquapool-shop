#!/bin/bash
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
