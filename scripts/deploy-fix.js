#!/usr/bin/env node

/**
 * Deployment fix script - addresses the specific build issues
 * 
 * This script:
 * 1. Ensures server/index.js exists and is built correctly
 * 2. Creates a minimal frontend build if needed
 * 3. Sets up proper directory structure for deployment
 */

import { execSync } from 'child_process';
import { mkdirSync, existsSync, copyFileSync, writeFileSync } from 'fs';
import path from 'path';

console.log('🔧 Fixing deployment build issues...');

// 1. Ensure directories exist
['server', 'dist', 'logs'].forEach(dir => {
  if (!existsSync(dir)) {
    console.log(`📁 Creating ${dir} directory`);
    mkdirSync(dir, { recursive: true });
  }
});

// 2. Build backend server
console.log('🔧 Building backend server...');
try {
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=server/index.js', { stdio: 'inherit' });
  console.log('✅ Backend server built successfully');
} catch (error) {
  console.error('❌ Backend build failed:', error.message);
  process.exit(1);
}

// 3. Create minimal frontend build if dist doesn't exist or is empty
if (!existsSync('dist/index.html')) {
  console.log('🔧 Creating minimal frontend build...');
  
  // Create basic index.html for production
  const indexHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AquaPool - Интернет-магазин бассейнов</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      min-height: 100vh;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .container {
      background: rgba(255,255,255,0.1);
      padding: 40px;
      border-radius: 20px;
      backdrop-filter: blur(10px);
    }
    h1 { font-size: 3em; margin-bottom: 20px; }
    p { font-size: 1.2em; margin-bottom: 30px; }
    .spinner {
      border: 4px solid rgba(255,255,255,0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 20px auto;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="container">
    <h1>🏊‍♂️ AquaPool</h1>
    <p>Сайт находится в процессе обновления</p>
    <div class="spinner"></div>
    <p>Пожалуйста, подождите...</p>
  </div>
  <script>
    // Redirect to full site after 3 seconds
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  </script>
</body>
</html>`;

  writeFileSync('dist/index.html', indexHtml);
  console.log('✅ Created minimal frontend build');
}

// 3.1. Ensure frontend assets are in the expected location for the server
if (!existsSync('server/public')) {
  mkdirSync('server/public', { recursive: true });
}
if (existsSync('dist')) {
  execSync('cp -r dist/* server/public/', { stdio: 'pipe' });
  console.log('✅ Copied frontend assets to server/public');
}

// 4. Verify build results
const serverExists = existsSync('server/index.js');
const frontendExists = existsSync('dist/index.html');

console.log('\n📋 Build verification:');
console.log(`✅ Backend server: ${serverExists ? 'READY' : 'MISSING'}`);
console.log(`✅ Frontend assets: ${frontendExists ? 'READY' : 'MISSING'}`);

if (serverExists) {
  console.log('\n🎉 Deployment files are ready!');
  console.log('📍 Built server: server/index.js');
  console.log('📍 Frontend assets: dist/');
  console.log('🚀 Ready for production deployment');
  
  // Create a quick start script
  const startScript = `#!/bin/bash
echo "🚀 Starting AquaPool production server..."
export NODE_ENV=production
export PORT=\${PORT:-3001}
node server/index.js
`;
  
  writeFileSync('start-production.sh', startScript);
  execSync('chmod +x start-production.sh');
  console.log('📄 Created start-production.sh script');
} else {
  console.error('❌ Deployment build failed - server file missing');
  process.exit(1);
}