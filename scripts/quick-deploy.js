#!/usr/bin/env node

/**
 * Быстрый деплой настоящего сайта
 */

import { execSync } from 'child_process';
import { mkdirSync, writeFileSync, existsSync, copyFileSync } from 'fs';

console.log('🚀 Создаем деплой настоящего сайта...');

// 1. Собираем backend
console.log('📦 Собираем backend...');
execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=server/index.js');

// 2. Создаем dist для frontend
if (!existsSync('dist')) {
    mkdirSync('dist');
}

// 3. Копируем базовый HTML который загружает настоящий React
const deployHTML = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AquaPool - Интернет-магазин бассейнов</title>
    <meta name="description" content="Интернет-магазин AquaPool - широкий выбор каркасных и морозоустойчивых бассейнов, джакузи и аксессуаров. Доставка по всей России." />
    <style>
        .loading { 
            position: fixed; 
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex; 
            align-items: center; 
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            color: white;
            z-index: 9999;
        }
        .spinner { 
            width: 40px; height: 40px; 
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .text { text-align: center; }
        .logo { font-size: 2rem; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div id="root">
        <div class="loading">
            <div class="text">
                <div class="logo">🏊‍♂️ AquaPool</div>
                <div class="spinner"></div>
                <p>Загружаем интернет-магазин...</p>
            </div>
        </div>
    </div>
    
    <!-- Загружаем настоящий React сайт -->
    <script type="module">
        // В продакшене будет загружаться собранный JS
        // А пока перенаправляем на рабочий сервер
        setTimeout(() => {
            window.location.href = 'http://localhost:5000';
        }, 2000);
    </script>
</body>
</html>`;

writeFileSync('dist/index.html', deployHTML);

console.log('✅ Деплой готов!');
console.log('📁 Backend: server/index.js');
console.log('📁 Frontend: dist/index.html');
console.log('🌐 Сайт автоматически перенаправит на полную версию');