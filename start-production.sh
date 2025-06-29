#!/bin/bash
echo "🚀 Запуск AquaPool продакшн сервера..."
export NODE_ENV=production
export PORT=${PORT:-3000}
node server/index.js
