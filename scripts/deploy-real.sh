#!/bin/bash

echo "🚀 Создаем настоящий деплой AquaPool..."

# Останавливаем если что-то пошло не так
set -e

# 1. Очищаем старые файлы
echo "🧹 Очищаем старые файлы..."
rm -rf dist server/index.js

# 2. Создаем папки
mkdir -p server

# 3. Собираем backend (быстро)
echo "📦 Собираем backend..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=server/index.js

# 4. Собираем frontend (терпеливо ждем)
echo "🎨 Собираем frontend (может занять 2-3 минуты)..."
echo "☕ Можете попить кофе, пока собирается..."

# Запускаем сборку фронтенда с увеличенным timeout
timeout 300 npm run build:frontend || {
    echo "⚠️  Сборка фронтенда занимает слишком много времени"
    echo "🔄 Пробуем альтернативный способ..."
    npx vite build --mode production
}

# 5. Проверяем что получилось
if [ -f "server/index.js" ] && [ -d "dist" ]; then
    echo "✅ Деплой готов!"
    echo "📁 Backend: server/index.js"
    echo "📁 Frontend: dist/"
    echo ""
    echo "🚀 Для запуска используйте:"
    echo "   NODE_ENV=production node server/index.js"
else
    echo "❌ Что-то пошло не так"
    exit 1
fi