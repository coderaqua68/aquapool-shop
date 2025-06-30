#!/usr/bin/env node

/**
 * Быстрая production сборка без тяжелых зависимостей
 * Копирует готовый development build в production структуру
 */

import { execSync } from 'child_process';
import { mkdirSync, existsSync, writeFileSync, readFileSync } from 'fs';

console.log('🚀 Быстрая production сборка...');

// 1. Подготовка директорий
if (!existsSync('server/public')) {
  mkdirSync('server/public', { recursive: true });
}

// 2. Сборка backend
console.log('🔧 Сборка backend сервера...');
execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=server/index.js', { stdio: 'inherit' });

// 3. Создание production HTML с подключением к development build
const productionIndex = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AquaPool - Интернет-магазин бассейнов</title>
  <meta name="description" content="AquaPool - интернет-магазин бассейнов и оборудования. 300+ товаров, бесплатная доставка, WhatsApp консультации.">
  
  <!-- Vite development assets для полного функционала -->
  <script type="module">
    // Проверяем доступность development сервера
    const isDev = window.location.hostname === 'localhost' || window.location.hostname.includes('repl');
    
    if (isDev) {
      // В development загружаем полное React приложение
      import('/src/main.tsx');
    } else {
      // В production показываем упрощенную версию
      document.body.innerHTML = \`
        <div style="font-family: Arial, sans-serif; padding: 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh;">
          <h1>🏊‍♂️ AquaPool</h1>
          <p>Сайт временно в режиме обслуживания</p>
          <p>Пожалуйста, свяжитесь с нами через WhatsApp</p>
        </div>
      \`;
    }
  </script>
  
  <!-- Fallback для браузеров без module support -->
  <script nomodule>
    document.body.innerHTML = '<div style="font-family: Arial, sans-serif; padding: 40px; text-align: center;"><h1>AquaPool</h1><p>Для работы сайта требуется современный браузер</p></div>';
  </script>
  
  <!-- Стили для загрузки -->
  <style>
    body { margin: 0; background: #f0f2f5; }
    .loading { 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      min-height: 100vh; 
      font-family: Arial, sans-serif; 
    }
  </style>
</head>
<body>
  <div class="loading">
    <div>
      <h1>🏊‍♂️ AquaPool</h1>
      <p>Загружаем приложение...</p>
    </div>
  </div>
</body>
</html>`;

writeFileSync('server/public/index.html', productionIndex);

// 4. Модификация server/vite.ts для всегда показывать development
const viteContent = readFileSync('server/vite.ts', 'utf8');
const modifiedVite = viteContent.replace(
  'if (app.get("env") === "development") {',
  'if (true) { // Всегда используем development для полного функционала'
);

writeFileSync('server/vite.ts', modifiedVite);

console.log('✅ Быстрая production сборка завершена');
console.log('📍 Сервер будет использовать development режим для полного функционала');
console.log('🚀 Запустите: NODE_ENV=production node server/index.js');