#!/bin/bash

echo "🚀 Финальная сборка AquaPool для продакшена"

# Проверяем есть ли уже готовый backend
if [ -f "server/index.js" ]; then
    echo "✅ Backend готов (server/index.js)"
else
    echo "📦 Собираем backend..."
    npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=server/index.js
fi

# Ждем пока соберется frontend или проверяем готовность
if [ -d "dist" ]; then
    echo "✅ Frontend готов (dist/)"
else
    echo "⏳ Ждем сборку frontend..."
    echo "   Если сборка не завершилась, запустите: npx vite build --config vite.config.production.ts"
fi

# Создаем финальную структуру
echo "📁 Создаем финальную структуру..."

# Создаем папку для продакшена
mkdir -p production

# Копируем backend
cp server/index.js production/

# Копируем frontend (если готов)
if [ -d "dist" ]; then
    cp -r dist production/public
    echo "✅ Frontend скопирован в production/public"
else
    echo "⚠️  Frontend еще не готов"
fi

# Копируем необходимые файлы
cp package.json production/
cp .env.production production/.env
cp ecosystem.config.js production/

echo ""
echo "🎉 Продакшн сборка готова!"
echo "📁 Все файлы в папке: production/"
echo "🚀 Для запуска: cd production && node index.js"