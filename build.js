#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Начинаем сборку для Vercel...');

try {
  // 1. Собираем фронтенд
  console.log('📦 Сборка фронтенда...');
  execSync('npm run build', { stdio: 'inherit' });

  // 2. Копируем видео файл в public
  const videoSrc = 'attached_assets/d5eff5f333d3051b9f1f8efec1fd51ab_1751200866687.webm';
  const videoDest = 'client/dist/d5eff5f333d3051b9f1f8efec1fd51ab_1751200866687.webm';
  
  if (fs.existsSync(videoSrc)) {
    fs.copyFileSync(videoSrc, videoDest);
    console.log('🎥 Видео файл скопирован');
  }

  // 3. Проверяем структуру файлов
  const serverFile = 'server/index.ts';
  const clientDist = 'client/dist';
  
  if (!fs.existsSync(serverFile)) {
    throw new Error('Отсутствует server/index.ts');
  }
  
  if (!fs.existsSync(clientDist)) {
    throw new Error('Отсутствует client/dist');
  }

  console.log('✅ Проект готов к развертыванию на Vercel!');
  console.log('📁 Структура готова:');
  console.log('  - server/index.ts (API сервер)');
  console.log('  - client/dist/ (статические файлы)');
  console.log('  - vercel.json (конфигурация)');
  
} catch (error) {
  console.error('❌ Ошибка сборки:', error.message);
  process.exit(1);
}